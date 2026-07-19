"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-2xl mt-auto pt-8 pb-4 border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] text-gray-400 dark:text-zinc-500 tracking-tight">
      <div>
        <span>&copy; {currentYear} Gastify. Todos os direitos reservados.</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-purple-500/80">v1.0.0</span>
        <span className="text-gray-300 dark:text-zinc-800">|</span>
        <span className="hover:text-gray-600 dark:hover:text-zinc-400 transition-colors cursor-pointer">
          Privacidade
        </span>
        <span className="hover:text-gray-600 dark:hover:text-zinc-400 transition-colors cursor-pointer">
          Termos
        </span>
      </div>
    </footer>
  );
}
