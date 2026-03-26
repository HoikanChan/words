"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PandaBadge } from "@/components/shared/panda-badge";
import { StampButton } from "@/components/ui/stamp-button";
import type { ReviewSessionBundle, ReviewVerdict } from "@/types/domain";

const verdictMeta: Record<ReviewVerdict, { en: string; cn: string; className: string }> = {
  forgot: { en: "Forgot", cn: "忘记", className: "bg-rose-100 text-rose-700" },
  vague: { en: "Vague", cn: "陌生", className: "bg-amber-100 text-amber-800" },
  known: { en: "Known", cn: "熟悉", className: "bg-emerald-100 text-emerald-700" },
};

export function ReviewSessionClient({ initialBundle }: { initialBundle: ReviewSessionBundle }) {
  const router = useRouter();
  const [bundle, setBundle] = useState(initialBundle);
  const [showHint, setShowHint] = useState(true);
  const [showExamples, setShowExamples] = useState(false);
  const [pending, setPending] = useState(false);

  const currentWord = bundle.currentWord;
  const done = !currentWord;
  const progressWidth = `${Math.max(bundle.progress.percent, 0.06) * 100}%`;
  const mood = useMemo(() => (bundle.progress.known >= bundle.progress.forgot ? "calm" : "stern"), [bundle]);

  async function answer(verdict: ReviewVerdict) {
    if (!currentWord) return;
    setPending(true);
    const response = await fetch(`/api/review/${bundle.session.id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordId: currentWord.id, verdict }),
    });
    const data = await response.json();
    setBundle(data.bundle);
    setShowHint(true);
    setShowExamples(false);
    setPending(false);

    if (!data.bundle.currentWord) {
      const completeResponse = await fetch(`/api/review/${bundle.session.id}/complete`, { method: "POST" });
      const completeData = await completeResponse.json();
      router.push(`/result/${completeData.result.session.id}`);
    }
  }

  if (done) {
    return <div className="paper-card rounded-[28px] p-6">本轮已完成，正在跳转结果页…</div>;
  }

  return (
    <>
      <header className="mb-5 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold text-bamboo">← 首页</Link>
        <div className="rounded-full bg-white px-4 py-2 text-sm font-bold">{bundle.progress.answered} / {bundle.progress.total}</div>
      </header>

      <section className="section-card rounded-[28px] p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Current word</div>
            <h1 className="font-headline text-5xl font-black tracking-tight">{currentWord.term}</h1>
            <p className="mt-2 text-lg text-muted">{currentWord.shortMeaning} · {currentWord.phonetic}</p>
          </div>
          <div className="rounded-full bg-white px-4 py-3 text-sm font-bold">🔊 Audio</div>
        </div>
        <div className="h-3 rounded-full bg-[color:var(--surface-high)] p-0.5">
          <div className="h-full rounded-full bg-black" style={{ width: progressWidth }} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="rounded-[18px] bg-white p-3"><div className="font-headline text-2xl font-black">{bundle.progress.known}</div><div className="text-muted">熟悉</div></div>
          <div className="rounded-[18px] bg-white p-3"><div className="font-headline text-2xl font-black">{bundle.progress.vague}</div><div className="text-muted">陌生</div></div>
          <div className="rounded-[18px] bg-white p-3"><div className="font-headline text-2xl font-black">{bundle.progress.forgot}</div><div className="text-muted">忘记</div></div>
        </div>
      </section>

      <div className="mt-5">
        <PandaBadge mood={mood} note="先看义，再给判词。信息够了就下手，不要反复犹豫。" />
      </div>

      <section className="paper-card mt-5 rounded-[28px] p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Hint</div>
            <h2 className="font-headline text-2xl font-black tracking-tight">给一点，不给太满</h2>
          </div>
          <button className="text-sm font-bold text-bamboo" onClick={() => setShowHint((value) => !value)}>
            {showHint ? "收起" : "展开"}
          </button>
        </div>
        {showHint ? <p className="text-base leading-7 text-muted">{currentWord.hint}</p> : <p className="text-base text-muted">先自己想，再点开。</p>}
        <button className="mt-4 rounded-[18px] bg-[color:var(--surface-low)] px-4 py-3 font-semibold" onClick={() => setShowExamples((value) => !value)}>
          {showExamples ? "隐藏例句" : "展开例句"}
        </button>
        {showExamples ? (
          <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
            {currentWord.examples.map((example) => <li key={example}>{example}</li>)}
          </ul>
        ) : null}
      </section>

      <div className="mt-5 text-center text-sm text-muted">
        卡住了？ <Link href={`/word/${currentWord.id}`} className="font-bold text-bamboo">打开词条详情</Link>
      </div>

      <section className="mt-auto grid grid-cols-3 gap-3 pt-6">
        {(Object.entries(verdictMeta) as Array<[ReviewVerdict, (typeof verdictMeta)[ReviewVerdict]]>).map(([value, meta]) => (
          <StampButton key={value} className={`px-3 py-6 ${meta.className}`} disabled={pending} onClick={() => answer(value)}>
            <span className="flex flex-col items-center">
              <span className="font-headline text-lg font-black">{meta.en}</span>
              <span className="mt-1 text-sm font-medium">{meta.cn}</span>
            </span>
          </StampButton>
        ))}
      </section>
    </>
  );
}
