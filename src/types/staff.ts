export type StaffRole = "admin" | "staff";

export type Staff = {
  id: string;
  name: string;
  displayOrder: number;
  role: StaffRole;
  isActive: boolean;
};
