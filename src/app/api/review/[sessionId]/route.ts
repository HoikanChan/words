import { NextResponse } from "next/server";
import { getReviewBundle } from "@/server/services/review-service";

export async function GET(_: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const bundle = await getReviewBundle(sessionId);
  return bundle ? NextResponse.json({ bundle }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
