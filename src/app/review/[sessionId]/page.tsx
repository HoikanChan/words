import { notFound } from "next/navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ReviewSessionClient } from "@/features/review/review-session-client";
import { getReviewBundle } from "@/server/services/review-service";

export default async function ReviewSessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const bundle = await getReviewBundle(sessionId);
  if (!bundle) notFound();

  return (
    <MobileShell>
      <ReviewSessionClient initialBundle={bundle} />
    </MobileShell>
  );
}
