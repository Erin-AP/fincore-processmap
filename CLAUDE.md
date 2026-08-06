# [流程] 全週期作業流程系統地圖 — Claude 指引

> 先讀根層 `../CLAUDE.md`（專案總導航），再讀本文件。
> 最後更新：**2026-08-05**（取代 `CLAUDE_ProcessMap.md`、`README.md`、`HANDOFF_README.md` 三份舊說明檔）

---

## 1. 這個資料夾是什麼

財務系統改版專案的**流程盤點主工作區**。目標：盤點 8 大模組的 AS-IS 現況流程，作為 TO-BE 系統規劃依據。

兩個核心產物：

| 產物 | 角色 |
|---|---|
| **模組 xlsx**（`補充資料/{模組}/`） | 流程步驟的**結構化文字工作檔**，Q 欄放會議筆記。這是真正的工作主檔 |
| **ProcessMap HTML** | 給利害關係人看的**視覺化看板**，整合 SOP／第一次訪談／補充資料三來源標記 |

**流程地圖的價值主張**：每個步驟都標明來源，可清楚看出「SOP 少了很多步驟」——大量流程靠人工維運、未標準化。這個事實本身就是提案最有力的論據。

**現況階段**：Phase 2 第二階段用戶訪談，6/8 模組已完成。

---

## 2. 八大模組與進度（2026-08-05）

> ⚠️ 舊文件寫「九大模組」。原「收款」與「票據」已合併為單一「收款票據」模組（xlsx／ProcessMap／`constants.ts` 皆已同步合併後結構），**現為 8 大模組**。

<!-- AUTO:module-table:start -->
<!-- ⚠️ 本表由 _scripts/sync_docs.py 自動產生，請勿手動編輯；要改內容請改來源檔案或 _state/manual.json -->

| # | 模組 | Scenario ID | 第二階段訪談 | xlsx 最新版 | AS-IS 文件 |
|---|---|---|---|---|---|
| 1 | 財產管理 FA | A01–A08 | ✅ 2 場（05-07、05-11） | ✅ `_v7` | ✅ v1.0（08-04） |
| 2 | 請購報銷 EXP | EXP01–EXP06 | ✅ 2 場（07-16、07-22） | ✅ `_v7` | ✅ v1.0（08-04） |
| 3 | 預算管理 BUD | BUD01–BUD03 | ✅ 07-07 | ✅ `_v1` | ✅ v1.0（08-04） |
| 4 | 收款票據 AR.BIL | AR01–AR09、BIL01–BIL14 | ✅ 3 場（07-24、07-29 ×2） | ⚠️ `_v3` 落後最新訪談 | ⛔ 暫緩（等 xlsx） |
| 5 | 出納作業 TRS | TRS01–TRS06 | ⚠️ 07-16（僅資料校正，無專場訪談） | ✅ `_v3` | ⚠️ v1.0 待補充版（08-04） |
| 6 | 營業稅 VAT | VAT01–VAT02 | ✅ 07-28 | ✅ `_v1` | ✅ v1.0（08-04） |
| 7 | 總帳 GL | GL01–GL04 | ⛔ 尚未訪談 | `_v1` 基準版 | ⛔ 待訪談 |
| 8 | 差旅 TRV | TRV01–TRV02 | ⛔ 尚未訪談 | `_v1` 基準版 | ⛔ 待訪談 |

**進度**：訪談 6/8 模組完成、AS-IS 文件 5 份（4 份正式初稿 + 1 份待補充版）；ProcessMap 最新版 `processmap_v20.html`。
<!-- AUTO:module-table:end -->

**每完成一個模組，回來更新這張表。**

### 兩個容易誤判的點

1. **出納作業 TRS 沒有專場訪談。** 2026-07-16 那場逐字稿實際主題是請購報銷（EXP）台幣/外幣付款，只做了 SOP/xlsx 校正驗證，未做 TRS 專屬痛點盤點（逐字稿結尾明講「下一次就是討論出納作業」）。已全文檢索《第二次訪談-付款+出納作業.docx》確認無 TRS 相關段落。
2. **差旅 TRV 的 SOP 已經有了。** 舊文件寫「差旅缺 SOP」是 2026-05 的狀態；`補充資料/8. 差旅 TRV/SOP/` 底下已有 5 份 KM 作業程序（2026-06-18 補齊）。TRV 目前只缺訪談。

---

## 2.5 ⚠️ 檔案分屬兩個位置（2026-08-05 遷移）

