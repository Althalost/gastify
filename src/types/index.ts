export type ExpenseCategory =
  | "food"
  | "clothing"
  | "eating_out"
  | "transport"
  | "investment"
  | "others";

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
}
