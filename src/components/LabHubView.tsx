import React, { useState } from 'react';
import { FlaskConical, Gauge, Cpu, BarChart3, Activity, Compass, Zap } from 'lucide-react';
import { RawToInfoSimulation } from './simulations/RawToInfoSimulation';
import { BooleanFilterSimulation } from './simulations/BooleanFilterSimulation';
import { CentralTendencySimulation } from './simulations/CentralTendencySimulation';
import { ProbabilityBellSimulation } from './simulations/ProbabilityBellSimulation';
import { VectorSimilaritySimulation } from './simulations/VectorSimilaritySimulation';
import { GradientDescentSimulation } from './simulations/GradientDescentSimulation';

interface LabHubViewProps {
  onSelectLesson: (id: number) => void;
}

export const LabHubView: React.FC<LabHubViewProps> = ({ onSelectLesson }) => {
  const [activeSim, setActiveSim] = useState<'raw' | 'boolean' | 'stats' | 'prob' | 'vector' | 'gradient'>('raw');

  const labTools = [
    {
      id: 'raw',
      lessonId: 2,
      title: 'تحويل البيانات إلى معلومات',
      subtitle: 'الدروس 1 & 2',
      desc: 'إضافة السياق والبيانات الوصفية للرمز 850',
      icon: Gauge,
      color: 'teal'
    },
    {
      id: 'boolean',
      lessonId: 3,
      title: 'مختبر الجبر المنطقي',
      subtitle: 'الدرس 3',
      desc: 'فلاتر AND / OR وقرارات الطوارئ الآلية',
      icon: Cpu,
      color: 'amber'
    },
    {
      id: 'stats',
      lessonId: 6,
      title: 'النزعة المركزية والقيم الشاذة',
      subtitle: 'الدرس 6',
      desc: 'مقارنة صمود الوسيط أمام انهيار المتوسط الحسابي',
      icon: BarChart3,
      color: 'sky'
    },
    {
      id: 'prob',
      lessonId: 7,
      title: 'منحنى التوزيع الطبيعي',
      subtitle: 'الدرس 7',
      desc: 'حساب مساحات الاحتمالات والمخاطر تحت المنحنى الجرسي',
      icon: Activity,
      color: 'purple'
    },
    {
      id: 'vector',
      lessonId: 8,
      title: 'تشابه المتجهات بالجبر الخطي',
      subtitle: 'الدرس 8',
      desc: 'حساب تشابه جيب التمام Cosine والمسافة في فضاء 5D',
      icon: Compass,
      color: 'emerald'
    },
    {
      id: 'gradient',
      lessonId: 11,
      title: 'النزول النسبي المتدرج (Gradient Descent)',
      subtitle: 'الدرس 11',
      desc: 'محاكاة تدحرج المعامل نحو قاع وادي الخسارة',
      icon: Zap,
      color: 'rose'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 text-right space-y-3">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
          <FlaskConical className="w-4 h-4" />
          <span>المختبر التفاعلي المباشر (Interactive Simulation Lab)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
          تجارب حية لتحويل الرياضيات المجردة إلى حدس بصري
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          اختر أي تجربة تفاعلية من التجارب الست لتحاكي المفاهيم المحورية بنفسك: تلاعب بالمعاملات، اضبط معدلات التعلم، واختبر تأثير القيم الشاذة فورياً في المتصفح.
        </p>

        {/* Simulator switcher tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-4">
          {labTools.map(tool => {
            const Icon = tool.icon;
            const isActive = activeSim === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveSim(tool.id as any)}
                className={`p-3 rounded-xl border text-right transition cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-teal-500/15 border-teal-500/60 shadow-md shadow-teal-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-mono text-slate-400">{tool.subtitle}</span>
                </div>
                <div className={`text-xs font-bold leading-tight ${isActive ? 'text-teal-200' : 'text-slate-300'}`}>
                  {tool.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Simulator Container */}
      <div className="space-y-4">
        {activeSim === 'raw' && <RawToInfoSimulation />}
        {activeSim === 'boolean' && <BooleanFilterSimulation />}
        {activeSim === 'stats' && <CentralTendencySimulation />}
        {activeSim === 'prob' && <ProbabilityBellSimulation />}
        {activeSim === 'vector' && <VectorSimilaritySimulation />}
        {activeSim === 'gradient' && <GradientDescentSimulation />}

        {/* Link to source lesson */}
        <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400">
          <span>هذا المحاكي مرتبط بـ: {labTools.find(t => t.id === activeSim)?.subtitle} ({labTools.find(t => t.id === activeSim)?.title})</span>
          <button
            type="button"
            onClick={() => onSelectLesson(labTools.find(t => t.id === activeSim)!.lessonId)}
            className="text-teal-400 font-bold hover:underline cursor-pointer"
          >
            الانتقال لقراءة الدرس الكامل ➔
          </button>
        </div>
      </div>
    </div>
  );
};
