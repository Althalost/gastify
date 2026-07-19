import { Expense, ExpenseCategory } from "../types";

export interface ChartData {
  name: string;
  value: number;
  color: string;
  categoryKey: ExpenseCategory;
  items: Expense[];
}

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  food: "#34D399",
  clothing: "#F472B6",
  eating_out: "#FB923C",
  transport: "#60A5FA",
  investment: "#818CF8",
  others: "#9CA3AF",
};

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: "Supermercado",
  clothing: "Vestuário",
  eating_out: "Alimentação Fora",
  transport: "Transporte",
  investment: "Investimentos",
  others: "Outros",
};

export function formatDataForChart(expenses: Expense[]): ChartData[] {
  const groups: Record<ExpenseCategory, { value: number; items: Expense[] }> = {
    food: { value: 0, items: [] },
    clothing: { value: 0, items: [] },
    eating_out: { value: 0, items: [] },
    transport: { value: 0, items: [] },
    investment: { value: 0, items: [] },
    others: { value: 0, items: [] },
  };

  expenses.forEach((expense) => {
    if (expense.amount >= 0) return;

    const target = groups[expense.category] ? expense.category : "others";

    groups[target].value += Math.abs(expense.amount);
    groups[target].items.push(expense);
  });

  return Object.entries(groups)
    .map(([category, data]) => ({
      name: CATEGORY_LABELS[category as ExpenseCategory],
      value: Math.round(data.value * 100) / 100,
      color: CATEGORY_COLORS[category as ExpenseCategory],
      categoryKey: category as ExpenseCategory,
      items: data.items.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    }))
    .filter((item) => item.value > 0);
}
