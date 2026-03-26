import Link from "next/link";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PandaBadge } from "@/components/shared/panda-badge";
import { getWordDetail } from "@/server/services/word-service";

export async function WordDetail({ wordId }: { wordId: string }) {
  const detail = await getWordDetail(wordId);
  if (!detail) return <MobileShell><div className="paper-card rounded-[24px] p-5">词条不存在。</div></MobileShell>;

  return (
    <MobileShell>
      <header className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold text-bamboo">← Back</Link>
        <div className="rounded-full bg-white px-4 py-2 text-sm font-bold">{detail.deck?.title ?? "Word"}</div>
      </header>

      <section className="section-card rounded-[28px] p-5">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Word detail</div>
        <h1 className="mt-2 font-headline text-5xl font-black tracking-tight">{detail.word.term}</h1>
        <p className="mt-2 text-lg text-muted">{detail.word.phonetic}</p>
        <p className="mt-4 text-lg leading-8">{detail.word.meaning}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {detail.word.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-4 py-2 text-sm font-medium">{tag}</span>)}
        </div>
      </section>

      <section className="paper-card mt-5 rounded-[28px] p-5">
        <h2 className="font-headline text-2xl font-black tracking-tight">例句</h2>
        <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
          {detail.word.examples.map((example) => <li key={example}>{example}</li>)}
        </ul>
      </section>

      <section className="paper-card mt-5 rounded-[28px] p-5">
        <h2 className="font-headline text-2xl font-black tracking-tight">近义与词源</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {detail.word.synonyms.map((synonym) => <span key={synonym} className="rounded-full bg-[color:var(--surface-low)] px-4 py-2 text-sm font-medium">{synonym}</span>)}
        </div>
        <p className="mt-4 text-base leading-7 text-muted">{detail.word.etymology}</p>
      </section>

      <div className="mt-5">
        <PandaBadge mood="win" note={detail.aiSpotlight.body} />
      </div>
    </MobileShell>
  );
}
