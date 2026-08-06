"""
1) Within each contiguous block of the same 流程代碼, if 步驟序號 (D) is not already
   1..n with no gaps (e.g. …11,13,14 after a deleted step), renumber D to 1..n.
   Blocks that are already strictly consecutive (e.g. 3,4,5 after a sandwiched row)
   are left unchanged.
2) Sync 步驟標示 (E): first 'Step <n>:' matches col D.

Reads *_revised.csv, writes *_finalized.csv.
"""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

STEP_PREFIX = re.compile(r"(?is)(Step\s+)\d+(\s*:)")

# 0-based column indices matching 流程代碼,…,步驟序號,步驟標示,…
COL_FLOW = 0
COL_D = 3
COL_E = 4


def parse_d(cell: str) -> int | None:
    s = (cell or "").strip()
    if not s:
        return None
    try:
        return int(s)
    except ValueError:
        return None


def segment_should_renumber_d(d_vals: list[int | None]) -> bool:
    """True → assign D = 1..n in row order."""
    n = len(d_vals)
    if n == 0:
        return False
    if n == 1:
        return False
    if any(v is None for v in d_vals):
        return True
    ints = [v for v in d_vals if v is not None]
    if ints == list(range(1, n + 1)):
        return False
    if n >= 2 and all(ints[i + 1] == ints[i] + 1 for i in range(n - 1)):
        return False
    return True


def contiguous_segments(row_count: int, rows: list[list[str]]) -> list[tuple[int, int]]:
    """Inclusive start, exclusive end indices into rows (0..row_count-1)."""
    segs: list[tuple[int, int]] = []
    i = 0
    while i < row_count:
        fc = rows[i][COL_FLOW].strip()
        j = i + 1
        while j < row_count and rows[j][COL_FLOW].strip() == fc:
            j += 1
        segs.append((i, j))
        i = j
    return segs


def renumber_gap_segments(rows: list[list[str]]) -> None:
    """Mutates rows[*][COL_D] where contiguous same-flow D has gaps or non-1..n."""
    n = len(rows)
    for i, j in contiguous_segments(n, rows):
        block = rows[i:j]
        d_vals = [parse_d(r[COL_D]) for r in block]
        if not segment_should_renumber_d(d_vals):
            continue
        for k, r in enumerate(block):
            r[COL_D] = str(k + 1)


def sync_step_e(e_text: str, d_num: str) -> str:
    d = (d_num or "").strip()
    if not d:
        return e_text
    if not e_text or "step" not in e_text.lower():
        return e_text

    def repl(m: re.Match[str]) -> str:
        return f"{m.group(1)}{d}{m.group(2)}"

    return STEP_PREFIX.sub(repl, e_text, count=1)


def main() -> int:
    base = Path(__file__).resolve().parents[1]
    src = base / "補充資料" / "財產管理" / "asset_management_flow_提供盈瑋 (reorder)_revised.csv"
    dst = base / "補充資料" / "財產管理" / "asset_management_flow_提供盈瑋 (reorder)_finalized.csv"
    if len(sys.argv) >= 2:
        src = Path(sys.argv[1])
    if len(sys.argv) >= 3:
        dst = Path(sys.argv[2])

    if not src.exists():
        print(f"Missing: {src}", file=sys.stderr)
        return 1

    with src.open(encoding="utf-8-sig", newline="") as f:
        rows = list(csv.reader(f))

    if not rows:
        print("Empty CSV", file=sys.stderr)
        return 1

    header = rows[0]
    if len(header) <= COL_E:
        print("Unexpected header width", file=sys.stderr)
        return 1

    data = rows[1:]
    for row in data:
        while len(row) < len(header):
            row.append("")

    renumber_gap_segments(data)

    out_rows = [header]
    for row in data:
        row[COL_E] = sync_step_e(row[COL_E], row[COL_D])
        out_rows.append(row)

    dst.parent.mkdir(parents=True, exist_ok=True)
    with dst.open("w", encoding="utf-8-sig", newline="") as f:
        csv.writer(f).writerows(out_rows)

    print(f"Wrote {dst} ({len(out_rows) - 1} data rows)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
