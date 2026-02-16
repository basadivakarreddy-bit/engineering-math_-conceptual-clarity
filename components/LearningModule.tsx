
import React, { useState } from 'react';
import { LEARNING_TOPICS } from '../constants';
import { LearningTopic, FormulaData } from '../types';

const InteractiveFormula: React.FC<{ formula: FormulaData; isDark: boolean }> = ({ formula, isDark }) => {
  const [values, setValues] = useState<Record<string, number>>(() => 
    formula.variables.reduce((acc, v) => ({ ...acc, [v.name]: v.default }), {})
  );

  // Reset values if formula changes
  React.useEffect(() => {
    setValues(formula.variables.reduce((acc, v) => ({ ...acc, [v.name]: v.default }), {}));
  }, [formula]);

  const handleInputChange = (name: string, val: string) => {
    setValues(prev => ({ ...prev, [name]: parseFloat(val) || 0 }));
  };

  const result = formula.calculate(values);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div className={`p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
        <div className="font-mono text-[11px] text-blue-500 mb-2 pb-2 border-b border-blue-500/10 text-center">
          {formula.interactiveFormula}
        </div>
        
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[220px] pr-1">
          {formula.variables.map((v) => (
            <div key={v.name} className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  {v.label}
                </label>
                <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {values[v.name]}
                </span>
              </div>
              <input 
                type="range"
                min={v.min}
                max={v.max}
                step={v.step}
                value={values[v.name]}
                onChange={(e) => handleInputChange(v.name, e.target.value)}
                className="w-full accent-blue-500 h-1.5 bg-blue-500/10 rounded-full appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={`border p-4 rounded-xl text-center transition-all duration-300 ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
          {formula.name} Result
        </span>
        <div className="text-xl font-bold text-blue-500 font-mono tracking-tight">
          {result}
        </div>
      </div>
    </div>
  );
};

const FormulaSteps: React.FC<{ formula: FormulaData; isDark: boolean }> = ({ formula, isDark }) => {
  return (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300 h-full flex flex-col gap-4">
      <div className={`p-4 rounded-2xl border font-mono text-sm text-center ${isDark ? 'bg-blue-500/5 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
        {formula.interactiveFormula}
      </div>
      <div className="space-y-4 overflow-y-auto pr-2 max-h-[280px]">
        {formula.formulaBreakdown.map((step, i) => (
          <div key={i} className={`p-4 rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:border-blue-500/30' : 'bg-white border-slate-100 hover:border-blue-200 shadow-sm'}`}>
            <div className={`font-mono text-xs font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {step.component}
            </div>
            <div className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {step.meaning}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface LearningModuleProps {
  isDark?: boolean;
}

const LearningModule: React.FC<LearningModuleProps> = ({ isDark = true }) => {
  // Track active tab and active formula for each topic card
  const [activeTabPerTopic, setActiveTabPerTopic] = useState<Record<string, 'theory' | 'cal' | 'steps'>>(
    LEARNING_TOPICS.reduce((acc, topic) => ({ ...acc, [topic.id]: 'theory' }), {})
  );

  const [activeFormulaIdx, setActiveFormulaIdx] = useState<Record<string, number>>(
    LEARNING_TOPICS.reduce((acc, topic) => ({ ...acc, [topic.id]: 0 }), {})
  );

  const toggleTab = (topicId: string, tab: 'theory' | 'cal' | 'steps') => {
    setActiveTabPerTopic(prev => ({ ...prev, [topicId]: tab }));
  };

  const setFormula = (topicId: string, idx: number) => {
    setActiveFormulaIdx(prev => ({ ...prev, [topicId]: idx }));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {LEARNING_TOPICS.map((topic) => {
          const selectedFormula = topic.formulas[activeFormulaIdx[topic.id]];

          return (
            <div 
              key={topic.id} 
              className="glass rounded-[32px] p-8 border border-white/5 hover:border-blue-500/30 transition-all group flex flex-col min-h-[620px]"
            >
              {/* Topic Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Option Switcher: Theory / Cal / Steps */}
                <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                  {(['theory', 'cal', 'steps'] as const).map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => toggleTab(topic.id, tab)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                        activeTabPerTopic[topic.id] === tab 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                        : 'text-slate-500 hover:text-blue-500'
                      }`}
                    >
                      {tab === 'cal' ? 'Cal' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className={`text-xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {topic.title}
              </h3>

              {/* Sub-selector for Formulas (only visible in Cal/Steps) */}
              {activeTabPerTopic[topic.id] !== 'theory' && (
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                  {topic.formulas.map((f, idx) => (
                    <button
                      key={f.id}
                      onClick={() => setFormula(topic.id, idx)}
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                        activeFormulaIdx[topic.id] === idx
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : `border-transparent ${isDark ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Dynamic Content Area */}
              <div className="flex-1 overflow-hidden">
                {activeTabPerTopic[topic.id] === 'theory' && (
                  <div className="animate-in fade-in duration-300">
                    <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {topic.description}
                    </p>
                    
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-2">Key Engineering Insights</span>
                      {topic.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-sm shadow-blue-500/50"></div>
                          <span className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTabPerTopic[topic.id] === 'cal' && (
                  <div className="animate-in slide-in-from-right-2 duration-300 h-full">
                    <InteractiveFormula formula={selectedFormula} isDark={isDark} />
                  </div>
                )}
                {activeTabPerTopic[topic.id] === 'steps' && (
                  <div className="animate-in slide-in-from-left-2 duration-300 h-full">
                    <FormulaSteps formula={selectedFormula} isDark={isDark} />
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  {activeTabPerTopic[topic.id] === 'theory' ? 'Conceptual Foundation' : activeTabPerTopic[topic.id] === 'cal' ? `Calculator: ${selectedFormula.name}` : `Logic: ${selectedFormula.name}`}
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Context Footer */}
      <div className={`glass rounded-[40px] p-12 border relative overflow-hidden transition-all ${isDark ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-200 bg-blue-50'}`}>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute -left-20 -top-20 w-60 h-60 bg-purple-500/5 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h3 className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Beyond the <span className="gradient-text">Black Box.</span>
            </h3>
            <p className={`text-lg leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Mastering the 15 core formulas across Algebra, Calculus, and Vectors builds the cross-disciplinary intuition required for robust engineering design. 
              Perturb parameters in the <b>Cal</b> tools to observe sensitivity, then verify the logic in the <b>Steps</b> section.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {['Parameter Sensitivity', 'Numerical Stability', 'Applied Logic'].map(tag => (
                <div key={tag} className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-sm'}`}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className={`w-full lg:w-72 aspect-square rounded-[48px] border flex items-center justify-center relative group ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
            <svg className={`w-36 h-36 transition-all duration-700 group-hover:scale-110 ${isDark ? 'text-blue-500/20 group-hover:text-blue-500/40' : 'text-blue-100 group-hover:text-blue-200'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.45L20.27 19H3.73L12 5.45zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
               <span className="text-blue-500 font-black text-6xl">Δ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
