import { WordDetail } from "@/features/word/word-detail";

export default async function WordDetailPage({ params }: { params: Promise<{ wordId: string }> }) {
  const { wordId } = await params;
  return <WordDetail wordId={wordId} />;
}
