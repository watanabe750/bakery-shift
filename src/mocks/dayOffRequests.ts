import type { DayOffRequest } from "@/types/dayOffRequest";

export const mockDayOffRequests: DayOffRequest[] = [
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
