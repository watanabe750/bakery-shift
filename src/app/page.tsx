export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold text-orange-700">
          Bakery Shift
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          パン屋の製造シフト作成を、もっとラクに。
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
          bakery-shift は、パン製造リーダー・店長向けの
          希望休回収と製造シフト作成をサポートするWebアプリです。
        </p>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">希望休を集める</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              スタッフがスマホから希望休を提出できるようにします。
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">製造シフトを作る</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              名前と日付の表に、仕込み・成形・焼成などのポジションを入力します。
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">印刷して貼り出す</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              完成した月間シフトを現場に貼れる形で印刷します。
            </p>
          </div>
        </section>

        <div className="mt-10 rounded-2xl border border-orange-200 bg-white p-6">
          <h2 className="text-xl font-bold">MVPで作るもの</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-stone-700">
            <li>スタッフ登録</li>
            <li>ポジション設定</li>
            <li>希望休提出</li>
            <li>希望休一覧</li>
            <li>製造シフト作成</li>
            <li>下書き / 公開</li>
            <li>印刷</li>
          </ul>
        </div>
      </div>
    </main>
  );
}