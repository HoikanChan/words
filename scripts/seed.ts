import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import postgres from "postgres";
import { seedDecks, seedSettings, seedWords } from "../src/lib/db/seed-data.ts";
import { DEMO_USER_ID } from "../src/lib/constants/app.ts";

async function main() {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    throw new Error("POSTGRES_URL is required to run seed.");
  }

  const sql = postgres(url, { ssl: "require" });
  const schema = await readFile(resolve(process.cwd(), "src/lib/db/schema.sql"), "utf8");
  await sql.unsafe(schema);

  await sql`insert into app_user (id, name, streak_days, strongest_tag) values (${DEMO_USER_ID}, 'Demo User', 12, 'abstract') on conflict (id) do nothing`;
  await sql`
    insert into user_settings (user_id, daily_target, auto_play_audio, show_hints_first, review_pace, offline_mode)
    values (${DEMO_USER_ID}, ${seedSettings.dailyTarget}, ${seedSettings.autoPlayAudio}, ${seedSettings.showHintsFirst}, ${seedSettings.reviewPace}, ${seedSettings.offlineMode})
    on conflict (user_id) do update set daily_target = excluded.daily_target, auto_play_audio = excluded.auto_play_audio, show_hints_first = excluded.show_hints_first, review_pace = excluded.review_pace, offline_mode = excluded.offline_mode
  `;

  for (const deck of seedDecks) {
    await sql`
      insert into deck (id, title, description, category, total_words, due_count, accent, bamboo_note)
      values (${deck.id}, ${deck.title}, ${deck.description}, ${deck.category}, ${deck.totalWords}, ${deck.dueCount}, ${deck.accent}, ${deck.bambooNote})
      on conflict (id) do update set title = excluded.title, description = excluded.description, category = excluded.category, total_words = excluded.total_words, due_count = excluded.due_count, accent = excluded.accent, bamboo_note = excluded.bamboo_note
    `;
  }

  for (const word of seedWords) {
    await sql`
      insert into word (id, deck_id, term, phonetic, meaning, short_meaning, hint, examples, synonyms, etymology, tags, difficulty, audio_url)
      values (${word.id}, ${word.deckId}, ${word.term}, ${word.phonetic}, ${word.meaning}, ${word.shortMeaning}, ${word.hint}, ${sql.json(word.examples)}, ${sql.json(word.synonyms)}, ${word.etymology}, ${sql.json(word.tags)}, ${word.difficulty}, ${word.audioUrl ?? null})
      on conflict (id) do update set deck_id = excluded.deck_id, term = excluded.term, phonetic = excluded.phonetic, meaning = excluded.meaning, short_meaning = excluded.short_meaning, hint = excluded.hint, examples = excluded.examples, synonyms = excluded.synonyms, etymology = excluded.etymology, tags = excluded.tags, difficulty = excluded.difficulty, audio_url = excluded.audio_url
    `;
  }

  await sql.end();
  console.log("Seeded Recallink demo data.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
