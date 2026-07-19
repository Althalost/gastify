"use client";

import React from "react";

interface FileIndicatorProps {
  fileName: string;
  onClear: () => void;
}

export default function FileIndicator({
  fileName,
  onClear,
}: FileIndicatorProps) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm transition-all flex justify-between items-center relative overflow-hidden group">
      <span className="absolute top-0 left-0 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 font-mono text-[9px] px-2 py-0.5 rounded-br-md border-r border-b border-gray-200 dark:border-zinc-800/60 select-none">
        1/3
      </span>

      <div className="flex items-center gap-2 pl-6 pt-1">
        <span className="text-sm">📄</span>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-wider text-purple-500 font-semibold uppercase">
            Arquivo Analisado
          </span>
          <span className="text-xs font-mono font-medium text-gray-700 dark:text-zinc-300 truncate max-w-[180px] sm:max-w-xs">
            {fileName}
          </span>
        </div>
      </div>

      <button
        onClick={onClear}
        className="cursor-pointer text-[10px] font-mono font-medium text-gray-400 dark:text-zinc-500 hover:text-rose-500 dark:hover:text-rose-400 bg-gray-50 dark:bg-zinc-800/40 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-gray-200 dark:border-zinc-800 hover:border-rose-200 dark:hover:border-rose-900/40 px-2.5 py-1 rounded-md transition-all"
        title="Remover arquivo"
      >
        CLEAR
      </button>
    </div>
  );
}
