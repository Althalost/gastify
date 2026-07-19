"use client";

import React, { useState } from "react";
import { ChartData } from "../lib/formatter";

interface ExpenseBreakdownProps {
  data: ChartData[];
}

export default function ExpenseBreakdown({ data }: ExpenseBreakdownProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6 mt-6 transition-colors">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mb-4 tracking-tight">
        Detalhamento dos Gastos
      </h2>

      <div className="space-y-3">
        {data.map((category) => {
          const isExpanded = expandedCategory === category.categoryKey;

          return (
            <div
              key={category.categoryKey}
              className="border border-gray-100 dark:border-zinc-800/60 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.categoryKey)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/40 hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-gray-700 dark:text-zinc-300 text-sm">
                    {category.name}
                  </span>
                  <span className="text-[10px] bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-zinc-400 px-2 py-0.5 rounded-md font-mono">
                    {category.items?.length || 0}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900 dark:text-zinc-100 text-sm">
                    R$ {category.value.toFixed(2)}
                  </span>
                  <span
                    className={`text-gray-400 text-xs transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
              </button>

              <div
                className={`bg-white dark:bg-zinc-900/50 divide-y divide-gray-100 dark:divide-zinc-800/50 px-4 font-mono text-xs transition-all duration-300 ease-in-out overflow-y-auto ${
                  isExpanded
                    ? "max-h-60 opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0 pointer-events-none"
                }`}
              >
                {category.items?.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex justify-between tracking-tight"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-800 dark:text-zinc-300">
                        {item.description}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-zinc-500">
                        {item.date.split("-").reverse().join("/")}
                      </span>
                    </div>
                    <span className="font-medium text-gray-600 dark:text-zinc-400 self-center">
                      R$ {Math.abs(item.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
