
import React, { useState, useEffect } from 'react';
import Visualizer from './components/Visualizer';
import ThreeDGrapher from './components/ThreeDGrapher';
import ConceptMap from './components/ConceptMap';
import ProofAccordion from './components/ProofAccordion';
import QuizModule from './components/QuizModule';
import LearningModule from './components/LearningModule';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<'foundations' | 'visualize' | 'concepts' | 'proofs' | 'quiz'>('foundations');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  if (!isLoggedIn) {
    return <Auth onLogin={() => setIsLoggedIn(true)} />;
  }

  const themeClasses = {
    bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    text: isDark ? 'text-slate-200' : 'text-slate-900',
    navText: isDark ? 'text-slate-400' : 'text-slate-600',
    heroDesc: isDark ? 'text-slate-400' : 'text-slate-600',
    border: isDark ? 'border-white/10' : 'border-slate-200',
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} selection:bg-blue-500/30 transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 glass border-b shadow-xl' : 'py-6 bg-transparent'
      } ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              Σ
            </div>
            <h1 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Engineering<span className="gradient-text">Math</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('foundations')}
              className={`text-sm font-medium transition-colors ${activeTab === 'foundations' ? 'text-blue-400' : `${themeClasses.navText} hover:${isDark ? 'text-white' : 'text-slate-900'}`}`}
            >
              Foundations
            </button>
            <button 
              onClick={() => setActiveTab('visualize')}
              className={`text-sm font-medium transition-colors ${activeTab === 'visualize' ? 'text-blue-400' : `${themeClasses.navText} hover:${isDark ? 'text-white' : 'text-slate-900'}`}`}
            >
              Interactive
            </button>
            <button 
              onClick={() => setActiveTab('concepts')}
              className={`text-sm font-medium transition-colors ${activeTab === 'concepts' ? 'text-blue-400' : `${themeClasses.navText} hover:${isDark ? 'text-white' : 'text-slate-900'}`}`}
            >
              Concept Map
            </button>
            <button 
              onClick={() => setActiveTab('proofs')}
              className={`text-sm font-medium transition-colors ${activeTab === 'proofs' ? 'text-blue-400' : `${themeClasses.navText} hover:${isDark ? 'text-white' : 'text-slate-900'}`}`}
            >
              Step-by-Step
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`text-sm font-medium transition-colors ${activeTab === 'quiz' ? 'text-blue-400' : `${themeClasses.navText} hover:${isDark ? 'text-white' : 'text-slate-900'}`}`}
            >
              Quizzes
            </button>
          </div>

          <div className="flex items-center gap-4">
             {/* Dark Mode Toggle */}
             <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'}`}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
             >
               {isDark ? (
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                 </svg>
               ) : (
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                 </svg>
               )}
             </button>

             <button 
               onClick={() => setIsLoggedIn(false)}
               className={`border px-4 py-2 rounded-xl text-xs font-semibold transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-700'}`}
             >
               Sign Out
             </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="max-w-3xl mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
            {activeTab === 'foundations' ? 'Start with the Basics' : 'Advanced Engineering Concepts'}
          </span>
          <h2 className={`text-5xl md:text-7xl font-extrabold mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {activeTab === 'foundations' ? 'The Foundations' : 'Master the Logic'} <br />
            <span className="gradient-text">
              {activeTab === 'foundations' ? 'of Modern Engineering.' : 'Behind the Machine.'}
            </span>
          </h2>
          <p className={`text-lg leading-relaxed mb-8 ${themeClasses.heroDesc}`}>
            {activeTab === 'foundations' 
              ? 'Algebra, Calculus, and Vector fundamentals reimagined for the 21st-century engineer.'
              : 'Deep dive into complex mathematical structures and their physical manifestations in the real world.'}
          </p>
        </header>

        {/* Dynamic Content Section */}
        <section className="space-y-24">
          <div className="w-full">
              {activeTab === 'foundations' && <LearningModule isDark={isDark} />}

              {activeTab === 'visualize' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <ThreeDGrapher isDark={isDark} />
                  <Visualizer isDark={isDark} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass p-8 rounded-[32px] border border-white/5">
                      <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Linear Transformations</h4>
                      <p className={`text-sm leading-relaxed ${themeClasses.heroDesc}`}>Observe how matrices warp space. Critical for computer graphics, stress analysis, and robotic kinematics.</p>
                    </div>
                    <div className="glass p-8 rounded-[32px] border border-white/5">
                      <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Boundary Conditions</h4>
                      <p className={`text-sm leading-relaxed ${themeClasses.heroDesc}`}>Simulate heat flow or vibration at the edges of a material. Essential for structural health and thermodynamics.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'concepts' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Engineering Concept Map</h3>
                   <ConceptMap />
                </div>
              )}

              {activeTab === 'proofs' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Logical Deconstructions</h3>
                   <ProofAccordion />
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <QuizModule />
                </div>
              )}
          </div>

          {/* Real-World Gallery - Only show on foundations/concepts */}
          {(activeTab === 'foundations' || activeTab === 'concepts') && (
            <section>
               <div className="flex items-center justify-between mb-10">
                 <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Applied Foundations</h3>
                 <div className="h-px flex-1 mx-8 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: 'Bridge Stability', topic: 'Eigenvalues', img: 'https://picsum.photos/seed/bridge/600/400' },
                    { title: 'Robotic Kinematics', topic: 'Matrices', img: 'https://picsum.photos/seed/robot/600/400' },
                    { title: 'Aerodynamics', topic: 'Flux Integrals', img: 'https://picsum.photos/seed/aero/600/400' }
                  ].map((item, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 border border-white/5">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-bold text-white border border-white/20 uppercase tracking-tighter">
                            {item.topic}
                          </span>
                        </div>
                      </div>
                      <h4 className={`text-lg font-bold group-hover:text-blue-400 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                      <p className={`text-sm ${themeClasses.heroDesc}`}>Physical manifestations of core foundation topics.</p>
                    </div>
                  ))}
               </div>
            </section>
          )}

        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t py-12 px-6 ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center font-bold text-xs text-white">Σ</div>
            <span className="text-sm font-semibold text-slate-500">© 2024 Engineering Math: Conceptual Clarity</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-slate-500 hover:text-blue-400 transition-colors">Curriculum</a>
            <a href="#" className="text-xs text-slate-500 hover:text-blue-400 transition-colors">Resources</a>
            <a href="#" className="text-xs text-slate-500 hover:text-blue-400 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
