import { NextResponse } from "next/server";
import { getWordDetail } from "@/server/services/word-service";

export async function GET(_: Request, { params }: { params: Promise<{ wordId: string }> }) {
  const { wordId } = await params;
  const detail = await getWordDetail(wordId);
  return detail ? NextResponse.json({ detail }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
