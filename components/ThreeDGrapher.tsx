
import React, { useEffect, useRef, useState } from 'react';

type TrigFunction = 'sin' | 'cos' | 'tan' | 'cosec' | 'sec' | 'cot';

interface ThreeDGrapherProps {
  isDark?: boolean;
}

const TwoDPlot: React.FC<{ func: TrigFunction; amplitude: number; frequency: number; isDark: boolean }> = ({ func, amplitude, frequency, isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;
      const margin = 40;
      const plotWidth = w - margin * 2;
      const plotHeight = h - margin * 2;

      ctx.clearRect(0, 0, w, h);

      // Draw Axes
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)';
      ctx.lineWidth = 2;
      
      // X-Axis (Theta)
      ctx.beginPath();
      ctx.moveTo(margin, centerY);
      ctx.lineTo(w - margin, centerY);
      ctx.stroke();

      // Y-Axis
      ctx.beginPath();
      ctx.moveTo(margin, margin);
      ctx.lineTo(margin, h - margin);
      ctx.stroke();

      // Labels
      ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
      ctx.font = 'bold 12px Inter';
      ctx.fillText('y', margin - 20, margin + 10);
      ctx.fillText('θ', w - margin + 10, centerY + 5);

      const getVal = (deg: number) => {
        const rad = (deg * Math.PI) / 180;
        const f = frequency * 2;
        switch(func) {
          case 'sin': return Math.sin(rad * f);
          case 'cos': return Math.cos(rad * f);
          case 'tan': return Math.max(-2, Math.min(2, Math.tan(rad * f)));
          case 'cosec': return 1 / (Math.sin(rad * f) || 0.01);
          case 'sec': return 1 / (Math.cos(rad * f) || 0.01);
          case 'cot': return 1 / (Math.tan(rad * f) || 0.01);
          default: return 0;
        }
      };

      // Plot Continuous Curve
      ctx.beginPath();
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      for (let x = 0; x <= 360; x++) {
        const px = margin + (x / 360) * plotWidth;
        const val = getVal(x);
        const py = centerY - val * (amplitude * 0.8);
        if (x === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw Discrete Points (30 degree intervals)
      const intervals = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
      intervals.forEach(deg => {
        const px = margin + (deg / 360) * plotWidth;
        const val = getVal(deg);
        const py = centerY - val * (amplitude * 0.8);

        // Point
        ctx.fillStyle = isDark ? '#fff' : '#000';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();

        // X-Axis Label
        ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
        ctx.font = '9px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(`${deg}°`, px, centerY + 20);

        // Key Value Labels (0, 1, -1)
        if (Math.abs(val) > 0.9 || Math.abs(val) < 0.1) {
          ctx.fillText(val.toFixed(1), margin - 20, py + 4);
        }
      });
    };

    render();
  }, [func, amplitude, frequency, isDark]);

  return <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />;
};

