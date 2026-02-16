
import React, { useState } from 'react';
import { PROOFS } from '../constants';

const ProofAccordion: React.FC = () => {
  const [activeProof, setActiveProof] = useState<string>(Object.keys(PROOFS)[0]);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 flex flex-col gap-3">
        {Object.keys(PROOFS).map((name) => (
          <button
            key={name}
            onClick={() => {
              setActiveProof(name);
              setExpandedStep(0);
            }}
            className={`text-left p-4 rounded-2xl transition-all border ${
              activeProof === name
                ? 'bg-white/5 border-blue-500/50 text-white'
                : 'border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
            }`}
          >
            <span className="text-sm font-semibold">{name}</span>
          </button>
        ))}
      </div>
      
      <div className="lg:col-span-8 flex flex-col gap-4">
        {PROOFS[activeProof].map((step, idx) => (
          <div 
            key={idx}
            className="glass rounded-2xl overflow-hidden border border-white/5"
          >
            <button
              onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="font-medium text-slate-200">{step.title}</span>
              </div>
              <svg 
                className={`w-5 h-5 text-slate-500 transition-transform ${expandedStep === idx ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedStep === idx && (
              <div className="p-5 pt-0 border-t border-white/5 bg-slate-900/30">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {step.content}
                </p>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 overflow-x-auto">
                  <code className="math-font text-blue-300 whitespace-nowrap">
                    {step.formula}
                  </code>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProofAccordion;
