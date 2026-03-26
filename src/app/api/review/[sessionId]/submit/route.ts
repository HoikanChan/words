import { NextResponse } from "next/server";
import { answerReviewWord } from "@/server/services/review-service";
import type { ReviewVerdict } from "@/types/domain";

export async function POST(request: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const body = (await request.json()) as { wordId: string; verdict: ReviewVerdict };
  const bundle = await answerReviewWord(sessionId, body.wordId, body.verdict);
  return bundle ? NextResponse.json({ bundle }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
