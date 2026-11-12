export interface ProcessStep {
  id: string;
  /** 橫向掃讀用短標題，建議與序號併列（如 Step 1: 建立請購單） */
  name: string;
  /** 補充敘事、條件、系統代碼等；財產管理模組可省略 */
  description?: string;
  role: string;
  input: string;
  output: string;
  system: string;
  tool?: string; // Keep for backward compatibility or merge
  manHours: string;
  frequency: string;
  sources: ('SOP' | '1st訪談' | '2nd訪談' | '補充資料' | '線下回饋_出納' | '企財補充')[];
}

export interface Scenario {
  id: string;
  category: string; // 新增：分類名稱，如 '財產管理', '請購報銷(台幣)'
  title: string;
  description: string;
  steps: ProcessStep[];
}
