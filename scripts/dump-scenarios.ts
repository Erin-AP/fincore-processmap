/**
 * 匯出 SCENARIOS 為 JSON，供 ProcessMap_v10.html 與 CSV 產線使用。
 * 執行: npx tsx scripts/dump-scenarios.ts
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES, SCENARIOS } from '../src/constants';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'scripts', '_scenarios_export.json');

const data: Record<
  string,
  Array<{
    id: string;
    title: string;
    description: string;
    steps: Array<{
      id: string;
      name: string;
      description?: string;
      role: string;
      input: string;
      output: string;
      system: string;
      manHours: string;
      frequency: string;
      sources: string[];
    }>;
  }>
> = {};

for (const cat of CATEGORIES) {
  data[cat] = SCENARIOS.filter((s) => s.category === cat).map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description ?? '',
    steps: s.steps.map((st) => ({
      id: st.id,
      name: st.name,
      description: st.description,
      role: st.role,
      input: st.input,
      output: st.output,
      system: st.system,
      manHours: st.manHours ?? '',
      frequency: st.frequency ?? '',
      sources: st.sources ?? [],
    })),
  }));
}

fs.writeFileSync(out, JSON.stringify({ categories: CATEGORIES, data }, null, 0), 'utf-8');
console.log('Wrote', out);
