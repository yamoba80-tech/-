import React from 'react';
import { Compass, CheckCircle2, Circle, ArrowDown, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { Lesson, StageInfo } from '../types';

interface RoadmapViewProps {
  lessons: Lesson[];
  stages: StageInfo[];
  completedLessons: number[];
  onSelectLesson: (id: number) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  lessons,
  stages,
  completedLessons,
  onSelectLesson
}) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      {/* Intro Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 text-right space-y-3">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>خارطة المسار المعرفي الشاملة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
          مسار المراحل الأربع: رحلة العقل نحو الذكاء الاصطناعي
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          انقر على أي درس للانتقال إليه ومتابعة تقدمك التعليمي عبر المحطات الأحد عشرة المتصلة.
        </p>
      </div>

      {/* 4 Stages Layout */}
      <div className="space-y-8">
        {stages.map((stage, stageIdx) => {
          const stageLessons = lessons.filter(l => l.stageId === stage.id);
          const completedInStage = stageLessons.filter(l => completedLessons.includes(l.id)).length;
          const stageProgress = Math.round((completedInStage / stageLessons.length) * 100);

          return (
            <div 
              key={stage.id} 
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-lg"
            >
              {/* Stage Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-sm">
                      {stage.id}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                        {stage.titleAr}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        {stage.titleEn}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 max-w-2xl leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Stage completion metric */}
                <div className="flex items-center gap-3 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800">
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-300">
                      {completedInStage} من {stageLessons.length} مكتمل
                    </div>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div 
                        className="bg-teal-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${stageProgress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-400">
                    {stageProgress}%
                  </span>
                </div>
              </div>

              {/* Lessons within this stage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stageLessons.map(lesson => {
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-slate-800 text-teal-400 font-mono text-xs font-bold flex items-center justify-center">
                              {lesson.id}
                            </span>
                            <span className="text-sm font-bold text-slate-100 group-hover:text-teal-300 transition">
                              {lesson.titleAr}
                            </span>
                          </div>

                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                          {lesson.shortSummary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
                        <span className="font-mono text-slate-400">{lesson.titleEn}</span>
                        <div className="flex items-center gap-1 text-teal-400 font-medium group-hover:translate-x-[-2px] transition">
                          <span>قراءة الدرس</span>
                          <ArrowLeft className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Arrow connector between stages */}
              {stageIdx < stages.length - 1 && (
                <div className="flex justify-center -mb-9 mt-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400 shadow-lg">
                    <ArrowDown className="w-4 h-4" />
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
