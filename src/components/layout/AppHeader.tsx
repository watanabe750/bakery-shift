import Link from "next/link";

const navLinks = [
  {
    href: "/admin",
    label: "管理者画面",
  },
  {
    href: "/staff",
    label: "スタッフ画面",
  },
];

export function AppHeader() {
  return (
    <header className="border-b border-orange-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-orange-700">
          Bakery Shift
        </Link>

        <nav className="flex gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-orange-50 hover:text-orange-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
