import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Footprints, AlertCircle, CheckCircle, Zap } from 'lucide-react';

export const GradientDescentSimulation: React.FC = () => {
  const [w, setW] = useState<number>(8.0);
  const [learningRate, setLearningRate] = useState<number>(0.15);
  const [stepCount, setStepCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [history, setHistory] = useState<{ step: number; w: number; loss: number }[]>([
    { step: 0, w: 8.0, loss: 64.0 }
  ]);

  const timerRef = useRef<number | null>(null);

  // Objective function: L(w) = w^2, Gradient: dL/dw = 2*w
  const loss = Math.min(100, Math.pow(w, 2));
  const gradient = 2 * w;

  const takeStep = () => {
    setW((prevW) => {
      // w_new = w_old - alpha * grad
      const grad = 2 * prevW;
      let nextW = prevW - learningRate * grad;
      // Cap at reasonable limits to prevent NaN or overflow
      if (Math.abs(nextW) > 15) {
        nextW = nextW > 0 ? 15 : -15;
      }
      const nextLoss = Math.min(100, Math.pow(nextW, 2));

      setStepCount((s) => {
        const nextStep = s + 1;
        setHistory((h) => [...h.slice(-15), { step: nextStep, w: nextW, loss: nextLoss }]);
        return nextStep;
      });

      return nextW;
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setW(8.0);
    setStepCount(0);
    setHistory([{ step: 0, w: 8.0, loss: 64.0 }]);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setW((prevW) => {
          if (Math.abs(prevW) < 0.01) {
            setIsRunning(false);
            return prevW;
          }
          const grad = 2 * prevW;
          let nextW = prevW - learningRate * grad;
          if (Math.abs(nextW) > 15) {
            setIsRunning(false);
            nextW = nextW > 0 ? 15 : -15;
          }
          const nextLoss = Math.min(100, Math.pow(nextW, 2));
          setStepCount((s) => {
            const nextStep = s + 1;
            setHistory((h) => [...h.slice(-15), { step: nextStep, w: nextW, loss: nextLoss }]);
            return nextStep;
          });
          return nextW;
        });
      }, 350);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, learningRate]);

  // Convert w in [-10, 10] and Loss in [0, 80] to SVG coords
  const svgWidth = 440;
  const svgHeight = 180;
  const mapX = (valW: number) => ((valW + 10) / 20) * svgWidth;
  const mapY = (valLoss: number) => svgHeight - 15 - (valLoss / 75) * (svgHeight - 35);

  // Generate Parabolic Curve Points
  const curvePoints = (() => {
    const pts: string[] = [];
    for (let curW = -9.5; curW <= 9.5; curW += 0.5) {
      const curL = Math.pow(curW, 2);
      pts.push(`${mapX(curW).toFixed(1)},${mapY(curL).toFixed(1)}`);
    }
    return pts.join(' ');
  })();

  const isConverged = Math.abs(w) < 0.05;
  const isDiverging = learningRate > 1.0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-right">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-lg">مختبر النزول النسبي المتدرج (Gradient Descent)</h4>
            <p className="text-xs text-slate-400">شاهد تدحرج المعامل w على جبل الخسارة نحو القاع الأقل خطأً</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          الدرس 11
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          {/* Learning Rate Slider */}
          <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>معدل التعلم (Learning Rate - α):</span>
              <span className={`font-mono font-bold ${learningRate > 1.0 ? 'text-rose-400' : 'text-purple-300'}`}>
                {learningRate.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0.02}
              max={1.15}
              step={0.02}
              value={learningRate}
              onChange={(e) => setLearningRate(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0.05 (حذر جداً)</span>
              <span>0.15 (مثالي)</span>
              <span className="text-rose-400">&gt; 1.0 (انفلات/قفز)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={takeStep}
              disabled={isRunning || isConverged}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow-md shadow-purple-600/20 cursor-pointer"
            >
              <Footprints className="w-4 h-4" />
              <span>خطوة</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              disabled={isConverged}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                isRunning
                  ? 'bg-amber-600 text-white hover:bg-amber-500'
                  : 'bg-teal-600 text-white hover:bg-teal-500'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'إيقاف' : 'تشغيل'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة</span>
            </button>
          </div>

          {/* Live Metrics Cards */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-0.5">قيمة المعامل w</span>
              <span className="text-base font-mono font-bold text-slate-100">{w.toFixed(3)}</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-0.5">الخطأ Loss (w²)</span>
              <span className={`text-base font-mono font-bold ${loss < 0.1 ? 'text-emerald-400' : 'text-purple-300'}`}>
                {loss.toFixed(3)}
              </span>
            </div>
            <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-0.5">التدرج (الميل dL/dw)</span>
              <span className="text-base font-mono font-bold text-amber-300">{gradient.toFixed(3)}</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-0.5">رقم الخطوة</span>
              <span className="text-base font-mono font-bold text-slate-200">{stepCount}</span>
            </div>
          </div>
        </div>

        {/* Visual Parabolic Bowl Canvas */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
              <span>مشهد الخطأ: L(w) = w²</span>
              <span className="font-mono text-purple-300">القاع الأمثل: w = 0</span>
            </div>

            {/* SVG Parabola Bowl */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2 relative overflow-hidden">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-44">
                {/* Horizontal Ground Baseline */}
                <line x1="0" y1={svgHeight - 15} x2={svgWidth} y2={svgHeight - 15} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Center target indicator */}
                <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={svgHeight} stroke="#059669" strokeWidth="1" strokeOpacity="0.4" />

                {/* The Parabolic Curve (The Bowl) */}
                <polyline
                  points={curvePoints}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />

                {/* History Dots & Path */}
                {history.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={mapX(pt.w)}
                    cy={mapY(pt.loss)}
                    r={idx === history.length - 1 ? 7 : 3}
                    fill={idx === history.length - 1 ? '#ec4899' : 'rgba(168, 85, 247, 0.4)'}
                    stroke="#ffffff"
                    strokeWidth={idx === history.length - 1 ? 2 : 0}
                    className={idx === history.length - 1 ? 'animate-pulse' : ''}
                  />
                ))}
              </svg>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 px-3 mt-1">
                <span>w = -10 (خطأ مرتفع)</span>
                <span className="text-emerald-400 font-bold">w = 0 (القاع / الصفر)</span>
                <span>w = +10 (خطأ مرتفع)</span>
              </div>
            </div>
          </div>

          {/* Status interpretation box */}
          <div className="mt-3 p-3 rounded-lg border text-xs text-slate-300">
            {isConverged ? (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>وصل النموذج إلى قاع الوادي (الحد الأدنى للخطأ)! اكتمل التعلم بنجاح.</span>
              </div>
            ) : isDiverging ? (
              <div className="flex items-center gap-2 text-rose-400 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>تحذير: معدل التعلم مرتفع جداً (α &gt; 1.0)؛ النموذج يقفز بعنف فوق القاع ويتباعد (Divergence)!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-purple-300">
                <Zap className="w-4 h-4 shrink-0 text-purple-400" />
                <span>النموذج يتبع انحدار المشتقة خطوة بخطوة لينزلق تدريجياً نحو القاع.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
