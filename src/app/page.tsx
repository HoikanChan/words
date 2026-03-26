import Link from "next/link";

const taskCards = [
  { title: "CET-4 Foundation", count: "42 words", progress: "Today 18 / 30" },
  { title: "Daily Review Queue", count: "26 due", progress: "Focus on weak words" },
  { title: "Fresh Words", count: "20 new", progress: "Short burst learning" },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-6">
      <header className="sticky top-0 z-10 -mx-5 mb-6 flex items-center justify-between border-b border-black/5 bg-[color:var(--surface)]/90 px-5 py-4 backdrop-blur">
        <div>
          <p className="font-headline text-xs font-extrabold uppercase tracking-[0.24em] text-bamboo/80">
            Panda Judge
          </p>
          <h1 className="font-headline text-3xl font-black tracking-tight">Today&apos;s Mission</h1>
        </div>
        <div className="rounded-full bg-[color:var(--surface-high)] px-4 py-2 text-sm font-bold">
          Lv.12
        </div>
      </header>

      <section className="section-card mb-6 rounded-[24px] p-5">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted">Daily progress</p>
            <h2 className="font-headline text-4xl font-black tracking-tight">18 / 30</h2>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-bamboo/70">Streak</div>
            <div className="font-headline text-2xl font-black text-bamboo">12 days</div>
          </div>
        </div>

        <div className="mb-4 h-3 rounded-full bg-[color:var(--surface-high)] p-0.5">
          <div className="h-full w-3/5 rounded-full bg-bamboo" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Completed</div>
            <div className="mt-2 font-headline text-2xl font-black">18</div>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Remaining</div>
            <div className="mt-2 font-headline text-2xl font-black">12</div>
          </div>
        </div>
      </section>

      <section className="paper-card mb-6 rounded-[24px] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-headline text-xl font-black tracking-tight">Today&apos;s task sets</h2>
          <Link href="/library" className="text-sm font-bold text-bamboo">
            Manage
          </Link>
        </div>

        <div className="space-y-3">
          {taskCards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-[color:var(--surface-low)] p-4">
              <div className="font-headline text-lg font-extrabold tracking-tight">{card.title}</div>
              <div className="mt-1 text-sm text-muted">{card.count}</div>
              <div className="mt-2 text-sm font-medium text-bamboo">{card.progress}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="paper-card mb-8 rounded-[24px] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-headline text-xl font-black tracking-tight">Daily target</h2>
          <span className="text-sm font-medium text-muted">Adjust later in settings</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[color:var(--surface-low)] px-4 py-4">
          <span className="text-base font-medium">Target words for today</span>
          <span className="font-headline text-3xl font-black">30</span>
        </div>
      </section>

      <div className="mt-auto grid gap-3">
        <Link
          href="/review/demo-session"
          className="stamp-button rounded-[20px] bg-bamboo px-5 py-4 text-center font-headline text-lg font-black text-white shadow-[0_14px_28px_rgba(43,108,0,0.22)]"
        >
          Start study session
        </Link>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/library" className="rounded-[18px] border border-black/10 bg-white px-4 py-3 text-center font-semibold">
            Library
          </Link>
          <Link href="/settings" className="rounded-[18px] border border-black/10 bg-white px-4 py-3 text-center font-semibold">
            Settings
          </Link>
        </div>
      </div>
    </main>
  );
}
