
const MathAnimation = () => {
  return (
    <div className="math-animation-container">
      <style>{`
        .math-animation-container {
          position: relative;
          width: 100px;
          height: 100px;
          perspective: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gyroscope {
          position: absolute;
          width: 80px;
          height: 80px;
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
        }

        .ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(96, 165, 250, 0.6); /* Blue-400 */
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.2);
        }

        .ring-1 {
          transform: rotateX(60deg) rotateY(0deg);
          animation: spin1 4s linear infinite;
        }

        .ring-2 {
          transform: rotateX(120deg) rotateY(0deg);
          border-color: rgba(168, 85, 247, 0.6); /* Purple-500 */
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);
          animation: spin2 5s linear infinite;
        }

        .ring-3 {
          transform: rotateX(0deg) rotateY(60deg);
          border-color: rgba(236, 72, 153, 0.6); /* Pink-500 */
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.2);
          animation: spin3 6s linear infinite;
        }

        .core {
          position: absolute;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #fff, #60a5fa);
          border-radius: 50%;
          box-shadow: 0 0 20px #60a5fa, 0 0 40px #a855f7;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes spin1 {
          0% { transform: rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(60deg) rotateY(0deg) rotateZ(360deg); }
        }

        @keyframes spin2 {
          0% { transform: rotateX(120deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(120deg) rotateY(0deg) rotateZ(360deg); }
        }

        @keyframes spin3 {
          0% { transform: rotateX(0deg) rotateY(60deg) rotateZ(0deg); }
          100% { transform: rotateX(0deg) rotateY(60deg) rotateZ(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
      <div className="gyroscope">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
        <div className="core"></div>
      </div>
    </div>
  );
};

export default MathAnimation;
