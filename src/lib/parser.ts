import { Expense } from "@/types";
import { classifyExpense } from "./classifier";

export function parseCSV(csvText: string): Expense[] {
  const lines = csvText.split(/\r?\n/);

  if (lines.length <= 1) return [];

  const expenses: Expense[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].trim();

    if (!currentLine) continue;

    const columns = currentLine.split(";");

    if (columns.length < 3) continue;

    const rawDate = columns[0];
    const rawDescription = columns[1];
    const rawAmount = columns[2];

    const cleanAmount = parseFloat(rawAmount.replace(",", "."));

    const category = classifyExpense(rawDescription);

    const expense: Expense = {
      id: `${rawDate}-${i}-${Math.random().toString(36).substr(2, 4)}`,
      date: rawDate,
      description: rawDescription,
      amount: isNaN(cleanAmount) ? 0 : cleanAmount,
      category: category,
    };

    expenses.push(expense);
  }

  return expenses;
}
