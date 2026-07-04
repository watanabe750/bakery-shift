import type { DayOffRequest } from "@/types/dayOffRequest";

export const mockDayOffRequests: DayOffRequest[] = [
  {
    id: "1",
    staffId: "1",
    date: "2026-07-03",
    note: "予定あり",
  },
  {
    id: "2",
    staffId: "1",
    date: "2026-07-12",
    note: "",
  },
  {
    id: "3",
    staffId: "2",
    date: "2026-07-05",
    note: "通院",
  },
  {
    id: "4",
    staffId: "3",
    date: "2026-07-18",
    note: "",
  },
];
