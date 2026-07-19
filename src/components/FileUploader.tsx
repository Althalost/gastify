// src/components/FileUploader.tsx
"use client"; // Indica para o Next.js que este componente usa interatividade no lado do cliente

import React, { useState } from "react";
import { parseCSV } from "../lib/parser";
import { Expense } from "../types";

interface FileUploaderProps {
  onDataParsed: (expenses: Expense[]) => void;
}

export default function FileUploader({ onDataParsed }: FileUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Por favor, selecione um arquivo válido no formato .csv");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      try {
        const parsedExpenses = parseCSV(text);
        onDataParsed(parsedExpenses);
      } catch (err) {
        setError("Ocorreu un erro ao processar a estrutura do arquivo CSV.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-900/50 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors">
      <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <span className="text-3xl mb-2">📁</span>
          <p className="mb-2 text-sm text-gray-500 dark:text-zinc-400">
            <span className="font-semibold">Clique para fazer upload</span> ou
            arraste seu extrato bancário
          </p>
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            Apenas arquivos .csv do Nubank, Mercado Pago, etc.
          </p>
        </div>

        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {fileName && (
        <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
          ✅ Arquivo carregado com sucesso: {fileName}
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-rose-500 dark:text-rose-400 font-medium">
          ❌ {error}
        </p>
      )}
    </div>
  );
}
