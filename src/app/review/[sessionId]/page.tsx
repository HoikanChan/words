import Link from "next/link";

export default async function ReviewSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-6">
      <header className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold text-bamboo">
          ← Back
        </Link>
        <div className="rounded-full bg-[color:var(--surface-high)] px-4 py-2 text-sm font-bold">
          Session {sessionId}
        </div>
      </header>

      <section className="mb-5 rounded-[28px] bg-[color:var(--surface-low)] p-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Challenge progress</p>
            <h1 className="font-headline text-5xl font-black tracking-tight">Ephemeral</h1>
          </div>
          <button className="stamp-button rounded-full bg-white px-4 py-3 text-sm font-bold shadow-sm">
            🔊 Audio
          </button>
        </div>
        <p className="text-lg text-muted">短暂的；转瞬即逝的</p>
      </section>

      <section className="paper-card mb-5 rounded-[28px] p-5 text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Hint</div>
        <p className="text-base leading-7 text-muted">
          The beauty of cherry blossoms is often <span className="font-bold text-ink">ephe...</span>, lasting only a few days.
        </p>
        <button className="mt-5 rounded-[18px] border border-black/10 bg-[color:var(--surface-low)] px-5 py-3 font-headline font-extrabold">
          Reveal more hint
        </button>
      </section>

      <section className="mt-auto grid grid-cols-3 gap-3">
        <button className="stamp-button rounded-[24px] bg-red-50 px-3 py-6 text-center text-red-700">
          <div className="font-headline text-lg font-black">Forgot</div>
          <div className="mt-1 text-sm">忘记</div>
        </button>
        <button className="stamp-button rounded-[24px] bg-amber-50 px-3 py-6 text-center text-amber-800">
          <div className="font-headline text-lg font-black">Vague</div>
          <div className="mt-1 text-sm">陌生</div>
        </button>
        <button className="stamp-button rounded-[24px] bg-emerald-50 px-3 py-6 text-center text-emerald-700">
          <div className="font-headline text-lg font-black">Known</div>
          <div className="mt-1 text-sm">熟悉</div>
        </button>
      </section>

      <div className="mt-5 text-center text-sm text-muted">
        Need context? <Link href="/word/demo-word" className="font-bold text-bamboo">Open word detail</Link>
      </div>
    </main>
  );
}
