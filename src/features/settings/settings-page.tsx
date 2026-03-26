"use client";

import { useState } from "react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PandaBadge } from "@/components/shared/panda-badge";
import { StampButton } from "@/components/ui/stamp-button";
import type { UserSettings } from "@/types/domain";

export function SettingsPageClient({ initialSettings }: { initialSettings: UserSettings }) {
  const [dailyTarget, setDailyTarget] = useState(initialSettings.dailyTarget);
  const [saved, setSaved] = useState(false);

  async function saveTarget() {
    setSaved(false);
    await fetch("/api/tasks/target", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dailyTarget }),
    });
    setSaved(true);
  }

  return (
    <MobileShell>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-bamboo/80">Settings</p>
        <h1 className="font-headline text-4xl font-black tracking-tight">偏好与环境</h1>
      </header>
      <PandaBadge mood="calm" note="设置页只做真会影响主流程的东西：目标量、节奏、离线倾向。" />
      <section className="paper-card mt-5 rounded-[28px] p-5">
        <h2 className="font-headline text-2xl font-black tracking-tight">每日目标</h2>
        <input
          className="mt-4 w-full rounded-none border-b-2 border-black bg-transparent px-0 py-3 text-4xl font-headline font-black outline-none focus:border-bamboo"
          type="number"
          min={3}
          max={30}
          value={dailyTarget}
          onChange={(event) => setDailyTarget(Number(event.target.value))}
        />
        <p className="mt-2 text-sm text-muted">建议 8-16，过大容易磨损节奏感。</p>
        <StampButton className="mt-5 w-full bg-black text-white" onClick={saveTarget}>保存目标量</StampButton>
        {saved ? <p className="mt-3 text-sm font-medium text-bamboo">已保存，首页会读取最新值。</p> : null}
      </section>
      <section className="paper-card mt-5 rounded-[28px] p-5">
        <h2 className="font-headline text-2xl font-black tracking-tight">当前偏好</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-[18px] bg-[color:var(--surface-low)] px-4 py-3"><span>自动播放音频</span><strong>{initialSettings.autoPlayAudio ? "开" : "关"}</strong></div>
          <div className="flex items-center justify-between rounded-[18px] bg-[color:var(--surface-low)] px-4 py-3"><span>提示优先</span><strong>{initialSettings.showHintsFirst ? "是" : "否"}</strong></div>
          <div className="flex items-center justify-between rounded-[18px] bg-[color:var(--surface-low)] px-4 py-3"><span>节奏</span><strong>{initialSettings.reviewPace}</strong></div>
          <div className="flex items-center justify-between rounded-[18px] bg-[color:var(--surface-low)] px-4 py-3"><span>离线壳</span><strong>{initialSettings.offlineMode ? "已启用" : "关闭"}</strong></div>
        </div>
      </section>
    </MobileShell>
  );
}
