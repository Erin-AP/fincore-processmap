# -*- coding: utf-8 -*-
"""Split long step names: content inside fullwidth （ ） -> description. Skip 財產管理."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONST = ROOT / "src" / "constants.ts"

def split_name(full: str) -> tuple[str, str | None]:
    if "（" not in full or "）" not in full:
        return full, None
    i = full.find("（")
    j = full.rfind("）")
    if j <= i:
        return full, None
    base = full[:i].rstrip()
    desc = full[i + 1 : j].strip()
    if not base or not desc:
        return full, None
    return base, desc

def esc_ts(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")

def main() -> None:
    text = CONST.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    current_cat: str | None = None
    cat_re = re.compile(r"category:\s*'([^']+)'")
    name_role_re = re.compile(r"^(?P<prefix>[\s]*\{ id: '[^']*', )name: '(?P<name>[^'\\]*(?:\\.[^'\\]*)*)'(?P<rest>, role:.*)$")

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
                base, desc = split_name(raw)
                if desc is not None:
                    new_name = esc_ts(base)
                    new_desc = esc_ts(desc)
                    line = re.sub(
                        r"name: '(.+)', role:",
                        f"name: '{new_name}', description: '{new_desc}', role:",
                        line,
                        count=1,
                    )
        out.append(line)

    CONST.write_text("".join(out), encoding="utf-8")
    print("OK:", CONST)

if __name__ == "__main__":
    main()
