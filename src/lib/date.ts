export const weekDayNames = ["日", "月", "火", "水", "木", "金", "土"];

export type MonthDay = {
  day: number;
  date: string;
  weekDay: string;
  isSunday: boolean;
  isSaturday: boolean;
};

export function getDaysInMonth(monthValue: string): MonthDay[] {
  const [year, month] = monthValue.split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();

  return Array.from({ length: lastDay }, (_, index) => {
    const day = index + 1;
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const weekDayIndex = new Date(year, month - 1, day).getDay();

    return {
      day,
      date,
      weekDay: weekDayNames[weekDayIndex],
      isSunday: weekDayIndex === 0,
      isSaturday: weekDayIndex === 6,
    };
  });
}
