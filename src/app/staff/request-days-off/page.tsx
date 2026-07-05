import { DayOffRequestForm } from "@/components/day-off-requests/DayOffRequestForm";

export default function RequestDaysOffPage() {
  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold tracking-tight">
          🙋 希望休提出
        </h1>
        <p className="mt-3 text-stone-600">
          スタッフが希望休を提出する画面です。
        </p>

        <DayOffRequestForm />
      </div>
    </main>
  );
}
