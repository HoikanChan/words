"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Deck } from "@/types/domain";
import { StampButton } from "@/components/ui/stamp-button";

export function StartSessionForm({
  defaultTarget,
  defaultDeckId,
  decks,
}: {
  defaultTarget: number;
  defaultDeckId?: string;
  decks: Deck[];
}) {
  const router = useRouter();
  const [targetCount, setTargetCount] = useState(defaultTarget);
  const [deckId, setDeckId] = useState(defaultDeckId ?? "");
  const [pending, setPending] = useState(false);

  async function handleStart() {
    setPending(true);
    const response = await fetch("/api/review/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetCount, deckId: deckId || undefined }),
    });
    const data = await response.json();
    router.push(`/review/${data.session.id}`);
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-muted">目标词数</div>
        <input
          className="mt-2 w-full rounded-none border-b-2 border-black bg-transparent px-0 py-3 text-3xl font-headline font-black outline-none focus:border-bamboo"
          type="number"
          min={3}
          max={20}
          value={targetCount}
          onChange={(event) => setTargetCount(Number(event.target.value))}
        />
      </label>
      <label className="block">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-muted">词组来源</div>
        <select
          className="mt-2 w-full rounded-[18px] bg-[color:var(--surface-low)] px-4 py-4 text-base outline-none"
          value={deckId}
          onChange={(event) => setDeckId(event.target.value)}
        >
          {decks.map((deck) => (
            <option key={deck.id} value={deck.id}>{deck.title}</option>
          ))}
        </select>
      </label>
      <StampButton className="w-full bg-bamboo text-white" onClick={handleStart} disabled={pending}>
        {pending ? "判官铺卷中..." : "开始背词"}
      </StampButton>
    </div>
  );
}
