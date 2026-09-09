/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LESSONS_DATA } from './data/lessonsData';
import { STAGES_DATA } from './data/stagesData';
import { Header, ActiveTab } from './components/Header';
import { LessonSidebar } from './components/LessonSidebar';
import { LessonDetailView } from './components/LessonDetailView';
import { CausalityChainView } from './components/CausalityChainView';
import { LabHubView } from './components/LabHubView';
import { RoadmapView } from './components/RoadmapView';
import { SearchModal } from './components/SearchModal';
import { PanelLeftClose, PanelLeftOpen, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Local storage persistence
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('concept_journey_completed');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [bookmarkedLessons, setBookmarkedLessons] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('concept_journey_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('concept_journey_completed', JSON.stringify(completedLessons));
    } catch {}
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem('concept_journey_bookmarks', JSON.stringify(bookmarkedLessons));
    } catch {}
  }, [bookmarkedLessons]);

  // Keyboard shortcut listener (/ for search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && (e.target as HTMLElement)?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const toggleComplete = (id: number) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedLessons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectLesson = (id: number) => {
    setSelectedLessonId(id);
    setActiveTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLesson = LESSONS_DATA.find(l => l.id === selectedLessonId) || LESSONS_DATA[0];
  const currentStage = STAGES_DATA.find(s => s.id === currentLesson.stageId) || STAGES_DATA[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedCount={completedLessons.length}
        totalLessons={LESSONS_DATA.length}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Body */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Sidebar (shown on Lessons tab) */}
        {activeTab === 'lessons' && (
          <LessonSidebar
            lessons={LESSONS_DATA}
            stages={STAGES_DATA}
            currentLessonId={selectedLessonId}
            onSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
            bookmarkedLessons={bookmarkedLessons}
            isOpen={isSidebarOpen}
            onToggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}

        {/* Content View Container */}
        <main className="flex-1 min-w-0 pb-16">
          {/* Mobile Sidebar Toggle Button for Lessons */}
          {activeTab === 'lessons' && (
            <div className="lg:hidden px-4 pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 cursor-pointer"
              >
                {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                <span>قائمة الدروس ({selectedLessonId}/11)</span>
              </button>

              <span className="text-xs text-slate-400 font-mono">
                الدرس {selectedLessonId}
              </span>
            </div>
          )}

          {activeTab === 'lessons' && (
            <LessonDetailView
              lesson={currentLesson}
              stage={currentStage}
              allLessons={LESSONS_DATA}
              onSelectLesson={handleSelectLesson}
              isCompleted={completedLessons.includes(currentLesson.id)}
              onToggleComplete={toggleComplete}
              isBookmarked={bookmarkedLessons.includes(currentLesson.id)}
              onToggleBookmark={toggleBookmark}
            />
          )}

          {activeTab === 'causality' && (
            <CausalityChainView
              lessons={LESSONS_DATA}
              stages={STAGES_DATA}
              onSelectLesson={handleSelectLesson}
            />
          )}

          {activeTab === 'lab' && (
            <LabHubView
              onSelectLesson={handleSelectLesson}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              lessons={LESSONS_DATA}
              stages={STAGES_DATA}
              completedLessons={completedLessons}
              onSelectLesson={handleSelectLesson}
            />
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lessons={LESSONS_DATA}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
}
