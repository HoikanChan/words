import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "stamp-button inline-flex items-center justify-center rounded-[20px] px-5 py-4 text-center font-headline text-base font-black tracking-tight transition";

export function StampButton({ className = "", ...props }: ComponentProps<"button">) {
  return <button className={`${base} ${className}`} {...props} />;
}

export function StampLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  return <Link className={`${base} ${className}`} {...props} />;
}
