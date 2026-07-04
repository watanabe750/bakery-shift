import type { Position } from "@/types/position";

export const mockPositions: Position[] = [
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
