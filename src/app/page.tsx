import Link from "next/link";

const features = [
  {
    emoji: "🙋",
    title: "希望休を集める",
    description: "スタッフがスマホから希望休を提出。紙のメモはもういりません。",
    accent: "bg-orange-100",
  },
  {
    emoji: "📋",
    title: "製造シフトを作る",
    description:
      "名前と日付の表に、仕込み・成形・焼成などのポジションを選ぶだけ。",
    accent: "bg-amber-100",
  },
  {
    emoji: "🖨️",
    title: "印刷して貼り出す",
    description: "完成した月間シフトを、現場に貼れる形でそのまま印刷。",
    accent: "bg-rose-100",
  },
];

const mvpItems = [
  "スタッフ登録",
  "ポジション設定",
  "希望休提出",
  "希望休一覧",
  "製造シフト作成",
  "下書き / 公開",
  "印刷",
];

export default function Home() {
  return (
    <main className="px-6 py-16 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm">
            🥐 パン屋さんのためのシフト管理
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            パン屋の製造シフト作成を、
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              もっとラクに。
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">
            Bakery Shift は、パン製造リーダー・店長向けの
            希望休回収と製造シフト作成をサポートするWebアプリです。
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/admin"
              className="rounded-full bg-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-200"
            >
              👩‍🍳 管理者画面へ
            </Link>
            <Link
              href="/staff"
              className="rounded-full border-2 border-orange-200 bg-white px-7 py-3.5 font-bold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-50"
            >
              🙋 スタッフ画面へ
            </Link>
          </div>
        </div>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-orange-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${feature.accent}`}
              >
                {feature.emoji}
              </div>
              <h2 className="mt-4 text-lg font-bold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-3xl border border-orange-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold">✨ MVPでできること</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {mvpItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-stone-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
