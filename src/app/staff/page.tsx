import Link from "next/link";

const staffLinks = [
  {
    href: "/staff/request-days-off",
    label: "希望休提出",
    description: "希望休を提出します。",
  },
  {
    href: "/staff/my-shift",
    label: "自分のシフト",
    description: "公開された自分の製造シフトを確認します。",
  },
];

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">スタッフ画面</h1>
        <p className="mt-3 text-stone-700">
          製造スタッフが希望休の提出やシフトの確認に使う画面です。
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {staffLinks.map((link) => (
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
