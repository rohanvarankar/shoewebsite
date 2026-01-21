import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShoeWebsite",
  description: "Premium Shoe Store",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${inter.className}
          bg-slate-50
          text-slate-800
          antialiased
          min-h-screen
        `}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
