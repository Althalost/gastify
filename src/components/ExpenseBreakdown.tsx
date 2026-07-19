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
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Detalhamento dos Gastos
      </h2>

      <div className="space-y-3">
        {data.map((category) => {
          const isExpanded = expandedCategory === category.categoryKey;

          return (
            <div
              key={category.categoryKey}
              className="border border-gray-100 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.categoryKey)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-gray-700">
                    {category.name}
                  </span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                    {category.items?.length || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    R$ {category.value.toFixed(2)}
                  </span>

                  <span
                    className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="bg-white divide-y divide-gray-100 px-4 max-h-60 overflow-y-auto">
                  {category.items?.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex justify-between text-sm"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800 tracking-wide">
                          {item.description}
                        </span>

                        <span className="text-xs text-gray-400">
                          {item.date.split("-").reverse().join("/")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-600 self-center">
                        R$ {item.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
