import Link from "next/link";
import { PandaBadge } from "@/components/shared/panda-badge";
import { MobileShell } from "@/components/layout/mobile-shell";
import { StampLink } from "@/components/ui/stamp-button";
import { getHomePayload } from "@/server/services/home-service";
import { timeLabel } from "@/lib/utils/format";
import { StartSessionForm } from "../review/start-session-form";

export async function HomeDashboard() {
  const home = await getHomePayload();
  const percent = home.settings.dailyTarget
    ? Math.min(1, home.stats.completedToday / home.settings.dailyTarget)
    : 0;

  return (
    <MobileShell>
      <header className="sticky top-0 z-10 -mx-5 mb-6 flex items-center justify-between bg-[color:var(--surface)]/85 px-5 py-4 backdrop-blur-xl">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Recallink</p>
          <h1 className="font-headline text-4xl font-black tracking-tight">今日判词</h1>
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-sm font-bold">{home.stats.streakDays} day streak</div>
      </header>

      <section className="section-card mb-5 rounded-[28px] p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-muted">今日进度</p>
            <h2 className="font-headline text-5xl font-black tracking-tight">
              {home.stats.completedToday} / {home.settings.dailyTarget}
            </h2>
          </div>
          <div className="rounded-[20px] bg-white px-4 py-3 text-right">
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted">Due</div>
            <div className="font-headline text-3xl font-black">{home.stats.dueToday}</div>
          </div>
        </div>
        <div className="mt-4 h-3 rounded-full bg-[color:var(--surface-high)] p-0.5">
          <div className="h-full rounded-full bg-bamboo" style={{ width: `${percent * 100}%` }} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-[18px] bg-white p-4"><div className="font-headline text-2xl font-black">{home.stats.completedToday}</div><div className="text-xs uppercase tracking-[0.2em] text-muted">Done</div></div>
          <div className="rounded-[18px] bg-white p-4"><div className="font-headline text-2xl font-black">{home.stats.remainingToday}</div><div className="text-xs uppercase tracking-[0.2em] text-muted">Left</div></div>
          <div className="rounded-[18px] bg-white p-4"><div className="font-headline text-2xl font-black">{home.stats.strongestTag}</div><div className="text-xs uppercase tracking-[0.2em] text-muted">Best tag</div></div>
        </div>
      </section>

      <PandaBadge mood="stern" note="今日别贪多。先完成主任务，再碰 Boss Words。" />

      <section className="paper-card mt-5 rounded-[28px] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Decks</p>
            <h2 className="font-headline text-2xl font-black tracking-tight">今日待审竹简</h2>
          </div>
          <Link href="/library" className="text-sm font-bold text-bamboo">词库</Link>
        </div>
        <div className="space-y-3">
          {home.decks.map((deck) => (
            <div key={deck.id} className="rounded-[22px] bg-[color:var(--surface-low)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-headline text-xl font-black tracking-tight">{deck.title}</div>
                  <p className="mt-1 text-sm text-muted">{deck.description}</p>
                </div>
                <div className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] ${deck.accent}`}>{deck.category}</div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span>{deck.totalWords} words</span>
                <span className="font-bold text-bamboo">{deck.dueCount} due</span>
              </div>
              <p className="mt-2 text-sm text-muted">{deck.bambooNote}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="paper-card mt-5 rounded-[28px] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-headline text-2xl font-black tracking-tight">开始一轮</h2>
          <span className="text-sm text-muted">目标 {home.settings.dailyTarget}</span>
        </div>
        <StartSessionForm defaultTarget={home.settings.dailyTarget} decks={home.decks} />
      </section>

      <section className="paper-card mt-5 rounded-[28px] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-headline text-2xl font-black tracking-tight">最近战绩</h2>
          <Link href="/settings" className="text-sm font-bold text-bamboo">设置</Link>
        </div>
        <div className="space-y-3">
          {home.recentSessions.map((session) => (
            <div key={session.id} className="rounded-[20px] bg-[color:var(--surface-low)] px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{timeLabel(session.createdAt)}</span>
                <span className="font-bold text-bamboo">{Math.round(session.accuracy * 100)}%</span>
              </div>
              <p className="mt-1 text-sm text-muted">完成 {session.completedCount} 词，判官没皱眉。</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <StampLink href="/library" className="bg-white text-ink">Library</StampLink>
        <StampLink href="/settings" className="bg-black text-white">Settings</StampLink>
      </div>
    </MobileShell>
  );
}
