import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, ArrowLeft } from 'lucide-react';
import { Lesson } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: Lesson[];
  onSelectLesson: (id: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lessons,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const results: { lesson: Lesson; matchType: string; snippet: string }[] = [];

    lessons.forEach(lesson => {
      // Check title
      if (lesson.titleAr.toLowerCase().includes(q) || lesson.titleEn.toLowerCase().includes(q)) {
        results.push({
          lesson,
          matchType: 'عنوان الدرس',
          snippet: lesson.subtitle
        });
        return;
      }

      // Check core concepts
      const matchedConcept = lesson.coreConcepts.find(c => 
        c.name.toLowerCase().includes(q) || (c.enName && c.enName.toLowerCase().includes(q)) || c.desc.toLowerCase().includes(q)
      );
      if (matchedConcept) {
        results.push({
          lesson,
          matchType: `مفهوم: ${matchedConcept.name}`,
          snippet: matchedConcept.desc
        });
        return;
      }

      // Check summary / problem / idea
      if (lesson.shortSummary.toLowerCase().includes(q)) {
        results.push({
          lesson,
          matchType: 'الملخص',
          snippet: lesson.shortSummary
        });
        return;
      }

      if (lesson.newIdea.toLowerCase().includes(q)) {
        results.push({
          lesson,
          matchType: 'الفكرة الجديدة',
          snippet: lesson.newIdea
        });
        return;
      }

      if (lesson.mlLink.toLowerCase().includes(q)) {
        results.push({
          lesson,
          matchType: 'رابط تعلم الآلة',
          snippet: lesson.mlLink
        });
      }
    });

    return results;
  }, [query, lessons]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-teal-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="ابحث عن مفهوم، خوارزمية، معادلة، أو درس (مثل: بايثون، تباين، مصفوفة، Gradient)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {!query.trim() ? (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <p>جرّب البحث عن كلمات مثل:</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {['بيانات خام', 'المتوسط والوسيط', 'الجبر الخطي', 'النزول النسبي', 'التشفير الأحادي', 'SQL'].map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer text-xs"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400">
              لم يتم العثور على نتائج مطابقة لـ "{query}".
            </div>
          ) : (
            searchResults.map((res, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectLesson(res.lesson.id);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-teal-500/50 hover:bg-slate-800/50 transition cursor-pointer flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-teal-500/10 text-teal-400 font-mono text-xs flex items-center justify-center font-bold">
                      {res.lesson.id}
                    </span>
                    <span className="font-bold text-sm text-slate-200 group-hover:text-teal-300 transition">
                      {res.lesson.titleAr}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {res.matchType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {res.snippet}
                  </p>
                </div>

                <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-teal-400 shrink-0 mt-1 transition group-hover:-translate-x-1" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>{searchResults.length} نتيجة بحث</span>
          <span>اضغط Esc أو زر الإغلاق للخروج</span>
        </div>
      </div>
    </div>
  );
};
