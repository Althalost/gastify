// src/app/page.tsx
"use client";

import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { Expense } from "../types";

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleDataParsed = (data: Expense[]) => {
    setExpenses(data);
    console.log("Processed expenses successfully:", data);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl mt-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Gastify 📊
          </h1>
          <p className="text-gray-500 text-lg">
            Faça o upload do seu extrato bancário (.csv) para classificar seus
            gastos automaticamente.
          </p>
        </header>

        <FileUploader onDataParsed={handleDataParsed} />

        {expenses.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-center font-medium">
            Foram encontrados {expenses.length} lançamentos no seu arquivo. Abra
            o console do desenvolvedor (F12) para ver os dados estruturados!
          </div>
        )}
      </div>
    </main>
  );
}
