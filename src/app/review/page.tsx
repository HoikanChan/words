import Link from "next/link";

export default function ReviewEntryPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-10">
      <section className="paper-card rounded-[28px] p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Review</p>
        <h1 className="mt-2 font-headline text-4xl font-black tracking-tight">Session entry</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          This route is reserved for initializing a review session before entering the real study flow.
        </p>
        <Link
          href="/review/demo-session"
          className="stamp-button mt-6 inline-block rounded-[18px] bg-bamboo px-5 py-3 font-headline font-black text-white"
        >
          Open demo session
        </Link>
      </section>
    </main>
  );
}
