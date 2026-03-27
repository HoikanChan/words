import type { ResultPayload, ReviewSessionBundle, ReviewVerdict, Word } from "@/types/domain";
import { completeSession, createSession, getSession, submitVerdict } from "../repositories/session-repository";
import { listWords } from "../repositories/words-repository";

function summarize(session: NonNullable<Awaited<ReturnType<typeof getSession>>>) {
  const known = session.items.filter((item) => item.verdict === "known").length;
  const vague = session.items.filter((item) => item.verdict === "vague").length;
  const forgot = session.items.filter((item) => item.verdict === "forgot").length;
  const answered = known + vague + forgot;
  const total = session.items.length;

  return {
    total,
    answered,
    remaining: total - answered,
    known,
    vague,
    forgot,
    percent: total ? answered / total : 0,
  };
}

export async function createReviewSession(input: { targetCount: number; deckId?: string }) {
  return createSession(input.targetCount, input.deckId);
}

export async function getReviewBundle(sessionId: string): Promise<ReviewSessionBundle | null> {
  const session = await getSession(sessionId);
  if (!session) return null;

  const queue = await listWords();
  const orderedQueue: Array<Word & { sessionItemId: string }> = session.items
    .map((item) => {
      const word = queue.find((candidate) => candidate.id === item.wordId);
      return word ? { ...word, sessionItemId: item.id } : null;
    })
    .filter((word): word is Word & { sessionItemId: string } => Boolean(word));

  const progress = summarize(session);
  const currentWord = orderedQueue[session.currentIndex] ?? null;
  const nextWordId = orderedQueue[session.currentIndex + 1]?.id ?? null;

  return {
    session,
    queue: orderedQueue,
    progress,
    currentWord,
    nextWordId,
  };
}

export async function answerReviewWord(sessionId: string, wordId: string, verdict: ReviewVerdict) {
  const session = await submitVerdict(sessionId, wordId, verdict);
  return session ? getReviewBundle(sessionId) : null;
}

export async function finishReviewSession(sessionId: string): Promise<ResultPayload | null> {
  const session = await completeSession(sessionId);
  if (!session) return null;

  const summary = summarize(session);
  const accuracy = summary.answered ? (summary.known + summary.vague * 0.5) / summary.answered : 0;

  return {
    session,
    summary: {
      ...summary,
      accuracy,
      durationMinutes: Math.max(1, Math.round(session.durationSeconds / 60)),
      streakDays: 12,
    },
    note:
      summary.forgot > summary.known
        ? "今天判官建议你缩短战线：先稳住忘记词，再冲新词。"
        : "今天整体手感不错，建议明天把 vague 词单独拉一轮快刷。",
  };
}
