import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnDemand Restaurant Service - Oklahoma's #1 Equipment Repair Experts",
  description: "24/7 emergency restaurant equipment repair in Oklahoma. Licensed technicians for commercial HVAC, refrigeration, ice machines & food service equipment. 2-hour response guaranteed.",
};

// Minimal root layout — no Header or Footer here.
// Public pages get Header + Footer from app/(public)/layout.tsx
// Admin pages get the dashboard shell from app/admin/(dashboard)/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <GoogleTagManager gtmId="GTM-WJ7GJ8H6" />
      <body className={`${inter.className} antialiased bg-white`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
