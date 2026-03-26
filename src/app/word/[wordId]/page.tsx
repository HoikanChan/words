import Link from "next/link";

export default async function WordDetailPage({
  params,
}: {
  params: Promise<{ wordId: string }>;
}) {
  const { wordId } = await params;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-6">
      <header className="mb-6 flex items-center justify-between">
        <Link href="/review/demo-session" className="text-sm font-bold text-bamboo">
          ← Back to review
        </Link>
        <div className="rounded-full bg-[color:var(--surface-high)] px-4 py-2 text-sm font-bold">
          {wordId}
        </div>
      </header>

      <section className="mb-5 rounded-[28px] bg-[color:var(--surface-low)] p-5">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Word insight</div>
        <h1 className="mt-2 font-headline text-5xl font-black tracking-tight">Ephemeral</h1>
        <p className="mt-2 text-lg text-muted">/ɪˈfemərəl/</p>
        <p className="mt-4 text-lg leading-8">lasting for a very short time; transient.</p>
      </section>

      <section className="paper-card mb-5 rounded-[24px] p-5">
        <h2 className="font-headline text-xl font-black tracking-tight">Examples</h2>
        <ul className="mt-3 space-y-3 text-base leading-7 text-muted">
          <li>The beauty of spring blossoms can feel ephemeral.</li>
          <li>Online fame is often ephemeral and difficult to sustain.</li>
        </ul>
      </section>

      <section className="paper-card mb-5 rounded-[24px] p-5">
        <h2 className="font-headline text-xl font-black tracking-tight">Related words</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {['fleeting', 'transient', 'momentary', 'evanescent'].map((item) => (
            <span key={item} className="rounded-full bg-[color:var(--surface-low)] px-4 py-2 text-sm font-medium">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] bg-black p-5 text-white shadow-[0_18px_36px_rgba(0,0,0,0.18)]">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-green-300">AI spotlight</div>
        <p className="mt-3 text-base leading-7 text-white/85">
          Later this block can be powered by Vercel AI SDK to recommend lyrics, movie lines, or memory hooks related to the current word.
        </p>
      </section>
    </main>
  );
}
