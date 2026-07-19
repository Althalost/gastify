"use client";

import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import ExpenseChart from "../components/ExpenseChart";
import Footer from "../components/Footer";
import ExpenseBreakdown from "../components/ExpenseBreakdown";
import ThemeToggle from "../components/ThemeToggle";
import { formatDataForChart, ChartData } from "../lib/formatter";
import { Expense } from "../types";

export default function HomePage() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const [highestExpense, setHighestExpense] = useState<Expense | null>(null);

  const handleDataParsed = (data: Expense[]) => {
    const realExpenses = data.filter((e) => e.amount < 0);

    if (realExpenses.length === 0) {
      setChartData([]);
      setHighestExpense(null);
      return;
    }

    const topExpense = realExpenses.reduce(
      (max, current) => (current.amount < max.amount ? current : max),
      realExpenses[0],
    );

    setHighestExpense(topExpense);

    const formatted = formatDataForChart(data);
    setChartData(formatted);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors duration-200 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl flex justify-between items-center mb-8 border-b border-gray-200 dark:border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight">
            Gastify{" "}
            <span className="text-purple-500 font-normal italic">Compare</span>
          </h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl space-y-6">
        <header className="text-center md:text-left mb-2">
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base">
            Faça o upload do seu extrato bancário (.csv) para analisar seus
            hábitos financeiros com uma interface limpa.
          </p>
        </header>

        <FileUploader onDataParsed={handleDataParsed} />

        {chartData.length > 0 && (
          <div className="space-y-6">
            {highestExpense && (
              <div className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-purple-500 font-semibold uppercase block mb-1">
                    Maior Gasto Detectado
                  </span>
                  <h3 className="text-base font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-tight">
                    {highestExpense.description}
                  </h3>
                  <span className="text-xs font-mono text-gray-400 dark:text-zinc-500 block mt-0.5">
                    Data do lançamento:{" "}
                    {highestExpense.date.split("-").reverse().join("/")}
                  </span>
                </div>
                <div className="text-left md:text-right bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/40 px-4 py-2 rounded-lg self-stretch md:self-auto flex md:flex-col justify-between md:justify-center items-center md:items-end">
                  <span className="text-[10px] font-mono text-rose-500 font-medium md:mb-0.5">
                    VALOR
                  </span>
                  <span className="text-xl font-mono font-bold text-rose-600 dark:text-rose-400">
                    R$ {Math.abs(highestExpense.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <ExpenseChart data={chartData} />

            <ExpenseBreakdown data={chartData} />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
