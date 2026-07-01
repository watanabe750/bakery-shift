import Link from "next/link";

const adminLinks = [
  {
    href: "/admin/staff",
    label: "スタッフ登録",
    description: "製造スタッフの登録・管理を行います。",
  },
  {
    href: "/admin/positions",
    label: "ポジション設定",
    description: "仕込み・成形・焼成などのポジションを設定します。",
  },
  {
    href: "/admin/day-off-requests",
    label: "希望休一覧",
    description: "スタッフから提出された希望休を確認します。",
  },
  {
    href: "/admin/shifts",
    label: "製造シフト作成",
    description: "月間の製造シフトを作成します。",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">管理者画面</h1>
        <p className="mt-3 text-stone-700">
          製造リーダー・店長がシフト作成に使う画面です。
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-xl font-bold">{link.label}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}