import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Short Scanner — High Conviction Shorts",
  description:
    "Automated scanner for identifying high-conviction short setups using OI, Funding Rate, RSI Divergence, Liquidity Sweep and MSB signals.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bg">
      <body className="bg-[#0a0e1a] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
