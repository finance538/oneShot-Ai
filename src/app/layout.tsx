import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneShot AI — Autonomous Browser Agent & Task Automation",
  description: "Next-generation Browser Agent powered by Gemini AI, Computer Use, and Playwright for autonomous web workflows.",
  icons: {
    icon: "/brand/logo-white.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${notoArabic.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0B0D0F] text-[#F3F4F6] min-h-screen antialiased flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
