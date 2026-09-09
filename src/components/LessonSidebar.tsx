import React from 'react';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Lesson, StageInfo } from '../types';

interface LessonSidebarProps {
  lessons: Lesson[];
  stages: StageInfo[];
  currentLessonId: number;
  onSelectLesson: (id: number) => void;
  completedLessons: number[];
  bookmarkedLessons: number[];
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  lessons,
  stages,
  currentLessonId,
  onSelectLesson,
  completedLessons,
  bookmarkedLessons,
  isOpen,
  onToggleOpen
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-xs lg:hidden"
          onClick={onToggleOpen}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:sticky top-18 z-30 h-[calc(100vh-4.5rem)] w-72 shrink-0 bg-slate-950/95 lg:bg-slate-950/60 border-l border-slate-800 transition-all duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'right-0 shadow-2xl' : '-right-72 lg:right-0'
        }`}
      >
        <div className="p-4 space-y-6 text-right">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              فهرس الدروس الـ 11
            </span>
            <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
              {completedLessons.length} / 11 منجز
            </span>
          </div>

          {/* Stages and their lessons */}
          <div className="space-y-6">
            {stages.map(stage => {
              const stageLessons = lessons.filter(l => l.stageId === stage.id);

              return (
                <div key={stage.id} className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>{stage.titleAr.split(':')[0]}</span>
                  </div>

                  <div className="space-y-1">
                    {stageLessons.map(lesson => {
                      const isActive = lesson.id === currentLessonId;
                      const isDone = completedLessons.includes(lesson.id);
                      const isBookmarked = bookmarkedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => {
                            onSelectLesson(lesson.id);
                            if (window.innerWidth < 1024) onToggleOpen();
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-right text-xs transition cursor-pointer group ${
                            isActive
                              ? 'bg-teal-500/15 border border-teal-500/40 text-teal-200 font-bold'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className={`w-5 h-5 rounded-md font-mono text-[10px] flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-teal-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                            }`}>
                              {lesson.id}
                            </span>
                            <span className="truncate">{lesson.titleAr}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 mr-1">
                            {isBookmarked && (
                              <Bookmark className="w-3 h-3 text-amber-400 fill-amber-400" />
                            )}
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
