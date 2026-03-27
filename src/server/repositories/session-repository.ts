import { randomUUID } from "node:crypto";
import { DEMO_USER_ID } from "@/lib/constants/app";
import { hasDatabase, sql } from "@/lib/db/client";
import { seedSession } from "@/lib/db/seed-data";
import type { ReviewSession, ReviewVerdict } from "@/types/domain";
import { listWords } from "./words-repository";

type SessionRow = Omit<ReviewSession, "items">;

const sessionMemory = new Map<string, ReviewSession>([["demo-session", seedSession()]]);

async function getSessionRows(sessionId: string): Promise<ReviewSession | null> {
  if (!hasDatabase || !sql) return sessionMemory.get(sessionId) ?? null;

  const sessionRows = await sql<SessionRow[]>`
    select id, status, source, target_count as "targetCount", current_index as "currentIndex", started_at as "startedAt", completed_at as "completedAt", duration_seconds as "durationSeconds"
    from review_session where id = ${sessionId} and user_id = ${DEMO_USER_ID}
    limit 1
  `;

  const itemRows = await sql<ReviewSession["items"]>`
    select id, order_index as "order", word_id as "wordId", verdict, answered_at as "answeredAt"
    from review_session_item where session_id = ${sessionId}
    order by order_index asc
  `;

  const session = sessionRows[0];
  return session ? { ...session, items: itemRows } : null;
}

export async function createSession(targetCount: number, deckId?: string): Promise<ReviewSession> {
  const words = await listWords();
  const queue = (deckId ? words.filter((word) => word.deckId === deckId) : words).slice(0, targetCount);
  const session: ReviewSession = {
    id: randomUUID(),
    status: "active",
    source: deckId ? "deck" : "daily",
    targetCount: queue.length,
    currentIndex: 0,
    startedAt: new Date().toISOString(),
    completedAt: null,
    durationSeconds: 0,
    items: queue.map((word, index) => ({
      id: randomUUID(),
      order: index,
      wordId: word.id,
      verdict: null,
      answeredAt: null,
    })),
  };

  if (!hasDatabase || !sql) {
    sessionMemory.set(session.id, session);
    return session;
  }

  await sql`
    insert into review_session (id, user_id, source, target_count, status, current_index, started_at, duration_seconds)
    values (${session.id}, ${DEMO_USER_ID}, ${session.source}, ${session.targetCount}, ${session.status}, ${session.currentIndex}, ${session.startedAt}, 0)
  `;

  for (const item of session.items) {
    await sql`
      insert into review_session_item (id, session_id, order_index, word_id, verdict, answered_at)
      values (${item.id}, ${session.id}, ${item.order}, ${item.wordId}, ${item.verdict}, ${item.answeredAt})
    `;
  }

  return session;
}

export async function getSession(sessionId: string): Promise<ReviewSession | null> {
  return getSessionRows(sessionId);
}

export async function submitVerdict(sessionId: string, wordId: string, verdict: ReviewVerdict): Promise<ReviewSession | null> {
  const session = await getSessionRows(sessionId);
  if (!session) return null;

  const itemIndex = session.items.findIndex((item) => item.wordId === wordId);
  if (itemIndex === -1) return session;

  const answeredAt = new Date().toISOString();
  const nextCurrentIndex = Math.min(session.items.length, Math.max(session.currentIndex, itemIndex + 1));
  const updatedSession: ReviewSession = {
    ...session,
    currentIndex: nextCurrentIndex,
    items: session.items.map((item, index) =>
      index === itemIndex ? { ...item, verdict, answeredAt } : item,
    ),
  };

  if (!hasDatabase || !sql) {
    sessionMemory.set(sessionId, updatedSession);
    return updatedSession;
  }

  await sql`
    update review_session_item set verdict = ${verdict}, answered_at = ${answeredAt}
    where session_id = ${sessionId} and word_id = ${wordId}
  `;
  await sql`
    update review_session set current_index = ${nextCurrentIndex}, duration_seconds = greatest(duration_seconds, extract(epoch from now() - started_at)::int)
    where id = ${sessionId}
  `;

  return getSessionRows(sessionId);
}

export async function completeSession(sessionId: string): Promise<ReviewSession | null> {
  const session = await getSessionRows(sessionId);
  if (!session) return null;

  const completedAt = new Date().toISOString();
  const durationSeconds = Math.max(60, Math.round((Date.now() - new Date(session.startedAt).getTime()) / 1000));
  const updatedSession: ReviewSession = {
    ...session,
    status: "completed",
    currentIndex: session.items.length,
    completedAt,
    durationSeconds,
  };

  if (!hasDatabase || !sql) {
    sessionMemory.set(sessionId, updatedSession);
    return updatedSession;
  }

  await sql`
    update review_session
    set status = 'completed', current_index = ${session.items.length}, completed_at = ${completedAt}, duration_seconds = ${durationSeconds}
    where id = ${sessionId}
  `;

  return getSessionRows(sessionId);
}
