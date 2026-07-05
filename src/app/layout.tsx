import type { Metadata } from "next";
import { Geist_Mono, M_PLUS_Rounded_1c } from "next/font/google";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import "./globals.css";

const mPlusRounded = M_PLUS_Rounded_1c({
  variable: "--font-m-plus-rounded",
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bakery Shift",
  description:
    "パン製造リーダー・店長向けの希望休回収と製造シフト作成をサポートするWebアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${mPlusRounded.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gradient-to-b from-orange-50 via-amber-50/60 to-orange-100/80 text-stone-800">
        <AppHeader />
        <div className="flex-1">{children}</div>
        <AppFooter />
      </body>
    </html>
  );
}
