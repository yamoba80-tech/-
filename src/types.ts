export type StageId = 1 | 2 | 3 | 4;

export interface StageInfo {
  id: StageId;
  titleAr: string;
  titleEn: string;
  description: string;
  color: string;
  gradient: string;
  badgeBg: string;
  iconName: string;
}

export interface CoreConcept {
  name: string;
  enName?: string;
  desc: string;
}

export interface Handoff {
  currentPosition: string;
  conceptsEstablished: string[];
  relationshipsEstablished: string;
  exactStoppingPoint: string;
  nextConceptualStep: string;
  unresolvedIdeas: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  stageId: StageId;
  titleAr: string;
  titleEn: string;
  subtitle: string;
  shortSummary: string;
  
  // Causality Chain
  problem: string;
  attempt: string;
  limitation: string;
  newQuestion: string;
  newIdea: string;
  newCapability: string;

  // Core Concepts
  coreConcepts: CoreConcept[];

  // Examples & Intuition
  intuitiveExample: string;
  geometricIntuition: string;

  // Mathematical & Technical foundations
  mathFoundation?: string;
  mathFormula?: string;
  pythonCode: string;
  pythonExplanation: string;

  // Machine Learning Link
  mlLink: string;

  // Mental Model
  mentalModel: string;
  unlockedCapabilities: string;

  // Context handoff
  handoff: Handoff;

  // Interactive Playground type
  interactiveType?: 'raw-to-info' | 'boolean-filter' | 'central-tendency' | 'probability-bell' | 'vector-similarity' | 'gradient-descent';

  // Quiz
  quiz: QuizQuestion[];
}

export interface UserProgress {
  completedLessons: number[];
  quizScores: Record<number, number>;
  bookmarkedLessons: number[];
  notes: Record<number, string>;
}