程式部分已（或即將）從 OneDrive 遷出，原因：`node_modules`（1,335+ 檔）在 OneDrive 同步資料夾裡
會造成同步負擔、路徑長度超限、以及 npm 與 OneDrive 搶檔案（`npm run build` 會因
`EPERM: operation not permitted, unlink` 失敗）。

| 內容 | 位置 |
|---|---|
| `src/constants.ts`、`scripts/`、`package.json`、`vite.config.ts`、`node_modules/`、`.git` | **`C:\dev\fincore-processmap`** |
| `補充資料/`（xlsx、SOP、raw data，同事共用） | **OneDrive**（本資料夾） |
| `processmap_v{N}.html` + `attachments/` | **兩邊都有**（開發目錄供 git；OneDrive 供同事開啟） |

**先檢查 `C:\dev\fincore-processmap` 是否存在**來判斷遷移是否已完成。未遷移時全部都在本資料夾。

開發目錄裡的 `補充資料/` 是掛回 OneDrive 的 **directory junction**，所以 `scripts/*.py` 讀
`補充資料/…` 的相對路徑完全不用改。它已加入 `.gitignore`，不進版控。

### 產生新版 ProcessMap 後一定要發佈回 OneDrive

```powershell
powershell -ExecutionPolicy Bypass -File "..\_scripts\publish-processmap.ps1"
```

- **必須保留版號檔名** —— 同事的習慣是直接開 OneDrive 資料夾找版號最大的那個檔，
  改成固定的 `processmap.html` 他們就分不出哪個是最新的。
- **`attachments/` 要一起同步** —— 彈窗附件靠相對路徑載入，漏掉彈窗會壞。
- OneDrive 只需保留最新 1–2 版（`-KeepInOneDrive 2`），舊版由 git 保存。

### 相關腳本

| 腳本 | 用途 |
|---|---|
| `../_scripts/遷移_階段AB.ps1` | 一次性：複製程式部分到 `C:\dev`、建 junction、git init、驗證建置 |
| `../_scripts/publish-processmap.ps1` | 日常：把最新版 ProcessMap + attachments 發佈回 OneDrive |
| `../_scripts/sync_docs.py` | 日常：把各文件的「ProcessMap 最新版」等區塊自動更新 |

> ⚠️ **這些 `.ps1` 必須以 UTF-8 with BOM 儲存。** Windows PowerShell 5.1 讀沒有 BOM 的 UTF-8
> 會用 cp950/Big5 解碼，中文全變亂碼並引發語法錯誤。用編輯器改過要保留 BOM，或改用 `pwsh`（PowerShell 7）執行。

---

## 3. 檔案結構

```
[流程] 全週期作業流程系統地圖_Cursor/
├── CLAUDE.md                    ← 本文件
├── processmap_v20.html          ← 🎯 現行最新視覺化看板
├── ProcessMap_v0..v18.html      ← 歷史版本（大寫）
├── processmap_v19.html          ← 歷史版本（v19 起改小寫）
├── src/
│   ├── constants.ts             ← 🎯 資料主檔（SCENARIOS / CATEGORIES）
│   ├── App.tsx / main.tsx / types.ts / index.css
├── attachments/
│   └── 採購付款流程圖.html        ← ProcessMap 彈窗附件（EXP01 金額門檻決策表）
├── scripts/                     ← 流程資料處理 Python / TS 腳本
├── 補充資料/                     ← 各模組 raw data（詳見 補充資料/CLAUDE.md）
├── _backup/                     ← 手動日期備份（constants.ts / ProcessMap v17）
├── node_modules/                ← 建議排除 OneDrive 同步（1,335+ 檔案）
└── package.json / vite.config.ts / tsconfig.json / .gitignore
```

**已淘汰的說明檔**（內容已併入本文件，可移除）：
- `README.md`（550B）— AI Studio 產生的樣板，內容與本專案實務無關
- `HANDOFF_README.md` — 接力手冊，其中仍有效的規範已收錄於下方第 6 節
- `CLAUDE_ProcessMap.md` — 本文件的前身

---

## 4. 技術規格

| 面向 | 內容 |
|---|---|
| Frontend | React（Vite）+ TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| 資料來源 | `src/constants.ts`（定義所有 `SCENARIOS` 與 `CATEGORIES`） |
| 匯出 | 可導出單一 HTML（`processmap_v{N}.html`），內含全部邏輯與 CSS，可直接開瀏覽器、便於分享 |
| 版控 | git（在 `C:\dev\fincore-processmap`）。遷移前本資料夾沒有 `.git`，只能靠檔名做版控——那是 21 個 ProcessMap HTML 並存的根因 |

