# -*- coding: utf-8 -*-
import re
from pathlib import Path

CONST = Path(__file__).resolve().parent.parent / "src" / "constants.ts"
OUT = Path(__file__).resolve().parent / "_long_names.txt"
# w-80 卡片單行約 20～22 全形字（含 Step n: 前綴），嚴一點掃 22
MAX = 22

def main() -> None:
    text = CONST.read_text(encoding="utf-8")
    lines = text.splitlines()
    cat: str | None = None
    name_re = re.compile(r"name: '((?:\\'|[^'])*)'")
    rows: list[str] = []
    for i, line in enumerate(lines, 1):
        cm = re.search(r"category:\s*'([^']+)'", line)
        if cm:
            cat = cm.group(1)
        if not cat or cat == "財產管理":
            continue
        if "name: '" not in line:
            continue
        m = name_re.search(line)
        if not m:
            continue
        raw = m.group(1).replace("\\'", "'")
        if len(raw) > MAX:
            rows.append(f"{i}\t{len(raw)}\t{raw}")
    OUT.write_text("\n".join(rows) + ("\n" if rows else ""), encoding="utf-8")
    print(len(rows), "lines >", MAX)

if __name__ == "__main__":
    main()
