import { AdminDayOffRequestList } from "@/components/day-off-requests/AdminDayOffRequestList";

export default function AdminDayOffRequestsPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">希望休一覧</h1>
        <p className="mt-3 text-stone-700">
          スタッフから提出された希望休を確認する画面です。
        </p>

        <AdminDayOffRequestList />
      </div>
    </main>
  );
}