### UI 關鍵設置

- 字體：步驟卡片標題 `15px`、內容 `13px`、標籤 `11px`（針對大螢幕可讀性優化）
- 角色／系統區塊使用 `shadow-inner` + `bg-slate-50` 對比
- **來源標籤**固定展示於卡片右下角：`Amber` = SOP、`Indigo` = 1st訪談、`Emerald` = 補充資料

---

## 5. 檔案命名規範

| 類型 | 格式 | 範例 |
|---|---|---|
| ProcessMap | `processmap_v{N}.html`（**v19 起使用者指定改小寫**，沿用小寫直到另行指示） | `processmap_v20.html` |
| 模組 xlsx | `{模組}流程_v{N}.xlsx` | `請購報銷EXP流程_v7.xlsx` |
| 財產管理 xlsx（歷史例外） | `asset_management_flow_{phase}_v{N}.xlsx` | `asset_management_flow_after2ndinterview_v7.xlsx` |
| 訪談文件（存 Vault） | `{模組}_{ScenarioID}_{文件類型}_{YYYYMMDD}.md` | `財產管理_A03_A07_UX診斷摘要表_20260511.md` |
| ScenarioID 連接 | 兩個用串接（`A01A02`）；多個或範圍用底線（`A03_A07`） | |
| 版號規則 | xlsx 訪談後遞增（v5→v6→v7）；ProcessMap 同步遞增 | |

### ⚠️ AS-IS 文件版號規則（已修正，以此為準）

| 版號 | 意義 |
|---|---|
| **v1.0** | **訪談後**的正式綜合文件 |
| v1.1 / v2.0 | 跨部門確認、或新一輪訪談後的修訂版 |

> 本文件前身（`CLAUDE_ProcessMap.md`）曾寫「v1.0 = 訪談前草稿、v2.0 = 訪談後修訂」，**該規則已於 2026-08-04 廢止**。訪談前的草稿角色改由 xlsx `_v0`（`flow-update-xlsx-processmap` Mode A）承擔。權威定義見 `Obsidian Vault/CLAUDE.md`。

---

## 6. 資料邏輯規範

### ID 編碼

- **財產管理**：維持原始 `A01`–`A08` 編號，步驟與 CSV 100% 同步
- **其餘模組**：兩碼制（`EXP01`、`AR01`、`BIL01`、`BUD01`、`TRS01`、`VAT01`、`GL01`、`TRV01`）

### 步驟邏輯

- **拒絕摘要**：每一個動作都必須拆解為獨立的 Step Card
- **流水編號**：每個情境內的 Step 必須從 1 開始連續編號，**嚴禁跳號**
- **串聯故事**：允許將多個相關的原始 Interview ID 串聯在同一個 Scenario 橫軸上

### 已標註之 SOP 來源代號

| 代號 | 內容 |
|---|---|
| 總一 | 消耗品申領程序 |
| 總二 | 因公出國機票採購規章（政二團隊負責） |
| 總六 | 宴請來賓單據報銷規範 |
| 總九 | 採購權限層級 |
| 會一／會二／會六 | 財會組帳務處理／週轉金收支報銷／費用報銷付款 |
| 納一～納六 | 出納組薪給／收款／結購外匯／存款調撥／月報銀行調節／稅捐申報 |

---

## 7. 標準循環（每個模組）

```
訪談前  ①素材蒐集（SOP + 補充資料 + swimlane）
        ②flow-update-xlsx-processmap (Mode A) → xlsx _v0 + ProcessMap 更新
        ③確認草稿，安排訪談
訪談當天 ④用戶訪談（Teams 錄音自動轉逐字稿）
訪談後  ⑤interview-workflow → UX診斷摘要表 + 訪談紀錄&分析（存 Obsidian Vault）
        ⑥flow-update-xlsx-processmap (Mode B) → 讀 Q 欄標記 → xlsx _vN+1 + ProcessMap 同步
        ⑦asis-process-doc → AS-IS v1.0（存 Obsidian Vault/AS-IS流程/{模組}/）
累積後  ⑧asis-tobe-gap（待建立）→ Gap 分析
```

**⑦ 不用等跨部門確認會議，也不用等 8 模組全部訪談完。** 條件是「該模組訪談完成 **且** xlsx 已同步該場訪談」。

---

## 8. 慣例與踩過的坑

