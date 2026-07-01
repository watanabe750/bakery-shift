"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Staff, StaffRole } from "@/types/staff";

const initialStaffList: Staff[] = [
  {
    id: "1",
    name: "田中",
    displayOrder: 1,
    role: "admin",
    isActive: true,
  },
  {
    id: "2",
    name: "佐藤",
    displayOrder: 2,
    role: "staff",
    isActive: true,
  },
];

export function StaffManagement() {
  const [staffList, setStaffList] = useState<Staff[]>(initialStaffList);
  const [name, setName] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [role, setRole] = useState<StaffRole>("staff");

  const sortedStaffList = useMemo(() => {
    return [...staffList].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [staffList]);

  const activeStaffCount = staffList.filter((staff) => staff.isActive).length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("スタッフ名を入力してください");
      return;
    }

    const newStaff: Staff = {
      id: crypto.randomUUID(),
      name: trimmedName,
      displayOrder,
      role,
      isActive: true,
    };

    setStaffList((currentStaffList) => [...currentStaffList, newStaff]);
    setName("");
    setDisplayOrder(displayOrder + 1);
    setRole("staff");
  };

  const toggleActive = (staffId: string) => {
    setStaffList((currentStaffList) =>
      currentStaffList.map((staff) =>
        staff.id === staffId
          ? { ...staff, isActive: !staff.isActive }
          : staff,
      ),
    );
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">スタッフ追加</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="staff-name"
              className="block text-sm font-medium text-stone-700"
            >
              スタッフ名
            </label>
            <input
              id="staff-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="例：田中"
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="display-order"
              className="block text-sm font-medium text-stone-700"
            >
              表示順
            </label>
            <input
              id="display-order"
              type="number"
              min={1}
              value={displayOrder}
              onChange={(event) => setDisplayOrder(Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-stone-700"
            >
              権限
            </label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value as StaffRole)}
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="staff">スタッフ</option>
              <option value="admin">管理者</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-600 px-4 py-3 font-bold text-white transition hover:bg-orange-700"
          >
            追加する
          </button>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">スタッフ一覧</h2>
            <p className="mt-2 text-sm text-stone-600">
              有効なスタッフ：{activeStaffCount}人
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-600">
                <th className="px-4 py-3">表示順</th>
                <th className="px-4 py-3">名前</th>
                <th className="px-4 py-3">権限</th>
                <th className="px-4 py-3">状態</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {sortedStaffList.map((staff) => (
                <tr key={staff.id} className="border-b border-stone-100">
                  <td className="px-4 py-3">{staff.displayOrder}</td>
                  <td className="px-4 py-3 font-medium">{staff.name}</td>
                  <td className="px-4 py-3">
                    {staff.role === "admin" ? "管理者" : "スタッフ"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        staff.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {staff.isActive ? "有効" : "無効"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(staff.id)}
                      className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium transition hover:bg-stone-50"
                    >
                      {staff.isActive ? "無効にする" : "有効にする"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
