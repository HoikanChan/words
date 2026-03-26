import { NextResponse } from "next/server";
import { createReviewSession } from "@/server/services/review-service";

export async function POST(request: Request) {
  const body = (await request.json()) as { targetCount?: number; deckId?: string };
  const session = await createReviewSession({ targetCount: Math.max(3, Math.min(20, body.targetCount ?? 8)), deckId: body.deckId });
  return NextResponse.json({ session });
}
