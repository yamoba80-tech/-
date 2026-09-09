import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  GitBranch, 
  FlaskConical, 
  Compass, 
  Search,
  CheckCircle2
} from 'lucide-react';

export type ActiveTab = 'lessons' | 'causality' | 'lab' | 'roadmap';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  completedCount: number;
  totalLessons: number;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedCount,
  totalLessons,
  onOpenSearch
}) => {
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-100 tracking-tight">
                رحلة المفاهيم
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-mono">
                الدروس الـ 11
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              الخارطة التأسيسية الشاملة: من الفوضى إلى تعلم الآلة
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'lessons'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>الدروس</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('causality')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'causality'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>سلسلة السببية</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lab')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>المختبر التفاعلي</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>المسار</span>
          </button>
        </nav>

        {/* Progress & Search */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition cursor-pointer"
            title="بحث في المفاهيم والمصطلحات"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">بحث...</span>
            <kbd className="hidden lg:inline font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
              /
            </kbd>
          </button>

          {/* Progress widget */}
          <div className="hidden sm:flex items-center gap-2 pl-1 border-r border-slate-800 pr-3">
            <div className="text-left">
              <div className="text-[11px] font-bold text-slate-200">
                {completedCount} من {totalLessons} مكتمل
              </div>
              <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold font-mono">
              {progressPercent}%
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
