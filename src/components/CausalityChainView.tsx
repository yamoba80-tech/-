import React, { useState } from 'react';
import { GitBranch, ArrowDown, ArrowLeft, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { Lesson, StageInfo } from '../types';

interface CausalityChainViewProps {
  lessons: Lesson[];
  stages: StageInfo[];
  onSelectLesson: (id: number) => void;
}

export const CausalityChainView: React.FC<CausalityChainViewProps> = ({
  lessons,
  stages,
  onSelectLesson
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number | 'all'>('all');

  const filteredLessons = selectedStageId === 'all'
    ? lessons
    : lessons.filter(l => l.stageId === selectedStageId);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Intro Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden text-right">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <GitBranch className="w-4 h-4" />
            <span>سلسلة السببية التاريخية والفلسفية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
            كيف ولدت ثورة البيانات والذكاء الاصطناعي؟
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            لم تظهر مفاهيم الحوسبة اعتباطاً؛ كل مفهوم جديد في هذه الرحلة هو حل اضطراري لحل مشكلة وقصور ظهر في المفهوم الذي سبقه. تتبّع سلسلة التطور السببي عبر الدروس الإحدى عشرة:
          </p>

          {/* Stage Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-3">
            <button
              type="button"
              onClick={() => setSelectedStageId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedStageId === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              جميع المراحل (11 درساً)
            </button>
            {stages.map(st => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStageId(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedStageId === st.id
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {st.titleAr.split(':')[0]} ({st.titleEn})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Causality Timeline */}
      <div className="space-y-6">
        {filteredLessons.map((lesson, idx) => {
          const currentStage = stages.find(s => s.id === lesson.stageId);
          return (
            <div 
              key={lesson.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 shadow-lg relative group"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-teal-300 text-sm">
                    {lesson.id}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>{lesson.titleAr}</span>
                      <span className="text-xs font-mono text-slate-400">({lesson.titleEn})</span>
                    </h3>
                    <p className="text-xs text-slate-400">{lesson.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${currentStage?.badgeBg}`}>
                    {currentStage?.titleEn}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectLesson(lesson.id)}
                    className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-bold transition cursor-pointer"
                  >
                    <span>عرض الدرس الكامل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Causality Grid for this lesson */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* 1. Problem */}
                <div className="p-3 bg-slate-950/60 rounded-xl border border-rose-500/20 space-y-1">
                  <span className="text-[11px] font-bold text-rose-400 block">1. المشكلة الحقيقية:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{lesson.problem}</p>
                </div>

                {/* 2. Limitation */}
                <div className="p-3 bg-slate-950/60 rounded-xl border border-amber-500/20 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 block">2. القيد والقصور السابق:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{lesson.limitation}</p>
                </div>

                {/* 3. New Question */}
                <div className="p-3 bg-slate-950/60 rounded-xl border border-sky-500/20 space-y-1">
                  <span className="text-[11px] font-bold text-sky-400 block">3. السؤال الثوري الجديد:</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">{lesson.newQuestion}</p>
                </div>

                {/* 4. New Idea */}
                <div className="p-3 bg-teal-950/20 rounded-xl border border-teal-500/30 space-y-1 md:col-span-2">
                  <span className="text-[11px] font-bold text-teal-300 block">4. الفكرة الجديدة المنقذة:</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{lesson.newIdea}</p>
                </div>

                {/* 5. New Capability */}
                <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-300 block">5. القدرة المكتسبة الآن:</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-semibold">{lesson.newCapability}</p>
                </div>
              </div>

              {/* Hand-off bridge to next step */}
              {idx < filteredLessons.length - 1 && (
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span>المفاهيم المكتسبة: {lesson.handoff.conceptsEstablished.slice(0, 3).join('، ')}</span>
                  <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
                    <span>يسلّم السياق إلى: {filteredLessons[idx + 1].titleAr}</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
