# -*- coding: utf-8 -*-
"""非財產管理：name 以 MAX 字元為目標；先於 ，/； 切分，尾段併入 description。"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONST = ROOT / "src" / "constants.ts"
# w-80 約 320px、標題 15px，單行安全約 22 字元內（含 Step n:）
MAX = 22

# 無法靠句讀切到 ≤MAX 時的手動精簡（id -> (name, 併入說明)）
OVERRIDES: dict[str, tuple[str, str | None]] = {
    "exp01-4": (
        "Step 4: 依核定路徑辦理採購",
        "詢/比/議/通訊/公開招標，完成比選/決標",
    ),
    "exp02-1": (
        "Step 1: 送件一般費用或 E 單報銷",
        "iService＋紙本、黏貼憑證用紙",
    ),
    "exp02-2": (
        "Step 2: 審核層級與程序合規",
        "6 萬以下組長；逾 80 萬得秘書長授權主辦會計。異常簽報秘書長",
    ),
    "exp02-3": (
        "Step 3: 企財審金額與憑證",
        "核准、科目、內容、宴客/贈禮扣抵 9 等",
    ),
    "exp02-7": (
        "Step 7: 通過後編支出傳票(類2)",
        "併行 EXP01 傳票檢查/過帳",
    ),
    "ar02-4": (
        "Step 4: 帳表與銀行餘額一致",
        "資產負債、收支餘絀、帳戶餘額最終確認",
    ),
    "ar02-22": (
        "Step 22: 財務與人事薪資核對",
        "系統明細、扣繳與薪資是否一致",
    ),
    "vat01-24": (
        "Step 24: 各單位產生媒體",
        "資料完整後、憑證產生、光碟存檔",
    ),
    "gl01-15": (
        "Step 15: 現金期初期末勾稽",
        "資負現金、流量表、兩期差異；差大查分錄",
    ),
    "trv02-4": (
        "Step 4: 列印公出人員申請表",
        "送主管、人事單位核准",
    ),
    "trv02-10": (
        "Step 10: 公膳情況表勾選",
        "早/中/晚、外館/公務宴請等供應",
    ),
    "trv02-11": (
        "Step 11: 報銷明細實支",
        "交通/保險/展用品等",
    ),
}


def esc_ts(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def merge_desc(old: str | None, tail: str) -> str:
    t = tail.strip()
    if not t:
        return (old or "").strip()
    if not old or not str(old).strip():
        return t
    o = str(old).strip()
    if t in o or o in t:
        return o
    return f"{t}；{o}"


def try_split_name(name: str) -> tuple[str, str] | None:
    m = re.match(r"^(Step \d+:\s*)(.+)$", name)
    if not m:
        return None
    pre, body = m.group(1), m.group(2)
    for sep in ("，", "；", "、", "："):
        if sep in body:
            a, b = body.split(sep, 1)
            a, b = a.strip(), b.strip()
            if not a or not b:
                continue
            cand = pre + a
            if len(cand) <= MAX:
                return cand, b
    return None


def process_line(line: str, current_cat: str) -> str:
    if current_cat == "財產管理":
        return line
    if "name: 'Step " not in line and "name: 'Step" not in line:  # Step 1-9
        if "name: 'Step" not in line:
            return line
    if ", role:" not in line and ", role: " not in line:
        return line
    if "name: '" not in line:
        return line

    m_id = re.search(r"id: '([^']+)'", line)
    m_name = re.search(r"name: '((?:\\'|[^'])*)'", line)
    if not m_name or not m_id:
        return line
    step_id = m_id.group(1)
    name_raw = m_name.group(1).replace("\\'", "'")

    m_desc = re.search(
        r"description: '((?:\\'|[^'])*)'(?=,\s*role:)", line
    )
    desc_raw: str | None
    if m_desc:
        desc_raw = m_desc.group(1).replace("\\'", "'")
    else:
        desc_raw = None

    if len(name_raw) <= MAX:
        return line

    if step_id in OVERRIDES:
        new_name, extra = OVERRIDES[step_id]
        new_desc = (
            merge_desc(desc_raw, extra) if extra else desc_raw
        ) or ""
    else:
        sp = try_split_name(name_raw)
        if not sp:
            return line
        new_name, tail = sp
        new_desc = merge_desc(desc_raw, tail)

    if m_desc:
        line = re.sub(
            r"name: '((?:\\'|[^'])*)'",
            f"name: '{esc_ts(new_name)}'",
            line,
            count=1,
        )
        line = re.sub(
            r"description: '((?:\\'|[^'])*)'(?=,\s*role:)",
            f"description: '{esc_ts(new_desc)}'",
            line,
            count=1,
        )
    else:
        line = re.sub(
            r"name: '((?:\\'|[^'])*)', role:",
            f"name: '{esc_ts(new_name)}', description: '{esc_ts(new_desc)}', role:",
            line,
            count=1,
        )
    return line


def main() -> None:
    text = CONST.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    cat: str | None = None
    for line in lines:
        cm = re.search(r"category:\s*'([^']+)'", line)
        if cm:
            cat = cm.group(1)
        if cat and cat != "財產管理":
            line = process_line(line, cat)
        out.append(line)
    CONST.write_text("".join(out), encoding="utf-8")
    print("OK", CONST)


if __name__ == "__main__":
    main()
