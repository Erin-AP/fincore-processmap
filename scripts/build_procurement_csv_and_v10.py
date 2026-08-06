# -*- coding: utf-8 -*-
"""讀取 scripts/_scenarios_export.json，產出 請購報銷流程.csv 與 ProcessMap_v10.html。"""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "scripts" / "_scenarios_export.json"
CSV_PATH = ROOT / "請購報銷流程.csv"
HTML_PATH = ROOT / "ProcessMap_v10.html"

PROCUREMENT_CATS = ("請購報銷(台幣)", "請購報銷(外幣)")

CSV_HEADER = [
    "流程代碼",
    "模組分類",
    "流程名稱",
    "流程完整名稱",
    "步驟序號",
    "步驟標示",
    "步驟名稱",
    "步驟說明",
    "執行角色",
    "輸入資料",
    "輸出資料",
    "系統/工具",
    "來源依據",
    "來源依據_1",
    "來源依據_2",
    "來源依據_3",
    "會議筆記",
    "待確認事項",
]


def step_num_from_name(name: str) -> int:
    m = re.match(r"Step\s*(\d+)\s*:", name, re.I)
    return int(m.group(1)) if m else 0


def short_flow_name(title: str) -> str:
    # "EXP01 國內請購..." -> "國內請購..."
    parts = title.split(" ", 1)
    return parts[1] if len(parts) > 1 else title


def step_short_name(full_name: str) -> str:
    m = re.match(r"Step\s*\d+\s*:\s*(.+)", full_name, re.I)
    return m.group(1).strip() if m else full_name


def build_csv(payload: dict) -> None:
    rows: list[list[str]] = []
    data = payload["data"]
    for cat in PROCUREMENT_CATS:
        for scenario in data.get(cat, []):
            code = scenario["id"]
            full_title = scenario["title"]
            flow_short = short_flow_name(full_title)
            for st in scenario["steps"]:
                n = step_num_from_name(st["name"])
                desc = (st.get("description") or "").strip()
                srcs: list[str] = st.get("sources") or []
                joined = "、".join(srcs)
                src_pad = (srcs + ["", "", ""])[:3]
                rows.append(
                    [
                        code,
                        cat,
                        flow_short,
                        full_title,
                        str(n),
                        st["name"],
                        step_short_name(st["name"]),
                        desc,
                        st["role"],
                        st["input"],
                        st["output"],
                        st["system"],
                        joined,
                        src_pad[0],
                        src_pad[1],
                        src_pad[2],
                        "",
                        "",
                    ]
                )
    with CSV_PATH.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(CSV_HEADER)
        w.writerows(rows)
    print("Wrote", CSV_PATH, "rows", len(rows))


