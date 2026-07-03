export type ShiftStatus = "work" | "off";

export type ShiftAssignment = {
  id: string;
  staffId: string;
  date: string;
  status: ShiftStatus;
  positionId?: string;
  note?: string;
};
