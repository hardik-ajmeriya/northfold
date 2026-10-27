import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted variable fonts (SIL Open Font License), no runtime request to Google Fonts.
const archivo = localFont({
  src: "../fonts/archivo.woff2",
  weight: "100 900",
  variable: "--font-archivo",
  display: "swap",
});
const martian = localFont({
  src: "../fonts/martian-mono.woff2",
  weight: "100 800",
  variable: "--font-martian",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northfold.vercel.app";
const title = "Northfold Architects — Houses drawn by hand, built to the millimetre";
const description =
  "Northfold is an architecture practice designing private houses and careful retrofits. Every project starts as a drawing; scroll to watch one become a building.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { type: "website", url: "/", siteName: "Northfold Architects", title, description },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#eaf1fc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${martian.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