def build_html(payload: dict) -> None:
    categories: list[str] = payload["categories"]
    data_js = json.dumps(payload["data"], ensure_ascii=False)
    categories_js = json.dumps(categories, ensure_ascii=False)
    # 避免 </script> 截斷 HTML
    data_js = data_js.replace("</script>", "<\\/script>")
    categories_js = categories_js.replace("</script>", "<\\/script>")

    template = """<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>全週期作業流程系統地圖 v10（九大模組）</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .step-card { min-height: 260px; transition: all 0.2s ease; position: relative; }
        .step-card:hover { border-color: #3b82f6; transform: translateY(-2px); }
        .source-tags { position: absolute; bottom: 8px; right: 8px; display: flex; flex-wrap: wrap; gap: 4px; max-width: 90%; justify-content: flex-end; }
        .tab-btn.active { background-color: #2563eb; color: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); transform: scale(1.05); }
    </style>
</head>
<body class="bg-slate-100 p-8">
    <header class="mb-8 border-l-8 border-blue-600 pl-6">
        <h1 class="text-3xl font-black text-slate-800 uppercase tracking-tight">全週期作業流程系統地圖</h1>
        <p class="text-lg text-slate-500 font-medium mt-1">v10 · 九大模組 · 含步驟說明（與 React 地圖 constants 同步匯出）</p>
    </header>

    <nav id="category-nav" class="flex flex-wrap gap-2 mb-10 bg-white p-3 rounded-xl shadow-sm border border-slate-200 sticky top-4 z-50"></nav>

    <div id="main-content" class="min-h-[600px]"></div>

    <script id="embedded-data" type="application/json">__DATA_JSON__</script>
    <script id="embedded-cats" type="application/json">__CATS_JSON__</script>
    <script>
        const DATA = JSON.parse(document.getElementById('embedded-data').textContent);
        const CATEGORIES = JSON.parse(document.getElementById('embedded-cats').textContent);

        function esc(s) {
            if (s == null || s === '') return '';
            const d = document.createElement('div');
            d.textContent = s;
            return d.innerHTML;
        }

        function renderContent(category) {
            const container = document.getElementById('main-content');
            container.innerHTML = '';

            const scenarios = DATA[category];

            if (!scenarios || scenarios.length === 0) {
                container.innerHTML = `
                    <div class="bg-white rounded-2xl p-24 border-4 border-dashed border-slate-200 text-center">
                        <h3 class="text-2xl font-black text-slate-400 mb-3">「${esc(category)}」尚無資料</h3>
                    </div>`;
                return;
            }

            scenarios.forEach((scenario) => {
                const section = document.createElement('div');
                section.className = 'grid grid-cols-[minmax(180px,220px)_1fr] bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8';

                const stepsHtml = scenario.steps.map((step, idx) => {
                    const descBlock = step.description
                        ? `<div class="text-[13px] text-slate-600 leading-relaxed mt-2 pt-2 border-t border-slate-100"><span class="text-[10px] font-bold text-slate-400 uppercase">步驟說明</span><div class="mt-1 font-medium">${esc(step.description)}</div></div>`
                        : '';
                    const tags = (step.sources || []).map((s) => {
                        const cls = s === 'SOP' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            s === '1st訪談' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                            'bg-emerald-100 text-emerald-700 border-emerald-200';
                        return `<span class="text-[10px] px-2 py-1 rounded font-black uppercase border ${cls}">${esc(s)}</span>`;
                    }).join('');

                    return `
                    <div class="flex items-center flex-shrink-0">
                        <div class="w-96 max-w-[min(24rem,92vw)] bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col step-card shadow-sm">
                            <div class="mb-3 border-b-2 border-slate-200 pb-3">
                                <div class="text-[17px] font-black text-blue-600 uppercase tracking-tight leading-snug break-words">${esc(step.name)}</div>
                                ${descBlock}
                            </div>
                            <div class="space-y-4 mb-6">
                                <div class="flex flex-col">
                                    <span class="text-[11px] font-bold text-slate-400 uppercase mb-1">輸入資料</span>
                                    <span class="text-[14px] text-slate-700 font-semibold leading-relaxed break-words">${esc(step.input || '無')}</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-[11px] font-bold text-slate-400 uppercase mb-1">輸出資料</span>
                                    <span class="text-[14px] text-slate-700 font-semibold leading-relaxed break-words">${esc(step.output || '無')}</span>
                                </div>
                            </div>
                            <div class="mt-auto space-y-3 pb-8">
                                <div class="flex flex-col bg-white p-3 rounded-lg border-2 border-slate-100">
                                    <div class="flex justify-between items-center mb-2 gap-2">
                                        <span class="text-[10px] font-bold text-slate-400 uppercase shrink-0">系統 / 工具</span>
                                        <span class="text-[12px] text-blue-700 font-black text-right break-words">${esc(step.system || '-')}</span>
                                    </div>
                                    <div class="flex justify-between items-center gap-2">
                                        <span class="text-[10px] font-bold text-slate-400 uppercase shrink-0">執行角色</span>
                                        <span class="text-[12px] text-slate-600 font-bold text-right break-words">${esc(step.role || '-')}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="source-tags">${tags}</div>
                        </div>
                        ${idx < scenario.steps.length - 1 ? '<div class="mx-4 sm:mx-6 text-slate-300 font-black text-3xl shrink-0">→</div>' : ''}
                    </div>`;
                }).join('');

                section.innerHTML = `
                    <div class="bg-slate-800 text-white flex items-center justify-center text-center p-6 sm:p-8 font-black text-base sm:text-lg leading-tight tracking-tight uppercase border-r-4 border-blue-600 break-words">${esc(scenario.title)}</div>
                    <div class="flex items-stretch p-6 sm:p-10 gap-2 overflow-x-auto no-scrollbar bg-white">${stepsHtml}</div>`;
                container.appendChild(section);
            });
        }

        function switchCategory(index) {
            document.querySelectorAll('.tab-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
            renderContent(CATEGORIES[index]);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const nav = document.getElementById('category-nav');
            CATEGORIES.forEach((cat, idx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'tab-btn px-5 py-3 rounded-lg font-black text-sm uppercase transition-all duration-200 hover:bg-blue-50 text-slate-600';
                btn.textContent = cat;
                btn.addEventListener('click', () => switchCategory(idx));
                nav.appendChild(btn);
            });
            switchCategory(0);
        });
    </script>
</body>
</html>
"""
    html_out = template.replace("__DATA_JSON__", data_js).replace("__CATS_JSON__", categories_js)

    HTML_PATH.write_text(html_out, encoding="utf-8")
    print("Wrote", HTML_PATH)


def main() -> None:
    if not JSON_PATH.is_file():
        raise SystemExit(f"Missing {JSON_PATH}; run: npx tsx scripts/dump-scenarios.ts")
    payload = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    build_csv(payload)
    build_html(payload)


if __name__ == "__main__":
    main()
