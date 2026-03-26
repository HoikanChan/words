export function PandaBadge({ mood = "stern", note }: { mood?: "stern" | "calm" | "win"; note: string }) {
  const tone = mood === "win" ? "bg-bamboo text-white" : mood === "calm" ? "bg-white text-ink" : "bg-black text-white";
  return (
    <div className={`paper-card relative overflow-hidden rounded-[24px] p-4 ${tone}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,255,255,0.16)] text-3xl">🐼</div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] opacity-70">Panda Judge</div>
          <p className="mt-1 text-sm leading-6">{note}</p>
        </div>
      </div>
    </div>
  );
}
