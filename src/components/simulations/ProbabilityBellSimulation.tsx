import React, { useState, useMemo } from 'react';
import { Activity, HelpCircle, ShieldCheck } from 'lucide-react';

export const ProbabilityBellSimulation: React.FC = () => {
  const [mean, setMean] = useState<number>(5.0);
  const [stdDev, setStdDev] = useState<number>(1.0);
  const [targetDay, setTargetDay] = useState<number>(6.0);

  // Cumulative distribution function calculation using error function approximation
  const probability = useMemo(() => {
    const z = (targetDay - mean) / (stdDev * Math.SQRT2);
    // Abramowitz and Stegun erf approximation
    const t = 1.0 / (1.0 + 0.3275911 * Math.abs(z));
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
    const signErf = z >= 0 ? erf : -erf;
    const cdf = 0.5 * (1 + signErf);
    return Math.min(0.9999, Math.max(0.0001, cdf));
  }, [mean, stdDev, targetDay]);

  // Generate SVG curve points
  const { curvePoints, shadedPath, targetXCoord } = useMemo(() => {
    const width = 500;
    const height = 180;
    const minX = mean - 3.5 * stdDev;
    const maxX = mean + 3.5 * stdDev;

    const points: [number, number][] = [];
    const shaded: [number, number][] = [];

    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const xVal = minX + (i / steps) * (maxX - minX);
      const exponent = -0.5 * Math.pow((xVal - mean) / stdDev, 2);
      const yVal = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      
      // Scale to SVG coordinates
      const svgX = ((xVal - minX) / (maxX - minX)) * width;
      const maxHeight = 1 / (stdDev * Math.sqrt(2 * Math.PI));
      const svgY = height - (yVal / maxHeight) * (height - 30) - 15;

      points.push([svgX, svgY]);

      if (xVal <= targetDay) {
        shaded.push([svgX, svgY]);
      }
    }

    const curveD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
    
    // Shaded area
    let shadedD = '';
    if (shaded.length > 0) {
      const firstX = shaded[0][0];
      const lastX = shaded[shaded.length - 1][0];
      shadedD = `M ${firstX.toFixed(1)} ${height} ` +
        shaded.map(p => `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') +
        ` L ${lastX.toFixed(1)} ${height} Z`;
    }

    const targetCoord = ((targetDay - minX) / (maxX - minX)) * width;

    return { curvePoints: curveD, shadedPath: shadedD, targetXCoord: targetCoord };
  }, [mean, stdDev, targetDay]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-right">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-lg">مختبر منحنى الاحتمالات وعدم اليقين</h4>
            <p className="text-xs text-slate-400">حساب احتمالية تعافي المريض عبر المساحة تحت المنحنى الطبيعي المعياري</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          الدرس 7
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-xl space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>متوسط مدة التعافي (μ):</span>
              <span className="font-mono text-purple-400">{mean.toFixed(1)} أيام</span>
            </div>
            <input
              type="range"
              min={3.0}
              max={8.0}
              step={0.5}
              value={mean}
              onChange={(e) => setMean(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-xl space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>الانحراف المعياري (σ) - التشتت:</span>
              <span className="font-mono text-purple-400">± {stdDev.toFixed(1)} أيام</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.1}
              value={stdDev}
              onChange={(e) => setStdDev(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="p-3 bg-purple-950/20 border border-purple-800/40 rounded-xl space-y-2">
            <div className="flex justify-between text-xs font-semibold text-purple-300">
              <span>اليوم المستهدف للفحص (x):</span>
              <span className="font-mono text-purple-200 text-sm font-bold">{targetDay.toFixed(1)} أيام</span>
            </div>
            <input
              type="range"
              min={mean - 3 * stdDev}
              max={mean + 3 * stdDev}
              step={0.1}
              value={targetDay}
              onChange={(e) => setTargetDay(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              ما هو احتمال أن يتعافى المريض خلال <strong>{targetDay.toFixed(1)}</strong> أيام أو أقل؟
            </div>
          </div>
        </div>

        {/* Live Curve Display */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
              <span>التوزيع الطبيعي Gaussian (المنحنى الجرسي):</span>
              <span className="font-mono text-purple-400 font-bold">
                P(X ≤ {targetDay.toFixed(1)}) = {(probability * 100).toFixed(1)}%
              </span>
            </div>

            {/* SVG Plot */}
            <div className="relative w-full overflow-hidden bg-slate-900/90 rounded-lg p-2 border border-slate-800">
              <svg viewBox="0 0 500 180" className="w-full h-36">
                {/* Grid line */}
                <line x1="0" y1="170" x2="500" y2="170" stroke="#334155" strokeWidth="1" />
                
                {/* Shaded Area under curve */}
                {shadedPath && (
                  <path d={shadedPath} fill="rgba(168, 85, 247, 0.25)" />
                )}

                {/* Main Bell Curve */}
                <path d={curvePoints} fill="none" stroke="#a855f7" strokeWidth="2.5" />

                {/* Target line */}
                {targetXCoord >= 0 && targetXCoord <= 500 && (
                  <line
                    x1={targetXCoord}
                    y1="10"
                    x2={targetXCoord}
                    y2="170"
                    stroke="#ec4899"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                )}
              </svg>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 px-2 mt-1">
                <span>-3σ</span>
                <span>-2σ</span>
                <span className="text-purple-300 font-bold">المتوسط μ ({mean.toFixed(1)})</span>
                <span>+2σ</span>
                <span>+3σ</span>
              </div>
            </div>
          </div>

          {/* Clinical & ML Insight */}
          <div className="mt-3 p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs text-slate-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              احتمال التعافي بحلول اليوم {targetDay.toFixed(1)} هو <strong>{(probability * 100).toFixed(1)}%</strong>. 
              {probability >= 0.8 ? (
                <span className="text-emerald-300"> احتمال مرتفع جداً؛ يمكن طمأنة المريض وجدولة الخروج بأمان.</span>
              ) : (
                <span className="text-amber-300"> نسبة عدم يقين ملحوظة (خطر مضاعفات {((1 - probability) * 100).toFixed(1)}%)؛ يلزم إبقاء المريض تحت الملاحظة.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
