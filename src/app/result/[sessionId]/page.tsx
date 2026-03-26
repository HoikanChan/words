import { ResultSummary } from "@/features/result/result-summary";

export default async function ResultPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  return <ResultSummary sessionId={sessionId} />;
}
