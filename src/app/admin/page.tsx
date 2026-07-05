import Link from "next/link";

const adminLinks = [
  {
    href: "/admin/staff",
    label: "スタッフ登録",
    emoji: "👩‍🍳",
    description: "製造スタッフの登録・管理を行います。",
  },
  {
    href: "/admin/positions",
    label: "ポジション設定",
    emoji: "🥖",
    description: "仕込み・成形・焼成などのポジションを設定します。",
  },
  {
    href: "/admin/day-off-requests",
    label: "希望休一覧",
    emoji: "📅",
    description: "スタッフから提出された希望休を確認します。",
  },
  {
    href: "/admin/shifts",
    label: "製造シフト作成",
    emoji: "📋",
    description: "月間の製造シフトを作成します。",
  },
];

export default function AdminPage() {
  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight">
          👩‍🍳 管理者画面
        </h1>
        <p className="mt-3 text-stone-600">
          製造リーダー・店長がシフト作成に使う画面です。
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {adminLinks.map((link) => (
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
