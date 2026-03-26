export type ReviewVerdict = "known" | "vague" | "forgot";
export type SessionStatus = "active" | "completed";

export interface Word {
  id: string;
  term: string;
  phonetic: string;
  meaning: string;
  shortMeaning: string;
  hint: string;
  examples: string[];
  synonyms: string[];
  etymology: string;
  tags: string[];
  difficulty: "warmup" | "steady" | "boss";
  deckId: string;
  audioUrl?: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  category: string;
  totalWords: number;
  dueCount: number;
  accent: string;
  bambooNote: string;
}

export interface UserSettings {
  dailyTarget: number;
  autoPlayAudio: boolean;
  showHintsFirst: boolean;
  reviewPace: "focus" | "steady" | "sprint";
  offlineMode: boolean;
}

export interface HomeStats {
  completedToday: number;
  remainingToday: number;
  streakDays: number;
  dueToday: number;
  strongestTag: string;
}

export interface HomePayload {
  stats: HomeStats;
  settings: UserSettings;
  decks: Deck[];
  recentSessions: Array<{
    id: string;
    createdAt: string;
    completedCount: number;
    accuracy: number;
  }>;
}

export interface ReviewSessionItem {
  id: string;
  order: number;
  wordId: string;
  verdict: ReviewVerdict | null;
  answeredAt: string | null;
}

export interface ReviewSession {
  id: string;
  status: SessionStatus;
  source: "daily" | "deck";
  targetCount: number;
  currentIndex: number;
  startedAt: string;
  completedAt: string | null;
  durationSeconds: number;
  items: ReviewSessionItem[];
}

export interface ReviewSessionBundle {
  session: ReviewSession;
  queue: Word[];
  progress: {
    total: number;
    answered: number;
    remaining: number;
    known: number;
    vague: number;
    forgot: number;
    percent: number;
  };
  currentWord: Word | null;
  nextWordId: string | null;
}

export interface ResultPayload {
  session: ReviewSession;
  summary: {
    total: number;
    answered: number;
    known: number;
    vague: number;
    forgot: number;
    accuracy: number;
    durationMinutes: number;
    streakDays: number;
  };
  note: string;
}

export interface WordDetailPayload {
  word: Word;
  deck: Deck | null;
  aiSpotlight: {
    status: "ready" | "fallback";
    title: string;
    body: string;
    chips: string[];
  };
}
