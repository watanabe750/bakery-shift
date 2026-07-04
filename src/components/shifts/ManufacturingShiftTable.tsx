"use client";

import { useMemo, useState } from "react";
import { getDaysInMonth } from "@/lib/date";
import type { DayOffRequest } from "@/types/dayOffRequest";
import type { Position } from "@/types/position";
import type { ShiftAssignment } from "@/types/shift";
import type { Staff } from "@/types/staff";

const mockStaffList: Staff[] = [
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
  {
    id: "3",
    name: "鈴木",
    displayOrder: 3,
    role: "staff",
    isActive: true,
  },
  {
    id: "4",
    name: "山田",
    displayOrder: 4,
    role: "staff",
    isActive: true,
  },
];

const mockPositions: Position[] = [
  {
    id: "1",
    name: "仕込み",
    shortName: "仕",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    name: "成形",
    shortName: "成",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "3",
    name: "焼成",
    shortName: "焼",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "4",
    name: "サンド",
    shortName: "サ",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "5",
    name: "補助",
    shortName: "補",
    displayOrder: 5,
    isActive: true,
  },
];

const mockDayOffRequests: DayOffRequest[] = [
  {
    id: "1",
    staffName: "田中",
    date: "2026-07-03",
    note: "予定あり",
  },
  {
    id: "2",
    staffName: "佐藤",
    date: "2026-07-05",
    note: "通院",
  },
  {
    id: "3",
    staffName: "鈴木",
    date: "2026-07-12",
    note: "",
  },
];

export function ManufacturingShiftTable() {
  const [selectedMonth, setSelectedMonth] = useState("2026-07");
  const [assignments, setAssignments] = useState<ShiftAssignment[]>([]);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const days = useMemo(() => {
    return getDaysInMonth(selectedMonth);
  }, [selectedMonth]);

  const activeStaffList = useMemo(() => {
    return mockStaffList
      .filter((staff) => staff.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, []);

  const activePositions = useMemo(() => {
    return mockPositions
      .filter((position) => position.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, []);

  const getAssignment = (staffId: string, date: string) => {
    return assignments.find(
      (assignment) =>
        assignment.staffId === staffId && assignment.date === date,
    );
  };

  const getStaffName = (staffId: string) => {
    return mockStaffList.find((staff) => staff.id === staffId)?.name ?? "";
  };

  const getDayOffRequest = (staffName: string, date: string) => {
    return mockDayOffRequests.find(
      (request) => request.staffName === staffName && request.date === date,
    );
  };

  const getCellValue = (staffId: string, date: string) => {
    const assignment = getAssignment(staffId, date);

    if (!assignment) {
      return "";
    }

    if (assignment.status === "off") {
      return "off";
    }

    return assignment.positionId ?? "";
  };

  const updateAssignment = (
    staffId: string,
    date: string,
    selectedValue: string,
  ) => {
    if (!selectedValue) {
      setAssignments((currentAssignments) =>
        currentAssignments.filter(
          (assignment) =>
            !(assignment.staffId === staffId && assignment.date === date),
        ),
      );
      return;
    }

    const nextAssignment: ShiftAssignment = {
      id: crypto.randomUUID(),
      staffId,
      date,
      status: selectedValue === "off" ? "off" : "work",
      positionId: selectedValue === "off" ? undefined : selectedValue,
    };

    setAssignments((currentAssignments) => {
      const exists = currentAssignments.some(
        (assignment) =>
          assignment.staffId === staffId && assignment.date === date,
      );

      if (!exists) {
        return [...currentAssignments, nextAssignment];
      }

      return currentAssignments.map((assignment) =>
        assignment.staffId === staffId && assignment.date === date
          ? {
              ...assignment,
              status: nextAssignment.status,
              positionId: nextAssignment.positionId,
            }
          : assignment,
      );
    });
  };

  const warningAssignments = assignments.filter((assignment) => {
    if (assignment.status !== "work") {
      return false;
    }

    const staffName = getStaffName(assignment.staffId);
    return Boolean(getDayOffRequest(staffName, assignment.date));
  });

  const handleSaveDraft = () => {
    setLastSavedAt(new Date().toLocaleString("ja-JP"));
  };

  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold">製造シフト作成</h2>
            <p className="mt-2 text-sm text-stone-600">
              スタッフ名 × 日付の表で、担当ポジションを選択します。
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

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            下書き保存
          </button>

          {lastSavedAt && (
            <p className="flex items-center text-sm text-stone-600">
              最終保存：{lastSavedAt}
            </p>
          )}
        </div>
      </section>

      {warningAssignments.length > 0 && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-bold text-red-700">希望休との重複あり</h2>
          <ul className="mt-3 space-y-2 text-sm text-red-700">
            {warningAssignments.map((assignment) => (
              <li key={`${assignment.staffId}-${assignment.date}`}>
                {getStaffName(assignment.staffId)}さんは {assignment.date}{" "}
                に希望休を出しています。
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold">月間シフト表</h2>
            <p className="mt-2 text-sm text-stone-600">
              希望休の日に勤務を入れると警告が表示されます。
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            {activePositions.map((position) => (
              <span
                key={position.id}
                className="rounded-full bg-orange-100 px-3 py-1 font-bold text-orange-700"
              >
                {position.shortName}：{position.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-center text-xs">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 w-20 border border-stone-200 bg-stone-100 px-2 py-2 text-left">
                  名前
                </th>
                {days.map((day) => (
                  <th
                    key={day.date}
                    className={`w-8 border border-stone-200 px-1 py-1 ${
                      day.isSunday
                        ? "bg-red-50 text-red-700"
                        : day.isSaturday
                          ? "bg-blue-50 text-blue-700"
                          : "bg-stone-100"
                    }`}
                  >
                    <div>{day.day}</div>
                    <div className="text-[10px]">({day.weekDay})</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {activeStaffList.map((staff) => (
                <tr key={staff.id}>
                  <th className="sticky left-0 z-10 border border-stone-200 bg-white px-4 py-3 text-left font-bold">
                    {staff.name}
                  </th>

                  {days.map((day) => {
                    const dayOffRequest = getDayOffRequest(
                      staff.name,
                      day.date,
                    );
                    const value = getCellValue(staff.id, day.date);
                    const isWarning = Boolean(
                      dayOffRequest && value && value !== "off",
                    );

                    return (
                      <td
                        key={day.date}
                        className={`h-12 border border-stone-200 p-1 ${
                          isWarning
                            ? "bg-red-50"
                            : dayOffRequest
                              ? "bg-orange-50"
                              : "bg-white"
                        }`}
                      >
                        {dayOffRequest && (
                          <p className="mb-0.5 text-[10px] font-bold text-orange-700">
                            希
                          </p>
                        )}

                        <select
                          value={value}
                          onChange={(event) =>
                            updateAssignment(staff.id, day.date, event.target.value)
                          }
                          className="h-7 w-full appearance-none rounded border border-stone-300 bg-white text-center text-xs font-bold outline-none focus:border-orange-500"
                        >
                          <option value="">-</option>
                          <option value="off">休</option>
                          {activePositions.map((position) => (
                            <option key={position.id} value={position.id}>
                              {position.shortName}
                            </option>
                          ))}
                        </select>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
