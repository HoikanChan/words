export function cnPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function minutesLabel(totalSeconds: number) {
  const minutes = Math.max(1, Math.round(totalSeconds / 60));
  return `${minutes} 分钟`;
}

export function timeLabel(iso: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
