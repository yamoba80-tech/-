import React, { useState, useMemo } from 'react';
import { Compass, GitCompare, Sparkles } from 'lucide-react';

export const VectorSimilaritySimulation: React.FC = () => {
  // Patient A (Reference)
  const patientA = [50, 80, 120, 90, 75]; // [عمر, وزن, ضغط, سكر, نبض]
  const labels = ['العمر (سنة)', 'الوزن (كجم)', 'ضغط الدم (mmHg)', 'السكر (mg/dL)', 'النبض (bpm)'];

  // Patient B (Interactive)
  const [bAge, setBAge] = useState(52);
  const [bWeight, setBWeight] = useState(82);
  const [bPressure, setBPressure] = useState(118);
  const [bSugar, setBSugar] = useState(92);
  const [bPulse, setBPulse] = useState(74);

  const patientB = useMemo(() => [bAge, bWeight, bPressure, bSugar, bPulse], [bAge, bWeight, bPressure, bSugar, bPulse]);

  // Linear Algebra: Cosine Similarity and Euclidean Distance
  const { cosineSimilarity, euclideanDistance, dotProduct } = useMemo(() => {
    let dot = 0;
    let normASq = 0;
    let normBSq = 0;
    let sumSqDiff = 0;

    for (let i = 0; i < 5; i++) {
      dot += patientA[i] * patientB[i];
      normASq += patientA[i] * patientA[i];
      normBSq += patientB[i] * patientB[i];
      sumSqDiff += Math.pow(patientA[i] - patientB[i], 2);
    }

    const normA = Math.sqrt(normASq);
    const normB = Math.sqrt(normBSq);
    const cos = (normA && normB) ? dot / (normA * normB) : 0;
    const dist = Math.sqrt(sumSqDiff);

    return {
      cosineSimilarity: cos,
      euclideanDistance: dist,
      dotProduct: dot
    };
  }, [patientB]);

  // Preset buttons
  const setPresetIdentical = () => {
    setBAge(50); setBWeight(80); setBPressure(120); setBSugar(90); setBPulse(75);
  };
  const setPresetVerySimilar = () => {
    setBAge(52); setBWeight(82); setBPressure(118); setBSugar(92); setBPulse(74);
  };
  const setPresetDifferent = () => {
    setBAge(22); setBWeight(55); setBPressure(95); setBSugar(75); setBPulse(60);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-right">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-lg">مختبر الجبر الخطي وتشابه المتجهات</h4>
            <p className="text-xs text-slate-400">قياس التشابه الزاوي (Cosine Similarity) في فضاء متعدد الأبعاد (5D Space)</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          الدرس 8
        </span>
      </div>

      {/* Preset selection bar */}
      <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl mb-6">
        <span className="text-xs text-slate-400">حالات تجريبية سريعة للمريض (ب):</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={setPresetIdentical}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            مطابق تماماً
          </button>
          <button
            type="button"
            onClick={setPresetVerySimilar}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            متقارب جداً
          </button>
          <button
            type="button"
            onClick={setPresetDifferent}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            مختلف كلياً
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders for Patient B features */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-semibold text-slate-300 block mb-2">
            تعديل متجهات المريض (ب) في الفضاء الخماسي الأبعاد:
          </span>

          <div className="p-2.5 bg-slate-800/40 border border-slate-700/40 rounded-xl">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{labels[0]} (المرجع أ: 50)</span>
              <span className="font-mono text-amber-400 font-bold">{bAge}</span>
            </div>
            <input
              type="range" min={18} max={90} value={bAge}
              onChange={(e) => setBAge(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="p-2.5 bg-slate-800/40 border border-slate-700/40 rounded-xl">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{labels[1]} (المرجع أ: 80)</span>
              <span className="font-mono text-amber-400 font-bold">{bWeight}</span>
            </div>
            <input
              type="range" min={45} max={140} value={bWeight}
              onChange={(e) => setBWeight(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="p-2.5 bg-slate-800/40 border border-slate-700/40 rounded-xl">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{labels[2]} (المرجع أ: 120)</span>
              <span className="font-mono text-amber-400 font-bold">{bPressure}</span>
            </div>
            <input
              type="range" min={80} max={180} value={bPressure}
              onChange={(e) => setBPressure(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="p-2.5 bg-slate-800/40 border border-slate-700/40 rounded-xl">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{labels[3]} (المرجع أ: 90)</span>
              <span className="font-mono text-amber-400 font-bold">{bSugar}</span>
            </div>
            <input
              type="range" min={60} max={250} value={bSugar}
              onChange={(e) => setBSugar(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="p-2.5 bg-slate-800/40 border border-slate-700/40 rounded-xl">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{labels[4]} (المرجع أ: 75)</span>
              <span className="font-mono text-amber-400 font-bold">{bPulse}</span>
            </div>
            <input
              type="range" min={50} max={130} value={bPulse}
              onChange={(e) => setBPulse(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Linear Algebra Result */}
        <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400">حسابات الجبر الخطي في خطوة واحدة:</div>

            {/* Vector representations */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-left dir-ltr space-y-1">
              <div className="text-teal-300">
                Vector_A = [{patientA.join(', ')}]
              </div>
              <div className="text-amber-300">
                Vector_B = [{patientB.join(', ')}]
              </div>
            </div>

            {/* Similarity Score Card */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300 font-semibold">تشابه جيب التمام (Cosine Similarity):</span>
                <span className={`text-xl font-bold font-mono ${
                  cosineSimilarity >= 0.98 ? 'text-emerald-400' :
                  cosineSimilarity >= 0.90 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {(cosineSimilarity * 100).toFixed(2)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    cosineSimilarity >= 0.98 ? 'bg-emerald-500' :
                    cosineSimilarity >= 0.90 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.max(0, Math.min(100, cosineSimilarity * 100))}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>المسافة الإقليدية (d): <strong className="font-mono text-slate-200">{euclideanDistance.toFixed(1)}</strong></span>
                <span>الضرب النقطي (u·v): <strong className="font-mono text-slate-200">{dotProduct.toLocaleString()}</strong></span>
              </div>
            </div>

            {/* Interpretation */}
            <div className="p-3 bg-amber-950/20 border border-amber-800/30 rounded-lg text-xs text-slate-300">
              {cosineSimilarity >= 0.98 ? (
                <span className="text-emerald-300">
                  ✨ <strong>تطابق نمطي استثنائي:</strong> الزاوية بين السهمين في الفضاء 5D تقترب من الصفر؛ الحالتان الطبيتان متماثلتان في النمط النسبي.
                </span>
              ) : cosineSimilarity >= 0.90 ? (
                <span className="text-amber-300">
                  ⚠️ <strong>تشابه جزئي:</strong> هناك تقارب في بعض السمات واختلاف في أخرى؛ المسافة بدأت في الاتساع.
                </span>
              ) : (
                <span className="text-rose-300">
                  ❌ <strong>تباعد كبير:</strong> المتجهان يشيران إلى مسارات مختلفة تماماً في الفضاء؛ حالتان طبيتان متباينتان.
                </span>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-800">
            🚀 <strong>سر معالجات الرسوميات:</strong> هذا الضرب النقطي هو العملية التي تنفذها كروت الشاشة GPUs بلايين المرات في الثانية لتدريب نماذج الذكاء الاصطناعي.
          </div>
        </div>
      </div>
    </div>
  );
};
