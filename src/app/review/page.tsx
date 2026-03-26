import { MobileShell } from "@/components/layout/mobile-shell";
import { PandaBadge } from "@/components/shared/panda-badge";
import { StartSessionForm } from "@/features/review/start-session-form";
import { getHomePayload } from "@/server/services/home-service";

export default async function ReviewEntryPage() {
  const home = await getHomePayload();

  return (
    <MobileShell>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Review</p>
        <h1 className="font-headline text-4xl font-black tracking-tight">开卷</h1>
      </header>
      <PandaBadge mood="stern" note="一轮只做一件事：选范围，定数量，进场。" />
      <section className="paper-card mt-5 rounded-[28px] p-5">
        <StartSessionForm defaultTarget={home.settings.dailyTarget} defaultDeckId={home.decks[0]?.id} decks={home.decks} />
      </section>
    </MobileShell>
  );
}
