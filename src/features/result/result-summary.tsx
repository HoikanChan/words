import Link from "next/link";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PandaBadge } from "@/components/shared/panda-badge";
import { StampLink } from "@/components/ui/stamp-button";
import { finishReviewSession } from "@/server/services/review-service";

export async function ResultSummary({ sessionId }: { sessionId: string }) {
  const result = await finishReviewSession(sessionId);
  if (!result) return <MobileShell><div className="paper-card rounded-[24px] p-5">结果不存在。</div></MobileShell>;

  return (
    <MobileShell>
      <div className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Session complete</p>
        <h1 className="mt-2 font-headline text-5xl font-black tracking-tight">今日落印</h1>
        <p className="mt-3 text-base text-muted">这一轮已经归档，下面是判词。</p>
      </div>

      <section className="paper-card grid grid-cols-2 gap-3 rounded-[28px] p-5">
        <div className="rounded-[20px] bg-[color:var(--surface-low)] p-4 text-center"><div className="font-headline text-3xl font-black">{result.summary.answered}</div><div className="text-xs uppercase tracking-[0.16em] text-muted">完成词数</div></div>
        <div className="rounded-[20px] bg-[color:var(--surface-low)] p-4 text-center"><div className="font-headline text-3xl font-black">{Math.round(result.summary.accuracy * 100)}%</div><div className="text-xs uppercase tracking-[0.16em] text-muted">准确度</div></div>
        <div className="rounded-[20px] bg-[color:var(--surface-low)] p-4 text-center"><div className="font-headline text-3xl font-black text-bamboo">{result.summary.known}</div><div className="text-xs uppercase tracking-[0.16em] text-muted">熟悉</div></div>
        <div className="rounded-[20px] bg-[color:var(--surface-low)] p-4 text-center"><div className="font-headline text-3xl font-black">{result.summary.durationMinutes}m</div><div className="text-xs uppercase tracking-[0.16em] text-muted">耗时</div></div>
      </section>

      <section className="section-card mt-5 rounded-[28px] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-headline text-2xl font-black tracking-tight">掌握分布</h2>
          <span className="font-bold text-bamboo">{result.summary.streakDays} day streak</span>
        </div>
        <div className="space-y-3">
          {[{ label: "熟悉", value: result.summary.known, tone: "bg-emerald-600" }, { label: "陌生", value: result.summary.vague, tone: "bg-amber-500" }, { label: "忘记", value: result.summary.forgot, tone: "bg-rose-500" }].map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm"><span>{item.label}</span><span>{item.value}</span></div>
              <div className="h-3 rounded-full bg-white/70 p-0.5"><div className={`h-full rounded-full ${item.tone}`} style={{ width: `${(item.value / Math.max(result.summary.total, 1)) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5"><PandaBadge mood="win" note={result.note} /></div>

      <div className="mt-6 grid gap-3">
        <StampLink href="/" className="bg-bamboo text-white">回首页</StampLink>
        <Link href="/review" className="rounded-[18px] bg-white px-5 py-4 text-center font-semibold">再来一轮</Link>
      </div>
    </MobileShell>
  );
}
