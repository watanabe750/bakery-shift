import Link from "next/link";

const staffLinks = [
  {
    href: "/staff/request-days-off",
    label: "希望休提出",
    emoji: "🙋",
    description: "希望休を提出します。",
  },
  {
    href: "/staff/my-shift",
    label: "自分のシフト",
    emoji: "🗓️",
    description: "公開された自分の製造シフトを確認します。",
  },
];

export default function StaffPage() {
  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight">
          🙋 スタッフ画面
        </h1>
        <p className="mt-3 text-stone-600">
          製造スタッフが希望休の提出やシフトの確認に使う画面です。
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {staffLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-start gap-4 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                {link.emoji}
              </span>
              <span>
                <span className="flex items-center gap-1 text-lg font-bold">
                  {link.label}
                  <span className="text-orange-400 transition group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-6 text-stone-600">
                  {link.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
