import type { Metadata } from "next";
import { Archivo, Figtree, Fraunces, Instrument_Sans, Karla } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import { resolveTheme } from "@/themes";
import { FUNNEL_NAME, PALETTE_OVERRIDES, THEME } from "@/funnel/config";
import { LANDING } from "@/funnel/landing";
import "./globals.css";

/*
 * All theme font pairs load with preload disabled; the browser only
 * fetches the faces the active theme's CSS actually uses.
 */
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"], preload: false });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], preload: false });
const karla = Karla({ variable: "--font-karla", subsets: ["latin"], preload: false });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], preload: false });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], preload: false });

export const metadata: Metadata = {
  title: FUNNEL_NAME,
  description: LANDING.subheadline,
};

const fontVars = [
  instrument.variable,
  fraunces.variable,
  karla.variable,
  archivo.variable,
  figtree.variable,
].join(" ");

export default function RootLayout({ children }: LayoutProps<"/">) {
  const theme = resolveTheme(THEME, PALETTE_OVERRIDES);
  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ background: theme.tokens.background }}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
