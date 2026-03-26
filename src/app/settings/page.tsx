export default function SettingsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Settings</p>
        <h1 className="font-headline text-4xl font-black tracking-tight">Preferences</h1>
      </header>

      <div className="space-y-4">
        <section className="paper-card rounded-[24px] p-5">
          <h2 className="font-headline text-xl font-black tracking-tight">Study preferences</h2>
          <p className="mt-2 text-base leading-7 text-muted">
            Daily target, audio behavior, and review pacing will live here.
          </p>
        </section>

        <section className="paper-card rounded-[24px] p-5">
          <h2 className="font-headline text-xl font-black tracking-tight">Platform setup</h2>
          <p className="mt-2 text-base leading-7 text-muted">
            Vercel Postgres, Blob, KV, and AI provider environment variables will be documented here and in the env example file.
          </p>
        </section>
      </div>
    </main>
  );
}
