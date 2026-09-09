import React, { useState } from 'react';
import { Sliders, Cpu, BellRing, ShieldAlert, CheckCircle } from 'lucide-react';

export const BooleanFilterSimulation: React.FC = () => {
  const [temperature, setTemperature] = useState(850);
  const [pressure, setPressure] = useState(45);
  const [operator, setOperator] = useState<'AND' | 'OR'>('AND');

  const isHot = temperature > 800;
  const isLowPressure = pressure < 50;

  const isAlarmTriggered = operator === 'AND' 
    ? (isHot && isLowPressure)
    : (isHot || isLowPressure);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-right">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-lg">مختبر الجبر المنطقي واتخاذ القرار</h4>
            <p className="text-xs text-slate-400">تحويل الشروط الفيزيائية إلى قيم ثنائية (True/False) وفلترة الحالات الحرجة</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          الدرس 3
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Physical Readings Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">درجة حرارة التوربين (°C):</span>
              <span className={`font-mono font-bold text-base ${isHot ? 'text-rose-400' : 'text-emerald-400'}`}>
                {temperature} °C
              </span>
            </div>
            <input
              type="range"
              min={600}
              max={1000}
              step={5}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
              <span>الشرط A: الحرارة &gt; 800</span>
              <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${isHot ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-300'}`}>
                A = {isHot ? 'True' : 'False'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">ضغط الغاز (PSI):</span>
              <span className={`font-mono font-bold text-base ${isLowPressure ? 'text-rose-400' : 'text-emerald-400'}`}>
                {pressure} PSI
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              step={1}
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
              <span>الشرط B: الضغط &lt; 50</span>
              <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${isLowPressure ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-300'}`}>
                B = {isLowPressure ? 'True' : 'False'}
              </span>
            </div>
          </div>

          {/* Logic Operator Selector */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">الرابط المنطقي للقرار:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOperator('AND')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition ${
                  operator === 'AND'
                    ? 'bg-teal-500 text-slate-950 border-teal-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                AND (و)
              </button>
              <button
                type="button"
                onClick={() => setOperator('OR')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition ${
                  operator === 'OR'
                    ? 'bg-teal-500 text-slate-950 border-teal-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                OR (أو)
              </button>
            </div>
          </div>
        </div>

        {/* Live Boolean Logic Result */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/70 border border-slate-800 rounded-xl p-5">
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400">المعادلة البوليانية النشطة:</div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-sm text-left dir-ltr text-teal-300">
              {`is_critical = (${isHot} [A]) ${operator} (${isLowPressure} [B])`}
              <div className="text-slate-400 text-xs mt-1">
                {'// النتيجة المنطقية: '}
                <span className={isAlarmTriggered ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {isAlarmTriggered ? 'True (حالة حرجة)' : 'False (حالة مقبولة)'}
                </span>
              </div>
            </div>

            {/* Live Alarm Display */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
              isAlarmTriggered
                ? 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
            }`}>
              {isAlarmTriggered ? (
                <ShieldAlert className="w-8 h-8 text-rose-400 shrink-0 animate-pulse" />
              ) : (
                <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
              )}
              <div>
                <div className="font-bold text-sm">
                  {isAlarmTriggered ? 'إنذار حرج: أمر إيقاف فوري للتوربين' : 'التشغيل طبيعي: لا توجد خطورة'}
                </div>
                <p className="text-xs opacity-80 mt-0.5">
                  {operator === 'AND'
                    ? 'في وضع AND، يلزم أن ترتفع الحرارة وينخفض الضغط معاً لإطلاق الإغلاق.'
                    : 'في وضع OR، يكفي تحقق أي من الشرطين لإطلاق التنبيه الفوري.'}
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-800">
            💡 <strong>ربط بتعلم الآلة:</strong> هذا المنطق نفسه هو حجر الأساس لأشجار القرار (Decision Trees) التي تقسم فضاء البيانات لآلاف المناطق المتجانسة.
          </div>
        </div>
      </div>
    </div>
  );
};
