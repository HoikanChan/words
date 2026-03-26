import Link from "next/link";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PandaBadge } from "@/components/shared/panda-badge";
import { listDecks, listWords } from "@/server/repositories/words-repository";

export async function LibraryOverview() {
  const [decks, words] = await Promise.all([listDecks(), listWords()]);

  return (
    <MobileShell>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Library</p>
        <h1 className="font-headline text-4xl font-black tracking-tight">词库总览</h1>
      </header>
      <PandaBadge mood="calm" note="第一版先把范围、待背量、入口做清楚，复杂管理以后再长。" />
      <section className="paper-card mt-5 rounded-[28px] p-5">
        <h2 className="font-headline text-2xl font-black tracking-tight">Decks</h2>
        <div className="mt-4 space-y-3">
          {decks.map((deck) => (
            <div key={deck.id} className="rounded-[22px] bg-[color:var(--surface-low)] p-4">
              <div className="flex items-start justify-between gap-3"><div><div className="font-headline text-xl font-black tracking-tight">{deck.title}</div><p className="mt-1 text-sm text-muted">{deck.description}</p></div><div className="font-bold text-bamboo">{deck.dueCount} due</div></div>
            </div>
          ))}
        </div>
      </section>
      <section className="paper-card mt-5 rounded-[28px] p-5">
        <div className="mb-4 flex items-center justify-between"><h2 className="font-headline text-2xl font-black tracking-tight">词条样本</h2><span className="text-sm text-muted">{words.length} total</span></div>
        <div className="space-y-3">
          {words.map((word) => (
            <Link key={word.id} href={`/word/${word.id}`} className="block rounded-[22px] bg-[color:var(--surface-low)] p-4">
              <div className="flex items-center justify-between"><div><div className="font-headline text-xl font-black tracking-tight">{word.term}</div><p className="mt-1 text-sm text-muted">{word.shortMeaning}</p></div><div className="rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em]">{word.difficulty}</div></div>
            </Link>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