- **xlsx 顏色標示**：藍=代碼重編、黃=欄位修改、綠=新增列、紅=刪除（v6 起改物理刪除，不再保留紅標列）
- **O / Q 欄筆記**：xlsx 更新完成後由 Claude 清空（已納入流程）
- **收款票據 xlsx 有兩個分頁**（`流程步驟` + `訪談順序(0723版本)`）：讀取務必指定 `wb["流程步驟"]`，**不要用 `wb.active`**——使用者在 Excel 切換分頁後儲存會讓 `active` 跟著跑掉，之前就因此誤判過「Q 欄沒有標記」
- **`src/constants.ts` 必須與 xlsx／ProcessMap 同步**：Mode B 套用完後同步改對應模組的 `SCENARIOS`／`CATEGORIES`，改完務必跑 `tsc --noEmit` 驗證（xlsx 儲存格若含換行符號，塞進 TS 單引號字串前要先清成單行，否則語法會斷掉）
- **ProcessMap 內嵌彈窗附件機制**（2026-07-28 新增）：`processmap_v20.html` 內建 `ATTACHMENT_LINKS` 對照表 + `linkify()` / `openAttachment()` / `closeAttachment()`，可把步驟說明裡的關鍵字變成連結，點擊彈出小視窗用 iframe 載入 `attachments/` 底下的附件 HTML。Mode A/B 重新產生 ProcessMap 時只替換 `embedded-data` 那個 script tag，這段 modal/JS 不會被動到，但**手動大改版時要留意別誤刪**
- **OneDrive 寫檔**：bash 的 `cat >` 重複寫同一個檔會卡 Permission Denied，改用 Python `shutil.copy()`
- **ProcessMap 的 `system` 欄位才是顯示用的**，`tool` 欄位為備用欄位
- **斷點清單不要「優化掉」**：AS-IS 文件中刻意保留跨系統人工搬資料的步驟，那是 TO-BE 需求與效益簡報的核心證據
- **A02 後段（Step 6–9）與 A01 Step 10–13 對應**，工具改為 APF2900

---

## 9. 術語表

| 詞彙 | 說明 |
|---|---|
| **FAR / FAF / GLF / APF** | 財產／總帳／應付系統前綴。**統一用 FAR**（v6 起，包含 Report module） |
| **iService** | 內部請購系統 |
| **文案系統** | 內部公文／變簽系統 |
| **變簽** | 文案系統內的公文（逐字稿常轉錯字成「變遷」） |
| **i 購單 / 變簽** | 業務單位發起財產異動的兩種途徑（i 購 = 採購；變簽 = 報廢／移轉） |
| **關貿** | 「關貿網路」公司——國有財產系統的承包／維運單位 |
| **貿易署** | 經濟部國際貿易署，貿協的主管機關，每月需提報國有財產報表 |
| **基金財產 vs 本會財產** | 基金財產需先發函貿易署同意才能報廢；本會財產可逕自處理 |
| **有形 vs 無形財產** | 有形走關貿國有財產系統；無形走 Excel 手 key + 5 張固定資產累計折舊表 |
| **四聯單** | 財產移動單一式四份，給移出單位、接收單位、行政處、器材處各一 |
| **API 串接** | 國有財產系統目前是單機版，未來改 API（關貿端說「預計 2026 Q3」） |

---

## 10. 跨單位窗口

| 單位 | 角色 | 接觸點 |
|---|---|---|
| **IT（簡哥）** | 財產系統維運、API 串接 | 系統規格、UI 邏輯確認 |
| **預算處** | 預算規則 | 跨年度預算 key 法 |
| **器材處** | 採購驗收 | 財產單蓋章、跨年度預算 |
| **貿易署** | 主管機關 | 月報、基金財產同意函、紙本/電子公文眉角 |
| **關貿網路** | 國有財產系統承包 | API 串接時程確認 |
| **各場館** | 世貿、台中會展、各駐外 | 折舊 6 帳本分別處理 |

### 訪談逐字稿判讀提醒

逐字稿是 Teams 自動轉錄、單一麥克風收音，**講者要靠語意／角色／稱呼校正**，可能只錄到主持人一方的聲音，受訪者回應需依語意重建，整理時要標記不確定處。角色語境見根層 `../CLAUDE.md` 第 7 節。

---

## 11. Project-Level Pending Items

訪談中累積、需跨單位處理或下次訪談確認的事項：

