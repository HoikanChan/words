import { NextResponse } from "next/server";
import { updateDailyTarget } from "@/server/repositories/settings-repository";

export async function POST(request: Request) {
  const body = (await request.json()) as { dailyTarget?: number };
  const dailyTarget = Math.max(3, Math.min(30, body.dailyTarget ?? 12));
  const settings = await updateDailyTarget(dailyTarget);
  return NextResponse.json({ settings });
}
