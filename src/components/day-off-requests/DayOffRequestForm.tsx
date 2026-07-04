"use client";

import { FormEvent, useMemo, useState } from "react";
import { mockStaffList } from "@/mocks/staff";
import type { DayOffRequest } from "@/types/dayOffRequest";

const staffOptions = mockStaffList.map((staff) => staff.name);

export function DayOffRequestForm() {
  const [staffName, setStaffName] = useState(staffOptions[0]);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [requests, setRequests] = useState<DayOffRequest[]>([]);

  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => a.date.localeCompare(b.date));
  }, [requests]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date) {
      alert("希望休の日付を選択してください");
      return;
    }

    const newRequest: DayOffRequest = {
      id: crypto.randomUUID(),
      staffName,
      date,
      note: note.trim(),
    };

    setRequests((currentRequests) => [...currentRequests, newRequest]);
    setDate("");
    setNote("");
  };

  const deleteRequest = (requestId: string) => {
    setRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== requestId),
    );
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">希望休を提出</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="staff-name"
              className="block text-sm font-medium text-stone-700"
            >
              スタッフ名
            </label>
            <select
              id="staff-name"
              value={staffName}
              onChange={(event) => setStaffName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            >
              {staffOptions.map((staff) => (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="day-off-date"
              className="block text-sm font-medium text-stone-700"
            >
              希望休の日付
            </label>
            <input
              id="day-off-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-stone-700"
            >
              メモ
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="例：予定あり、通院など"
              rows={4}
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-600 px-4 py-3 font-bold text-white transition hover:bg-orange-700"
          >
            提出する
          </button>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">提出済み希望休</h2>

        {sortedRequests.length === 0 ? (
          <p className="mt-6 text-sm text-stone-600">
            まだ希望休は提出されていません。
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-600">
                  <th className="px-4 py-3">日付</th>
                  <th className="px-4 py-3">スタッフ</th>
                  <th className="px-4 py-3">メモ</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {sortedRequests.map((request) => (
                  <tr key={request.id} className="border-b border-stone-100">
                    <td className="px-4 py-3 font-medium">{request.date}</td>
                    <td className="px-4 py-3">{request.staffName}</td>
                    <td className="px-4 py-3 text-stone-600">
                      {request.note || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => deleteRequest(request.id)}
                        className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium transition hover:bg-stone-50"
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
