"""
Parse asset_management_flow xlsx:

1. sharedStrings: skip inline <r> runs that have <strike/> in rPr (rich-text revisions).
2. Cell styles: if cell uses cellXfs whose font has <strike/> (whole-cell strikethrough in
   Excel), that cell's displayed text is cleared — entire rows marked this way disappear
   when 流程代碼 becomes empty.

Preserves 步驟序號 from the workbook. Rows with empty 流程代碼 are omitted.
"""
from __future__ import annotations

import csv
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def col_to_idx(col_letters: str) -> int:
    n = 0
    for ch in col_letters:
        if not ch.isalpha():
            break
        n = n * 26 + (ord(ch.upper()) - ord("A") + 1)
    return n - 1


def parse_cell_ref(ref: str) -> tuple[int, int]:
    m = re.match(r"^([A-Z]+)(\d+)$", ref.upper())
    if not m:
        return 0, 0
    return int(m.group(2)) - 1, col_to_idx(m.group(1))


def has_strike(rpr: ET.Element | None) -> bool:
    if rpr is None:
        return False
    for child in rpr:
        tag = child.tag.split("}")[-1]
        if tag == "strike":
            return True
        if tag == "strike" and child.get("val") in (None, "true", "1"):
            return True
    return False


def extract_run_text(r_elem: ET.Element) -> str:
    parts: list[str] = []
    for t in r_elem.findall("m:t", NS):
        if t.text:
            parts.append(t.text)
        if t.tail:
            parts.append(t.tail)
    return "".join(parts)


def si_to_plain(si: ET.Element) -> str:
    """Merge rich-text <si>: skip runs with strikethrough; keep order of other runs."""
    t_direct = si.find("m:t", NS)
    if t_direct is not None and not si.findall("m:r", NS):
        return (t_direct.text or "") + (t_direct.tail or "")

    out: list[str] = []
    for r in si.findall("m:r", NS):
        rpr = r.find("m:rPr", NS)
        if has_strike(rpr):
            continue
        out.append(extract_run_text(r))
    # Fallback: if no <r> matched but there's inline t at si level
    if not out and t_direct is not None:
        return (t_direct.text or "") + (t_direct.tail or "")
    return "".join(out)


def font_element_has_strike(font_el: ET.Element) -> bool:
    strike = font_el.find("m:strike", NS)
    if strike is None:
        return False
    val = strike.get("val")
    if val is None:
        return True
    return str(val).lower() not in ("0", "false")


def load_xf_cell_strikethrough(styles_xml: bytes) -> list[bool]:
    """cellXfs index -> True if xf applies a strikethrough font (applyFont=1 and font has strike)."""
    root = ET.fromstring(styles_xml)
    fonts = root.findall("m:fonts/m:font", NS)
    font_strike = [font_element_has_strike(f) for f in fonts]
    xfs = root.findall("m:cellXfs/m:xf", NS)
    out: list[bool] = []
    for xf in xfs:
        if xf.get("applyFont") != "1":
            out.append(False)
            continue
        try:
            fid = int(xf.get("fontId", "0"))
        except ValueError:
            out.append(False)
            continue
        out.append(bool(fid < len(font_strike) and font_strike[fid]))
    return out


def load_shared_strings(z: zipfile.ZipFile) -> list[str]:
    data = z.read("xl/sharedStrings.xml")
    root = ET.fromstring(data)
    strings: list[str] = []
    for si in root.findall("m:si", NS):
        strings.append(si_to_plain(si))
    return strings


def cell_inline_string(is_elem: ET.Element) -> str:
    """Inline string in cell (rare); same strike-skip logic."""
    parts: list[str] = []
    for r in is_elem.findall("m:r", NS):
        rpr = r.find("m:rPr", NS)
        if has_strike(rpr):
            continue
        parts.append(extract_run_text(r))
    t = is_elem.find("m:t", NS)
    if t is not None and not is_elem.findall("m:r", NS):
        return (t.text or "") + (t.tail or "")
    return "".join(parts)


