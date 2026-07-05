import { ManufacturingShiftTable } from "@/components/shifts/ManufacturingShiftTable";

export default function AdminShiftsPage() {
  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold tracking-tight">
          📋 製造シフト作成
        </h1>
        <p className="mt-3 text-stone-600">
          名前 × 日付の表で、製造スタッフの担当ポジションを作成する画面です。
        </p>

        <ManufacturingShiftTable />
      </div>
    </main>
  );
}
