"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/admin",
    label: "管理者",
    emoji: "👩‍🍳",
  },
  {
    href: "/staff",
    label: "スタッフ",
    emoji: "🙋",
  },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-orange-600 transition hover:text-orange-700"
        >
          <span className="text-2xl">🥐</span>
          Bakery Shift
        </Link>

        <nav className="flex gap-1.5">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-stone-600 hover:bg-orange-100 hover:text-orange-700"
                }`}
              >
                <span>{link.emoji}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
