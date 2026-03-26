import { getWordSpotlight } from "@/lib/ai/fallback";
import type { WordDetailPayload } from "@/types/domain";
import { getDeckById, getWordById } from "../repositories/words-repository";

export async function getWordDetail(wordId: string): Promise<WordDetailPayload | null> {
  const word = await getWordById(wordId);
  if (!word) return null;

  const deck = await getDeckById(word.deckId);
  const aiSpotlight = await getWordSpotlight(word);

  return {
    word,
    deck,
    aiSpotlight,
  };
}
