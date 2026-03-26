import { NextResponse } from "next/server";
import { getHomePayload } from "@/server/services/home-service";

export async function GET() {
  const home = await getHomePayload();
  return NextResponse.json({ home });
}
