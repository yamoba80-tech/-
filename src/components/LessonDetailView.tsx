import React, { useState } from 'react';
import { 
  CheckCircle, 
  Bookmark, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  GitBranch, 
  Layers, 
  Compass, 
  Code2, 
  Cpu, 
  BrainCircuit, 
  FlaskConical, 
  HelpCircle,
  Sparkles,
  Quote
} from 'lucide-react';
import { Lesson, StageInfo } from '../types';
import { SimulationContainer } from './simulations/SimulationContainer';

interface LessonDetailViewProps {
  lesson: Lesson;
  stage: StageInfo;
  allLessons: Lesson[];
  onSelectLesson: (id: number) => void;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lesson,
  stage,
  allLessons,
  onSelectLesson,
  isCompleted,
  onToggleComplete,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<number, boolean>>({});

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lesson.pythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowQuizResults(prev => ({ ...prev, [qIdx]: true }));
  };

  const prevLesson = allLessons.find(l => l.id === lesson.id - 1);
  const nextLesson = allLessons.find(l => l.id === lesson.id + 1);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${stage.badgeBg}`}>
            {stage.titleAr}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            الدرس {lesson.id} من 11
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => onToggleBookmark(lesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isBookmarked ? 'محفوظ في المفضلة' : 'حفظ'}</span>
          </button>

          {/* Mark Complete Button */}
          <button
            type="button"
            onClick={() => onToggleComplete(lesson.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? 'مكتمل بنجاح' : 'تحديد كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Hero Header */}
      <div className="space-y-3">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-50 tracking-tight">
            الدرس {lesson.id}: {lesson.titleAr}
          </h2>
          <span className="text-sm font-mono text-teal-400/80 dir-ltr text-left">
            ({lesson.titleEn})
          </span>
        </div>
        <p className="text-lg text-slate-300 font-medium leading-relaxed">
          {lesson.subtitle}
        </p>
        <p className="text-sm text-slate-400 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
          💡 <strong>الملخص الجوهري:</strong> {lesson.shortSummary}
        </p>
      </div>

      {/* 1. CAUSALITY CHAIN (سلسلة السببية) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-teal-400 border-b border-slate-800 pb-2">
          <GitBranch className="w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-100">1. سلسلة السببية (The Causality Chain)</h3>
        </div>
        <p className="text-xs text-slate-400">
          كيف تولد الأفكار في علم الحوسبة والبيانات: المشكلة تفرض المحاولة، والقصور يولد السؤال الجديد الذي يفجر الفكرة الثورية والقدرة الجديدة.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {/* Step 1: Problem */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-rose-500/30 space-y-1.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-rose-400 text-xs font-bold">
              <span>1. المشكلة (The Problem)</span>
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.problem}</p>
          </div>

          {/* Step 2: Attempt */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>2. المحاولة (Attempted Solution)</span>
              <span className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.attempt}</p>
          </div>

          {/* Step 3: Limitation */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center justify-between text-amber-400 text-xs font-bold">
              <span>3. القيد والقصور (Limitation)</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.limitation}</p>
          </div>

          {/* Step 4: New Question */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-500/30 space-y-1.5">
            <div className="flex items-center justify-between text-sky-400 text-xs font-bold">
              <span>4. السؤال الجديد (New Question)</span>
              <span className="w-2 h-2 rounded-full bg-sky-500" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{lesson.newQuestion}</p>
          </div>

          {/* Step 5: New Idea */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-950/40 to-slate-900 border border-teal-500/40 space-y-1.5">
            <div className="flex items-center justify-between text-teal-300 text-xs font-bold">
              <span>5. الفكرة الجديدة (New Idea)</span>
              <span className="w-2 h-2 rounded-full bg-teal-400" />
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">{lesson.newIdea}</p>
          </div>

          {/* Step 6: New Capability */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 space-y-1.5">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>6. القدرة الجديدة (New Capability)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">{lesson.newCapability}</p>
          </div>
        </div>
      </section>

      {/* 2. CORE CONCEPTS (المفاهيم الأساسية) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-teal-400 border-b border-slate-800 pb-2">
          <Layers className="w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-100">2. المفاهيم الأساسية (Core Concepts)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lesson.coreConcepts.map((concept, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold text-slate-200 text-sm">{concept.name}</span>
                {concept.enName && (
                  <span className="text-[11px] font-mono text-slate-400 dir-ltr">{concept.enName}</span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{concept.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTUITIVE & GEOMETRIC EXAMPLES (الحدس الهندسي والنموذج الذهني) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-teal-400 border-b border-slate-800 pb-2">
          <Compass className="w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-100">3. المثال البديهي والحدس الهندسي</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Quote className="w-4 h-4" />
              <span>المثال الواقعي والبديهي</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lesson.intuitiveExample}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>الحدس الهندسي في الفضاء (Geometric Space)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lesson.geometricIntuition}
            </p>
          </div>
        </div>

        {/* Mental Model Callout */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-teal-300 mb-0.5">النموذج الذهني المدمج (Mental Model)</div>
            <div className="text-sm text-slate-200 font-medium leading-relaxed">
              {lesson.mentalModel}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MATHEMATICS & PYTHON CODE (الأساس الرياضي والشفرة) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-teal-400 border-b border-slate-800 pb-2">
          <Code2 className="w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-100">4. الأساس الرياضي ورابط بايثون</h3>
        </div>

        {/* Math formula */}
        {lesson.mathFormula && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">الصيغة الرياضية التأسيسية:</span>
              <p className="text-xs text-slate-300">{lesson.mathFoundation}</p>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-sm text-teal-300 dir-ltr text-left">
              {lesson.mathFormula}
            </div>
          </div>
        )}

        {/* Python Code block */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/60" />
              <span className="w-3 h-3 rounded-full bg-amber-500/60" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="text-xs font-mono text-slate-400 mr-2">script.py</span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 rounded-md transition cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'تم النسخ' : 'نسخ الكود'}</span>
            </button>
          </div>

          <div className="p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto dir-ltr text-left leading-relaxed">
            <pre className="text-teal-300">{lesson.pythonCode}</pre>
          </div>

          <div className="p-3 bg-slate-900/50 border-t border-slate-800/60 text-xs text-slate-400">
            💡 {lesson.pythonExplanation}
          </div>
        </div>
      </section>

      {/* 5. MACHINE LEARNING LINK (رابط تعلم الآلة) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-teal-400 border-b border-slate-800 pb-2">
          <Cpu className="w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-100">5. الرابط مع الذكاء الاصطناعي وتعلم الآلة</h3>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-2">
          <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
            لماذا لا يمكن الاستغناء عن هذا المفهوم في تعلم الآلة الحديث؟
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {lesson.mlLink}
          </p>
        </div>
      </section>

      {/* 6. EMBEDDED INTERACTIVE SIMULATION (المختبر التفاعلي) */}
      {lesson.interactiveType && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-teal-400 border-b border-slate-800 pb-2">
            <FlaskConical className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-100">6. المختبر التفاعلي المباشر</h3>
          </div>

          <SimulationContainer type={lesson.interactiveType} />
        </section>
      )}

      {/* 7. HANDOFF (تسليم السياق والدرس التالي) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-teal-400 border-b border-slate-800 pb-2">
          <ArrowRight className="w-5 h-5 rotate-180" />
          <h3 className="text-lg font-bold text-slate-100">7. تسليم السياق (HANDOFF)</h3>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">المفاهيم التي تم ترسيخها:</span>
              <div className="flex flex-wrap gap-1.5">
                {lesson.handoff.conceptsEstablished.map((c, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">نقطة التوقف الدقيقة:</span>
              <p className="text-slate-300">{lesson.handoff.exactStoppingPoint}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-amber-400">الأسئلة والأفكار العالقة التي لم تحل بعد:</span>
            <p className="text-slate-300">{lesson.handoff.unresolvedIdeas}</p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-teal-950/20 border border-teal-800/40">
            <div>
              <span className="text-[11px] text-teal-400 block">الخطوة المفاهيمية التالية:</span>
              <span className="text-sm font-bold text-slate-100">{lesson.handoff.nextConceptualStep}</span>
            </div>
            {nextLesson && (
              <button
                type="button"
                onClick={() => onSelectLesson(nextLesson.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-teal-500 text-slate-950 rounded-lg text-xs font-bold hover:bg-teal-400 transition cursor-pointer"
              >
                <span>الانتقال للدرس {nextLesson.id}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 8. COMPREHENSION QUIZ (اختبر استيعابك) */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-teal-400 border-b border-slate-800 pb-2">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-100">8. اختبر استيعابك للمفهوم (Quick Quiz)</h3>
          </div>

          <div className="space-y-4">
            {lesson.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              const isAnswered = showQuizResults[qIdx];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={qIdx} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="font-semibold text-slate-100 text-sm sm:text-base">
                    سؤال {qIdx + 1}: {q.question}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 text-slate-300';
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-200';
                        } else {
                          btnStyle = 'bg-slate-900 border-slate-800 text-slate-500 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          disabled={isAnswered}
                          className={`p-3 rounded-lg border text-xs sm:text-sm text-right transition cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-950/30 border border-emerald-800/50 text-emerald-300' : 'bg-rose-950/30 border border-rose-800/50 text-rose-300'
                    }`}>
                      <div className="font-bold mb-0.5">{isCorrect ? 'إجابة صحيحة وموفقة!' : 'إجابة غير صحيحة.'}</div>
                      <div>{q.explanation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Footer Navigation (Previous / Next Lesson) */}
      <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
        {prevLesson ? (
          <button
            type="button"
            onClick={() => onSelectLesson(prevLesson.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition cursor-pointer text-right group"
          >
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 transition" />
            <div>
              <div className="text-[10px] text-slate-400">الدرس السابق</div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-teal-300 transition">
                {prevLesson.id}. {prevLesson.titleAr}
              </div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <button
            type="button"
            onClick={() => onSelectLesson(nextLesson.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 transition cursor-pointer text-left group shadow-lg shadow-teal-500/10"
          >
            <div>
              <div className="text-[10px] text-slate-800">الدرس التالي</div>
              <div className="text-xs font-black text-slate-950">
                {nextLesson.id}. {nextLesson.titleAr}
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-slate-950 group-hover:-translate-x-0.5 transition" />
          </button>
        ) : (
          <div className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            🎉 تهانينا! وصلت إلى نهاية الرحلة التأسيسية
          </div>
        )}
      </div>
    </div>
  );
};
