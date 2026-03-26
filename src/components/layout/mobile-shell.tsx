import type { ReactNode } from "react";

export function MobileShell({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-6">{children}</main>;
}
