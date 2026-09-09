import React, { useState } from 'react';
import { Tag, Clock, MapPin, Gauge, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const RawToInfoSimulation: React.FC = () => {
  const [includeSensor, setIncludeSensor] = useState(false);
  const [includeUnit, setIncludeUnit] = useState(false);
  const [includeLocation, setIncludeLocation] = useState(false);
  const [includeTimestamp, setIncludeTimestamp] = useState(false);

  // Status computation based on context
  const hasFullContext = includeSensor && includeUnit && includeLocation;
  const isCelsius = includeUnit;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-right">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-lg">مختبر تحويل البيانات إلى معلومات</h4>
            <p className="text-xs text-slate-400">شاهد كيف يتحول الرقم 850 من رمز أعمى إلى قرار تشغيلي دقيق</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          الدرس 1 & 2
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls: Context switches */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-2">
            عناصر السياق (البيانات الوصفية - Metadata)
          </span>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-sm font-medium text-slate-200">معرّف المستشعر (Sensor ID)</div>
                <div className="text-xs text-slate-400">T-104 (مستشعر التوربين الغازي)</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeSensor}
              onChange={(e) => setIncludeSensor(e.target.checked)}
              className="w-5 h-5 rounded accent-teal-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <Gauge className="w-4 h-4 text-sky-400" />
              <div>
                <div className="text-sm font-medium text-slate-200">وحدة القياس (Unit)</div>
                <div className="text-xs text-slate-400">درجة مئوية (°C)</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeUnit}
              onChange={(e) => setIncludeUnit(e.target.checked)}
              className="w-5 h-5 rounded accent-teal-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-sm font-medium text-slate-200">الموقع الفيزيائي (Location)</div>
                <div className="text-xs text-slate-400">مدخل غاز التوربين الرئيسي</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeLocation}
              onChange={(e) => setIncludeLocation(e.target.checked)}
              className="w-5 h-5 rounded accent-teal-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-sm font-medium text-slate-200">الطابع الزمني (Timestamp)</div>
                <div className="text-xs text-slate-400">اليوم الساعة 12:00:00 UTC</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeTimestamp}
              onChange={(e) => setIncludeTimestamp(e.target.checked)}
              className="w-5 h-5 rounded accent-teal-500 cursor-pointer"
            />
          </label>
        </div>

        {/* Live Transformation Display */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/70 border border-slate-800 rounded-xl p-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400">التمثيل في الذاكرة الحسابية</span>
              <span className={`text-xs px-2 py-0.5 rounded font-mono ${hasFullContext ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {hasFullContext ? 'معلومة مكتملة المعنى' : 'بيانات خام غير مكتملة السياق'}
              </span>
            </div>

            {/* Code / JSON Representation */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-left dir-ltr mb-4 text-teal-300">
              <pre>
{`{
  "raw_value": 850${includeSensor ? ',\n  "sensor_id": "T-104"' : ''}${includeUnit ? ',\n  "unit": "Celsius"' : ''}${includeLocation ? ',\n  "location": "Turbine_Gas_Inlet"' : ''}${includeTimestamp ? ',\n  "timestamp": "2026-09-09T12:00:00Z"' : ''}
}`}
              </pre>
            </div>

            {/* Meaning & Interpretation output */}
            <div className="p-4 rounded-xl border transition-all duration-300 bg-slate-900/80 border-slate-700/80">
              <div className="text-xs font-medium text-slate-400 mb-1">تفسير النظام الهندسي:</div>
              {!includeUnit && !includeLocation && !includeSensor ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>الرقم <strong>850</strong> مجرد رمز بلا معنى. هل هي حرارة؟ سرعة دوران؟ ضغط؟ مجهول تماماً.</span>
                </div>
              ) : includeUnit && !includeLocation ? (
                <div className="text-sm text-slate-300">
                  القراءة هي <strong>850 درجة مئوية</strong>. لكننا لا نعلم أين قيست! إن كانت لمياه التبريد فهي كارثة، وإن كانت للتوربين فهي عادية.
                </div>
              ) : hasFullContext ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>حرارة مدخل غاز التوربين مستقرة عند 850°C (ضمن النطاق التشغيلي الآمن 800-900°C).</span>
                  </div>
                  <div className="text-xs text-slate-300 bg-emerald-950/30 border border-emerald-800/40 p-2.5 rounded-lg">
                    💡 <strong>النتيجة العملية:</strong> تحول الرقم من عبء صامت إلى قرار تشغيلي آمن بدون هلع أو إغلاق خاطئ.
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-300">
                  السياق جزئي، يقلل الغموض لكنه لا يكفي بعد لاتخاذ قرار آلي حاسم. فعّل باقي العناصر.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
            <span>الدرس 1: بيانات خام (850)</span>
            <ArrowRight className="w-4 h-4 text-teal-500 rotate-180" />
            <span className="text-teal-400 font-semibold">الدرس 2: معلومة مسياقة قابلة للقرار</span>
          </div>
        </div>
      </div>
    </div>
  );
};
