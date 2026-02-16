
import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { getQuizFeedback } from '../services/geminiService';

const QuizModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  const categories = ['Algebra', 'Calculus', 'Vectors', 'Integration', 'Matrices'];
  
  const filteredQuestions = selectedCategory 
    ? QUIZ_QUESTIONS.filter(q => q.category === selectedCategory)
    : [];

  const currentQuestion = filteredQuestions[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (isLocked) return;
    setSelectedOption(idx);
    setIsLocked(true);

    if (idx === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < filteredQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsLocked(false);
    } else {
      setShowResult(true);
      fetchAiFeedback();
    }
  };

  const fetchAiFeedback = async () => {
    setIsGeneratingFeedback(true);
    const feedback = await getQuizFeedback(
      score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0), 
      filteredQuestions.length, 
      selectedCategory || "Engineering Mathematics"
    );
    setAiFeedback(feedback);
    setIsGeneratingFeedback(false);
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsLocked(false);
    setAiFeedback('');
  };

  if (!selectedCategory) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-4 tracking-tight text-white">Choose Your <span className="gradient-text">Battleground.</span></h2>
          <p className="text-slate-400">Select a core engineering topic to assess your conceptual clarity. Each quiz consists of 6 rigorous questions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="glass p-8 rounded-[32px] border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group text-left"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{cat}</h3>
              <p className="text-sm text-slate-500 mb-4">Master foundations of {cat.toLowerCase()} as applied to real-world engineering systems.</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
                <span>6 Questions</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span>Foundational</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="glass rounded-[40px] p-12 text-center animate-in zoom-in-95 duration-500 border border-white/10 max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-500/20">
          <span className="text-3xl font-bold text-blue-400">{Math.round((score / filteredQuestions.length) * 100)}%</span>
        </div>
        <h3 className="text-3xl font-black text-white mb-2">{selectedCategory} Mastery</h3>
        <p className="text-slate-400 mb-8">You achieved a score of {score} out of {filteredQuestions.length}.</p>
        
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-8 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.45L20.27 19H3.73L12 5.45z"/>
            </svg>
          </div>
          <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">AI Academic Feedback</h4>
          {isGeneratingFeedback ? (
             <div className="flex gap-1 py-2">
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          ) : (
            <p className="text-slate-300 text-sm leading-relaxed font-medium">{aiFeedback}</p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={resetQuiz}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-500/20"
          >
            New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={resetQuiz}
            className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2 hover:text-white transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Topics
          </button>
          <h3 className="text-3xl font-black text-white tracking-tight">{selectedCategory} Quiz</h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2">
            Progress {currentQuestionIdx + 1}/{filteredQuestions.length}
          </span>
          <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-blue-500 transition-all duration-700 ease-out" 
              style={{ width: `${((currentQuestionIdx + 1) / filteredQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="glass rounded-[40px] p-10 border border-white/10 shadow-2xl">
        <p className="text-2xl text-slate-100 mb-10 font-bold leading-tight tracking-tight">
          {currentQuestion.question}
        </p>

        <div className="grid gap-4">
          {currentQuestion.options.map((option, idx) => {
            let stateClass = "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20";
            if (isLocked) {
              if (idx === currentQuestion.correctAnswer) {
                stateClass = "border-green-500/50 bg-green-500/10 text-green-400";
              } else if (selectedOption === idx) {
                stateClass = "border-red-500/50 bg-red-500/10 text-red-400";
              } else {
                stateClass = "opacity-40 border-white/5 bg-white/5 text-slate-500";
              }
            } else if (selectedOption === idx) {
              stateClass = "border-blue-500 bg-blue-500/10 text-blue-400";
            }

            return (
              <button
                key={idx}
                disabled={isLocked}
                onClick={() => handleOptionSelect(idx)}
                className={`p-6 rounded-2xl border text-left text-sm font-bold transition-all flex items-center justify-between ${stateClass}`}
              >
                <span>{option}</span>
                {isLocked && idx === currentQuestion.correctAnswer && (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {isLocked && (
          <div className="mt-10 pt-10 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className={`p-6 rounded-3xl border mb-8 ${isLocked && selectedOption === currentQuestion.correctAnswer ? 'bg-green-500/5 border-green-500/10' : 'bg-blue-500/5 border-blue-500/10'}`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-black">?</span>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Conceptual Logic</h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium italic">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20"
            >
              {currentQuestionIdx < filteredQuestions.length - 1 ? 'Proceed to Next Question' : 'Finalize Assessment'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModule;
