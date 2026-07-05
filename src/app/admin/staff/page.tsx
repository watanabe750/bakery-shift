import { StaffManagement } from "@/components/staff/StaffManagement";

export default function AdminStaffPage() {
  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold tracking-tight">
          👩‍🍳 スタッフ登録
        </h1>
        <p className="mt-3 text-stone-600">
          製造スタッフの登録・一覧表示を行う画面です。
        </p>

        <StaffManagement />
      </div>
    </main>
  );
}
