import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, HelpCircle } from 'lucide-react';

export const CentralTendencySimulation: React.FC = () => {
  const [ceoSalary, setCeoSalary] = useState(50000);

  // Baseline employees:
  const baseSalaries = [3000, 3500, 4000, 4500];
  const allSalaries = useMemo(() => [...baseSalaries, ceoSalary], [ceoSalary]);

  // Statistics calculation
  const stats = useMemo(() => {
    const sorted = [...allSalaries].sort((a, b) => a - b);
    const n = sorted.length;
    const sum = sorted.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;
    
    // Median
    const median = n % 2 === 1 
      ? sorted[Math.floor(n / 2)] 
      : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

    // Variance & StdDev
    const variance = sorted.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    return { mean, median, stdDev, sorted };
  }, [allSalaries]);

  // Max for bar height calculation
  const maxDisplayVal = Math.max(60000, ceoSalary);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-right">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-lg">مختبر النزعة المركزية والقيم الشاذة</h4>
            <p className="text-xs text-slate-400">شاهد لماذا ينهار المتوسط الحسابي أمام الأرقام الفلكية بينما يصمد الوسيط</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          الدرس 6
        </span>
      </div>

      {/* CEO Salary Slider */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 mb-6 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-200 font-semibold flex items-center gap-2">
            <span>راتب المدير التنفيذي (القيمة الشاذة - Outlier):</span>
          </span>
          <span className="font-mono font-bold text-sky-400 text-base">
            {ceoSalary.toLocaleString()} ر.س
          </span>
        </div>
        <input
          type="range"
          min={4000}
          max={100000}
          step={2000}
          value={ceoSalary}
          onChange={(e) => setCeoSalary(Number(e.target.value))}
          className="w-full accent-sky-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>4,000 ر.س (مماثل للموظفين)</span>
          <span>50,000 ر.س (قيمة شاذة)</span>
          <span>100,000 ر.س (قيمة متطرفة جداً)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Bar Chart */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-400 mb-4 flex justify-between items-center">
            <span>توزيع رواتب الموظفين الـ 5 بالشركة:</span>
            <span className="text-slate-400">مقياس متناسب</span>
          </div>

          {/* Bars */}
          <div className="h-44 flex items-end justify-between gap-3 px-2 border-b border-slate-700 pb-2">
            {allSalaries.map((sal, idx) => {
              const isCeo = idx === 4;
              const heightPct = Math.max(8, Math.min(100, (sal / maxDisplayVal) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-slate-400 opacity-80 group-hover:opacity-100 transition">
                    {sal >= 1000 ? `${(sal / 1000).toFixed(0)}k` : sal}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isCeo
                        ? 'bg-gradient-to-t from-sky-600 to-sky-400 shadow-lg shadow-sky-500/20'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[11px] font-medium text-slate-400">
                    {isCeo ? 'المدير' : `موظف ${idx + 1}`}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Insight banner */}
          <div className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
            {ceoSalary > 20000 ? (
              <span className="text-amber-300">
                ⚠️ لاحظ كيف سحب راتب المدير ({ceoSalary.toLocaleString()} ر.س) المتوسط الحسابي للأعلى، ليصبح <strong>{stats.mean.toLocaleString()} ر.س</strong>، وهو رقم مضلل لا يتقاضاه أي موظف عادي! بينما ثبت الوسيط عند <strong>{stats.median.toLocaleString()} ر.س</strong> معبراً عن الحقيقة.
              </span>
            ) : (
              <span className="text-emerald-300">
                ✅ الرواتب متقاربة الآن؛ المتوسط ({stats.mean.toLocaleString()}) والوسيط ({stats.median.toLocaleString()}) شبه متطابقين لغياب القيم الشاذة.
              </span>
            )}
          </div>
        </div>

        {/* Statistical Cards */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
          {/* Mean Card */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">المتوسط الحسابي (Mean):</span>
              <span className="text-[11px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">حساس للقيم الشاذة</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-100">
              {stats.mean.toLocaleString(undefined, { maximumFractionDigits: 0 })} ر.س
            </div>
            <p className="text-xs text-slate-400">نقطة الارتكاز الميكانيكية التي تسحبها الأرقام الكبرى للأعلى.</p>
          </div>

          {/* Median Card */}
          <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/40 space-y-1">
            <div className="flex items-center justify-between text-xs text-sky-400">
              <span className="font-semibold text-sky-200">الوسيط (Median):</span>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">مقاوم ومنيع (Robust)</span>
            </div>
            <div className="text-2xl font-bold font-mono text-sky-300">
              {stats.median.toLocaleString(undefined, { maximumFractionDigits: 0 })} ر.س
            </div>
            <p className="text-xs text-slate-400">الرجل الذي يقف في المنتصف؛ نصف الموظفين يكسبون أقل ونصفهم أكثر.</p>
          </div>

          {/* StdDev Card */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">الانحراف المعياري (StdDev - σ):</span>
              <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">مقياس التشتت</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-200">
              ± {stats.stdDev.toLocaleString(undefined, { maximumFractionDigits: 0 })} ر.س
            </div>
            <p className="text-xs text-slate-400">يقيس مدى تباعد الرواتب عن المتوسط ومقدار التفاوت الاجتماعي.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
