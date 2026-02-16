
import React from 'react';
import { CONCEPTS } from '../constants';

const ConceptMap: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {CONCEPTS.map((concept) => (
        <div 
          key={concept.id}
          className="glass rounded-3xl p-6 glass-hover transition-all group relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
          
          <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2 block">
            {concept.category}
          </span>
          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
            {concept.title}
          </h3>
          <p className="opacity-70 text-sm leading-relaxed mb-4">
            {concept.description}
          </p>
          
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-[10px] font-bold opacity-50 uppercase mb-1">Application</h4>
            <p className="text-xs italic opacity-80">
              {concept.application}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConceptMap;
