import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { FUNNEL_NAME, PALETTE } from "@/funnel/config";
import { LANDING } from "@/funnel/landing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: FUNNEL_NAME,
  description: LANDING.subheadline,
};

const paletteVars = {
  "--background": PALETTE.background,
  "--surface": PALETTE.surface,
  "--border": PALETTE.border,
  "--ink": PALETTE.ink,
  "--muted": PALETTE.muted,
  "--accent": PALETTE.accent,
  "--accent-ink": PALETTE.accentInk,
} as React.CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      style={paletteVars}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
