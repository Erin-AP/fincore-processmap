"""
Build ProcessMap_v2.html from ProcessMap_v1.html, replacing embedded 財產管理
data with rows from asset_management_flow…finalized.csv only (no scenarios
beyond what appears in the CSV).
"""
from __future__ import annotations

import csv
import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
V1 = BASE / "ProcessMap_v1.html"
CSV_PATH = BASE / "補充資料" / "財產管理" / "asset_management_flow_提供盈瑋 (reorder)_finalized.csv"
OUT = BASE / "ProcessMap_v2.html"

COL_FLOW = 0
COL_FLOW_SHORT = 1
COL_FLOW_FULL = 2
COL_STEP_D = 3
COL_STEP_E = 4
COL_STEP_F = 5
COL_ROLE = 6
COL_INPUT = 7
COL_OUTPUT = 8
COL_SYSTEM = 9
COL_SRC = 10


def norm_ws(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip())


def split_sources(main: str, *extra: str) -> list[str]:
    parts: list[str] = []
    for chunk in (main, *extra):
        if not (chunk or "").strip():
            continue
        for p in re.split(r"[、,，;；]", chunk):
            p = p.strip()
            if p and p not in parts:
                parts.append(p)
    return parts


def step_description(e_label: str, f_name: str) -> str | None:
    """Optional 步驟說明: 註解或多行與標題差異時放入 description。"""
    e1 = (e_label or "").strip().split("\n")[0].strip()
    f_raw = (f_name or "").strip()
    if not f_raw:
        return None
    f_lines = [ln.strip() for ln in f_raw.split("\n") if ln.strip()]
    if not f_lines:
        return None
    if "[註" in f_raw or len(f_lines) > 1:
        return f_raw
    if f_lines[0] != e1 and f_lines[0] not in e1:
        return f_lines[0]
    return None


def load_csv_scenarios() -> OrderedDict[str, dict]:
    """flow_id -> {title, description, rows[]} in file order."""
    groups: OrderedDict[str, dict] = OrderedDict()
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        r = csv.reader(f)
        header = next(r)
        # tolerate header spacing
        for row in r:
            while len(row) < 16:
                row.append("")
            fid = row[COL_FLOW].strip()
            if not fid:
                continue
            if fid not in groups:
                groups[fid] = {
                    "title": row[COL_FLOW_FULL].strip() or f"{fid}",
                    "description": row[COL_FLOW_SHORT].strip() or "",
                    "rows": [],
                }
            groups[fid]["rows"].append(row)
    return groups


def build_property_array(groups: OrderedDict[str, dict]) -> list[dict]:
    out: list[dict] = []
    for fid, meta in groups.items():
        scen: dict = {
            "id": fid,
            "title": meta["title"],
            "description": meta["description"],
            "steps": [],
        }
        for i, row in enumerate(meta["rows"], start=1):
            e_raw = row[COL_STEP_E].strip()
            f_raw = row[COL_STEP_F].strip()
            name = norm_ws(e_raw) if e_raw else norm_ws(f_raw)
            desc = step_description(e_raw, f_raw)
            src = split_sources(row[COL_SRC], row[11], row[12], row[13])
            step = {
                "id": f"{fid.lower()}-{i}",
                "name": name,
                "role": row[COL_ROLE].strip(),
                "input": row[COL_INPUT].strip(),
                "output": row[COL_OUTPUT].strip(),
                "system": row[COL_SYSTEM].strip(),
                "manHours": "",
                "frequency": "",
                "sources": src,
            }
            if desc:
                step["description"] = desc
            scen["steps"].append(step)
        out.append(scen)
    return out


def main() -> int:
    if not V1.exists():
        print(f"Missing {V1}", file=sys.stderr)
        return 1
    if not CSV_PATH.exists():
        print(f"Missing {CSV_PATH}", file=sys.stderr)
        return 1

    text = V1.read_text(encoding="utf-8")
    m = re.search(
        r'(<script id="embedded-data" type="application/json">)(.*?)(</script>)',
        text,
        re.DOTALL,
    )
    if not m:
        print("Could not find embedded-data", file=sys.stderr)
        return 1

    data = json.loads(m.group(2))
    groups = load_csv_scenarios()
    data["財產管理"] = build_property_array(groups)

    new_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))

    text2 = text[: m.start(2)] + new_json + text[m.end(2) :]
    text2 = text2.replace(
        "<title>全週期作業流程系統地圖 v10（九大模組）</title>",
        "<title>全週期作業流程系統地圖 v11（九大模組）</title>",
        1,
    )
    text2 = text2.replace(
        "v10 · 九大模組 · 含步驟說明（與 React 地圖 constants 同步匯出）",
        "v11 · 九大模組 · 財產管理已同步企財修訂（finalized CSV）；其餘模組同前版",
        1,
    )

    OUT.write_text(text2, encoding="utf-8")
    print(f"Wrote {OUT} scenarios財產管理={len(data['財產管理'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
