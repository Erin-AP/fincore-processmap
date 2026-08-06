/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { FileText, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { SCENARIOS, CATEGORIES } from './constants';
import { Scenario, ProcessStep } from './types';

function StepCard({ step, isLast }: { step: ProcessStep; isLast: boolean; key?: string }) {
  return (
    <div className="flex items-center flex-shrink-0 self-stretch">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-80 bg-slate-50 rounded-lg border border-slate-200 p-4 flex flex-col min-h-[220px] h-full relative group hover:border-blue-400 transition-colors shadow-sm"
        id={`step-${step.id}`}
      >
        <div className="mb-2 border-b border-slate-200 pb-1.5">
          <div className="text-[15px] font-black text-blue-600 uppercase tracking-tight leading-snug break-words [overflow-wrap:anywhere]">
            {step.name}
          </div>
          {step.description ? (
            <div className="mt-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">步驟說明</span>
              <p className="mt-0.5 text-[12px] font-medium normal-case leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ) : null}
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-400 uppercase mb-0.5">輸入資料</span>
            <span className="text-[13px] text-slate-700 font-medium leading-relaxed">{step.input || '無'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-400 uppercase mb-0.5">輸出資料</span>
            <span className="text-[13px] text-slate-700 font-medium leading-relaxed">{step.output || '無'}</span>
          </div>
        </div>

        <div className="mt-auto space-y-2 pb-4">
          <div className="flex flex-col bg-white p-2 rounded border border-slate-100 shadow-inner">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">系統 / 工具</span>
              <span className="text-[12px] text-blue-700 font-black">{step.system || '-'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">執行角色</span>
              <span className="text-[12px] text-slate-600 font-bold">{step.role || '-'}</span>
            </div>
          </div>
          
          <div className="flex justify-between px-1 text-[11px] text-slate-400 font-bold">
            <span>工時: {step.manHours || '-'}</span>
            <span>頻率: {step.frequency || '-'}</span>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 flex gap-1">
          {step.sources.map(source => (
            <span 
              key={source} 
              className={`text-[10px] px-1.5 py-0.5 rounded font-black uppercase ${
                source === 'SOP' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                source === '1st訪談' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' :
                'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              {source}
            </span>
          ))}
        </div>
      </motion.div>
      
      {!isLast && (
        <div className="mx-2 text-slate-300 font-bold text-lg flex-shrink-0">
          →
        </div>
      )}
    </div>
  );
}

function ScenarioSection({ scenario }: { scenario: Scenario; key?: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6" id={`scenario-${scenario.id}`}>
      <div className="bg-slate-800 text-white flex items-center justify-center text-center p-4 font-bold text-sm leading-tight tracking-tight border-r border-slate-700">
        {scenario.title}
      </div>
      
      <div className="flex items-center p-6 gap-3 overflow-x-auto no-scrollbar">
        {scenario.steps.map((step, index) => (
          <StepCard 
            key={step.id} 
            step={step} 
            isLast={index === scenario.steps.length - 1} 
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const filteredScenarios = SCENARIOS.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-700 p-8" id="app-root">
      {/* Header */}
      <header className="mb-8 border-l-8 border-blue-600 pl-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight leading-none">
            全週期作業流程系統地圖
          </h1>
          <p className="text-sm text-slate-500 font-semibold mt-2">
            整合 SOP、1st訪談及補充資料 - 企業數位轉型看板
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2 hidden md:flex">
          <LayoutDashboard className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-black text-slate-700 uppercase">當前模組: {activeCategory}</span>
        </div>
      </header>

      {/* Category Tabs */}
      <nav className="flex flex-wrap gap-2 mb-8" id="category-tabs">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-lg text-xs font-black transition-all duration-200 uppercase tracking-wider ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-sm'
            }`}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <motion.main 
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {filteredScenarios.length > 0 ? (
          filteredScenarios.map((scenario) => (
            <ScenarioSection key={scenario.id} scenario={scenario} />
          ))
        ) : (
          <div className="bg-white rounded-2xl p-24 border-4 border-dashed border-slate-200 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-400 mb-3 tracking-tight">「{activeCategory}」流程資料準備中</h3>
            <p className="text-slate-400 font-medium max-w-md">
              目前系統地圖正優先補齊「財產管理」模組，其他八大模組之 SOP 與訪談資料將依計畫陸續導入。
            </p>
          </div>
        )}
      </motion.main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
