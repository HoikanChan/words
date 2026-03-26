export default function LibraryPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Library</p>
        <h1 className="font-headline text-4xl font-black tracking-tight">Task sets & decks</h1>
      </header>

      <section className="paper-card rounded-[24px] p-5">
        <p className="text-base leading-7 text-muted">
          This page will manage task sources, decks, and future word collections. For now it serves as the route skeleton for the core information architecture.
        </p>
      </section>
    </main>
  );
}
