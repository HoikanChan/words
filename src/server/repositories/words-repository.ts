import { hasDatabase, sql } from "@/lib/db/client";
import { seedDecks, seedWords } from "@/lib/db/seed-data";
import type { Deck, Word } from "@/types/domain";

const WORD_SELECT = sql
  ? sql`id, term, phonetic, meaning, short_meaning as "shortMeaning", hint, examples, synonyms, etymology, tags, difficulty, deck_id as "deckId", audio_url as "audioUrl"`
  : null;

export async function listDecks(): Promise<Deck[]> {
  if (!hasDatabase || !sql) return seedDecks;

  const rows = await sql<Deck[]>`select id, title, description, category, total_words as "totalWords", due_count as "dueCount", accent, bamboo_note as "bambooNote" from deck order by title asc`;
  return rows;
}

export async function listWords(limit?: number): Promise<Word[]> {
  if (!hasDatabase || !sql || !WORD_SELECT) return limit ? seedWords.slice(0, limit) : seedWords;

  const rows = limit
    ? await sql<Word[]>`
        select ${WORD_SELECT}
        from word
        order by term asc
        limit ${limit}
      `
    : await sql<Word[]>`
        select ${WORD_SELECT}
        from word
        order by term asc
      `;
  return rows;
}

export async function listWordsByIds(wordIds: string[]): Promise<Word[]> {
  if (!hasDatabase || !sql || !WORD_SELECT) {
    const index = new Map(seedWords.map((word) => [word.id, word]));
    return wordIds.map((id) => index.get(id)).filter((word): word is Word => Boolean(word));
  }

  if (!wordIds.length) return [];

  const rows = await sql<Word[]>`
    select ${WORD_SELECT}
    from word
    where id in ${sql(wordIds)}
  `;

  const index = new Map(rows.map((word) => [word.id, word]));
  return wordIds.map((id) => index.get(id)).filter((word): word is Word => Boolean(word));
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
