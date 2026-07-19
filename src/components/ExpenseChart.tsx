"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { ChartData } from "@/lib/formatter";

interface ExpenseChartProps {
  data: ChartData[];
}

export default function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col items-center transition-colors">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mb-4 self-start tracking-tight">
        Resumo de Gastos por Categoria
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                borderColor: "#27272a",
                borderRadius: "8px",
                color: "#f4f4f5",
              }}
              itemStyle={{ color: "#f4f4f5" }}
              formatter={(value: any) => {
                if (value === undefined || value === null) return ["", ""];
                const numericValue = Number(value);
                return [`R$ ${numericValue.toFixed(2)}`, "Total"];
              }}
            />

            <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
