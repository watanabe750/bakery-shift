import { PositionManagement } from "@/components/positions/PositionManagement";

export default function AdminPositionsPage() {
  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold tracking-tight">
          🥖 ポジション設定
        </h1>
        <p className="mt-3 text-stone-600">
          仕込み・成形・焼成などのポジションを設定する画面です。
        </p>

        <PositionManagement />
      </div>
    </main>
  );
}
