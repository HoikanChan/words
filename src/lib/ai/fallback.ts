import type { Word } from "@/types/domain";

export async function getWordSpotlight(word: Word) {
  return {
    status: "fallback" as const,
    title: "AI 增强位（优雅降级）",
    body: `如果后续接入 AI，这里会推荐和 ${word.term} 有关的歌词、电影台词或联想钩子。当前先提供稳定的离线文案：把它想成“${word.shortMeaning} + 场景句”去记，比死背更稳。`,
    chips: ["可缓存", "可为空", "不阻塞主流程"],
  };
}
