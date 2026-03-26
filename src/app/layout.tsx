import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const headline = Plus_Jakarta_Sans({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Words",
  description: "Mobile-first vocabulary learning PWA built with Next.js and Vercel.",
  applicationName: "Words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${headline.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--surface)] text-[var(--ink)] font-body">
        {children}
      </body>
    </html>
  );
}
