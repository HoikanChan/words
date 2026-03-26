import Link from "next/link";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-6">
      <div className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Session complete</p>
        <h1 className="mt-2 font-headline text-5xl font-black tracking-tight">Mission accomplished</h1>
        <p className="mt-3 text-base text-muted">Session {sessionId} finished. Here is today&apos;s summary.</p>
      </div>

      <section className="paper-card mb-5 grid grid-cols-3 gap-3 rounded-[28px] p-5">
        <div className="rounded-[18px] bg-[color:var(--surface-low)] p-4 text-center">
          <div className="font-headline text-3xl font-black">42</div>
          <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">Words</div>
        </div>
        <div className="rounded-[18px] bg-[color:var(--surface-low)] p-4 text-center">
          <div className="font-headline text-3xl font-black">28m</div>
          <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">Time</div>
        </div>
        <div className="rounded-[18px] bg-[color:var(--surface-low)] p-4 text-center">
          <div className="font-headline text-3xl font-black text-bamboo">96%</div>
          <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">Score</div>
        </div>
      </section>

      <section className="mb-6 rounded-[28px] bg-[color:var(--surface-low)] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-headline text-xl font-black tracking-tight">Streak</h2>
          <span className="font-bold text-bamboo">12 days</span>
        </div>
        <div className="h-3 rounded-full bg-[color:var(--surface-high)] p-0.5">
          <div className="h-full w-4/5 rounded-full bg-bamboo" />
        </div>
      </section>

      <section className="paper-card mb-8 rounded-[24px] p-5">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">AI insight</div>
        <p className="mt-3 text-base leading-7 text-muted">
          Tomorrow you can focus on weak words with abstract meanings and continue reinforcing recall through shorter loops.
        </p>
      </section>

      <div className="mt-auto grid gap-3">
        <Link href="/" className="stamp-button rounded-[20px] bg-bamboo px-5 py-4 text-center font-headline text-lg font-black text-white">
          Back home
        </Link>
        <Link href="/review/demo-session" className="rounded-[18px] border border-black/10 bg-white px-5 py-4 text-center font-semibold">
          Review again
        </Link>
      </div>
    </main>
  );
}
