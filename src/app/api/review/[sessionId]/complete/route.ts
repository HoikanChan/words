import { NextResponse } from "next/server";
import { finishReviewSession } from "@/server/services/review-service";

export async function POST(_: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const result = await finishReviewSession(sessionId);
  return result ? NextResponse.json({ result }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
