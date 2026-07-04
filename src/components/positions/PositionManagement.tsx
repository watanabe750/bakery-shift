"use client";

import { FormEvent, useMemo, useState } from "react";
import { mockPositions } from "@/mocks/positions";
import type { Position } from "@/types/position";

export function PositionManagement() {
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [displayOrder, setDisplayOrder] = useState(mockPositions.length + 1);

  const sortedPositions = useMemo(() => {
    return [...positions].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [positions]);

  const activePositionCount = positions.filter(
    (position) => position.isActive,
  ).length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedShortName = shortName.trim();

    if (!trimmedName) {
      alert("ポジション名を入力してください");
      return;
    }

    if (!trimmedShortName) {
      alert("略称を入力してください");
      return;
    }

    const newPosition: Position = {
      id: crypto.randomUUID(),
      name: trimmedName,
      shortName: trimmedShortName,
      displayOrder,
      isActive: true,
    };

    setPositions((currentPositions) => [...currentPositions, newPosition]);
    setName("");
    setShortName("");
    setDisplayOrder(displayOrder + 1);
  };

  const toggleActive = (positionId: string) => {
    setPositions((currentPositions) =>
      currentPositions.map((position) =>
        position.id === positionId
          ? { ...position, isActive: !position.isActive }
          : position,
      ),
    );
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">ポジション追加</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="position-name"
              className="block text-sm font-medium text-stone-700"
            >
              ポジション名
            </label>
            <input
              id="position-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="例：仕込み"
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="short-name"
              className="block text-sm font-medium text-stone-700"
            >
              略称
            </label>
            <input
              id="short-name"
              type="text"
              value={shortName}
              onChange={(event) => setShortName(event.target.value)}
              placeholder="例：仕"
              maxLength={3}
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
            />
            <p className="mt-2 text-xs text-stone-500">
              シフト表のセルに表示する短い名前です。
            </p>
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

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-600 px-4 py-3 font-bold text-white transition hover:bg-orange-700"
          >
            追加する
          </button>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold">ポジション一覧</h2>
          <p className="mt-2 text-sm text-stone-600">
            有効なポジション：{activePositionCount}件
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-600">
                <th className="px-4 py-3">表示順</th>
                <th className="px-4 py-3">ポジション名</th>
                <th className="px-4 py-3">略称</th>
                <th className="px-4 py-3">状態</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {sortedPositions.map((position) => (
                <tr key={position.id} className="border-b border-stone-100">
                  <td className="px-4 py-3">{position.displayOrder}</td>
                  <td className="px-4 py-3 font-medium">{position.name}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-lg bg-orange-100 px-3 py-1 font-bold text-orange-700">
                      {position.shortName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        position.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {position.isActive ? "有効" : "無効"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(position.id)}
                      className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium transition hover:bg-stone-50"
                    >
                      {position.isActive ? "無効にする" : "有効にする"}
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
