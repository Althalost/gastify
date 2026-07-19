import { ExpenseCategory } from "@/types";

const CATEGORY_KEYWORDS: Record<ExpenseCategory, string[]> = {
  food: [
    "carrefour",
    "pao de acucar",
    "pão de açúcar",
    "extra",
    "assai",
    "muffato",
    "supermercado",
  ],
  clothing: [
    "zara",
    "h&m",
    "renner",
    "riachuelo",
    "c&a",
    "shein",
    "nike",
    "adidas",
  ],
  eating_out: [
    "mcdonalds",
    "bk",
    "burger king",
    "ifood",
    "outback",
    "starbucks",
    "restaurante",
  ],
  transport: [
    "uber",
    "99app",
    "99taxi",
    "posto",
    "shell",
    "ipiranga",
    "metro",
    "ccr",
  ],
  investment: [
    "nu invest",
    "nuinvest",
    "xp investimentos",
    "inter cdb",
    "tesouro",
    "binance",
  ],
  others: [],
};

export function classifyExpense(description: string): ExpenseCategory {
  const cleanDescription = description.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const hasKeyword = keywords.some((keyword) =>
      cleanDescription.includes(keyword),
    );

    if (hasKeyword) {
      return category as ExpenseCategory;
    }
  }

  return "others";
}