def read_sheet_rows(
    z: zipfile.ZipFile, sheet_path: str, sst: list[str], xf_strike: list[bool]
) -> dict[tuple[int, int], str]:
    """Return sparse map (row_idx, col_idx) -> resolved string value."""
    root = ET.fromstring(z.read(sheet_path))
    out: dict[tuple[int, int], str] = {}

    def parse_style_idx(raw: str | None) -> int | None:
        if raw is None:
            return None
        try:
            return int(raw)
        except ValueError:
            return None

    def cell_inherits_row_strike_blank(cell_s: str | None, row_s: str | None) -> bool:
        """Whole-row delete in Excel: <row s=\"2\" customFormat> with strike font. Do NOT blank
        cells that only have per-cell s=2 while the row has no row-level s — those are often
        partial revision highlights (rich text still lives in SST)."""
        rs = parse_style_idx(row_s)
        if rs is None or rs < 0 or rs >= len(xf_strike) or not xf_strike[rs]:
            return False
        xs = parse_style_idx(cell_s)
        if xs is None:
            return True
        if xs == rs:
            return True
        if 0 <= xs < len(xf_strike) and not xf_strike[xs]:
            return False
        return bool(xf_strike[xs])

    for row in root.findall(".//m:sheetData/m:row", NS):
        row_s = row.get("s")
        for c in row.findall("m:c", NS):
            ref = c.get("r")
            if not ref:
                continue
            r_idx, c_idx = parse_cell_ref(ref)
            strike_cell = cell_inherits_row_strike_blank(c.get("s"), row_s)

            t = c.get("t")
            v_el = c.find("m:v", NS)
            is_el = c.find("m:is", NS)
            if strike_cell:
                text = ""
            elif t == "s" and v_el is not None and v_el.text is not None:
                try:
                    sidx = int(v_el.text)
                    text = sst[sidx] if 0 <= sidx < len(sst) else ""
                except ValueError:
                    text = ""
            elif is_el is not None:
                text = cell_inline_string(is_el)
            elif v_el is not None and v_el.text is not None:
                text = v_el.text
            else:
                text = ""
            out[(r_idx, c_idx)] = text
    return out


def dense_rows(
    sparse: dict[tuple[int, int], str], max_row: int, max_col: int
) -> list[list[str]]:
    rows: list[list[str]] = []
    for r in range(0, max_row + 1):
        row = []
        for c in range(0, max_col + 1):
            row.append(sparse.get((r, c), ""))
        rows.append(row)
    return rows


def main() -> int:
    base = Path(__file__).resolve().parents[1]
    xlsx = base / "補充資料" / "財產管理" / "asset_management_flow_提供盈瑋 (reorder).xlsx"
    out_csv = base / "補充資料" / "財產管理" / "asset_management_flow_提供盈瑋 (reorder)_revised.csv"
    if len(sys.argv) >= 2:
        xlsx = Path(sys.argv[1])
    if len(sys.argv) >= 3:
        out_csv = Path(sys.argv[2])

    if not xlsx.exists():
        print(f"Missing: {xlsx}", file=sys.stderr)
        return 1

    with zipfile.ZipFile(xlsx) as z:
        sst = load_shared_strings(z)
        xf_strike = load_xf_cell_strikethrough(z.read("xl/styles.xml"))
        # first worksheet
        wb_root = ET.fromstring(z.read("xl/workbook.xml"))
        sheets = wb_root.findall("m:sheets/m:sheet", NS)
        rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        rid_to_target: dict[str, str] = {}
        for rel in rels.findall("{http://schemas.openxmlformats.org/package/2006/relationships}Relationship"):
            rid_to_target[rel.get("Id") or ""] = rel.get("Target") or ""

        first_rid = sheets[0].get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id")
        target = rid_to_target.get(first_rid or "", "worksheets/sheet1.xml")
        if not target.startswith("xl/"):
            target = "xl/" + target.lstrip("/")

        sparse = read_sheet_rows(z, target, sst, xf_strike)
        max_row = max((r for r, _ in sparse.keys()), default=0)
        max_col = max((c for _, c in sparse.keys()), default=0)
        grid = dense_rows(sparse, max_row, max_col)

    # Header = row 0
    header = grid[0]
    # Trim trailing empty columns from header
    while header and not str(header[-1]).strip():
        header.pop()

    data_rows: list[list[str]] = []
    for row in grid[1:]:
        trimmed = row[: len(header)]
        # pad
        while len(trimmed) < len(header):
            trimmed.append("")
        data_rows.append(trimmed)

    # Drop rows where 流程代碼 (col 0) empty -> section blanks
    flow_col = 0

    kept: list[list[str]] = []
    for row in data_rows:
        if not str(row[flow_col]).strip():
            continue
        kept.append(list(row))

    out_csv.parent.mkdir(parents=True, exist_ok=True)
    try:
        out_f = out_csv.open("w", encoding="utf-8-sig", newline="")
    except PermissionError:
        alt = out_csv.with_name(out_csv.stem + "_new" + out_csv.suffix)
        out_f = alt.open("w", encoding="utf-8-sig", newline="")
        out_csv = alt
        print(f"(locked) writing alternate path", file=sys.stderr)
    with out_f:
        w = csv.writer(out_f)
        w.writerow(header)
        w.writerows(kept)

    print(f"Wrote {out_csv} rows={len(kept)} cols={len(header)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
