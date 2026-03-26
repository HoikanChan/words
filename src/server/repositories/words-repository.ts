import { hasDatabase, sql } from "@/lib/db/client";
import { seedDecks, seedWords } from "@/lib/db/seed-data";
import type { Deck, Word } from "@/types/domain";

export async function listDecks(): Promise<Deck[]> {
  if (!hasDatabase || !sql) return seedDecks;

  const rows = await sql<Deck[]>`select id, title, description, category, total_words as "totalWords", due_count as "dueCount", accent, bamboo_note as "bambooNote" from deck order by title asc`;
  return rows;
}

export async function listWords(limit?: number): Promise<Word[]> {
  if (!hasDatabase || !sql) return limit ? seedWords.slice(0, limit) : seedWords;

  const rows = await sql<Word[]>`
    select id, term, phonetic, meaning, short_meaning as "shortMeaning", hint, examples, synonyms, etymology, tags, difficulty, deck_id as "deckId", audio_url as "audioUrl"
    from word
    order by term asc
    ${limit ? sql`limit ${limit}` : sql``}
  `;
  return rows;
}

export async function getWordById(wordId: string): Promise<Word | null> {
  if (!hasDatabase || !sql) return seedWords.find((word) => word.id === wordId) ?? null;

  const rows = await sql<Word[]>`
    select id, term, phonetic, meaning, short_meaning as "shortMeaning", hint, examples, synonyms, etymology, tags, difficulty, deck_id as "deckId", audio_url as "audioUrl"
    from word where id = ${wordId} limit 1
  `;
  return rows[0] ?? null;
}

export async function getDeckById(deckId: string): Promise<Deck | null> {
  if (!hasDatabase || !sql) return seedDecks.find((deck) => deck.id === deckId) ?? null;

  const rows = await sql<Deck[]>`
    select id, title, description, category, total_words as "totalWords", due_count as "dueCount", accent, bamboo_note as "bambooNote"
    from deck where id = ${deckId} limit 1
  `;
  return rows[0] ?? null;
}