const ThreeDGrapher: React.FC<ThreeDGrapherProps> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [func, setFunc] = useState<TrigFunction>('sin');
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [resolution, setResolution] = useState(30);
  const [rotation, setRotation] = useState(0);
  const [amplitude, setAmplitude] = useState(60);
  const [frequency, setFrequency] = useState(0.5);

  const functions: Record<TrigFunction, (x: number, y: number, t: number) => number> = {
    sin: (x, y, t) => Math.sin(Math.sqrt(x * x + y * y) * frequency - t),
    cos: (x, y, t) => Math.cos(x * frequency - t) + Math.cos(y * frequency - t),
    tan: (x, y, t) => {
      const val = Math.tan(x * (frequency * 0.5) - t * 0.5) * Math.tan(y * (frequency * 0.5) - t * 0.5);
      return Math.max(-2, Math.min(2, val)) * 0.5;
    },
    cosec: (x, y, t) => {
      const val = 1 / (Math.sin(Math.sqrt(x * x + y * y) * frequency - t) || 0.001);
      return Math.max(-3, Math.min(3, val)) * 0.3;
    },
    sec: (x, y, t) => {
      const val = 1 / (Math.cos(Math.sqrt(x * x + y * y) * frequency - t) || 0.001);
      return Math.max(-3, Math.min(3, val)) * 0.3;
    },
    cot: (x, y, t) => {
      const val = 1 / (Math.tan(Math.sqrt(x * x + y * y) * (frequency * 0.5) - t * 0.5) || 0.001);
      return Math.max(-3, Math.min(3, val)) * 0.3;
    }
  };

  useEffect(() => {
    if (viewMode !== '3D') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);
      
      const grid = resolution;
      const size = 300;
      const step = size / grid;
      const currentRotation = rotation + time * 0.2;

      const project = (x: number, y: number, z: number) => {
        const rotX = x * Math.cos(currentRotation) - y * Math.sin(currentRotation);
        const rotY = x * Math.sin(currentRotation) + y * Math.cos(currentRotation);
        const tilt = 0.6;
        const finalY = rotY * Math.cos(tilt) - z * Math.sin(tilt);
        const finalZ = rotY * Math.sin(tilt) + z * Math.cos(tilt);
        const scale = 400 / (400 + finalZ);
        return { px: centerX + rotX * scale, py: centerY + finalY * scale };
      };

      ctx.beginPath();
      ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.4)';
      ctx.lineWidth = 1;

      for (let i = 0; i <= grid; i++) {
        for (let j = 0; j <= grid; j++) {
          const x = (i - grid / 2) * step;
          const y = (j - grid / 2) * step;
          const z = functions[func](x / 10, y / 10, time) * amplitude;
          const p1 = project(x, y, z);
          if (i < grid) {
            const nextX = (i + 1 - grid / 2) * step;
            const nextZ = functions[func](nextX / 10, y / 10, time) * amplitude;
            const p2 = project(nextX, y, nextZ);
            ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py);
          }
          if (j < grid) {
            const nextY = (j + 1 - grid / 2) * step;
            const nextZ = functions[func](x / 10, nextY / 10, time) * amplitude;
            const p2 = project(x, nextY, nextZ);
            ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py);
          }
        }
      }
      ctx.stroke();
      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 500;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [func, resolution, isDark, amplitude, frequency, rotation, viewMode]);

  return (
    <div className="relative glass rounded-[40px] overflow-hidden group border border-white/5 p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 relative min-h-[500px] flex items-center justify-center">
          <div className="absolute top-0 left-0 z-10">
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 block">Function Explorer</span>
             <h3 className={`text-3xl font-black mb-4 tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
               Trigonometric <span className="gradient-text">{viewMode === '3D' ? 'Topologies' : 'Anatomy'}</span>
             </h3>
             
             {/* View Mode Toggle */}
             <div className={`inline-flex p-1 rounded-xl border ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                <button 
                  onClick={() => setViewMode('3D')}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === '3D' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-blue-500'}`}
                >
                  3D Surface
                </button>
                <button 
                  onClick={() => setViewMode('2D')}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === '2D' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-blue-500'}`}
                >
                  2D Anatomy
                </button>
             </div>
          </div>
          
          {viewMode === '3D' ? (
            <canvas ref={canvasRef} className="w-full h-full cursor-move" />
          ) : (
            <TwoDPlot func={func} amplitude={amplitude} frequency={frequency} isDark={isDark} />
          )}
        </div>

        <div className="w-full lg:w-72 space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Function Mapping</label>
            <div className="grid grid-cols-3 gap-2">
              {(['sin', 'cos', 'tan', 'cosec', 'sec', 'cot'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFunc(f)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    func === f
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                      : `bg-white/5 border-white/10 ${isDark ? 'text-slate-400' : 'text-slate-600'} hover:bg-white/10`
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                <span>Scale / Amp</span>
                <span className="text-blue-500">{amplitude}</span>
              </div>
              <input 
                type="range" min="10" max="100" value={amplitude} 
                onChange={(e) => setAmplitude(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-blue-500/10 rounded-full appearance-none cursor-pointer"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                <span>Frequency</span>
                <span className="text-blue-500">{frequency.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="0.1" max="2" step="0.1" value={frequency} 
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-blue-500/10 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {viewMode === '3D' && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Mesh Density</span>
                  <span className="text-blue-500">{resolution}</span>
                </div>
                <input 
                  type="range" min="15" max="50" value={resolution} 
                  onChange={(e) => setResolution(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-blue-500/10 rounded-full appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-blue-500/5 border-blue-500/10' : 'bg-blue-50 border-blue-100'}`}>
            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className="font-mono text-blue-500 font-bold uppercase">{func} Dynamics</span><br />
              {viewMode === '3D' 
                ? `Visualizing ${func} as a continuous mesh surface. The Z-axis height maps to the function's output over the (x, y) domain.`
                : `Classic 2D wave representation. Points are sampled every 30° to illustrate discrete mathematical mapping as seen in core curriculum.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDGrapher;
