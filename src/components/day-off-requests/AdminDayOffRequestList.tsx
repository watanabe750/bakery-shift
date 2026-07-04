"use client";

import { useMemo, useState } from "react";
import { getDaysInMonth } from "@/lib/date";
import type { DayOffRequest } from "@/types/dayOffRequest";

const staffNames = ["田中", "佐藤", "鈴木", "山田"];

const mockRequests: DayOffRequest[] = [
  {
    id: "1",
    staffName: "田中",
    date: "2026-07-03",
    note: "予定あり",
  },
  {
    id: "2",
    staffName: "田中",
    date: "2026-07-12",
    note: "",
  },
  {
    id: "3",
    staffName: "佐藤",
    date: "2026-07-05",
    note: "通院",
  },
  {
    id: "4",
    staffName: "鈴木",
    date: "2026-07-18",
    note: "",
  },
];

const submittedStaffNames = ["田中", "佐藤", "鈴木"];

export function AdminDayOffRequestList() {
  const [selectedMonth, setSelectedMonth] = useState("2026-07");

  const days = useMemo(() => {
    return getDaysInMonth(selectedMonth);
  }, [selectedMonth]);

  const monthlyRequests = useMemo(() => {
    return mockRequests.filter((request) =>
      request.date.startsWith(selectedMonth),
    );
  }, [selectedMonth]);

  const unsubmittedStaffNames = staffNames.filter(
    (staffName) => !submittedStaffNames.includes(staffName),
  );

  const getRequest = (staffName: string, date: string) => {
    return monthlyRequests.find(
      (request) => request.staffName === staffName && request.date === date,
    );
  };

  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold">希望休一覧</h2>
            <p className="mt-2 text-sm text-stone-600">
              スタッフごとの希望休を月単位で確認します。
            </p>
          </div>

          <div>
            <label
              htmlFor="target-month"
              className="block text-sm font-medium text-stone-700"
            >
              対象月
            </label>
            <input
              id="target-month"
              type="month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="mt-2 rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">未提出者</h2>

        {unsubmittedStaffNames.length === 0 ? (
          <p className="mt-4 text-sm text-stone-600">
            全員が希望休を提出済みです。
          </p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {unsubmittedStaffNames.map((staffName) => (
              <li
                key={staffName}
                className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700"
              >
                {staffName}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">月間希望休表</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-max border-collapse text-center text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 border border-stone-200 bg-stone-100 px-4 py-3 text-left">
                  スタッフ
                </th>
                {days.map((day) => (
                  <th
                    key={day.date}
                    className="border border-stone-200 bg-stone-100 px-3 py-3"
                  >
                    {day.day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {staffNames.map((staffName) => (
                <tr key={staffName}>
                  <th className="sticky left-0 z-10 border border-stone-200 bg-white px-4 py-3 text-left font-bold">
                    {staffName}
                  </th>

                  {days.map((day) => {
                    const request = getRequest(staffName, day.date);

                    return (
                      <td
                        key={day.date}
                        className="h-14 min-w-14 border border-stone-200 px-2 py-2"
                      >
                        {request ? (
                          <div>
                            <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                              休
                            </span>
                            {request.note && (
                              <p className="mt-1 text-[10px] text-stone-500">
                                {request.note}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-stone-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">希望休リスト</h2>

        {monthlyRequests.length === 0 ? (
          <p className="mt-4 text-sm text-stone-600">
            この月の希望休はまだありません。
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-600">
                  <th className="px-4 py-3">日付</th>
                  <th className="px-4 py-3">スタッフ</th>
                  <th className="px-4 py-3">メモ</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRequests.map((request) => (
                  <tr key={request.id} className="border-b border-stone-100">
                    <td className="px-4 py-3 font-medium">{request.date}</td>
                    <td className="px-4 py-3">{request.staffName}</td>
                    <td className="px-4 py-3 text-stone-600">
                      {request.note || "-"}
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
