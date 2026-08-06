# -*- coding: utf-8 -*-
"""For non-財產 steps: if no description and name is long, split at first ， or ； after char 8.

門檻說明：舊版用 len>52，收款/營業稅/預算多數步驟在 40～50 字仍偏長，故預設改為 >=MIN_LEN（40）。
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONST = ROOT / "src" / "constants.ts"
# 全形句讀；不含頓號「、」避免在列舉中誤切
SPLITTERS = ("，", "；")
MIN_LEN = 40

def esc_ts(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")

def main() -> None:
    lines = CONST.read_text(encoding="utf-8").splitlines(keepends=True)
    out: list[str] = []
    current_cat: str | None = None
    cat_re = re.compile(r"category:\s*'([^']+)'")

    for line in lines:
        cm = cat_re.search(line)
        if cm:
            current_cat = cm.group(1)

        if (
            current_cat
            and current_cat != "財產管理"
            and "name: '" in line
            and "description:" not in line
        ):
            m = re.search(r"name: '(.+)', role:", line)
            if m:
                raw = m.group(1).replace("\\'", "'")
                if len(raw) >= MIN_LEN:
                    candidates: list[int] = []
                    for sep in SPLITTERS:
                        p = raw.find(sep, 8)
                        if p != -1:
                            candidates.append(p)
                    if candidates:
                        idx = min(candidates)
                        base = raw[:idx].rstrip("，；").rstrip()
                        desc = raw[idx + 1 :].lstrip()
                        if len(base) >= 12 and len(desc) >= 6:
                            line = re.sub(
                                r"name: '(.+)', role:",
                                f"name: '{esc_ts(base)}', description: '{esc_ts(desc)}', role:",
                                line,
                                count=1,
                            )
        out.append(line)

    CONST.write_text("".join(out), encoding="utf-8")
    print("OK comma split")

if __name__ == "__main__":
    main()
