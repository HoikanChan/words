import { seedHomePayload } from "@/lib/db/seed-data";
import type { HomePayload } from "@/types/domain";
import { listDecks } from "../repositories/words-repository";
import { getSettings } from "../repositories/settings-repository";

export async function getHomePayload(): Promise<HomePayload> {
  const decks = await listDecks();
  const settings = await getSettings();
  return {
    ...seedHomePayload,
    decks,
    settings,
    stats: {
      ...seedHomePayload.stats,
      remainingToday: Math.max(settings.dailyTarget - seedHomePayload.stats.completedToday, 0),
      dueToday: decks.reduce((sum, deck) => sum + deck.dueCount, 0),
    },
  };
}
