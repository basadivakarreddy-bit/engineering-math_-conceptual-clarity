
import React, { useEffect, useRef, useState } from 'react';

interface VisualizerProps {
  isDark?: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fieldMode, setFieldMode] = useState<'sink' | 'swirl' | 'source'>('swirl');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; speed: number; angle: number; age: number }[] = [];
    const numParticles = 150;

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 1 + Math.random() * 2,
          angle: 0,
          age: Math.random() * 100
        });
      }
    };

    const update = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.forEach((p) => {
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (fieldMode === 'swirl') {
          p.angle = Math.atan2(dy, dx) + Math.PI / 2 + 0.1;
        } else if (fieldMode === 'sink') {
          p.angle = Math.atan2(centerY - p.y, centerX - p.x);
        } else {
          p.angle = Math.atan2(p.y - centerY, p.x - centerX);
        }

        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.age++;

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height || p.age > 200) {
          p.x = fieldMode === 'source' ? centerX : Math.random() * canvas.width;
          p.y = fieldMode === 'source' ? centerY : Math.random() * canvas.height;
          p.age = 0;
        }
      });
    };

    const draw = () => {
      // Clear with slight transparency for trailing effect
      ctx.fillStyle = isDark ? 'rgba(2, 6, 23, 0.15)' : 'rgba(248, 250, 252, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - Math.cos(p.angle) * 10, p.y - Math.sin(p.angle) * 10);
        ctx.stroke();
      });
    };

    const render = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400;
        initParticles();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [fieldMode, isDark]);

  return (
    <div className="relative glass rounded-3xl overflow-hidden group">
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Vector Field Dynamics</h3>
        <div className="flex gap-2">
          {(['swirl', 'sink', 'source'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFieldMode(mode)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                fieldMode === mode
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : `bg-slate-500/10 text-slate-500 hover:bg-slate-500/20`
              }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full h-[400px] cursor-crosshair" />
      <div className={`absolute bottom-6 left-6 right-6 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        <span className="math-font text-blue-400 font-bold">V(x,y) = f(x,y)î + g(x,y)ĵ</span> — Modeling {fieldMode} flow behavior in continuous systems.
      </div>
    </div>
  );
};

export default Visualizer;