| # | 項目 | 來源 | 優先 |
|---|---|---|---|
| P1 | 國有財產系統 API / 網頁版上線時程確認（關貿端說預計 2026 Q3） | A03–A07 | 高 |
| P2 | 跨年度預算（3 年計畫）分開 key 的官方規則 | A03–A07 | 高 |
| P3 | A01/A02 待確認清單對照表（麗美承諾整理） | A03–A07 收尾 | 中 |
| P4 | A04「行政處確認」UI 按鈕跳過會發生什麼（麗美實測 + 簡哥確認） | A03–A07 | 中 |
| P5 | 駐外單位發起報廢／移轉的紙本傳遞細節 | A03–A07 | 中 |
| P6 | 「物品／消耗品／非消耗品」三分類在系統的對應欄位 | A03–A07 | 中 |
| P7 | A07 增減值實際發生頻率（從歷史資料統計） | A03–A07 | 低 |
| P8 | 無形財產月報 5 張表格式（簡哥沿用幾十年版本）貿易署是否仍接受 | A03–A07 | 低 |
| P9 | 商標權資料財產化的窗口歸屬（跟秘書組確認） | A03–A07 | 低 |
| P10 | 收款票據 BIL12–14（新代碼 AR17–19）僅簡略帶過，待確認 | 07-29 訪談 | 中 |
| P11 | 收款票據 xlsx 更新（落後兩場 07-29 訪談，同事處理中）→ 阻塞 AS-IS 產出 | 08-04 排程 | **高** |

---

## 12. 已完成的關鍵交付（2026-08-05）

| 項目 | 路徑 | 版本 |
|---|---|---|
| ProcessMap 視覺化看板（**現行**） | `processmap_v20.html` | v20（2026-07-28，收款票據 AR01–03 2nd 訪談更新 + EXP01 附件彈窗功能） |
| ProcessMap 資料主檔 | `src/constants.ts` | 2026-07-28（已同步收款票據合併分類 + AR01–03） |
| 財產管理 xlsx | `補充資料/1. 財產管理 FA/asset_management_flow_after2ndinterview_v7.xlsx` | v7 |
| 請購報銷 xlsx | `補充資料/2. 請購報銷 EXP/請購報銷EXP流程_v7.xlsx` | v7（2026-07-28） |
| 預算管理 xlsx | `補充資料/3. 預算管理 BUD/預算管理BUD流程_v1.xlsx` | v1 |
| 收款票據 xlsx | `補充資料/4. 收款票據 AR.BIL/收款票據流程_v3.xlsx` | v3（2026-07-28，⚠️落後兩場訪談） |
| 出納作業 xlsx | `補充資料/5. 出納作業 TRS/出納作業TRS流程_v3.xlsx` | v3 |
| 營業稅 xlsx | `補充資料/6. 營業稅 VAT/營業稅VAT流程_v1.xlsx` | v1（2026-07-28） |
| 總帳 xlsx | `補充資料/7. 總帳 GL/總帳GL流程_v1.xlsx` | v1（基準版） |
| 差旅 xlsx | `補充資料/8. 差旅 TRV/差旅TRV流程_v1.xlsx` | v1（基準版） |
| EXP01 金額門檻決策表彈窗附件 | `attachments/採購付款流程圖.html` | 2026-07-28 |
| 訪談文件（24 份來源頁） | `../Obsidian Vault/訪談研究/{模組}/` | 6 模組 |
| AS-IS 文件（5 份） | `../Obsidian Vault/AS-IS流程/{模組}/` | v1.0（2026-08-04） |
| 跨模組痛點實體頁（5 份） | `../Obsidian Vault/痛點與需求/` | 2026-08-04 |
| CTO 提案會議紀錄 | `../Obsidian Vault/專案會議/財務系統改版_CTO提案會議紀錄_20260511.md` | — |
| 方案比較表骨架 | `../Obsidian Vault/方案決策/_模板/方案比較表_骨架.md` | skeleton |

---

## 13. 資料夾衛生

| 項目 | 狀態 |
|---|---|
| `node_modules/`（1,335+ 檔案，佔本資料夾 91%） | 建議排除 OneDrive 同步 |
| `ProcessMap_v0`–`v19`（21 個 HTML 共約 2.4MB 並存） | 建議保留 `v20` + 少數里程碑版本，其餘移入 `_archive/` |
| `_backup/`（`constants.ts.20260717.ts`、`ProcessMap_v17.html.20260717.html`） | 手動日期備份，與正本重複，可歸檔 |
| `scripts/__pycache__/`、`scripts/_long_names.txt`（0 bytes） | 可清除 |
| `補充資料/1. 財產管理 FA/test_write.txt`（5 bytes） | 測試殘留，可清除 |
| 沒有 `.git` | 建議 `git init` 以擺脫檔名版控 |
