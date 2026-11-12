import { Scenario } from './types';

export const CATEGORIES = ['財產管理', '請購報銷', '收款票據', '營業稅', '總帳', '預算管理', '差旅', '出納作業'];

export const SCENARIOS: Scenario[] = [
  // ===========================================================================
  // 財產管理 (FA) - A01-A08（依同事 1110 整理版 xlsx v8／processmap_v23 內嵌資料）
  // ===========================================================================
  {
    id: 'A01', category: '財產管理', title: 'A01 一般財產新增與入帳', description: '一般財產新增與入帳',
    steps: [
      { id: 'a01-1', name: 'Step 1: 建立請購單', description: '業務單位在 iService 開請購單（15 萬以下），填工作計畫與預算項目（財產為 65 開頭），經事務組議價。駐外資訊設備由數科中心代購時，附外館來函、奉核回函與報價單。', role: '使用單位', input: '採購需求、報價單', output: '請購單 (A單)', system: 'iService', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a01-2', name: 'Step 2: 報銷與驗收核章', description: '業務單位驗收（電腦外觀照片＋規格說明，沒有驗收單），發票貼憑證單，在 iService 報銷。', role: '使用單位', input: '請購單、驗收文件、發票', output: '印出紙本報銷單、驗收單', system: 'iService、紙本', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a01-3', name: 'Step 3: 填寫財產增加單', description: '業務單位依規章填寫紙本財產增加單（主管簽章），報銷時附上；數科中心代購可略。', role: '使用單位', input: '採購合約、規格說明', output: '財產增加單', system: '紙本', manHours: '', frequency: '', sources: ['SOP'] },
      { id: 'a01-4', name: 'Step 4: APF2600 憑證資料登錄', description: '業務單位登記桌在財務系統 key 報銷憑證資料，之後送行政處事務組。', role: '使用單位登記桌', input: '統一發票', output: '憑證登錄紀錄', system: '請購財產系統（APF2600 請購暨報銷）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a01-5', name: 'Step 5: 送事務組驗收', description: '事務組核對請購報銷單據與資料（沒有驗收單），符合即蓋章，簽核層級依金額；與財產相關者將報銷單交財產管理員。', role: '行政處事務組', input: '報銷單', output: '簽核後的報銷單', system: 'iService / 紙本', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a01-6', name: 'Step 6: 輸入財產基本資料', description: '財產管理員輸入財產基本資料：財產編號、明細編號、統制單位、財產名稱、最低使用年限、廠牌規格、工作計畫、預算項目、經費來源、文號、會計科目、數量、單價等。明細編號系統自動產生；傳票號碼過帳後自動帶入；駐外財產不填使用人員。', role: '財產管理員', input: '財產基本資料', output: '財產卡 (草稿)', system: '財務系統（FAF2100 財產單登錄）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a01-7', name: 'Step 7: 列印標籤與財產單', description: '列印財產單（一式四聯）與財產標籤；國內標籤印給單位，駐外提供電子檔由當地自行列印。', role: '財產管理員', input: '已建檔財產資料', output: '財產標籤、財產單', system: '財務系統（FAF2100 財產單登錄）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'a01-8', name: 'Step 8: 四聯單用印', description: '財產單製表欄由製表單位蓋章（本會財產為行政處事務組，代管財產為場館財產管理人），再送保管單位蓋章；蓋到哪一層級依金額。', role: '財產管理員(製表單位)/財會人員(會計單位)/使用單位', input: '四聯單', output: '用印後四聯單', system: '紙本', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a01-9', name: 'Step 9: 黏貼財產標籤', description: '行政處列印標籤，使用單位黏貼。', role: '使用單位', input: '財產標籤、實體財產', output: '已黏貼標籤', system: '人工', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'a01-10', name: 'Step 10: 企財核銷', description: '四聯財產單隨 iService 紙本報銷單送企財處核銷，製出費用帳傳票（W 單）。用印完成後四聯分送：一 製表單位、二 併傳票、三 企財處留存、四 保管單位。', role: '財會人員', input: '請購單 + 財產單', output: '核銷申請、W單 (組長簽核)', system: '紙本、財務系統（APF2700 核銷）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a01-11', name: 'Step 11: 企財處會計確認', description: '企財處依報銷文件核對金額、計畫、年度、統制單位後按會計確認；未按會計確認不能製財產傳票。', role: '財會人員', input: 'A單/E單', output: 'W單 (組長簽核)', system: '財務系統（APF2100 請購單維護、APF2900 直接核銷）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a01-12', name: 'Step 12: 入帳製票', description: '企財處產生固定資產傳票（財產帳），系統依計畫與統制單位自動帶出分錄。', role: '財會人員', input: '財產登錄資料', output: '新增傳票', system: '財務系統（GLF2A00 固定資產產生傳票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a01-13', name: 'Step 13: 批次過帳', description: '每天中午、晚上固定做財產過帳，由背景程序準備傳票資料。', role: '系統自動', input: 'W單', output: '傳票', system: '財務系統（GLF2200 過帳處理）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'A02', category: '財產管理', title: 'A02 駐外與基金財產新增', description: '駐外與基金財產新增',
    steps: [
      { id: 'a02-1', name: 'Step 1: 收到財產採購憑證', description: '外館購買前先發函經數科中心同意（筆電、桌機 31,000 元、印表機 2 萬元以內含稅）；購買後在駐外人員財務系統以經常費報銷，產出經常帳帳冊寄回。', role: '各外館兼辦會計', input: '金額、規格等', output: '經費帳冊', system: '駐外人員財務系統', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a02-2', name: 'Step 2: 財務系統請購報銷模組報銷', description: '企財處在財務系統直接核銷，先 key E 單（沒有事先請購、直接報銷）才能新增財產。', role: '財會人員', input: 'E 單資料', output: '系統紀錄', system: '財務系統（APF2900 直接核銷）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a02-3', name: 'Step 3: 填寫會辦單', description: '依 E 單產生會辦單，在文案系統填寫，寫明外幣金額與換算台幣的匯率日期。', role: '財會人員', input: 'E 單號', output: '會辦單', system: '文案系統', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a02-4', name: 'Step 4: 送簽會辦單', description: '會辦單經文案系統送簽：資訊設備送數科中心、其他財產送計管組，之後到行政處。', role: '1. 數科/計管（資訊設備）\n2. 行政處（其他財產）', input: '會辦單', output: '送簽完成會辦單', system: '文案系統', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a02-5', name: 'Step 5: 財產登錄', description: '財產管理員依會辦單與 E 單號登錄財產，列印四聯財產單；駐外標籤提供電子檔。外館基金財產入帳金額 x1.05。', role: '財產管理員', input: '會辦單 (E單)', output: '財產標籤（電子檔）', system: '財務系統（FAF2100 財產單登錄）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a02-6', name: 'Step 6: 企財核銷', description: '財產管理員將四聯單連同會辦單送回企財處（單據已於第 2 步核銷）。', role: '財會人員', input: 'E單 + 財產單', output: '核銷申請、W單 (組長簽核)', system: '財務系統（APF2900 直接核銷）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a02-7', name: 'Step 7: 企財處會計確認', description: '企財處會計確認，同 A01 第 11 步。', role: '財會人員', input: 'A單/E單', output: 'W單 (組長簽核)', system: '財務系統（APF2900 直接核銷）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a02-8', name: 'Step 8: 入帳製票', description: '同 A01 第 12 步。', role: '財會人員', input: '財產登錄資料', output: '新增傳票', system: '財務系統（GLF2A00 固定資產產生傳票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a02-9', name: 'Step 9: 批次過帳', description: '同 A01 第 13 步。', role: '系統自動', input: 'W單', output: '傳票', system: '財務系統（GLF2200 過帳處理）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'A03', category: '財產管理', title: 'A03 財產移動 (單位間調撥)', description: '財產移動 (單位間調撥)',
    steps: [
      { id: 'a03-1', name: 'Step 1: 提出財產移動申請', description: '移出單位寫便簽（駐外以報文），寫清楚哪些財產移轉給誰或附財產清冊；簽核依金額。常見情形是未到期不能報廢而改移轉。', role: '移出單位', input: '移動需求', output: '移動申請單', system: '文案系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'a03-2', name: 'Step 2: 同意接收申請', description: '便簽會接收單位同意，之後送行政處。', role: '接收單位', input: '移動申請單', output: '確認同意申請', system: '文案系統', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a03-3', name: 'Step 3: 執行財產異動登錄', description: '財產管理員在 FAF2500 做保管人對照、新增移動記錄；關帳期間不可移動。', role: '財產管理員', input: '移動申請', output: '異動記錄', system: '財務系統（FAF2500 財產移動記錄）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'a03-4', name: 'Step 4: 列印財產移動單', description: '在 FAF2500 按「行政處確認」後列印財產移動單（一式四聯）。', role: '財產管理員', input: '異動記錄', output: '移動單 (四聯)', system: '財務系統（FAF2500 財產移動記錄）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a03-5', name: 'Step 5: 三方蓋章確認', description: '移動單依序送移出單位、移入單位、企財處蓋章（製表單位行政處亦用印），蓋完分送四個單位。', role: '移出/接收/企財處', input: '移動單', output: '完成簽核移動單', system: '人工 (紙本)', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'A04', category: '財產管理', title: 'A04 財產增值與減損帳務', description: '財產增值與減損帳務',
    steps: [
      { id: 'a04-1', name: 'Step 1: 收到/增值減損通知', description: '增值（加買不能獨立存在的零件、維修後延長耐用年限）由 iService 請購；減損（如貨物稅退稅）由業務單位寫便簽；公文先到行政處再到企財處。兩者都很少發生。', role: '使用單位、財產管理員、財會人員', input: 'iService請購(增值)/文案系統便簽(減損)', output: '便簽', system: 'iService / 文案系統', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a04-2', name: 'Step 2: 輸入增值/減損資料', description: '財產管理員在 FAF2200（增值）或 FAF2300（減損）輸入資料並列印表單。', role: '財產管理員', input: '增值/減損申請', output: '登錄資料', system: '財務系統（FAF2200 財產價值增加、FAF2300 財產減損）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a04-3', name: 'Step 3: 會計確認與產製傳票', description: '企財處按會計確認後產生固定資產傳票；增減值會影響後續折舊計算。', role: '財會人員', input: '財產資料', output: '增值/減損傳票', system: '財務系統（GLF2A00 固定資產產生傳票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'A05', category: '財產管理', title: 'A05 財產報廢與除帳', description: '財產報廢與除帳',
    steps: [
      { id: 'a05-1', name: 'Step 1: 提出報廢公文', description: '使用單位寫便簽提出報廢，附財產清冊（標示報廢項目）或 Excel，形式不限；依核定權責簽核。', role: '使用單位', input: '財產清單', output: '報廢公文', system: '文案系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'a05-2', name: 'Step 2: 查詢財產現況', description: '財產管理員查財產清冊，確認報廢項目在清冊上。', role: '財產管理員', input: '財產清冊', output: '查詢結果', system: '財務系統（FAR4800 財產清冊）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a05-3', name: 'Step 3: 報文至貿易署', description: '基金財產須先以文案系統電子公文發函貿易署，取得同意才能報廢；本會財產有長官核定即可，不需此步。', role: '財產管理員', input: '財產清單', output: '同意文件', system: '文案系統', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a05-4', name: 'Step 4: 執行報廢登錄', description: '財產管理員在財務系統做報廢，印出財產減損報廢單。', role: '財產管理員', input: '核准文件', output: '財產減損報廢單', system: '財務系統（FAF2400 財產報廢）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'a05-5', name: 'Step 5: 報廢單蓋章確認', description: '財產減損報廢單一式四聯，由行政處、使用單位、企財處蓋章。', role: '使用單位、財產管理員、財會人員', input: '財產減損報廢單', output: '已蓋章報廢單', system: '人工 (紙本)', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a05-6', name: 'Step 6: 會計確認並產製傳票', description: '企財處在 FAF2400 核對並按會計確認，產製傳票。', role: '財會人員', input: '報廢文件', output: '傳票', system: '財務系統（FAF2400 財產報廢）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a05-7', name: 'Step 7: 列印報廢清單', description: '列印 FAR5300 報廢清單核對。', role: '財會人員', input: '傳票', output: '報廢清單', system: '財務系統（FAR5300 固定資產報廢明細表）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'A06', category: '財產管理', title: 'A06 財產折舊處理', description: '財產折舊處理',
    steps: [
      { id: 'a06-1', name: 'Step 1: 鎖定財產並檢查狀態', description: '關帳時點於 FAF2900 鎖定財產，鎖定後當月不能新增、報廢、增減值；選擇經費來源與工作計畫。', role: '財會人員', input: '財產資料', output: '鎖定結果', system: '財務系統（FAF2900 折舊處理）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a06-2', name: 'Step 2: 備份前確認', description: '檢查是否都已過帳、有無錯帳，特定科目餘額應為 0。', role: '財會人員', input: '65科目餘額', output: '確認平衡', system: '財產系統（GLF3400 會計科目每月餘額查詢）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a06-3', name: 'Step 3: 備份財產資料', description: '於 FAR5800 按備份。', role: '財會人員', input: '現有資料', output: '備份檔', system: '財產系統（FAR5800 固定資產累計折舊表）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a06-4', name: 'Step 4: 提列本期折舊', description: '依序提列各統制單位折舊（不可同時操作）；代管與世貿先做，再做全會。', role: '財會人員', input: '財產原價', output: '計算結果', system: '財務系統（FAF2900 折舊處理）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'a06-5', name: 'Step 5: 產生傳票並確認摘要', description: '系統自動產生折舊傳票，企財處檢查並在摘要加註統制單位；每月約 7 張（3 張財產折舊、2 張無形資產折舊、2 張轉帳展館）。', role: '財會人員', input: '折舊結果', output: '折舊傳票', system: '財務系統（GLF2A00 固定資產產生傳票）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'a06-6', name: 'Step 6: 核對折舊報表', description: '核對 FAR5300、FAR5400、FAR5500、FAR5800 等報表與帳上科目餘額。', role: '財會人員', input: '計算結果', output: '財產目錄', system: '財務系統（FAR5300 固定資產報廢明細表、FAR5400 財產目錄列印（會計用）、FAR5500 會計未確認財產清單（會計用）、FAR5800 固定資產累計折舊表）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'a06-7', name: 'Step 7: 折舊費轉列各計畫', description: '展館財產折舊以 GLF2100 手工轉列至各展館計畫。', role: '財會人員', input: '折舊報表', output: '計畫分錄', system: '總帳系統（GLF2100 傳票處理）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'A07', category: '財產管理', title: 'A07 國有財產處理 (有形財產)', description: '國有財產處理 (有形財產)',
    steps: [
      { id: 'a07-1', name: 'Step 1: 匯出財產異動檔案', description: '每月關帳後，企財處以 FAR4J00 匯出基金財產異動檔（新增、報廢、增減值、折舊）TXT，提供國有財產管理人員。', role: '財會人員', input: '財務資料', output: '轉檔TXT', system: '財務系統（FAR4J00 (新)國有財產資料交換）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a07-2', name: 'Step 2: 匯入國有財產系統', description: '國有財產管理人員（行政處及場館）將 TXT 匯入關貿國有財產系統（單機版）。', role: '財產管理員', input: '國有財產編號', output: '國產編號', system: '國產系統 (RARP)', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a07-3', name: 'Step 3: 編號媒合回傳', description: '國有財產系統產出含國有財產編號的 mapping 檔，email 給企財處，在 FAR4J00 上傳媒合。', role: '財會人員', input: '國產編號', output: '媒合記錄', system: '財務系統（FAR4J00 (新)國有財產資料交換）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a07-4', name: 'Step 4: 每月提報貿易署國有財產報表', description: '每月 25 日前，以文案系統便簽陳核後，將關貿國有財產增減結存表等有形財產報表送經濟部推廣貿易基金。', role: '財產管理員', input: '文案系統便簽', output: '給貿易署的資料（含關貿國有財產報表、五張固定資產累計折舊表）', system: '文案系統', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },
  {
    id: 'A08', category: '財產管理', title: 'A08 國有財產處理 (無形財產)', description: '國有財產處理 (無形財產)',
    steps: [
      { id: 'a08-1', name: 'Step 1: 產出累計折舊表', description: '以 FAR5800 產出 5 張固定資產累計折舊表（推廣基金 HO、推廣基金 OS、TB 貿易署專案、TI 培訓中心、貿易署 HO）。', role: '財產管理員', input: '折舊資料', output: '累計表 (5張)', system: '財務系統（FAR5800 固定資產累計折舊表）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a08-2', name: 'Step 2: 手動輸入無形資產總表', description: '依 5 張報表人工在 Excel 製作無形資產總表。', role: '財產管理員', input: '累計表', output: 'Excel總表', system: 'Excel', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'a08-3', name: 'Step 3: 每月提報貿易署國有財產報表', description: '每月 25 日前，以便簽陳核後，將無形資產總表與 5 張報表送貿易署資訊室。', role: '財產管理員', input: '文案系統便簽', output: '給貿易署的資料（含關貿國有財產報表、無形資產總表）', system: '文案系統', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },

  // ===========================================================================
  // 請購報銷 (EXP) - EXP01–EXP06（xlsx v10：EXP01 精簡為 9 步、EXP05 更名 EXP05-F，共 86 步）
  // ===========================================================================
  {
    id: 'EXP01', category: '請購報銷', title: 'EXP01 國內請購採購驗收到報銷', description: '國內請購採購驗收到報銷',
    steps: [
      { id: 'exp01-1', name: 'Step 1: iService 請採購', description: '業務單位在iService提出請採購。15萬以下開請購單（單純金額議價），超過15萬的請購能以指定廠商簽陳單或公告招標簽陳單辦理。', role: '業務單位、行政處事務組（依金額層級會簽處主管、企財處、稽核、副秘書長、秘書長、董事長）', input: '採購需求、金額、預算/工作計畫', output: '蓋有議價戳章的報價單/用印合約文件', system: 'iService、文案系統、人工', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp01-2', name: 'Step 2: 業務驗收與應附表單', description: '業務單位驗收，蓋章。財產標的（金額≥1萬且耐用2年以上）併辦財產單（壹式四聯）；海外展團裝潢併辦裝潢查驗紀錄表；逾150萬另辦國內外財物勞務驗收證明單，超過300萬加會稽核室', role: '業務單位', input: '交貨/完工', output: '驗收簽章＋必備表單', system: '紙本', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp01-3', name: 'Step 3: iService 報銷併紙本', description: '業務單位在iService報銷申請（請購單案件以原請購單報銷；簽陳單案件以逕行報銷單報銷），憑證黏貼經費報銷用紙並加蓋騎縫章後送企財處', role: '業務單位', input: '驗收與原始憑證、其他附件（如報價單、驗收單、驗收照片等）', output: 'iService申請＋紙本送件', system: 'iService、紙本', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp01-4', name: 'Step 4: 登錄報銷資料', description: '在財務系統「請購暨報銷」由iService帶入A單，或自行新增G單輸入報銷明細。', role: '業務單位', input: 'A單號或G單、計畫科目金額、原始憑證', output: '財務系統報銷明細＋憑證明細', system: '財務系統（APF2600 請購暨報銷）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'exp01-5', name: 'Step 5: 核銷', description: '企財處審核報銷明細及相關附件', role: '企財處', input: '原始憑證與報銷紙本附件（如報價單、驗收照片等）', output: '傳票附件', system: '財務系統（APF2700 核銷）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp01-6', name: 'Step 6: 確認帳務後製票', description: '以核銷單據種類（如請購單、直接報銷單等）輸入單據號碼執行製票。模組參考APF2A00', role: '企財處', input: '憑證齊、核銷帶入正確', output: '傳票檢查表', system: '財務系統（APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['補充資料', '1st訪談'] },
      { id: 'exp01-7', name: 'Step 7: 列印傳票檢查表並覆核', description: '將列印出紙本的傳票檢查表及附件送組長／副座覆核', role: '企財處', input: '待過帳傳票', output: '已覆核可過帳之傳票檢查表', system: '財務系統（GLR4100 傳票檢查表）、紙本', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp01-8', name: 'Step 8: 批次過帳', description: '財務系統固定排程於午/晚批次過帳。急件得由授權者執行即時過帳。正式傳票號取得可能有等待期', role: '企財處', input: '已覆核可過帳之傳票檢查表製票號碼', output: '已過帳與傳票號', system: '財務系統（GLF2200 過帳處理、GLR4200 傳票列印）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp01-9', name: 'Step 9: 刷送傳票至出納', description: '企財處完成過帳後，於財務系統（GLF2H00）刷送傳票至出納組並產生批號，出納以批號查詢、核對筆數後簽收，方可進行選付作業。EXP01 到此為止，後續銜接出納付款流程（EXP04、EXP06）', role: '企財處', input: '批次過帳完成之傳票', output: '已刷送傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）、人工', manHours: '', frequency: '', sources: ['1st訪談', '線下回饋_出納', '2nd訪談'] },
    ]
  },
  {
    id: 'EXP02', category: '請購報銷', title: 'EXP02 一般費用報銷補正流程', description: '一般費用報銷補正流程',
    steps: [
      { id: 'exp02-1', name: 'Step 1: 業務單位送件報銷', description: '業務單位以iService或文案系統進行報銷申請，發票或收據黏貼憑證用紙後紙本送企財處。', role: '業務單位', input: '報銷申請+憑證+其他附件', output: '可審之報銷件', system: 'iService、文案系統、紙本', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp02-2', name: 'Step 2: 企財處審金額與憑證', description: '審核簽核層級、科目、內容等', role: '企財處', input: '已送件之報銷', output: '審核結果', system: '財務系統（APF2700 核銷）、人工', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp02-3', name: 'Step 3: 審核層級合規確認', description: '6萬（含）以下組長；逾80萬或逾規支出需另附核准文件', role: '業務單位、企財處', input: '報銷內容與核准層', output: '合規之簽准', system: '人工', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp02-4', name: 'Step 4: 報銷補正', description: '文件不齊備時，由企財處審核人通知業務單位承辦人補件，依情況原卷暫存，或開立「經費報銷補正通知單」後原卷退還。', role: '企財處', input: '審核結果', output: '補正通知', system: '紙本、iService、文案系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp02-5', name: 'Step 5: 業務單位補件補章後重送企財', description: '業務單位補件、補章後重送企財處', role: '業務單位', input: '補正通知', output: '補正完備件', system: 'iService、文案系統、紙本', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp02-6', name: 'Step 6: 確認帳務後製票', description: '企財處確認帳務無誤後，輸入報銷單據號碼執行製票，產生傳票檢查表；結束後接回 EXP01 Step 7（列印傳票檢查表並覆核）', role: '企財處', input: '審畢之報銷', output: '傳票檢查表', system: '財務系統（APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'EXP03', category: '請購報銷', title: 'EXP03 週轉金小額支付與撥補流程', description: '週轉金小額支付與撥補流程',
    steps: [
      { id: 'exp03-1', name: 'Step 1: 申請設置週轉金並指定保管人', description: '業務單位提出線上公文申請，核定額度與保管人', role: '業務單位', input: '週轉金申請', output: '核准額度與保管人', system: '文案系統', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp03-2', name: 'Step 2: 撥付週轉金並啟用備查簿', description: '企財處依核定金額編製傳票，出納組將款項撥入指定帳戶，保管人啟用備查簿登錄收支', role: '企財處、行政處出納組、週轉金保管單位', input: '核准文件', output: '備查簿就緒', system: '財務系統、人工、備查簿', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp03-3', name: 'Step 3: 門檻確認：≤1萬得以週轉金直接現金支付', description: '≤1萬得於完成請採購程序後，向週轉金保管人申請直接現金支付，無須經請採購程序之逕行報銷案件（如小額計程車資、印花稅等），亦得循此方式辦理。', role: '週轉金保管單位', input: '請購單（或逕行報銷單）＋憑證', output: '週轉金撥款申請', system: 'iService、紙本', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp03-4', name: 'Step 4: 現金付款與簽收', description: '保管單位審核，以現金支付；領款人簽收；在已支付的報銷單上加蓋「已支付」戳記，登錄備查簿', role: '週轉金保管單位', input: '請購單（或逕行報銷單）＋憑證', output: '簽收紀錄＋備查簿更新', system: '紙本、備查簿', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp03-5', name: 'Step 5: 彙總已付款報銷單列印週轉金報銷清單', description: '週轉金保管人於財務系統零用金報銷彙總輸入已付款之報銷單，產生 H 單（iService 同步關聯），列印週轉金報銷清單送企財處', role: '週轉金保管單位', input: '多筆請購單（或逕行報銷單）＋憑證', output: 'H 單、週轉金報銷清單', system: '財務系統（APF2600 請購暨報銷、APF2800 零用金報銷彙總、APR4100 週轉金報銷清單）、iService', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp03-6', name: 'Step 6: 確認帳務後製票', description: '企財處逐筆核銷後，於零用金報銷彙總確認 H 單，確認帳務無誤後以 H 單執行製票，產生傳票檢查表；結束後接回 EXP01 Step 7（列印傳票檢查表並覆核），出納依傳票付款撥補週轉金（同 EXP04 出納付款流程）', role: '企財處', input: '週轉金報銷清單', output: '傳票檢查表', system: '財務系統（APF2700 核銷、APF2800 零用金報銷彙總、APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp03-7', name: 'Step 7: 年度週轉金盤點', description: '每年六月辦理年度盤點；編製盤點表，經保管單位主管簽核，企財處監督盤點', role: '週轉金保管單位、企財處', input: '備查簿/實地盤點', output: '盤點表（年度）', system: '文案系統', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
    ]
  },
  {
    id: 'EXP04-a1', category: '請購報銷', title: 'EXP04-a1 台幣支票付款', description: '台幣支票付款',
    steps: [
      { id: 'exp04-a1-1', name: 'Step 1: 簽收傳票', description: '出納組收到企財處刷送傳票後，於財務系統（GLF2H00）以刷送批號查詢、核對筆數無誤後簽收，方可開始選付作業。', role: '行政處出納組', input: '企財處刷送之傳票', output: '已簽收傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['1st訪談', '線下回饋_出納', '2nd訪談'] },
      { id: 'exp04-a1-2', name: 'Step 2: 傳票依付款方式分別選付', description: '傳票依付款方式（支票或EDI）分別選付；須選會內扣款帳號（必選）；受款人無帳號者開支票或取款條：從支存帳戶付款開支票，從非支存帳戶付款開取款條', role: '行政處出納組', input: '傳票', output: '已分類選付件', system: '財務系統（NTF2A00 選擇付款及製票作業）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'exp04-a1-3', name: 'Step 3: 編製傳票檢查表', description: '出納組編製傳票檢查表', role: '行政處出納組', input: '已分類傳票', output: '傳票檢查表', system: '財務系統（GLR4100 傳票檢查表）', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp04-a1-4', name: 'Step 4: 核對傳票檢查表金額與應付款總額', description: '核對傳票檢查表金額與應付款總額相符', role: '行政處出納組', input: '傳票檢查表', output: '金額核對結果', system: '人工', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp04-a1-5', name: 'Step 5: 過帳並列印支出傳票及調撥傳票', description: '選付製票後系統自動產生支出傳票（傳票類別2 - 支出）及調撥傳票（傳票類別5 - 其他，存款帳戶調撥至支存帳戶），由財務系統中午排程自動批次過帳並列印', role: '財務系統（排程自動）', input: '核對完畢之傳票', output: '列印後支出傳票＋調撥傳票', system: '財務系統（GLF2200 過帳處理、GLR4210 批次過帳列印傳票，中午排程批次過帳列印）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp04-a1-6', name: 'Step 6: 列印支票及付款明細表', description: '列印支票（NTF2B00），連同銀行台幣付款明細表（NTR4700，附件三）、應付憑單檢查表（NTR4100），三份一起送用印', role: '行政處出納組', input: '已過帳傳票', output: '支票＋付款明細表＋應付憑單檢查表', system: '財務系統（NTF2B00 付款支票開立作業、NTR4700 電腦開立支票付款明細表、NTR4100 應付憑單檢查表）、印表機', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp04-a1-7', name: 'Step 7: 支票連同付款明細表送二印', description: '支票連同銀行台幣付款明細表（NTR4700）、應付憑單檢查表（NTR4100）送二印（支存付款專戶專用章＋出納組組長）；支票為交銀行的紙本，無法改線上簽核', role: '行政處出納組', input: '支票', output: '已蓋二印支票', system: '紙本用印', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'exp04-a1-8', name: 'Step 8: 支票逐一分類整理', description: '支票依傳票逐一分類整理', role: '行政處出納組', input: '已蓋章支票', output: '已分類支票', system: '人工', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp04-a1-9', name: 'Step 9: 電話通知領款或掛號郵寄', description: '電話通知領款/電匯/掛號郵寄', role: '行政處出納組', input: '已分類支票', output: '通知或郵寄支票', system: '電話、郵務', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp04-a1-10', name: 'Step 10: 列印支票郵寄清冊交寄', description: '列印付款支票郵寄清冊，連同裝封支票交寄', role: '行政處出納組', input: '待寄支票', output: '郵寄清冊＋已交寄支票', system: '財務系統（NTR4900 付款支票郵寄清冊）、印表機、郵務', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp04-a1-11', name: 'Step 11: 傳票移送企財處歸檔', description: '傳票移送企財處歸檔', role: '行政處出納組', input: '已付傳票', output: '歸檔', system: '紙本', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
    ]
  },
  {
    id: 'EXP04-a2', category: '請購報銷', title: 'EXP04-a2 台幣取款條付款', description: '台幣取款條付款',
    steps: [
      { id: 'exp04-a2-1', name: 'Step 1: 簽收傳票', description: '出納組收到企財處刷送傳票後，於財務系統（GLF2H00）以刷送批號查詢、核對筆數無誤後簽收，方可開始選付作業。', role: '行政處出納組', input: '企財處刷送之傳票', output: '已簽收傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['1st訪談', '線下回饋_出納', '2nd訪談'] },
      { id: 'exp04-a2-2', name: 'Step 2: 傳票依付款方式分別選付', description: '傳票依付款方式（支票或EDI）分別選付；須選會內扣款帳號（必選）；受款人無帳號者開支票或取款條：從支存帳戶付款開支票，從非支存帳戶付款開取款條', role: '行政處出納組', input: '傳票', output: '已分類選付件', system: '財務系統（NTF2A00 選擇付款及製票作業）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'exp04-a2-3', name: 'Step 3: 編製傳票檢查表', description: '出納組編製傳票檢查表', role: '行政處出納組', input: '已分類傳票', output: '傳票檢查表', system: '財務系統（GLR4100 傳票檢查表）', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp04-a2-4', name: 'Step 4: 核對傳票檢查表金額與應付款總額', description: '核對傳票檢查表金額與應付款總額相符', role: '行政處出納組', input: '傳票檢查表', output: '金額核對結果', system: '人工', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp04-a2-5', name: 'Step 5: 過帳並列印支出傳票及調撥傳票', description: '選付製票後系統自動產生支出傳票（傳票類別2 - 支出）及調撥傳票（傳票類別5 - 其他，存款帳戶調撥至支存帳戶），由財務系統中午排程自動批次過帳並列印', role: '財務系統（排程自動）', input: '核對完畢之傳票', output: '列印後支出傳票＋調撥傳票', system: '財務系統（GLF2200 過帳處理、GLR4210 批次過帳列印傳票，中午排程批次過帳列印）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp04-a2-6', name: 'Step 6: 列印付款明細表及應付憑單檢查表', description: '列印銀行台幣付款明細表（NTR4700）、應付憑單檢查表（NTR4100）', role: '行政處出納組', input: '已過帳傳票', output: '付款明細表＋應付憑單檢查表', system: '財務系統（NTR4700 電腦開立支票付款明細表、NTR4100 應付憑單檢查表）、印表機', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp04-a2-7', name: 'Step 7: 填寫取款憑條連同傳票送四印', description: '開立取款憑條，連同傳票送四人用印（秘書長、主辦會計、行政處處長、出納組組長）；取款條為交銀行的紙本，無法改線上簽核', role: '行政處出納組', input: '待用印件', output: '已蓋四印件', system: '紙本用印', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp04-a2-8', name: 'Step 8: 取款憑條送銀行轉帳', description: '取款憑條送銀行轉帳；臺貿中心另有傳真交易：出納傳真匯款單給銀行，銀行回電照會受款人後付款，需另與銀行簽約（不另立子流程）', role: '行政處出納組', input: '用印完畢件', output: '已送銀行轉帳', system: '網路銀行、紙本', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp04-a2-9', name: 'Step 9: 傳票移送企財處歸檔', description: '傳票移送企財處歸檔', role: '行政處出納組', input: '已付傳票', output: '歸檔', system: '紙本', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
    ]
  },
  {
    id: 'EXP04-b', category: '請購報銷', title: 'EXP04-b 台幣EDI付款', description: '台幣EDI付款',
    steps: [
      { id: 'exp04-b-1', name: 'Step 1: 簽收傳票', description: '出納組收到企財處刷送傳票後，於財務系統（GLF2H00）以刷送批號查詢、核對筆數無誤後簽收，方可開始選付作業。', role: '行政處出納組', input: '企財處刷送之傳票', output: '已簽收傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['1st訪談', '線下回饋_出納', '2nd訪談'] },
      { id: 'exp04-b-2', name: 'Step 2: 傳票依付款方式分別選付', description: '傳票依付款方式（支票或EDI）分別選付；須選會內扣款帳號；受款人須已建匯款帳戶資料，未建檔者先至受款人基本資料（DAF1100）新增後再選付', role: '行政處出納組', input: '傳票', output: '已分類選付件', system: '財務系統（NTF2A00 選擇付款及製票作業、DAF1100 受款人資料維護）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'exp04-b-3', name: 'Step 3: 編製傳票檢查表', description: '出納組編製傳票檢查表', role: '行政處出納組', input: '已分類傳票', output: '傳票檢查表', system: '財務系統（GLR4100 傳票檢查表）', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp04-b-4', name: 'Step 4: 核對傳票檢查表金額與應付款總額', description: '核對傳票檢查表金額與應付款總額相符', role: '行政處出納組', input: '傳票檢查表', output: '金額核對結果', system: '人工', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'exp04-b-5', name: 'Step 5: 過帳並列印支出傳票及調撥傳票', description: '過帳並列印支出傳票（傳票類別2 - 支出）及調撥傳票（傳票類別5 - 其他）', role: '行政處出納組', input: '核對完畢之傳票', output: '列印後支出傳票＋調撥傳票', system: '財務系統（GLF2200 過帳處理，中午排程批次過帳列印）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'exp04-b-6', name: 'Step 6: EDI付款資料轉檔至企業銀行系統', description: '【EDI付款】EDI付款資料由財務系統轉檔（NTF2I00），上傳至企業銀行系統（富邦商務網）；付款檔格式已與銀行約定，不得變動', role: '行政處出納組', input: '應付明細', output: 'EDI轉帳檔案', system: '財務系統（NTF2I00 EDI選付轉檔作業）、網路銀行（富邦商務網）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'exp04-b-7', name: 'Step 7: 付款明細表送覆核組長核定放行', description: '【EDI付款】銀行台幣付款明細表送覆核同仁，組長核定放行', role: '行政處出納組、行政處出納組組長', input: '付款明細表', output: '核定放行', system: '人工', manHours: '', frequency: '', sources: ['補充資料', '1st訪談'] },
      { id: 'exp04-b-8', name: 'Step 8: 接收轉帳結果列印報表', description: '【EDI付款】接收轉帳交易結果，列印報表', role: '行政處出納組', input: '轉帳結果', output: '轉帳結果報表', system: '網路銀行', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'exp04-b-9', name: 'Step 9: 付款通知廠商', description: '【EDI付款】付款通知廠商；商務網基本資料有建傳真或email者，付款完成後自動通知廠商', role: '行政處出納組', input: '轉帳結果', output: '廠商通知', system: '電話、Email', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp04-b-10', name: 'Step 10: EDI扣帳失敗者改開立支票', description: '【EDI付款】扣帳失敗（如對方帳戶結清）時，至富邦商務網下載當天整份明細檔，以 NTF2I00 轉入功能上傳回財務系統，失敗筆自動改開支票，接回支票流程（EXP04-a1）；支票號碼標注於付款明細表。此檔案後續兌現、銀行調節亦使用（TRS02 Step 2）', role: '行政處出納組', input: '失敗筆', output: '補出支票', system: '財務系統（NTF2I00 EDI選付轉檔作業）、網路銀行（富邦商務網）', manHours: '', frequency: '', sources: ['SOP', '補充資料', '2nd訪談'] },
      { id: 'exp04-b-11', name: 'Step 11: 傳票移送企財處歸檔', description: '【付款後】傳票移送企財處歸檔', role: '行政處出納組', input: '已付傳票', output: '歸檔', system: '紙本', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
    ]
  },
  {
    id: 'EXP05-F', category: '請購報銷', title: 'EXP05-F 預撥申請（F單）', description: '預撥申請（F單）',
    steps: [
      { id: 'exp05-f-1', name: 'Step 1: 文案系統提出預撥申請', description: '業務單位於文案系統提出預撥申請（F單），並於財務系統輸入預撥明細資料', role: '業務單位', input: '預撥需求（幣別、金額、受款人等）', output: '預撥計畫所屬單位同意', system: '文案系統、財務系統（APF2400 撥款申請單維護）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp05-f-2', name: 'Step 2: 企財處審核預撥明細', description: '企財處審核業務單位輸入之預撥明細資料', role: '企財處', input: 'F單', output: '簽核確認之預撥明細', system: '財務系統（APF2400 撥款申請單維護）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp05-f-3', name: 'Step 3: 確認帳務後製票', description: '企財處確認帳務無誤後，輸入F單單據號碼執行製票，產生傳票檢查表；結束後接回 EXP01 Step 7（列印傳票檢查表並覆核）', role: '企財處', input: 'F單與附件', output: '傳票檢查表', system: '財務系統（APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp05-f-4', name: 'Step 4: F單報銷結算', description: '活動結束後業務單位取得結算帳單，透過文案系統便簽說明結算情形（應退回或需補付之款項），辦理F單報銷（多退少補）', role: '業務單位', input: '結算帳單', output: '便簽（結算報銷）', system: '文案系統、紙本（報銷便簽透過文案系統傳送，帳單正本則須以紙本傳送）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'exp05-f-5', name: 'Step 5: 企財處核銷差額沖銷原預撥傳票', description: '企財處核銷預撥差額，以Z單沖銷原預撥傳票（多退少補）', role: '企財處', input: '報銷單', output: '傳票檢查表', system: '財務系統（APF2700 核銷、APF2C00 國外審核通知書、APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['企財補充'] },
    ]
  },
  {
    id: 'EXP05-B', category: '請購報銷', title: 'EXP05-B 公務借支（B單）', description: '公務借支（B單）',
    steps: [
      { id: 'exp05-b-1', name: 'Step 1: 文案系統填寫借支申請', description: '業務單位在文案系統（或差旅系統）填寫借支申請（差旅/活動），並於財務系統輸入借支明細。', role: '業務單位', input: '借支需求（幣別、金額、受款人等）', output: 'B單', system: '文案系統、差旅系統', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp05-b-2', name: 'Step 2: 企財處審核借支明細', description: '企財處審核業務單位輸入之借支明細資料', role: '企財處', input: 'B單', output: '簽核確認之借支明細', system: '財務系統（APF2200 公務借支維護）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'exp05-b-3', name: 'Step 3: 確認帳務後製票', description: '企財處確認帳務無誤後，輸入B單單據號碼執行製票，產生傳票檢查表；結束後接回 EXP01 Step 7（列印傳票檢查表並覆核）', role: '企財處', input: 'B單與附件', output: '傳票檢查表', system: '財務系統（APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'exp05-b-4', name: 'Step 4: B單報銷結算', description: '借支人實際支付差旅/活動費用後，依借支性質辦理B單報銷（多退少補）', role: '業務單位', input: '憑證＋其他附件', output: '報銷單', system: 'iService、差旅系統（如為差旅費）、紙本', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp05-b-5', name: 'Step 5: 企財處核銷差額沖銷原借支傳票', description: '企財處核銷借支差額，以Z單沖銷原借支傳票（多退少補）', role: '企財處', input: '報銷單', output: '傳票檢查表', system: '財務系統（APF2700 核銷、APF2B00 國內審核通知書、APF2C00 國外審核通知書、APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'EXP05-E', category: '請購報銷', title: 'EXP05-E 駐外單位帳冊核銷（E單）', description: '駐外單位帳冊核銷（E單）',
    steps: [
      { id: 'exp05-e-1', name: 'Step 1: 每月7號前駐外單位寄回上月帳冊', description: '每月7號前，駐外單位寄回上月帳冊＋原始憑證', role: '駐外單位', input: '上月收支明細與原始憑證', output: '帳冊', system: '駐外財務系統、紙本', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp05-e-2', name: 'Step 2: 企財處依帳冊直接核銷', description: '負責該外館的企財處同仁，依帳冊在財務系統以「直接核銷」方式輸入核銷明細', role: '企財處', input: '帳冊', output: '傳票檢查表', system: '財務系統（APF2900 直接核銷）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp05-e-3', name: 'Step 3: 代墊費用發會辦單給業務單位', description: '若帳冊含代墊費用，發會辦單給相關業務單位', role: '企財處', input: '代墊費用明細', output: '會辦單', system: '文案系統、紙本', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp05-e-4', name: 'Step 4: 業務單位審核代墊費用明細', description: '業務單位審核駐外單位報回之代墊費用明細，確認無誤後於財務系統輸入報銷明細（G單），並於會辦單核章後送企財處', role: '業務單位', input: '會辦單', output: 'G單', system: '財務系統（APF2600）、文案系統、紙本', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'exp05-e-5', name: 'Step 5: 每月核銷完成後發公文給外館', description: '每月核銷完成後，發公文給外館說明當月核銷結果及當年度累計核銷金額', role: '企財處', input: '核銷明細', output: '公文（含國外審核通知書等）', system: '文案系統、財務系統（APF2C00 國外審核通知書）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
    ]
  },
  {
    id: 'EXP06-a', category: '請購報銷', title: 'EXP06-a 外幣取款條/傳真交易付款', description: '外幣付款：取款條/傳真交易路徑',
    steps: [
      { id: 'exp06-a-1', name: 'Step 1: 簽收傳票', description: '出納組收到企財處刷送傳票後，於財務系統（GLF2H00）以刷送批號查詢、核對筆數無誤後簽收，方可開始選付作業。', role: '行政處出納組', input: '企財處刷送之傳票', output: '已簽收傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-a-2', name: 'Step 2: 傳票依付款方式和銀行分別選付', description: '傳票依付款方式（取款條或商務網）和銀行分別選付', role: '行政處出納組', input: '傳票', output: '已分類選付件', system: '財務系統（NTF2A00 選擇付款及製票作業）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-a-3', name: 'Step 3: 編製傳票檢查表', description: '出納組編製傳票檢查表', role: '行政處出納組', input: '已分類傳票', output: '傳票檢查表', system: '財務系統（GLR4100 傳票檢查表）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'exp06-a-4', name: 'Step 4: 核對傳票檢查表金額與應付款總額', description: '核對傳票檢查表金額與應付款總額相符', role: '行政處出納組', input: '傳票檢查表', output: '金額核對結果', system: '人工', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'exp06-a-5', name: 'Step 5: 列印應付憑單檢查表', description: '列印應付憑單檢查表（NTR4100）；外幣不需付款明細表', role: '行政處出納組', input: '已過帳傳票', output: '應付憑單檢查表', system: '財務系統（NTR4100 應付憑單檢查表）、印表機', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-a-6', name: 'Step 6: 過帳並列印支出傳票', description: '過帳並列印支出傳票（傳票類別2 - 支出）', role: '行政處出納組', input: '核對完畢之傳票', output: '列印後支出傳票', system: '財務系統（GLF2200 過帳處理、GLR4200 傳票列印）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'exp06-a-7', name: 'Step 7: 填寫外幣匯款單及取款憑條連同傳票送四印', description: '填寫外幣匯款單、開立取款憑條，連同傳票送四人用印（秘書長、主辦會計、行政處處長、出納組組長）', role: '行政處出納組', input: '待用印件', output: '已蓋四印件', system: '紙本用印', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'exp06-a-8', name: 'Step 8: 取款憑條及匯款單送銀行匯款(或傳真)', description: '取款憑條及匯款單送銀行匯款(或傳真)；臺貿中心可用傳真交易', role: '行政處出納組', input: '用印完畢件', output: '已送銀行轉帳', system: '網路銀行、紙本', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-a-9', name: 'Step 9: 傳票附水單移送企財處歸檔', description: '【付款後】傳票附水單（紙本）移送企財處歸檔；保存年限依會計憑證法定保存年限', role: '行政處出納組', input: '已付傳票', output: '歸檔', system: '紙本', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
    ]
  },
  {
    id: 'EXP06-b', category: '請購報銷', title: 'EXP06-b 外幣商務網付款', description: '外幣付款：商務網路徑',
    steps: [
      { id: 'exp06-b-1', name: 'Step 1: 簽收傳票', description: '出納組收到企財處刷送傳票後，於財務系統（GLF2H00）以刷送批號查詢、核對筆數無誤後簽收，方可開始選付作業。', role: '行政處出納組', input: '企財處刷送之傳票', output: '已簽收傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-b-2', name: 'Step 2: 傳票依付款方式及銀行分別選付', description: '傳票依付款方式（取款條或商務網）和銀行分別選付', role: '行政處出納組', input: '傳票', output: '已分類選付件', system: '財務系統（NTF2A00 選擇付款及製票作業）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-b-3', name: 'Step 3: 編製傳票檢查表', description: '出納組編製傳票檢查表', role: '行政處出納組', input: '已分類傳票', output: '傳票檢查表', system: '財務系統（GLR4100 傳票檢查表）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'exp06-b-4', name: 'Step 4: 核對傳票檢查表金額與應付款總額', description: '核對傳票檢查表金額與應付款總額相符', role: '行政處出納組', input: '傳票檢查表', output: '金額核對結果', system: '人工', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'exp06-b-5', name: 'Step 5: 列印應付憑單檢查表', description: '列印應付憑單檢查表（NTR4100）；外幣不需付款明細表', role: '行政處出納組', input: '已過帳傳票', output: '應付憑單檢查表', system: '財務系統（NTR4100 應付憑單檢查表）、印表機', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-b-6', name: 'Step 6: 匯款資料及金額KEY IN至商務網', description: '匯款資料及金額KEY IN至商務網；外幣無法轉檔，需逐筆手動輸入（可叫出已存匯款資料，金額與附言仍逐筆輸入）；未付過款的廠商需先在商務網建立匯款資料', role: '行政處出納組', input: '匯款資料', output: '商務網交易明細', system: '人工、網路銀行', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-b-7', name: 'Step 7: 過帳並列印支出傳票', description: '過帳並列印支出傳票（傳票類別2 - 支出）', role: '行政處出納組', input: '核對完畢之傳票', output: '列印後支出傳票', system: '財務系統（GLF2200 過帳處理、GLR4200 傳票列印）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'exp06-b-8', name: 'Step 8: 應付憑單檢查表送覆核組長核定放行', description: '【商務網付款】應付憑單檢查表送覆核同仁，組長於商務網核定放行', role: '行政處出納組、行政處出納組組長', input: '應付憑單檢查表', output: '核定放行', system: '人工、網路銀行（富邦商務網）、財務系統（NTR4100 應付憑單檢查表）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'exp06-b-9', name: 'Step 9: 傳票附水單移送企財處歸檔', description: '【付款後】傳票附水單（紙本）移送企財處歸檔；保存年限依會計憑證法定保存年限', role: '行政處出納組', input: '已付傳票', output: '歸檔', system: '紙本', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
    ]
  },

  // ===========================================================================
  // 收款票據 (AR/BIL) - AR01–AR23、BIL01–BIL04（xlsx v5）
  // ===========================================================================
  {
    id: 'AR01', category: '收款票據', title: 'AR01查詢繳單(包含財務系統、前端系統)', description: '查詢繳單',
    steps: [
      { id: 'ar01-1', name: 'Step 1: 查詢受款人資料', description: '查詢受款人資料，輸入公司名稱', role: '行政處出納組', input: '銀行匯款備註', output: '統編', system: '財務系統（DAF1100 受款人資料維護）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar01-2', name: 'Step 2: 收款查詢', description: '依繳款人或其他條件查詢 (金額或是客戶未收款明細)、應收款 (Y單) 查詢，亦可用明細分類帳(GLR4300)輔助查核', role: '行政處出納組', input: '統編', output: '繳款單（P單）', system: '財務系統（COQ3100 收款查詢、COR4200 客戶未收款明細表、GLF3200 立沖帳明細查詢、GLF3700 會計科目明細查詢、GLR4300 明細分類帳）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar01-3', name: 'Step 3: 檢視繳款單', description: '輸入P單號以後，檢視摘要、責任中心、金額、稅額、發票聯式', role: '行政處出納組', input: '繳款單（P單）', output: '繳款資料', system: '財務系統（COF2100 繳款通知單、COF2110 (新)繳款通知單）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar01-4', name: 'Step 4: 檢視繳款單繳款狀態', description: '輸入P單號以後，檢視繳款單狀態是否已沖銷，及相對應的收款單號(R單)、製票號碼(W單)、發票號碼等', role: '行政處出納組', input: '繳款單（P單）', output: 'P單號狀態資訊', system: '財務系統（COQ3200 沖銷明細查詢）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR02', category: '收款票據', title: 'AR02查詢前端系統繳單', description: '查詢前端系統繳單',
    steps: [
      { id: 'ar02-1', name: 'Step 1: 介面檔查詢繳單&繳單轉入', description: '輸入單位、日期、單號等需要的條件，讓系統調資料', role: '行政處出納組', input: 'P單查詢條件', output: '繳款單（P單）相關資料', system: '財務系統（COF2A10 通用收款介面轉檔作業）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR03', category: '收款票據', title: 'AR03 一般收款款項處理與沖銷', description: '一般收款款項處理與沖銷',
    steps: [
      { id: 'ar03-1', name: 'Step 1: 收到銀行匯款資料', description: '從各大網路銀行下載銀行對帳單，涵蓋各種入帳管道（匯款、現金、即期支票兌現、信用卡兌現、代收檔案人工作業等），只要顯示於銀行對帳單上的收款皆循此流程處理', role: '行政處出納組', input: '銀行匯款資料', output: '繳款單（P單）', system: '網路銀行', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar03-2', name: 'Step 2: 核對繳款單金額', description: '摘要、責任中心、計畫編號與匯款一致', role: '行政處出納組', input: '繳款單（P單）、銀行匯款單', output: '核對確認結果', system: '財務系統（COF2100 繳款通知單、COF2110 (新)繳款通知單、GLF3200 立沖帳明細查詢、GLF3700 會計科目明細查詢）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar03-3', name: 'Step 3: 進入收款沖銷功能', description: '輸入繳款單號完成沖銷，或作暫收款，借貸相等後，產生傳票。若有需要再去開立發票流程開發票，列印電子發票檢查表。', role: '行政處出納組', input: '繳款單（P單）', output: '傳票', system: '財務系統（COF2310 (新)收款沖銷、COF2E10 (新)展覽大樓收款沖銷、COF2700 收款產生傳票處理、COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar03-4', name: 'Step 4: 單據送主管審', description: '附銀行單據與繳款單，先送行政處出納組組長複核，再送會計組長核准', role: '行政處出納組組長', input: '傳票、附件', output: '審核完成之傳票', system: '人工（審核）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar03-5', name: 'Step 5: 查詢傳票是否已過帳', description: '月底時須查詢已製傳票是否過帳', role: '行政處出納組', input: '員工編號、製票日期及帳務日期、是否過帳', output: '傳票狀態', system: '財務系統（GLF3300 製票及傳票號碼查詢）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
    ]
  },
  {
    id: 'AR04', category: '收款票據', title: 'AR04 信用卡收款處理與沖銷', description: '信用卡收款處理與沖銷',
    steps: [
      { id: 'ar04-1', name: 'Step 1: 取得刷卡資料', description: '取得刷卡資料，來源有三：台灣經貿網每日下載前一天刷卡 Excel、現場刷卡機結帳資料、HiTrust 線上刷卡（見 AR09）；查詢對應繳款單號。', role: '行政處出納組', input: '信用卡交易資料', output: '繳款單號 (P單)', system: '前端系統、刷卡機', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar04-2', name: 'Step 2: 選擇收款沖銷功能', description: '手動改為應收信用卡款科目（116104），授權碼填在支票號碼欄位，輸入繳款單號完成沖銷，或作暫收款。', role: '行政處出納組', input: '繳款單（P單）', output: '收款單 (R單)', system: '財務系統（COF2310 (新)收款沖銷、COF2E10 (新)展覽大樓收款沖銷、COF2700 收款產生傳票處理、COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar04-3', name: 'Step 3: 產生傳票及列印發票', description: '產生傳票(COF2700)，及佐證文件，包含：繳單(COF2A10)、發票(COF2E10)、銀行對帳單，電子發票檢查表 (COR4H00)。', role: '行政處出納組', input: '收款單 (R單)', output: '傳票檢查表 (W單) 及發票', system: '財務系統（COF2700 收款產生傳票處理、COR4H00 電子發票檢查表、COF2A10 通用收款介面轉檔作業、COF2E10 (新)展覽大樓收款沖銷）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar04-4', name: 'Step 4: 送主管審核', description: '送主管審核', role: '行政處出納組組長', input: '傳票', output: '審核完成之傳票', system: '人工（審核）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar04-5', name: 'Step 5: 銀行入帳後進入兌現處理功能', description: '查詢應收信用卡款，輸入實際入帳金額與手續費', role: '行政處出納組', input: '銀行入帳資料', output: '兌現傳票', system: '財務系統（NTF2400 託收票據卡兌現）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar04-6', name: 'Step 6: 列印傳票送主管審核', description: '列印傳票送主管審核', role: '行政處出納組組長', input: '兌現傳票', output: '審核完成之傳票', system: '人工（審核）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'AR05', category: '收款票據', title: 'AR05 代收檔案處理與沖銷', description: '代收檔案處理與沖銷',
    steps: [
      { id: 'ar05-1', name: 'Step 1: 下載代收轉檔檔案', description: '從網銀下載代收檔，選擇收款介面轉檔作業匯入，系統自動產生 R 單；核對轉檔金額與銀行對帳單金額，台銀入帳時直接扣手續費（每筆 12 元），於折讓明細輸入手續費科目。', role: '行政處出納組', input: '代收轉檔檔案', output: '收款單 (R單)', system: '財務系統（COF2A00 會議中心收款介面轉檔）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar05-2', name: 'Step 2: 完成沖銷，產生傳票', description: '有對應繳款單就輸入繳款單號完成沖銷，其他作暫收款；若有需要再去開立發票流程開發票。', role: '行政處出納組', input: '收款單 (R單)', output: '傳票檢查表 (W單)', system: '財務系統（COF2A00 會議中心收款介面轉檔、COF2700 收款產生傳票處理、COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar05-3', name: 'Step 3: 送主管審核', description: '送主管審核', role: '行政處出納組組長', input: '傳票檢查表 (W單)', output: '審核完成之傳票', system: '人工（審核）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'AR06', category: '收款票據', title: 'AR06 有設算息之收款款項處理與沖銷', description: '有設算息之收款款項處理與沖銷',
    steps: [
      { id: 'ar06-1', name: 'Step 1: 選擇展覽大樓收款沖銷功能', description: '查詢繳單(COF2A10)後，進行沖銷作業 (COF2E10) 輸入借方金額與貸方沖銷P單 (含設算息)，現場開立發票', role: '行政處出納組', input: '現場收款金額/繳款單 (P單)', output: '收款單 (R單)', system: '財務系統（COF2A10 通用收款介面轉檔作業、COF2E10 (新)展覽大樓收款沖銷）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar06-2', name: 'Step 2: 產生傳票及列印發票', description: '產生傳票(COF2700)，及佐證文件，包含：繳單(COF2A10)、發票(COF2E10)、銀行對帳單，電子發票檢查表 (COR4H00)。', role: '行政處出納組', input: '收款單 (R單)', output: '傳票檢查表 (W單)、收據/發票', system: '財務系統（COF2E10 (新)展覽大樓收款沖銷、COF2700 收款產生傳票處理、COR4H00 電子發票檢查表、COF2A10 通用收款介面轉檔作業）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar06-3', name: 'Step 3: 傳票送主管審核', description: '傳票送主管審核', role: '行政處出納組組長', input: '傳票', output: '審核完成之傳票', system: '人工（審核）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'AR07', category: '收款票據', title: 'AR07 利息帳務處理', description: '利息帳務處理',
    steps: [
      { id: 'ar07-1', name: 'Step 1: 選擇直接收款沖銷功能', description: '輸入金額、摘要、科目、發票號碼', role: '行政處出納組', input: '特殊款項資料', output: '沖銷明細', system: '財務系統（COF2500 直接收款沖銷）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar07-2', name: 'Step 2: 若涉及匯兌損益', description: '在折讓明細輸入相關金額，檢查借貸平衡，完成沖銷產生收款傳票檢查表', role: '行政處出納組', input: '沖銷明細', output: '收款傳票檢查表', system: '財務系統（COF2500 直接收款沖銷、COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar07-3', name: 'Step 3: 傳票送主管審核', description: '傳票送主管審核', role: '行政處出納組組長', input: '收款傳票檢查表', output: '審核完成之收款傳票檢查表', system: '人工（審核）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'AR08', category: '收款票據', title: 'AR08 收款製票還原', description: '收款製票還原',
    steps: [
      { id: 'ar08-1', name: 'Step 1: 回到沖銷程式，按製票還原', description: '按製票還原', role: '行政處出納組', input: '收款R單', output: '製票W單被消除', system: '財務系統（COF2310 (新)收款沖銷、COF2E10 (新)展覽大樓收款沖銷、COF2500 直接收款沖銷）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR09', category: '收款票據', title: 'AR09 信用卡線上刷卡自動化', description: '信用卡收款處理與沖銷',
    steps: [
      { id: 'ar09-1', name: 'Step 1: 收電子信件取得 R單及W單', description: '亦可赴介面檔看W單號 /確認帳務無誤', role: '行政處出納組', input: 'W單號', output: '傳票檢查表', system: '財務系統（GLR4100 傳票檢查表）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar09-2', name: 'Step 2: 取號列印發票', description: '列印發票,及待發票上傳後列印電子發票檢查表。', role: '行政處出納組', input: '傳票檢查表', output: '應收信用卡款傳票', system: '財務系統（COR4A00 列印發票、COF2610 (新)發票處理--拆印,作廢重開、COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar09-3', name: 'Step 3: 送主管審核', description: '送主管審核', role: '行政處出納組組長', input: '傳票', output: '審核完成之傳票', system: '人工（審核）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar09-4', name: 'Step 4: 銀行入帳後進入兌現處理功能', description: '查詢應收信用卡款，輸入實際入帳金額與手續費（流程與AR04相同）', role: '行政處出納組', input: '銀行入帳資料', output: '兌現傳票', system: '財務系統（NTF2400 託收票據卡兌現）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'ar09-5', name: 'Step 5: 列印傳票送主管審核', description: '列印傳票送主管審核（流程與AR04相同）', role: '行政處出納組組長', input: '兌現傳票', output: '審核完成之傳票', system: '人工（審核）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'AR10', category: '收款票據', title: 'AR10 三聯式收銀機作帳流程', description: '三聯式收銀機作帳流程',
    steps: [
      { id: 'ar10-1', name: 'Step 1: 發票號碼鍵檔(每兩個月一次)', description: '選擇新增發票號碼(每兩個月一次)', role: '行政處出納組', input: '發票號碼區段', output: '已建檔之發票號碼', system: '財務系統（COF1100 使用發票號碼輸入）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar10-2', name: 'Step 2: 三聯式收銀機完成交易後下載交易檔案，交給作帳人員', description: '確認檔案格式正確', role: '業務單位（收銀機使用人員）', input: '—', output: '收銀機交易檔', system: '收銀機/POS系統', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar10-3', name: 'Step 3: 進入直接收款沖銷作帳', description: '匯入每日交易檔至財務系統，產生並檢查貸方沖銷資料，再輸入借方活期存款科目，借貸相等，R單就完成了', role: '行政處出納組、企財處（辦事處）', input: '收銀機交易檔', output: '貸方沖銷資料、借方人工KEY入', system: '財務系統（COF2500 直接收款沖銷）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar10-4', name: 'Step 4: 產生傳票檢查表', description: '檢查借方與貸方科目、金額', role: '行政處出納組', input: '沖銷清單', output: '傳票', system: '財務系統（COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar10-5', name: 'Step 5: 傳票附報表送審', description: '收銀機交易報表、列印併送主管', role: '行政處出納組組長', input: '傳票', output: '審核完成之傳票', system: '人工（審核）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'ar10-6', name: 'Step 6: 收銀機每月發票資料匯出', description: '收銀機使用單位人員匯出收銀機每月發票資料，並交給作帳人員', role: '業務單位（收銀機使用人員）', input: '—', output: '收銀機發票資料檔', system: '收銀機/POS系統', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar10-7', name: 'Step 7: 收銀機發票資料匯入財務系統', description: '收銀機發票資料匯入財務系統', role: '行政處出納組、企財處（辦事處）', input: '收銀機發票資料檔', output: '收銀機發票資料(財務系統)', system: '財務系統（COF2D00 電子/人工收銀機每月發票號碼轉檔、COR4C00 收銀機發票清單）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar10-8', name: 'Step 8: 月底輸入空白票號', description: '月底輸入空白票號，以利營業稅報稅', role: '行政處出納組', input: '空白票號區間', output: '空白票號資料', system: '財務系統（GLF2B00 電子收銀機發票處理）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar10-9', name: 'Step 9: 財務系統收銀機報表列印', description: '財務系統收銀機報表列印', role: '行政處出納組', input: '收銀機號碼、日期間', output: '報表', system: '財務系統（COR4C00 收銀機發票清單）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR11', category: '收款票據', title: 'AR11 二聯式收銀機作帳流程', description: '二聯式收銀機作帳流程',
    steps: [
      { id: 'ar11-1', name: 'Step 1: 發票號碼鍵檔(每兩個月一次)', description: '選擇新增發票號碼(每兩個月一次)', role: '行政處出納組', input: '發票號碼區段', output: '已建檔之發票號碼', system: '財務系統（COF1100 使用發票號碼輸入）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar11-2', name: 'Step 2: 二聯式收銀機完成交易後，每日紙本報表與相關單據，交給作帳人員', description: '二聯式收銀機完成交易後，將紙本報表與相關單據，交給作帳人員', role: '業務單位（收銀機使用人員）', input: '交易資料', output: '結算條/發票報表', system: '收銀機/POS系統', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar11-3', name: 'Step 3: 進入直接收款沖銷作帳', description: '檢查及核對報表資料跟銀行對帳單，進入直接收款沖銷作帳，輸入使用發票號碼區間，借方輸入金額，貸方輸入指定的工作計畫、科目及摘要，借貸相等，R單就完成', role: '行政處出納組', input: '入帳金額及交易資料', output: '收款R單', system: '財務系統（COF2500 直接收款沖銷）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar11-4', name: 'Step 4: 產生傳票檢查表', description: '檢查借方與貸方科目、金額', role: '行政處出納組', input: '沖銷清單', output: '傳票', system: '財務系統（COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar11-5', name: 'Step 5: 傳票附報表送審', description: '傳票附收銀機交易報表、收銀機發票資料清單，送主管審核', role: '行政處出納組組長', input: '傳票', output: '審核完成之傳票', system: '人工（審核）、財務系統（COR4C00 收銀機發票清單）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'ar11-6', name: 'Step 6: 月底輸入空白票號', description: '月底輸入空白票號，以利營業稅報稅', role: '行政處出納組', input: '空白票號區間', output: '空白票號資料', system: '財務系統（GLF2B00 電子收銀機發票處理）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR12', category: '收款票據', title: 'AR12 發票開立流程', description: '發票開立流程',
    steps: [
      { id: 'ar12-1', name: 'Step 1: 發票號碼鍵檔', description: '選擇新增發票號碼(每兩個月一次)', role: '行政處出納組', input: '發票號碼區段', output: '已建檔之發票號碼', system: '財務系統（COF1100 使用發票號碼輸入）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar12-2', name: 'Step 2: 開立發票', description: '經收款或票據沖銷流程，每張發票有暫時V單號，輸入V單號開立發票，系統以正式發票號碼取代V單', role: '行政處出納組', input: '暫時性發票號碼 (V單)', output: '電子發票、手開發票', system: '財務系統（COF2610 (新)發票處理--拆印,作廢重開、COR4A00 列印發票、GLF2800 發票補輸入、COF2E10 (新)展覽大樓收款沖銷）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar12-3', name: 'Step 3: 如為電子發票，須上傳至國稅局平台', description: '每日會有三次批次上傳(11AM、04PM、09PM)，若有特殊情形，可另按立即上傳將發票送至電子發票平台', role: '行政處出納組', input: '待上傳發票', output: '上傳完成之發票', system: '財務系統（COF2620 即時發票處理）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'ar12-4', name: 'Step 4: 列印電子發票檢查表', description: '上傳後，列印電子發票檢查表，確認回饋狀態為C成功，附在最初的收款或票據流程文件中，送主管覆核', role: '行政處出納組', input: '單位/傳票號碼/發票日期', output: '電子發票檢查表', system: '財務系統（COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
      { id: 'ar12-5', name: 'Step 5: 上傳若有異常', description: '上傳若有異常，可下載報表查詢，亦須詢問系統工程師', role: '行政處出納組', input: '—', output: '報表', system: '財務系統（COR4I00 電子發票異常檢核表）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR13', category: '收款票據', title: 'AR13 作廢發票流程(過帳前)', description: '作廢發票流程(過帳前)',
    steps: [
      { id: 'ar13-1', name: 'Step 1: 作廢發票', description: '選擇需作廢的發票號碼，選擇作廢原因確認，系統將原發票轉為V單，列印作廢發票上傳平台成功的電子發票檢查表', role: '行政處出納組', input: '發票號碼', output: 'V單號', system: '財務系統（COF2610 (新)發票處理--拆印,作廢重開、COR4H00 電子發票檢查表、GLF2800 發票補輸入）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR14', category: '收款票據', title: 'AR14 發票拆分', description: '發票拆分',
    steps: [
      { id: 'ar14-1', name: 'Step 1: 若需拆分', description: '點選拆分明細新增資料，手動修改序號及金額，確保拆分後總額一致，確認後列印新發票，列印電子發票檢查表', role: '行政處出納組', input: 'V單號', output: '拆分後之新發票', system: '財務系統（COF2610 (新)發票處理--拆印,作廢重開、COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'AR15', category: '收款票據', title: 'AR15 發票品名維護', description: '發票品名維護',
    steps: [
      { id: 'ar15-1', name: 'Step 1: 進入基本資料建檔功能', description: '新增或修改發票品名，確認符合營業項目，儲存後系統於開立繳款單時帶入更新品名', role: '行政處出納組', input: '維護需求', output: '更新後品名資料', system: '財務系統（COF1200 發票品名維護）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料', '2nd訪談'] },
    ]
  },
  {
    id: 'AR16', category: '收款票據', title: 'AR16 發票郵寄清冊列印', description: '發票郵寄清冊列印',
    steps: [
      { id: 'ar16-1', name: 'Step 1: 列印郵寄清冊', description: '輸入日期以及勾選須寄出的發票資料', role: '行政處出納組', input: '發票日期區間、發票單位', output: '郵寄清冊', system: '財務系統（NTR4A00 發票郵件清單）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar16-2', name: 'Step 2: 送郵寄室', description: '送郵寄室郵寄', role: '行政處出納組', input: '發票跟郵寄清冊', output: '紀錄掛號單的郵寄清冊', system: '人工', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR17', category: '收款票據', title: 'AR17 預開發票流程', description: '預開發票流程',
    steps: [
      { id: 'ar17-1', name: 'Step 1: 接獲廠商(政府)通知，簽請企財處預開發票', description: '業務單位接獲廠商通知（如政府單位需先有發票才能請款），以文案系統送「作廢銷貨折讓重開發票退費申請表」，簽請企財處預開發票', role: '業務單位', input: '廠商通知', output: '公文', system: '人工、文案系統', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar17-2', name: 'Step 2: 預開發票帳務處理', description: '於繳款通知單確認（COF2200）輸入繳款單條件，勾選要預開的繳款單，產生 N 單（其他應收款，帶出繳款單號）；以 N 單製票（COF2700），列印傳票並過帳後送行政處出納組。須用 N 單，不可用收款沖銷（COF2300）開 R 單，否則前端（如場館系統）會判定為已收款。', role: '企財處', input: '公文', output: '已過帳之傳票', system: '財務系統（COF2200 繳款通知單確認、COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar17-3', name: 'Step 3: 根據傳票開立發票', description: '根據傳票開立發票，並列印電子發票檢查表，通知業務單位承辦人', role: '行政處出納組', input: '已過帳之傳票', output: '發票', system: '財務系統（COF2610 (新)發票處理--拆印,作廢重開、COR4A00 列印發票、COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR18', category: '收款票據', title: 'AR18 作廢發票帳務處理(已過帳之傳票)', description: '已過帳之傳票作廢發票流程',
    steps: [
      { id: 'ar18-1', name: 'Step 1: 接獲廠商通知，簽請企財處作廢發票', description: '業務單位接獲廠商通知，以文案系統送「作廢銷貨折讓重開發票退費申請表」，簽請企財處作廢發票', role: '業務單位', input: '廠商通知', output: '公文', system: '人工、文案系統', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar18-2', name: 'Step 2: 作廢發票帳務處理(已過帳之傳票)', description: '有繳款單的發票，於銷貨退回處理（COF2800）輸入發票號碼，帶出收款人與銷退明細，承辦人自行輸入；確認時系統詢問「是否作廢」，選「是」，產生 U 單後製票（COF2700）、過帳，傳票送行政處出納組。作廢後發票加作廢註記，可於發票補輸入（GLF2800）查「是否作廢」確認。限發票與帳務日期同月份，跨月只能折讓（AR19）。', role: '企財處', input: '公文', output: '已過帳之傳票', system: '財務系統（COF2800 銷貨退回處理、COF2700 收款產生傳票處理、GLF2800 發票補輸入）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar18-3', name: 'Step 3: 根據傳票列印電子發票檢查表', description: '根據傳票列印電子發票檢查表(確認作廢上傳)', role: '行政處出納組', input: '已過帳之傳票', output: '電子發票檢查表', system: '財務系統（COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR19', category: '收款票據', title: 'AR19 折讓發票流程', description: '折讓發票流程',
    steps: [
      { id: 'ar19-1', name: 'Step 1: 接獲廠商通知，簽請企財處折讓發票', description: '業務單位接獲廠商通知，以文案系統送「作廢銷貨折讓重開發票退費申請表」，簽請企財處折讓發票', role: '業務單位', input: '廠商通知', output: '公文', system: '人工、文案系統', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar19-2', name: 'Step 2: 折讓發票帳務處理', description: '於銷貨退回處理（COF2800）輸入發票號碼，確認時「是否作廢」選「否」即為銷退（折讓），產生 U 單後製票（COF2700）、過帳，傳票送行政處出納組；可於發票補輸入（GLF2800）明細區確認銷退稅額有數字。', role: '企財處', input: '公文', output: '已過帳之傳票', system: '財務系統（COF2800 銷貨退回處理、COF2700 收款產生傳票處理、GLF2800 發票補輸入）', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'ar19-3', name: 'Step 3: 根據傳票列印電子發票檢查表', description: '根據傳票列印電子發票檢查表(確認折讓上傳)', role: '行政處出納組', input: '已過帳之傳票', output: '電子發票檢查表', system: '財務系統（COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'AR20', category: '收款票據', title: 'AR20 收款結算(Q)', description: '收款結算(Q)',
    steps: [
      { id: 'ar20-1', name: 'Step 1: 判斷結算情境', description: '依收款性質判斷屬於退保證金（含履約保證金）、場館／展場結算、會內對開或撤票等情境，選擇對應情境進入收款結算(Q)畫面處理；並非每一種收款都會用到Q', role: '企財處', input: '繳款單(P單)', output: '結算情境判斷', system: '財務系統（COF2400 彙總繳款通知單）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar20-2', name: 'Step 2: 退保證金－系統自動計算應退金額', description: '輸入單位、P單號，系統先判斷該批單是否已收款，再依科目性質計算應退金額：屬收入科目者顯示於收入區塊，屬保證金科目（非收入）者僅顯示於應退金額欄位。結算後，製作傳票 (W單)。', role: '企財處', input: '繳款單(P單)、發票單位', output: '應退金額、結算單號(Q單)、結算製票 (W單)', system: '財務系統（COF2400 彙總繳款通知單、COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar20-3', name: 'Step 3: 場館結算－多批單合併輸入計算應補繳/應退', description: '輸入單位、多張P單號，可逐張輸入確認，系統帶出各P單下場地、設備、水電等收入科目明細，點擊結算後自動帶出預繳金額、收入合計，並計算應補繳或應退金額。結算後，製作傳票 (W單)。', role: '企財處', input: '繳款單(P單，多張)', output: '應補繳/應退金額、結算單號(Q單)、結算製票 (W單)', system: '財務系統（COF2400 彙總繳款通知單、COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar20-4', name: 'Step 4: 場館結算應補繳金額之後續處理', description: '若結算判斷有應補繳金額，結算後到產生傳票處理（COF2700）製票，系統自動產生一張新P單（科目：其他應收款 115104）、V單號，製票時同時產生批單與發票（掛應收），不必等廠商繳款；系統產生的P單自動帶出承辦人、責任中心（總帳可改），可印出隨公文送出', role: '企財處', input: '應補繳金額', output: '新繳款單(P單)、應收傳票', system: '財務系統（COF2400 彙總繳款通知單、COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar20-5', name: 'Step 5: 場館結算應退金額之後續處理', description: '若結算判斷有應退金額，且先前已收款並開立發票，須做銷貨退回處理(COF2800)。輸入發票號碼、結算單號，系統自動將結算單號與該發票連結，產生銷退單號（U單）', role: '企財處', input: '結算資料、原發票號碼', output: '銷退單號 (U單)', system: '財務系統（COF2800 銷貨退回處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar20-6', name: 'Step 6: 會內對開發票之帳務結算', description: '會內對開（不實際收付款）僅需將P單「Q」起來做記號即可，不需另外處理傳票', role: '企財處', input: '繳款單(P單)', output: '結算單號 (Q單)', system: '財務系統（COF2400 彙總繳款通知單）', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },
  {
    id: 'AR21', category: '收款票據', title: 'AR21 三聯式收銀機作帳流程-地方辦事處', description: '三聯式收銀機作帳流程-地方辦事處',
    steps: [
      { id: 'ar21-1', name: 'Step 1: 辦事處郵寄收入帳資料', description: '每月月初，辦事處將上個月的收入帳郵寄給企財處，核對以下資料：收銀機交易檔 (.txt)、收入明細表、\n買斷書月分攤表及銷售月報表、\n代銷書月分攤表及銷售月報表、\n代銷書進書單據應稅類結帳表、\n代銷書進書單據免稅類結帳表、\n會內書月分攤表及銷售月報表、\n發票作廢明細表、\n統一發票明細表、\n日帳條、\n佣金收入交易檔 (.txt，如果有)', role: '地方辦事處（臺中、臺南、高雄）', input: '-', output: '-', system: '人工', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar21-2', name: 'Step 2: 轉入收銀機交易檔 (.txt)', description: '輸入帳務資料，轉入收銀機交易檔後，系統會自動產生收款單號 (R單)、貸方合計、沖銷明細，需再輸入借方資料 (收款科目-115104 其他應收款、幣別、收款金額)，確認借貸平衡', role: '企財處', input: '帳務日期 (上個月的最後一天)、發票單位、收款種類 (4. 電收銀機)、收款人員編、責任單位、計畫年度', output: '收款單號 (R單)、貸方合計、沖銷明細 (含P單號)', system: '財務系統（COF2500 直接收款沖銷）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar21-3', name: 'Step 3: 收款製票', description: '輸入製票資料產生傳票，修改每一筆會計科目對應的摘要內容', role: '企財處', input: '製票人員 (收款人)、製票條件 (其他收款單)、R單號', output: '收款傳票檢查表 (W單)', system: '財務系統（COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar21-4', name: 'Step 4: 送主管審核並過帳', description: '收款傳票檢查表送組長、副座審核，審核完畢由財會人員送過帳 (等中午或午夜批次過帳後，\n隔天系統會排程列印傳票)', role: '企財處', input: '收款傳票檢查表 (W單)', output: '已過帳之傳票', system: '財務系統（GLF2200 過帳處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },
  {
    id: 'AR22', category: '收款票據', title: 'AR22 佣金收入作帳流程', description: '佣金收入作帳流程',
    steps: [
      { id: 'ar22-1', name: 'Step 1: 查詢本月是否有佣金收入', description: '每月月初，做完辦事處收入帳後，代銷書會入227104-代收承銷款。先以會計科目明細查詢是否有這筆收入，並核對金額是否正確。', role: '企財處', input: '會計科目(227104)、帳務起迄日、責任中心', output: '227104-代收承銷款明細', system: '財務系統（GLF3700 會計科目明細查詢）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar22-2', name: 'Step 2: 轉入佣金收入交易檔 (.txt)', description: '核對以下資料：佣金收入交易檔 (.txt)、代銷書月分攤表及銷售月報表、代銷書進書單據免稅類結帳表、代銷書進書單據應稅類結帳表。\n輸入帳務資料，轉入佣金收入交易檔後，系統會自動製票。', role: '企財處', input: '店名 (年度+門市店號+計畫+預算項目+責任中心)、帳務日期 (次月的第一天)', output: '收款傳票檢查表 (W單)', system: '財務系統（COF2C00 廠商佣金轉檔）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar22-3', name: 'Step 3: 送主管審核並過帳後', description: '收款傳票檢查表送組長、副座審核，審核完畢由財會人員送過帳，列印傳票', role: '企財處', input: '收款傳票檢查表 (W單)', output: '已過帳之傳票', system: '財務系統（GLF2200 過帳處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar22-4', name: 'Step 4: 傳票送出納開發票，再送回企財', description: '接收已過帳之傳票，開立正式發票號碼，檢查發票上傳成功後，傳票再刷送回企財', role: '行政處出納組', input: '已過帳之傳票', output: '發票號碼', system: '財務系統（GLF2H00 傳票控管(12碼)、COF2610 (新)發票處理--拆印,作廢重開、COR4A00 列印發票、COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },
  {
    id: 'AR23', category: '收款票據', title: 'AR23 二聯式收銀機作帳流程-地方辦事處', description: '二聯式收銀機作帳流程-地方辦事處',
    steps: [
      { id: 'ar23-1', name: 'Step 1: 新增空白票號', description: '每月月初，辦事處 (桃園、新竹) 將上個月的收入帳郵寄給企財處，核對以下資料：收入明細表、統一發票明細表、營業人使用二聯式收銀機統一發票明細表、作廢發票影本 (如果有)', role: '企財處', input: '空白票起訖號碼、發票日期 (上個月的最後一天)、收銀機代號、稅籍單位', output: '空白票資料', system: '財務系統（GLF2B00 電子收銀機發票處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar23-2', name: 'Step 2: 進入直接收款沖銷作帳', description: '檢查及核對報表資料跟銀行對帳單，進入直接收款沖銷作帳，輸入收入科目 (115104)、收款金額，填寫摘要，完成R單', role: '企財處', input: '帳務日期 (上個月的最後一天)、發票單位、收款種類 (3. 人收銀機)、發票起訖號碼、收款人員編、統制單位', output: '收款單號 (R單)、沖銷明細 (含P單號)', system: '財務系統（COF2500 直接收款沖銷）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar23-3', name: 'Step 3: 新增作廢號碼', description: '產生R單號後，依辦事處提供的作廢發票，輸入作廢號碼', role: '企財處', input: '作廢號碼', output: '作廢發票號碼', system: '財務系統（COF2500 直接收款沖銷）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar23-4', name: 'Step 4: 收款製票', description: '輸入製票資料產生傳票', role: '企財處', input: '製票人員 (收款人)、製票條件 (其他收款單)、R單號', output: '收款傳票檢查表 (W單)', system: '財務系統（COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'ar23-5', name: 'Step 5: 核對發票資料清單', description: '列印收銀機發票資料清單，確認剛輸入空白票起訖資料皆正確', role: '企財處', input: '收銀機編號、發票日 (上個月的最後一天)', output: '收銀機發票資料清單', system: '財務系統（COR4C00 收銀機發票清單）', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },
  {
    id: 'BIL01', category: '收款票據', title: 'BIL01 人工託收票據收款與兌現流程', description: '人工託收票據收款與兌現流程',
    steps: [
      { id: 'bil01-1', name: 'Step 1: 人工託收票據R單立帳', description: '輸入支票號碼、支票銀行、支票帳號、金額、銀行、到期日，選擇科目「託收票據」，列印託收票據明細表', role: '行政處出納組', input: '即/遠期支票', output: '收款R單', system: '財務系統（COF2310 (新)收款沖銷、COF2E10 (新)展覽大樓收款沖銷）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil01-2', name: 'Step 2: 完成沖銷產生傳票', description: '列印票據影本，附上託收票據明細表、收入認列之傳票送主管審核', role: '行政處出納組', input: '收款R單', output: '託收票據明細表、收入認列之傳票', system: '財務系統（NTR4B00 託收票據明細表、COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bil01-3', name: 'Step 3: 每日檢查票據到期', description: '進入到期處理功能，系統自動認列收入及設算利息，並產生發票資訊、收入認列之傳票 (W單自動產生)，列印發票、託收票據明細表', role: '行政處出納組', input: '到期票據', output: '收入認列之傳票、發票、託收票據明細表', system: '財務系統（NTF2E00 遠期票到期產生傳票、COR4A00 列印發票、NTR4B00 託收票據明細表）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bil01-4', name: 'Step 4: 查詢託收票據', description: '於票據資料與製票號碼查詢，查詢已託收票據，列印託收票據明細表', role: '行政處出納組', input: '票據資料', output: '已託收之票據清單', system: '財務系統（NTF3200 票據資料與製票號碼查詢、NTR4B00 託收票據明細表）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil01-5', name: 'Step 5: 到期傳票異常時', description: '當原始票據異動後導致遠期到期資料出現異常需修正時，要還原遠期到期傳票後重新製票', role: '行政處出納組', input: '到期票據', output: '到期傳票', system: '財務系統（NTF2E00 遠期票到期產生傳票）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil01-6', name: 'Step 6: 銀行兌現後進入兌現處理功能', description: '輸入實際入帳金額，若有手續費輸入科目，列印兌現傳票， 列印託收票據明細表，確認所有票據狀態為「兌現」', role: '行政處出納組', input: '兌現票據', output: '兌現傳票', system: '財務系統（NTF2400 託收票據卡兌現、NTR4B00 託收票據明細表）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'BIL02', category: '收款票據', title: 'BIL02 批量託收票據收款與兌現流程', description: '批量託收票據收款與兌現流程',
    steps: [
      { id: 'bil02-1', name: 'Step 1: 核對銀行代收票據資料 (USB檔)', description: '由廠商自行至銀行繳交支票，銀行製作TXT檔案給我們轉檔。銀行會提供之三項資料供核對 (txt檔、小白單、期票作業明細表)', role: '行政處出納組', input: '-', output: '-', system: '人工', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bil02-2', name: 'Step 2:票據轉檔，匯入財務系統', description: '選取『代收票據轉檔」、輸入批號及帳務日期、代收帳戶，匯入TXT檔，系統產生託收票據資料，若有即期票則傳票內會有需開立發票的資訊', role: '行政處出納組', input: '銀行託收TXT檔', output: '託收票據清單、託收票據傳票檢查表(W)', system: '財務系統（COF2A00 會議中心收款介面轉檔、COR4A00 列印發票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bil02-3', name: 'Step 3: 列印託收票據明細表', description: '輸入製票號碼 (W單)，產生託收票據明細表，確認所有票據狀態為「託收」。檢附託收票據清單及明細表，給主管覆核。(但有做兌現時，則自動由「託收」改為「兌現」字樣)', role: '行政處出納組', input: '託收票據清單、託收票據傳票檢查表(W)', output: '託收票據明細表', system: '財務系統（NTR4B00 託收票據明細表）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bil02-4', name: 'Step 4: 每日檢查票據到期', description: '進入到期處理功能，系統自動認列收入及設算利息，並產生發票資訊、收入認列之傳票 (W單自動產生)，列印發票、託收票據明細表', role: '行政處出納組', input: '到期票據', output: '收入認列之傳票、發票、託收票據明細表', system: '財務系統（NTF2E00 遠期票到期產生傳票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bil02-5', name: 'Step 5: 取得銀行兌現TXT檔', description: '進入兌現處理，匯入TXT檔，產生銀行兌現處理訊儀表。若系統更新狀態為兌現(C)，列印兌現傳票。若系統更新狀態為F，將視同次交票，做直接沖銷。', role: '行政處出納組', input: '銀行兌現TXT檔', output: '銀行兌現處理訊息表', system: '財務系統（NTF2F00 銀行兌現媒體轉財務系統）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bil02-6', name: 'Step 6: 列印託收票據明細表', description: '列印託收票據明細表，確認所有票據狀態為「兌現」，回頭補印遠期到期所產生的託收票據明細表(由「託收」轉為「兌現」)', role: '行政處出納組', input: '託收票據清單、託收票據傳票檢查表(W)', output: '託收票據明細表', system: '財務系統（NTR4B00 託收票據明細表）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'bil02-7', name: 'Step 7: 完成兌現產生沖銷分錄', description: '修改帳務日期為銀行兌現日，產生沖銷分錄，\n借銀行存款/手續費，貸託收票據', role: '行政處出納組', input: '銀行兌現日', output: '兌現傳票', system: '財務系統（NTF2C00 撤票,退票產生傳票作業）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'BIL03', category: '收款票據', title: 'BIL03 託收票據退票作業流程', description: '託收票據退票作業流程',
    steps: [
      { id: 'bil03-1', name: 'Step 1: 收到銀行退票通知', description: '收到銀行退票通知，聯絡業務單位詢問廠商是否補款。', role: '行政處出納組', input: '—', output: '—', system: '人工', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bil03-2', name: 'Step 2: 若廠商願意補款', description: '若廠商願意補款，則依照原本人工託收票據流程做兌現。(流程回到BIL01-Step 1.)', role: '行政處出納組', input: '—', output: '—', system: '財務系統（COF2310 (新)收款沖銷、COF2E10 (新)展覽大樓收款沖銷、NTR4B00 託收票據明細表、COF2700 收款產生傳票處理、NTF2E00 遠期票到期產生傳票、NTF3200 票據資料與製票號碼查詢、NTF2400 託收票據卡兌現）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil03-3', name: 'Step 3: 若廠商不願意補款', description: '若廠商不願意補款，則行政處出納組須做兩件事：\n1.寫簽給企財處，申請作廢到期自動跑出的發票及製作退票傳票\n2.寫簽給業務單位，請業務單位做後續稽催等法律程序', role: '行政處出納組', input: '—', output: '便簽給企財處、業務單位', system: '文案系統', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil03-4', name: 'Step 4: 退票帳務處理', description: '企財進行退票作業 (NTF2200)，輸入票據號碼、存入帳戶簡碼、票面銀行，轉為應收帳款，並做退票傳票 (NTF2C00)。將兌現發票(當月)進行作廢(COF2800)，並產生作廢發票傳票。', role: '企財處', input: '出納組及業務單位便簽、退票單據', output: '應收帳款傳票、作廢發票傳票', system: '財務系統（NTF2200 退票作業、NTF2C00 撤票,退票產生傳票作業、COF2800 銷貨退回處理、COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil03-5', name: 'Step 5: 確認作廢發票已上傳至平台', description: '出納刷送傳票後，列印電子發票檢查表，確認作廢發票是否上傳至國稅局平台', role: '行政處出納組', input: '退票傳票號碼', output: '電子發票檢查表', system: '財務系統（COR4H00 電子發票檢查表）', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },
  {
    id: 'BIL04', category: '收款票據', title: 'BIL04 託收票據撤票作業流程', description: '託收票據撤票作業流程',
    steps: [
      { id: 'bil04-1', name: 'Step 1: 收到廠商解約通知', description: '收到廠商解約通知，業務單位簽請企財處做撤票帳務', role: '業務單位', input: '廠商解約通知', output: '撤票申請之便簽', system: '文案系統', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil04-2', name: 'Step 2: 撤票帳務處理', description: '進行撤票作業並過帳，產生撤票傳票檢查表，送至行政處出納組。', role: '企財處', input: '撤票申請之便簽', output: '已過帳之撤票傳票檢查表', system: '文案系統、財務系統（COF2400 彙總繳款通知單、COF2700 收款產生傳票處理）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil04-3', name: 'Step 3: 填寫撤票申請單及用印', description: '填寫票據撤票申請單及用印(行政處出納組組長、行政處處長、主辦會計、秘書長四顆印章)', role: '行政處出納組', input: '託收票據資料 (託收編號留空)', output: '已用印之撤票申請單', system: '人工（票據撤票申請暨領取證）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil04-4', name: 'Step 4: 拿到支票後，聯絡承辦人', description: '拿到支票後，聯絡承辦人，請承辦人做後續處理 (支票隨函寄給廠商，或廠商須攜帶大小章來領支票)', role: '行政處出納組、業務單位', input: '—', output: '—', system: '人工', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'bil04-5', name: 'Step 5: 若撤票後又回存原支票', description: '若撤票後又回存原支票，先寫issue log 修改支票號碼+A做區別，再回到人工託收票據流程(BIL01-Step 1.)做託收與兌現 (前端須提供新繳單，出納才能沖銷)。', role: '行政處出納組', input: '輸入+A支票號碼、新繳單(P單)', output: '—', system: '財務系統（COF2310 (新)收款沖銷、COF2E10 (新)展覽大樓收款沖銷、NTR4B00 託收票據明細表、COF2700 收款產生傳票處理、NTF2E00 遠期票到期產生傳票、NTF3200 票據資料與製票號碼查詢、NTF2400 託收票據卡兌現）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },

  // ===========================================================================
  // 營業稅 (VAT) - VAT01–VAT03（xlsx v3）
  // ===========================================================================
  {
    id: 'VAT01', category: '營業稅', title: 'VAT01 銷項發票檢核與申報流程', description: '銷項發票檢核與申報',
    steps: [
      { id: 'vat01-1', name: 'Step 1: 申報前完成過帳提醒', description: '雙月月底前由會計與出納完成銷項相關帳的過帳；出納於前月最後一天 email 提醒，截止日約為申報期限前一週。', role: '行政處出納組', input: '營業稅申報期限', output: '過帳提醒通知、各單位完成過帳', system: 'Email（人工）、財務系統（GLF2200 過帳處理）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-2', name: 'Step 2: 從國稅局平台下載電子發票報表', description: '至國稅局電子發票整合服務平台下載電子發票報表，供後續與系統報表核對。', role: '行政處出納組', input: '—', output: '平台電子發票報表', system: '國稅局電子發票整合服務平台', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-3', name: 'Step 3: 調出系統電子發票檢查表及進銷項媒體申報檢查表', description: '調出電子發票檢查表（COR4H00，HO 整月）與進銷項媒體申報檢查表（GLR4O00，類別 31–46、一次一個月），匯出 Excel 加總。', role: '行政處出納組', input: '申報月份', output: 'Excel 核對表', system: '財務系統（COR4H00 電子發票檢查表、GLR4O00 媒體申報檢查表）、Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-4', name: 'Step 4: 平台與系統金額核對', description: '將系統報表與平台資料核對：以末號減首號做連號／跳號檢查，並比對有效票金額（確認作廢已上傳）與折讓金額。', role: '行政處出納組', input: '平台電子發票報表、Excel 核對表', output: '核對結果', system: 'Excel、國稅局電子發票整合服務平台', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-5', name: 'Step 5: 調出明細帳及銷項檢查表', description: '由明細分類帳調出銷項稅額科目三份報表（全部、借方、未過帳），並調出銷項檢查表（銷項、收銀機各一次）；確認空白區間已登錄。', role: '行政處出納組', input: '申報月份、銷項稅額科目', output: '各類銷項報表（明細帳三份、銷項檢查表）', system: '財務系統（GLR4300 明細分類帳、GLR4O00 媒體申報檢查表（銷項檢查表）、GLF2B00 電子收銀機發票處理（空白區間登錄））', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-6', name: 'Step 6: 將總額整理到 Excel', description: '從 PDF 報表抓各類發票小計與總額貼到 Excel，加總後與明細帳總額比對。', role: '行政處出納組', input: '各類銷項報表', output: 'Excel 比對表', system: 'Excel（人工）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-7', name: 'Step 7: 若不平：查明原因並調整', description: '明細帳與發票總額不平時，依未過帳（V 單）、跨月錯帳、二聯式收銀機區間事後作廢三種原因查明並調整。', role: '行政處出納組', input: 'Excel 比對表', output: '差異調整結果', system: '財務系統（COR4E00 電子計算機發票清單、GLF2B00 電子收銀機發票處理）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-8', name: 'Step 8: 核對手開發票號碼', description: '以 GLR4O00 調出當月手開發票，轉 Excel 依類別切分區間，以末號減首號檢查是否跳號（與作廢無關）。', role: '行政處出納組', input: 'GLR4O00 當月報表', output: '手開發票號碼核對結果', system: '財務系統（GLR4O00 媒體申報檢查表）、Excel（人工）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-9', name: 'Step 9: 產生媒體檔', description: '檢查無誤後執行 GLR4400 產生當月媒體檔；轉入不完整時查明原因，請財會三組組長解鎖後重轉。', role: '行政處出納組、企財處（財會三組組長解鎖）', input: '核對無誤之帳表', output: '媒體檔', system: '財務系統（GLR4400 進銷項憑証產生媒體作業）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat01-10', name: 'Step 10: 核對營業稅申報表與申報資料明細表', description: '以 GLR4N00 營業稅申報表核對各類別金額，以 GLR4M00 確認空白區間已轉入；不平時比對缺漏的資料。', role: '行政處出納組', input: '媒體檔、Excel 比對表', output: '核對結果', system: '財務系統（GLR4N00 營業稅申報表、GLR4M00 營業稅媒體申報明細表、COR4C00 收銀機發票清單）、Excel（人工）', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },
  {
    id: 'VAT02', category: '營業稅', title: 'VAT02 進項稅額檢查流程', description: '進項稅額檢查',
    steps: [
      { id: 'vat02-1', name: 'Step 1: 檢查未過帳進項稅額', description: '以 GLF3700 查兩個月未過帳進項，通知經辦人過帳或把不急的帳改到下月；轉正式檔前每天追蹤。', role: '企財處', input: '未過帳進項資料', output: '未過帳清單、通知相關人員修改', system: '財務系統（GLF3700 會計科目明細查詢）、Email（人工）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'vat02-2', name: 'Step 2: 檢查已過帳進項稅額', description: '與銷項同步，以已過帳資料產生非正式媒體與申報表，比對 21–23 欄得扣抵稅額與進項稅額科目累計餘額。', role: '企財處', input: '已過帳進項資料', output: '營業稅申報表、帳與媒體差異清單', system: '財務系統（GLR4400 進銷項憑証產生媒體作業、GLR4N00 營業稅申報表、GLF3400 會計科目每月餘額查詢（推定））', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat02-3', name: 'Step 3: 國稅局檢核軟體檢查與修正', description: '將循序表產出的 TXT 檔放入國稅局檢核軟體；異常時以組長權限修改原始憑證，重產再檢直到無誤。', role: '企財處', input: '進項媒體檔（TXT）', output: '檢核結果、修正後媒體檔', system: '國稅局檢核軟體、財務系統（GLR4810 媒體檔產生媒體申報循序檔、GLF2110 進項輸入）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat02-4', name: 'Step 4: 轉正式媒體檔', description: '銷項、進項都確認無誤後，選 HO 產出正式媒體檔。', role: '企財處', input: '確認無誤之銷項、進項媒體資料', output: '正式媒體檔', system: '財務系統（GLR4400 進銷項憑証產生媒體作業、GLR4810 媒體檔產生媒體申報循序檔）', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },
  {
    id: 'VAT03', category: '營業稅', title: 'VAT03 營業稅申報、做帳與光碟流程', description: '營業稅申報、做帳與光碟',
    steps: [
      { id: 'vat03-1', name: 'Step 1: 各單位完成轉檔並確認資料', description: '地方辦事處完成收銀機資料轉檔、確認無誤後，通知營業稅承辦人。', role: '地方辦事處', input: '收銀機發票資料', output: '資料確認完成通知', system: '財務系統（COF2D00 電子/人工收銀機每月發票號碼轉檔）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat03-2', name: 'Step 2: 執行第二支媒體作業（上註記）', description: '營業稅承辦人執行第二支媒體作業，替各單位資料打上媒體註記（非正式檔案），完成後通知會計。', role: '行政處出納組', input: '各單位已確認資料', output: '媒體註記完成通知', system: '財務系統（GLR4400 進銷項憑証產生媒體作業）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat03-3', name: 'Step 3: 會計產生循序檔並放入國稅局軟體', description: '會計（財會）產生循序檔，放入國稅局軟體後產出報表，交給營業稅承辦人。', role: '企財處', input: '媒體註記資料', output: '國稅局軟體報表', system: '財務系統（GLR4810 媒體檔產生媒體申報循序檔）、國稅局檢核軟體', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat03-4', name: 'Step 4: 提供各辦事處申報金額', description: '營業稅承辦人提供各辦事處申報金額，供其向所在地申報；南港申報書由承辦人代填。', role: '行政處出納組', input: '國稅局軟體報表', output: '各單位申報金額', system: '人工', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'vat03-5', name: 'Step 5: 做帳：沖銷進銷項並付款', description: '以傳票處理新增傳票，沖銷進銷項（餘額歸零）並做付款帳，再由出納付款；於填申報書前完成。', role: '企財處、行政處出納組（付款）', input: '進銷項金額', output: '傳票、營業稅款付款', system: '財務系統（GLF2100 傳票處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'vat03-6', name: 'Step 6: 填寫總部申報書', description: '人工加總各單位銷項金額與 HO 進項金額，計算本期應繳稅額，填入總機構申報書。', role: '企財處', input: '各單位申報金額、HO 進項金額', output: '總部申報書', system: '人工', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat03-7', name: 'Step 7: 憑證產生媒體作業（合併各單位媒體）', description: '複製 HO 媒體檔，將各單位媒體檔逐一貼入，合併為單一記事本檔。', role: '企財處', input: '各單位媒體檔', output: '合併後媒體檔', system: '人工', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat03-8', name: 'Step 8: 將媒體檔存於光碟', description: '填完總部申報書後，將合併媒體檔與媒體申報明細表存入光碟；流程記錄到此為止。', role: '企財處', input: '合併後媒體檔、媒體申報明細表', output: '申報光碟', system: '人工（光碟）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
      { id: 'vat03-9', name: 'Step 9: 地方辦事處申報與回傳影本', description: '地方辦事處自行申報，掃描影本回傳總部；總部於公用區域留存，不回存系統。', role: '地方辦事處', input: '申報金額、申報書', output: '申報影本', system: '人工', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '2nd訪談'] },
    ]
  },

  // ===========================================================================
  // 總帳 (GL) - GL01–GL05（xlsx v2）
  // ===========================================================================
  {
    id: 'GL01', category: '總帳', title: 'GL01 年度財報主表編製流程', description: '年度財報主表編製',
    steps: [
      { id: 'gl01-1', name: 'Step 1: 列印總帳報表', description: '列印 GLR4E00 資產負債表（列印第七支）：選年度、截止日 12/31、科目等級第四級，匯出各科目餘額', role: '財會人員', input: '—', output: '總帳報表', system: '財務系統（GLR4E00 資產負債表）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl01-2', name: 'Step 2: 匯出至Excel', description: '依科目編碼分類；1 資產／2 負債／3 淨值（資產負債表只含 1–3 開頭）', role: '財會人員', input: '總帳報表', output: '分類後報表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl01-3', name: 'Step 3: 依財報邏輯分組', description: '歸類餘額至資產負債表項目，編製兩年度比較表', role: '財會人員', input: '分類後報表', output: '資產負債表草稿', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-4', name: 'Step 4: 人工檢核一致性', description: '填入財報正式格式', role: '財會人員', input: '資產負債表草稿', output: '正式資產負債表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-5', name: 'Step 5: 列印收支營運表', description: '列印 GLR4F50 收支餘絀表表五（去年決算／今年決算／今年預算比較），選擇年度與科目層級', role: '財會人員', input: '—', output: '收支營運表', system: '財務系統（GLR4F50 收支餘絀表---表五）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl01-6', name: 'Step 6: 匯出至Excel', description: '依財報邏輯分類收入/支出科目，人工調整；服務收入為平衡項＝全部收入－政府委辦計畫收入－政府補助計畫收入－其他業務收入－業務外收入', role: '財會人員', input: '收支營運表', output: '分類調整後表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl01-7', name: 'Step 7: 若涉及委辦計畫與補助', description: '比對收入與支出金額確保一致，填入財報附表並進行百分比檢核', role: '財會人員', input: '分類調整後表', output: '正式收支營運表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-8', name: 'Step 8: 取得收入與支出加總結果', description: '計算本期餘絀', role: '財會人員', input: '—', output: '餘絀計算結果', system: '財務系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-9', name: 'Step 9: 匯出至Excel', description: '檢核總額與分類邏輯，填入財報格式', role: '財會人員', input: '餘絀計算結果', output: '收支餘絀表草稿', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-10', name: 'Step 10: 餘絀與主表損益一致', description: '與資產負債表、損益表一致；其他綜合餘絀另列：340201 確定福利計畫之再衡量數、340301 國外營運機構財務報表換算之兌換差額，取本期變動數（期末－期初）', role: '財會人員', input: '收支餘絀表草稿', output: '正式收支餘絀表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl01-11', name: 'Step 11: 列印資產負債表', description: '抓取三開頭科目；股東權益', role: '財會人員', input: '—', output: '股東權益餘額', system: '財務系統（GLR4E00 資產負債表）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-12', name: 'Step 12: 計算本期變動數', description: '期末-期初', role: '財會人員', input: '股東權益餘額', output: '淨值變動表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-13', name: 'Step 13: 依系統編流量表', description: '依財務系統資料編製、計算本期現金增減', role: '會計師', input: '財務系統資料', output: '現金流量表草稿', system: '財務系統、Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-14', name: 'Step 14: 流量淨額勾稽損益', description: '與損益淨利一致；折舊/攤銷/投損等調整', role: '財會人員', input: '現金流量表草稿', output: '核對結果', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-15', name: 'Step 15: 現金期初期末勾稽', description: '資負現金、流量表、兩期差異；差大查分錄；若差異大追查並檢核分錄', role: '財會人員', input: '核對結果', output: '確認後現金流量表', system: '財務系統、Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl01-16', name: 'Step 16: 財報定稿送會計師', description: '納入正式版、含現金流量表覆核', role: '財會人員、會計師', input: '確認後現金流量表', output: '正式現金流量表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
    ]
  },
  {
    id: 'GL02', category: '總帳', title: 'GL02 委辦補助與費用分攤流程', description: '委辦補助與費用分攤',
    steps: [
      { id: 'gl02-1', name: 'Step 1: 列印收支營運表', description: '篩選委辦或補助科目；如59開頭/589001', role: '財會人員', input: '—', output: '收入確認表單', system: '財務系統（⚠️ GLR4F50 收支餘絀表---表五）、Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-2', name: 'Step 2: 填報收入性質與金額後回收', description: '財會人員先挑出可能屬於補助的科目，請承辦各計畫的同仁填寫計畫與金額，並確認委辦或補助性質（同一計畫可能部分委辦、部分補助，只有承辦人清楚）；補助收入金額須確定後才能上財報。每年辦理。', role: '各計畫負責單位', input: '收入確認表單', output: '填報完成之確認表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-3', name: 'Step 3: 核對填報結果與系統數據', description: '分類為委辦或補助，填入財報附表', role: '財會人員', input: '填報完成之確認表', output: '委辦/補助收入附表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-4', name: 'Step 4: 列印收支營運表', description: '檢核委辦計畫支出確保與收入一致（收支平衡）；勞務支出扣除政府補助計畫科目（590198、590598、599801、599814、599830、599831，113 年合計 26,986,362）；589001 非政府機構撥入款另看', role: '財會人員', input: '—', output: '支出確認結果', system: '財務系統（⚠️ GLR4F50 收支餘絀表---表五）、Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl02-5', name: 'Step 5: 若有特殊科目', description: '代管資產支出', role: '財會人員', input: '支出確認結果', output: '委辦/補助支出附表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-6', name: 'Step 6: 列印第3支報表，選擇計畫別', description: '列印 GLR4F30 收支餘絀表表三（第 3 支），選擇計畫別：南港一館／二館等', role: '財會人員', input: '—', output: '展會報表', system: '財務系統（GLR4F30 收支餘絀表---表三）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl02-7', name: 'Step 7: 硬體支出：抓Q開頭', description: '硬體＝Q 開頭（南一館）／K 開頭（南二館）計畫，扣除 QS／KS 開頭（軟體）；其他業務支出＝計畫（責任中心）NH(EH)＋NT(IC)＋QY(NK)＋KY(NT)，南一、南二須扣除軟體', role: '財會人員', input: '展會報表', output: '硬體支出明細', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl02-8', name: 'Step 8: 軟體支出', description: '單獨列出QS/KS開頭科目從總額扣除', role: '財會人員', input: '展會報表', output: '軟體支出明細', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-9', name: 'Step 9: 若涉及政府補助/委辦', description: '比對收入與支出確保一致，整合至財報附表', role: '財會人員', input: '硬/軟體支出明細', output: '展會收支報表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-10', name: 'Step 10: 列印第8支報表', description: '列印 GLR4F80 收支餘絀表表八（第 8 支），選擇年度與科目層級，拆分為五大分配數：基金、其他政府機構、廠商、服務收入、本會負擔', role: '財會人員', input: '—', output: '第8支報表', system: '財務系統（GLR4F80 收支餘絀表---表八）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl02-11', name: 'Step 11: 匯出至Excel', description: '檢核特殊科目並人工調整；扣除代管資產支出/政府補助計畫支出', role: '財會人員', input: '第8支報表', output: '調整後分配表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-12', name: 'Step 12: 確認收入與支出一致', description: '填入財報附表並人工檢核總額', role: '財會人員', input: '調整後分配表', output: '五大費用分配報表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-13', name: 'Step 13: 五大或計畫收支表', description: '列印分配或計畫別表；代管支出辨識（外館/代管科目）', role: '財會人員', input: '—', output: '含代管資產之報表', system: '財務系統、Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-14', name: 'Step 14: 扣除代管資產支出', description: '從報表總額扣、更新金額填附表', role: '財會人員', input: '含代管資產之報表', output: '排除後報表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-15', name: 'Step 15: 列印管理費用報表', description: '計算本會總支出並排除業務單位自強活動與制服費用', role: '財會人員', input: '—', output: '管理費用報表', system: '財務系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-16', name: 'Step 16: 加入WL計畫', description: 'WL 計畫有收基金管理費，貿易署查帳時可看；WTL 計畫為純本會，不給貿易署看', role: '財會人員', input: '管理費用報表', output: '調整後管理費用', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl02-17', name: 'Step 17: 填附表併人工檢核', description: '將管理費結果填財報附表', role: '財會人員', input: '調整後管理費用', output: '管理費用附表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-18', name: 'Step 18: 列印收支營運表', description: '篩選投資性不動產收入科目；租金450401/處分利益450101/其他551999', role: '財會人員', input: '—', output: '業外收入明細', system: '財務系統（⚠️ GLR4F50 收支餘絀表---表五）、Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl02-19', name: 'Step 19: 列印計畫別收支表', description: '列印 GLR4A00 計畫處別收支表，選 LD01013 計畫（投資性不動產管理），級別 4 級', role: '財會人員', input: '—', output: '業外支出明細', system: '財務系統（GLR4A00 計劃處別收支表）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'gl02-20', name: 'Step 20: 篩選投資損失', description: '篩選業務外財務支出：680201 投資損失／680301 金融資產評價損失／680501 兌換損失；另含 680101 設算利息支出、629699 處分投資成本、LD01013 投資性不動產支出', role: '財會人員', input: '業外收支明細', output: '投資性不動產財報附表', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'GL03', category: '總帳', title: 'GL03 查帳報表支援（供會計師）', description: '查帳報表支援',
    steps: [
      { id: 'gl03-1', name: 'Step 1: 下載收支餘絀表', description: '含決算與預算比較', role: '財會人員', input: '—', output: '財務報表', system: '財務系統（⚠️ GLR4F50 收支餘絀表---表五）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl03-2', name: 'Step 2: 若會計師要求明細', description: '下載明細分類帳', role: '財會人員', input: '財務報表', output: '明細分類帳', system: '財務系統（GLR4300 明細分類帳）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl03-3', name: 'Step 3: 整理報表與明細後提供會計師', description: '供核對憑證', role: '財會人員', input: '明細分類帳、財務報表', output: '查帳資料包', system: 'Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
    ]
  },
  {
    id: 'GL04', category: '總帳', title: 'GL04 傳票流轉管控（通用）', description: '傳票流轉管控',
    steps: [
      { id: 'gl04-1', name: 'Step 1: 完成傳票過帳後執行刷送', description: '系統產生批號；格式需大寫，如X123456', role: '財會人員', input: '過帳完成之傳票', output: '批號、出納狀態傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl04-2', name: 'Step 2: 輸入批號查詢傳票', description: '核對系統資料與紙本一致，按簽收更新狀態為「簽收」', role: '出納', input: '批號', output: '簽收狀態傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl04-3', name: 'Step 3: 完成後將傳票送回會計', description: '系統狀態改為「回會計」', role: '出納', input: '簽收狀態傳票', output: '回會計狀態傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'gl04-4', name: 'Step 4: 最終狀態改為「入庫」', description: '傳票依批號整理歸檔', role: '財會人員', input: '回會計狀態傳票', output: '入庫歸檔傳票', system: '財務系統（GLF2H00 傳票控管(12碼)）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
    ]
  },
  {
    id: 'GL05', category: '總帳', title: 'GL05 總帳傳票開立發票（設算息、作廢）', description: '總帳傳票開立發票（設算息、作廢）',
    steps: [
      { id: 'gl05-1', name: 'Step 1: 收到場館便簽', description: '年初場館以便簽統計非展售間廠商（例 7-11、星巴克）與合約保證金金額、周期，送來開立整年度設算息發票', role: '企財處', input: '場館便簽', output: '非展售間廠商名單', system: '人工（便簽）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'gl05-2', name: 'Step 2: 總帳傳票開立設算息發票', description: '於總帳傳票銷項逐張新增設算息發票：依合約一次開一整年（每家廠商 12 張），預算科目選利息支出；只針對保證金開，沒有 P 單；租金照常繳、照常開發票', role: '企財處', input: '非展售間廠商名單、合約', output: '設算息發票、傳票', system: '財務系統（GLF2100 傳票處理、GLF2120 銷項輸入）', manHours: '', frequency: '', sources: ['2nd訪談'] },
      { id: 'gl05-3', name: 'Step 3: 發票 key 錯之作廢／銷退', description: '尚未產生發票號碼前 key 錯可直接刪除，系統註記為作廢（資料保留但不印出）；已有發票號碼者，即使帳務日與發票日同月份，系統也判為銷退，無法作廢', role: '企財處', input: '已開立之發票', output: '作廢或銷退紀錄', system: '財務系統（GLF2100 傳票處理）', manHours: '', frequency: '', sources: ['2nd訪談'] },
    ]
  },

  // ===========================================================================
  // 預算管理 (BUD) - BUD01–BUD03（xlsx v1，未變）
  // ===========================================================================
  {
    id: 'BUD01', category: '預算管理', title: 'BUD01 年度預算編列與核定流程', description: '概算複製、複審、核定與合約對齊',
    steps: [
      { id: 'bud01-1', name: 'Step 1: 前年預算複製下年', description: '計管組以 BUR2500 複製現年度預算至下年度，建立概算起點。', role: '企財處計管組', input: '前年度預算資料', output: '下年度概算草稿', system: 'BUR2500（財務系統）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud01-2', name: 'Step 2: 擬訂概算標準並通知各單位', description: '企財處擬訂預算編製標準，通知各單位（含駐外）編擬概算草案。', role: '企財處計管組', input: '政策目標、往年預算', output: '通知文件、各單位概算編製標準', system: '人工（公文通知）', manHours: '', frequency: '', sources: ['SOP'] },
      { id: 'bud01-3', name: 'Step 3: 各單位修計畫與金額', description: '各單位承辦人修改工作計畫名稱與預算金額，駐外單位另填五表。', role: '各單位承辦人', input: '概算草稿', output: '各單位修改後之概算', system: 'BUR2400 / 財務系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud01-4', name: 'Step 4: 系統鎖定（概算完成後）', description: '計管組以 BUR2400 鎖定概算，防止各單位繼續變動資料。', role: '企財處計管組', input: '修改完成之概算', output: '鎖定之概算', system: 'BUR2400（財務系統）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bud01-5', name: 'Step 5: 彙編概算並陳核', description: '企財處彙整各單位草案，簽報董事長核定後函送貿易局。', role: '企財處計管組', input: '鎖定之概算、各單位草案', output: '核定之概算、函文', system: '人工（簽核公文）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud01-6', name: 'Step 6: 9月各單位預算複審', description: '企財處通知各單位複審年度預算，召開複審會議後簽報陳核。', role: '企財處計管組+各單位', input: '各單位預算', output: '複審後預算', system: '財務系統、Excel', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud01-7', name: 'Step 7: 12月底前完成合約審查會議', description: '委辦合約草案函報貿易局審議，召開基金合約審查議價會議。', role: '企財處計管組+各單位', input: '複審後預算、議價資料', output: '調整後預算、合約草案', system: '財務系統（Excel 合約議價資料）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud01-8', name: 'Step 8: 當年度2月完成基金合約簽訂', description: '依合約完成最終預算鎖定，各單位額度確定後始得動支。', role: '企財處計管組', input: '議價後預算、合約資料', output: '確認之預算額度', system: 'BUR2400（財務系統）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud01-9', name: 'Step 9: 預算金額與合約核對', description: '以 BUR4700／APR4900 核對系統預算與合約金額是否一致。', role: '企財處計管組', input: '預算系統報表、合約總額', output: '一致性確認結果', system: 'BUR4700、APR4900（財務系統）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'BUD02', category: '預算管理', title: 'BUD02 計畫增刪與預算調整流程', description: '計畫新增、刪除、預算調整與核定',
    steps: [
      { id: 'bud02-1', name: 'Step 1: 填寫新增/刪除計畫簽報單', description: '業務單位填具計畫新增/刪除簽報單，說明目的、效益及預算來源。', role: '業務單位', input: '計畫需求', output: '簽報單（附件八）', system: '人工（紙本）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud02-2', name: 'Step 2: 新增計畫編號與基本資料', description: '計管組在 BUR1100 建立計畫基本資料，會企財處後陳首長核定。', role: '企財處計管組', input: '核准之簽報單', output: '新增計畫資料（BUR1100）', system: 'BUR1100（財務系統）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud02-3', name: 'Step 3: 刪除計畫則於系統註記', description: '刪除計畫於系統標記刪除狀態，資料保留不物理刪除。', role: '企財處計管組', input: '核准之刪除簽報單', output: '刪除狀態標記', system: '財務系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'bud02-4', name: 'Step 4: 列印計畫書並壓核定日期', description: '計管組以 BUR2100 壓核定日期，印出計畫書發文各單位。', role: '企財處計管組', input: '計畫資料', output: '公文、工作計畫書（含核定日期）', system: 'BUR2100（財務系統）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bud02-5', name: 'Step 5: 提出預算調整申請', description: '業務單位依金額門檻填具調整簽報單，管制科目調增須陳首長核定。', role: '業務單位', input: '調整需求', output: '預算調整簽報單', system: '人工（紙本）', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud02-6', name: 'Step 6: 於系統修改預算數字', description: '計管組依核准申請單修改系統預算數字及核定狀態。', role: '企財處計管組', input: '核准之調整申請單', output: '調整後預算', system: '財務系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'bud02-7', name: 'Step 7: 確認系統預算與合約資料一致', description: '以 BUR4700／APR4900 核對調整後預算與合約金額是否一致。', role: '企財處計管組', input: '調整後預算、合約資料', output: '一致性確認', system: 'BUR4700、APR4900（財務系統）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },
  {
    id: 'BUD03', category: '預算管理', title: 'BUD03 月分配填報與控管流程', description: '月分配編列與控管',
    steps: [
      { id: 'bud03-1', name: 'Step 1: 填報基金總額12個月分配', description: '各單位承辦人在 Excel 填報年度基金總額按月分配，再 KEY 入財務系統。', role: '各單位承辦人', input: '年度預算額度', output: '月分配草稿（Excel）', system: 'Excel', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bud03-2', name: 'Step 2: 委辦計畫逐計畫填報月分配', description: '委辦計畫須逐計畫個別填報月分配，同樣雙軌作業。', role: '各單位承辦人', input: '委辦計畫預算', output: '委辦月分配草稿（Excel）', system: 'Excel', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'bud03-3', name: 'Step 3: 彙整月分配併控管', description: '計管組人工彙整各單位 Excel 月分配表，製作月分配控管表。', role: '企財處計管組', input: '各單位月分配草稿', output: '月分配控管表', system: 'Excel', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
    ]
  },

  // ===========================================================================
  // 差旅 (TRV) - TRV01–TRV02（xlsx v2）
  // ===========================================================================
  {
    id: 'TRV01', category: '差旅', title: 'TRV01 國內差旅申請到核銷流程', description: '國內差旅申請到核銷',
    steps: [
      { id: 'trv01-1', name: 'Step 1: 新增主檔填出差申請', description: '出差過夜才使用差旅系統（為了領每日 400 元雜費），當日往返只填公出單。新增主檔，填奉准文號、計畫編號、代理人、出差事由、交通工具、是否借支；奉准文號目前沒有與文案系統連結，任意輸入都可以。適用範圍見規則 R01。', role: '出差人', input: '出差需求', output: '出差主檔', system: '差旅系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trv01-2', name: 'Step 2: 新增地點明細選住宿選項', description: '地點明細選國內出差、出差城市與日期，並選「是否供住宿」（不供／全供／供宿／國內陪賓）；選項決定帶出的金額（不供 2,400／天，其他 400／天），規則見 R02、R03。', role: '出差人', input: '出差主檔', output: '地點明細、預估金額', system: '差旅系統', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'trv01-3', name: 'Step 3: 列印申請表送單位主管核准、人事組登記出差', description: '列印出差申請表（帶出計畫、出差人、代理人與金額），申請人填是否搭計程車，送單位主管核准後至人事組登記出差。依 SOP 人十三，出差保險隨申請表同步申辦。', role: '出差人、單位主管、人事組', input: '出差主檔、地點明細', output: '已核准申請表、出差登記', system: '差旅系統＋紙本', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trv01-4', name: 'Step 4: （有借支）列印借支單', description: '有借支需求時列印借支單，檢附已核准的申請表，送單位主管蓋章。日支費（住宿＋雜費）的借支由地點明細自動帶出；借支明細只用於日支費以外的費用（如臨時人員費）。國內主要借住宿費、高鐵。借支單須載明申請人姓名、借支日期、金額、事由、預定報銷日期（SOP）。可借項目見規則 R13。', role: '出差人、單位主管', input: '已核准申請表、地點明細', output: '借支單', system: '差旅系統＋紙本', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trv01-5', name: 'Step 5: 企財處辦理借支、出納組開取款條', description: '企財處約於出差前一週（約 5 個工作天）依借支單辦理；出差前 3 天已無法送件，太早送會退回，並避免跨月。出納組開取款條，出差人持取款條與銀行存摺到銀行領款。規則見 R12。', role: '企財處、出納組、出差人', input: '借支單', output: '取款條、借支款', system: '財務系統（⚠️ 待確認 Q04：APF2200 公務借支維護、Aprvou 請購報銷製票、NTF2A00 選擇付款及製票作業、NTF2A10 付款通知作業）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trv01-6', name: 'Step 6: 返回後填報銷明細', description: '出差回來在報銷明細逐筆輸入單據編號、金額、科目（交通費、住宿費等）；單據編號手動輸入，不可重複。', role: '出差人', input: '單據', output: '報銷明細', system: '差旅系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trv01-7', name: 'Step 7: 填出差日誌', description: '日誌自動帶入主檔的出差事由，出差人依實際狀況逐日增修；也可用 Excel 匯入（少有人用）。規則見 R17。', role: '出差人', input: '出差主檔', output: '出差日誌', system: '差旅系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trv01-8', name: 'Step 8: 列印旅費報告表送單位主管蓋章', description: '列印旅費報告表（單據依輸入順序排列），附已核准申請表與單據（住宿費附發票及住宿證明；高鐵附乘車證明，不能附交易明細），送單位主管蓋章。應附文件見規則 R14。', role: '出差人、單位主管', input: '報銷明細、出差日誌', output: '旅費報告表', system: '差旅系統＋紙本', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trv01-9', name: 'Step 9: 人事組銷差', description: '出差人持旅費報告表到人事組辦理銷差（登錄返回）。', role: '出差人、人事組', input: '旅費報告表', output: '銷差記錄', system: '人事系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trv01-10', name: 'Step 10: 企財處核銷多退少補', description: '出差人將旅費報告表與單據送企財處，企財處寫意見並核銷：沒借支就付給出差人；有借支就與借支金額相減，多退少補。', role: '企財處', input: '旅費報告表、單據', output: '核銷結果', system: '財務系統（⚠️ 待確認 Q04：APF2B00 國內審核通知書、APF2700 核銷、APF2900 直接核銷、APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
    ]
  },
  {
    id: 'TRV02', category: '差旅', title: 'TRV02 國外差旅申請借支報銷流程', description: '國外差旅申請借支報銷',
    steps: [
      { id: 'trv02-1', name: 'Step 1: 簽報國外出差計畫及人員', description: '派遣單位簽報出差計畫與人員名單，行政處事務組會辦協調行程。', role: '派遣單位、行政處事務組', input: '出差需求', output: '出差計畫簽呈', system: '紙本（簽呈）', manHours: '', frequency: '', sources: ['SOP'] },
      { id: 'trv02-2', name: 'Step 2: 在差旅系統填因公出國人員申請表', description: '新增主檔（輸入文號，交通工具選飛機），在因公出國人員申請表輸入各期間的日期與地點。有機上過夜，即使同一地點也要拆開期間（出發日、返程各自單列），因為之後會帶到日支明細與日誌，算法不同。規則見 R05。', role: '出差人', input: '出差計畫簽呈', output: '因公出國人員申請表資料', system: '差旅系統', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'trv02-3', name: 'Step 3: 取文號、列印申請表送單位主管核准、人事組登記出差', description: '列印因公出國人員申請表（不帶金額，只看得出行程）；在文案系統用空白簽取號，條碼剪下貼在申請表上，報銷時沿用同一文號。若搭外籍航空另填附件 2（附旅行社訂位航班表）；副主管以上由秘書長室核定，以下由單位主管核定（SOP）。核准後送人事組登記出差。', role: '出差人、單位主管、人事組', input: '因公出國人員申請表', output: '已核准申請表、出差登記', system: '差旅系統＋文案系統＋紙本', manHours: '', frequency: '', sources: ['SOP', '1st訪談', '補充資料'] },
      { id: 'trv02-4', name: 'Step 4: 辦理機票、旅平險、護照簽證', description: '行政處事務組決定承辦旅行社，辦理機票、護照、簽證；旅行平安保險隨申請表同步申辦，費用由公費支應（SOP 人十三）。', role: '行政處事務組、出差人', input: '已核准申請表', output: '機票、護照、簽證、保險', system: '事務組＋旅行社', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'trv02-5', name: 'Step 5: （有借支）匯入日支明細、填供膳宿、列印借支單送企財處', description: '在日支明細按「匯入」帶入申請表的期間，逐筆填供膳宿（比例見規則 R04）；實報實銷者選供宿（30%），住宿費改在報銷明細報。日支費以外的費用（如臨時人員費）才填借支明細。列印借支單（需單位主管蓋章與文號）送企財處；最晚出差前 10 天、最早出差前 2 週送出（規則 R12）。', role: '出差人、單位主管', input: '因公出國人員申請表資料', output: '日支明細、借支單', system: '差旅系統＋紙本', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'trv02-6', name: 'Step 6: 企財處辦理借支、出納組通知領款', description: '企財處審核借支單，出納組通知領款並開取款條，出差人持取款條與銀行存摺到銀行領款；避免跨月。', role: '企財處、出納組', input: '借支單', output: '取款條、借支款', system: '財務系統（⚠️ 待確認 Q04：APF2200 公務借支維護、Aprvou 請購報銷製票、NTF2A00 選擇付款及製票作業、NTF2A10 付款通知作業）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'trv02-7', name: 'Step 7: 出發出差', description: '按核定行程出發，執行出差任務。', role: '出差人', input: '—', output: '出差執行', system: '—', manHours: '', frequency: '', sources: ['SOP'] },
      { id: 'trv02-8', name: 'Step 8: 返國確認日支明細、填報銷明細與供膳情形', description: '有借支者日支明細已有資料，從報銷明細開始；沒借支者從日支明細匯入開始。在修改狀態點選外界供膳的早、午、晚欄位（扣膳 4%／8%／8%，規則 R06）。報銷明細輸入日支以外的費用：交通費、旅平險、展場用品、車資、臨時人員費；超額補助或實報實銷的住宿費也在報銷明細輸入，旅館費含早餐要扣早餐（規則 R07、R08）。駐留超過一個月依規則 R09；匯率依規則 R10；有借支者勾選是否繳回外幣（規則 R11）。單據編號手動輸入，不可重複。', role: '出差人', input: '日支明細、單據', output: '日支明細、報銷明細、供膳情形', system: '差旅系統', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'trv02-9', name: 'Step 9: 修改出差日誌', description: '日誌由因公出國人員申請表帶入，逐筆點進去修改，須逐日填寫（規則 R17）；可下載範例格式修改後匯入。', role: '出差人', input: '因公出國人員申請表資料', output: '出差日誌', system: '差旅系統', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trv02-10', name: 'Step 10: 列印國外旅費報告表與供膳情況申報表，附單據送單位主管', description: '列印國外旅費報告表（左邊日支、右邊報銷明細）與供膳情況申報表（沒有扣膳也要印出簽章），附因公出國人員申請表副本、黏貼憑證與機票報銷憑證，送單位主管蓋章。應附文件見規則 R14。', role: '出差人、單位主管', input: '日支明細、報銷明細、出差日誌', output: '國外旅費報告表、供膳情況申報表', system: '差旅系統＋紙本', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'trv02-11', name: 'Step 11: 人事組銷差', description: '出差人持國外旅費報告表與單據正本到人事組辦理銷差。', role: '出差人、人事組', input: '國外旅費報告表、單據', output: '銷差記錄', system: '人事系統', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'trv02-12', name: 'Step 12: 企財處核銷、拆帳、多退少補', description: '企財處依規定重算日支與住宿（不直接採用系統算出的數字），拆帳後核銷；與借支金額比較，多退少補（繳回外幣或領臺幣）。', role: '企財處', input: '國外旅費報告表、單據', output: '核銷結果', system: '財務系統（⚠️ 待確認 Q04：APF2C00 國外審核通知書、APF2700 核銷、APF2900 直接核銷、APF2A00 請購報銷產生傳票）', manHours: '', frequency: '', sources: ['1st訪談', '補充資料'] },
      { id: 'trv02-13', name: 'Step 13: 提報出國工作報告', description: '返國後兩週內提報出國工作報告；由單位主管決定是否向上呈陳。', role: '出差人、單位主管', input: '—', output: '出國工作報告', system: '紙本', manHours: '', frequency: '', sources: ['SOP'] },
    ]
  },

  // ===========================================================================
  // 出納作業 (TRS) - TRS01–TRS06（xlsx v6）
  // ===========================================================================
  {
    id: 'TRS01', category: '出納作業', title: 'TRS01 銀行帳戶代碼維護', description: '銀行帳戶代碼維護',
    steps: [
      { id: 'trs01-1', name: 'Step 1: 進入總帳基本資料', description: '新增銀行帳戶代碼，輸入銀行名稱、幣別、會計科目；活期存款', role: '行政處出納組', input: '新銀行帳戶資料', output: '已建檔之銀行帳戶', system: '財務系統（GLF1600 銀行帳戶建檔）', manHours: '', frequency: '', sources: ['1st訪談'] },
    ]
  },
  {
    id: 'TRS02', category: '出納作業', title: 'TRS02 銀行存款月報與銀行調節', description: '銀行存款月報與銀行調節',
    steps: [
      { id: 'trs02-1', name: 'Step 1: 銀行兌現支票資料轉檔至財務系統', description: '【月報-支票】銀行兌現支票資料轉檔至財務系統，供月報調節使用。', role: '行政處出納組', input: '銀行兌現資料', output: '兌現記錄入財務系統', system: '財務系統（NTF2F00 銀行兌現媒體轉財務系統）、網路銀行', manHours: '', frequency: '', sources: ['SOP', '補充資料'] },
      { id: 'trs02-2', name: 'Step 2: 付款指示回應轉檔至財務系統', description: '【月報-EDI】EDI付款指示回應轉檔至財務系統，供月報調節使用。', role: '行政處出納組', input: '銀行回應檔', output: '財務系統更新', system: '財務系統（NTF2I00 EDI選付轉檔作業）、網路銀行', manHours: '', frequency: '', sources: ['補充資料', '2nd訪談'] },
      { id: 'trs02-3', name: 'Step 3: 每月取得銀行對帳單', description: '列印銀行存款月報表，核對帳面餘額與銀行餘額', role: '行政處出納組', input: '銀行對帳單', output: '日報表核對結果', system: '財務系統（NTR4200 銀行存款月報表）、銀行對帳單', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs02-4', name: 'Step 4: 對帳單交會計', description: '已核對完成；供過帳、月報；差異則調節', role: '行政處出納組', input: '月報表核對結果', output: '月報資料', system: '人工、紙本、Excel', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs02-5', name: 'Step 5: 下載定存明細', description: '登入銀行網站、對照月報定存科目', role: '行政處出納組', input: '銀行定存明細、財務系統報表', output: '核對結果', system: '網路銀行', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs02-6', name: 'Step 6: 下載當月存款月報表', description: '轉檔至Excel進行資料整理與分項分析', role: '企財處', input: '財務系統月報表', output: 'Excel分析表', system: '財務系統（NTR4200 銀行存款月報表）、Excel', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs02-7', name: 'Step 7: 企財處核對帳目', description: '企財處核對當月所有請購報銷及收款帳目，確認無誤。', role: '企財處', input: '請購報銷+收款帳目', output: '核對結果', system: '人工', manHours: '', frequency: '', sources: ['1st訪談', '線下回饋_出納'] },
      { id: 'trs02-8', name: 'Step 8: 帳表與銀行餘額一致，直接跳至11', description: '資產負債、收支餘絀、帳戶餘額最終確認', role: '企財處', input: '核對結果', output: '核對完成記錄', system: '財務系統（GLR4900 會計科目餘額表、GLR4A00 計劃處別收支表）、Excel', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs02-9', name: 'Step 9: 若有差異', description: '查詢會計明細確認原因，核對完成後交出納確認', role: '企財處', input: '差異清單', output: '核對結果', system: '人工', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs02-10', name: 'Step 10: 進入銀行存款調節處理功能', description: '按新增，輸入帳號/調節月份/幣別，系統帶入帳面餘額', role: '行政處出納組', input: '帳號資料', output: '帳面餘額', system: '財務系統（NTF2600 銀行存款調節處理）', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs02-11', name: 'Step 11: 完成調節後列印銀行存款調節表', description: '確認調節前後金額，並回覆企財處', role: '行政處出納組', input: '調節明細', output: '銀行存款調節表', system: '財務系統（NTR4C00 銀行存款調節表）', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs02-12', name: 'Step 12: 查詢月報附便簽供企財處陳閱', description: '財務主管查詢月報，供陳閱核定。', role: '企財處、行政處出納組', input: '月報表+調節表', output: '核定記錄', system: '財務系統（NTR4200 銀行存款月報表）', manHours: '', frequency: '', sources: ['1st訪談', '線下回饋_出納'] },
    ]
  },
  {
    id: 'TRS03', category: '出納作業', title: 'TRS03 現金季報', description: '現金季報',
    steps: [
      { id: 'trs03-1', name: 'Step 1: 下載三月及六月存款月報表簽請企財處說明差異原因', description: '下載三月及六月存款月報表（非兩個季度）簽請企財處說明差異原因', role: '行政處出納組', input: '報表資料', output: '報表資料', system: '財務系統（NTR4200 銀行存款月報表）', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs03-2', name: 'Step 2: 差異說明', description: '資產負債表與收支餘絀表；轉檔至Excel計算差異', role: '企財處', input: '報表資料', output: '差異分析草稿', system: '財務系統（GLR4900 會計科目餘額表、GLR4A00 計劃處別收支表）、Excel', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs03-3', name: 'Step 3: 若差異顯著', description: '進入總帳查詢明細分類確認原因，撰寫差異分析報告，回覆出納組', role: '企財處', input: '差異分析草稿', output: '差異分析報告', system: 'Excel', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs03-4', name: 'Step 4: 出納出便簽附銀行存款月報表及企財處差異分析送董事長', description: '出納出便簽於文案系統陳閱首長(由秘書長轉陳董事長)', role: '行政處出納組', input: '報表資料', output: '銀行存款月報表', system: '財務系統（NTR4200 銀行存款月報表）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
    ]
  },
  {
    id: 'TRS04', category: '出納作業', title: 'TRS04 居住者所得稅每月扣繳作業', description: '居住者所得稅每月扣繳作業',
    steps: [
      { id: 'trs04-1', name: 'Step 1: 進入請購報銷列印功能', description: '列印所得扣繳登記明細表，選擇單位、年度、稅率等查詢條件', role: '行政處出納組', input: '—', output: '扣繳登記明細表', system: '財務系統（APR4C00 所得稅扣繳登記明細報表）', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs04-2', name: 'Step 2: 下載人事系統報表', description: '核對轉檔後資料是否正確；若有差異人工比對修正', role: '行政處出納組', input: '—', output: '核對確認結果', system: '人事系統、財務系統（GLF2D00 人事系統轉檔）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trs04-3', name: 'Step 3: 財務與人事所得核對(薪資、體檢、加班費、津貼、獎金)', description: '資料數額是否一致', role: '行政處出納組', input: '扣繳登記明細表、人事所得資料', output: '核對確認結果', system: '人工比對', manHours: '', frequency: '', sources: ['1st訪談'] },
      { id: 'trs04-4', name: 'Step 4: 人工核算數額並轉檔', description: '人工核算並轉檔(財務系統請購報銷相關所得資料倒進人事系統)', role: '行政處出納組', input: '扣繳登記明細表、人事所得資料', output: '核對確認結果', system: 'Excel、人事系統、財務系統（GLF2D00 人事系統轉檔）', manHours: '', frequency: '', sources: ['SOP', '1st訪談'] },
      { id: 'trs04-5', name: 'Step 5: 次月10日前代扣繳（接台幣取款條付款 EXP04-a2 Step 2）', description: '僅繳稅，尚未申報', role: '行政處出納組', input: '核對確認結果', output: '繳稅完成記錄', system: 'Excel、國稅局網站', manHours: '', frequency: '', sources: ['1st訪談'] },
    ]
  },
  {
    id: 'TRS05', category: '出納作業', title: 'TRS05 居住者所得稅年度申報作業', description: '居住者所得稅年度申報作業',
    steps: [
      { id: 'trs05-1', name: 'Step 1: 下載財務、人事報表，人工核對數字，無誤後，人事系統產生申報檔', description: '下載財務、人事報表，人工核對數字，無誤後，人事系統產生申報檔', role: '行政處出納組', input: '財務、人事報表', output: '轉檔', system: '財務系統（APR4C00 所得稅扣繳登記明細報表）、人事系統、Excel', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'trs05-2', name: 'Step 2: 申報檔上傳至國稅局軟體檢核&申報', description: '申報檔上傳至國稅局軟體檢核&申報', role: '行政處出納組', input: '申報檔', output: '申報結果', system: '人事系統、國稅局扣繳申報軟體（推定）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'trs05-3', name: 'Step 3: 人事系統產製扣繳憑單並寄發', description: '人事系統產製扣繳憑單並寄發', role: '行政處出納組', input: '申報檔', output: '扣繳憑單', system: '人事系統', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },
  {
    id: 'TRS06', category: '出納作業', title: 'TRS06 非居住者所得稅扣繳作業', description: '非居住者所得稅扣繳作業',
    steps: [
      { id: 'trs06-1', name: 'Step 1: 列印所得扣繳登記明細表', description: '列印所得扣繳登記明細表', role: '行政處出納組', input: '所得扣繳登記明細表', output: '所得扣繳登記明細表', system: '財務系統（APR4C00 所得稅扣繳登記明細報表）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'trs06-2', name: 'Step 2: 查詢所得人資料(受款人資料)姓名、國籍等', description: '查詢所得人資料(受款人資料)姓名、國籍等', role: '行政處出納組', input: '護照號碼/居住號碼', output: '資料', system: '財務系統（DAF1100 受款人資料維護）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'trs06-3', name: 'Step 3: 國稅局軟體試申報(key資料&檢核)', description: '國稅局軟體試申報(key資料&檢核)', role: '行政處出納組', input: '所得人資料', output: '國稅局申報書(暫時)', system: '國稅局扣繳申報軟體（推定）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'trs06-4', name: 'Step 4: 繳稅（接台幣取款條付款 EXP04-a2 Step 2）', description: '繳稅（接台幣取款條付款 EXP04-a2 Step 2）', role: '行政處出納組', input: '繳款單', output: '銀行收訖繳款單', system: '財務系統（NTF2A00 選擇付款及製票作業）', manHours: '', frequency: '', sources: ['補充資料'] },
      { id: 'trs06-5', name: 'Step 5: 國稅局軟體申報', description: '國稅局軟體申報', role: '行政處出納組', input: '申報資料', output: '已蓋章扣繳憑單', system: '國稅局扣繳申報軟體（推定）', manHours: '', frequency: '', sources: ['補充資料'] },
    ]
  },

];
