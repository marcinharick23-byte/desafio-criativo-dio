import React from 'react';
import { Compass, Sparkles, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-55 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Compass className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent m-0 tracking-tight leading-tight">
              Aegis Finance
            </h1>
            <p className="text-xs text-slate-400 m-0">Educador Financeiro Inteligente</p>
          </div>
        </div>

        {/* Dynamic AI Tip / Slogan & Profile */}
        <div className="flex items-center justify-between md:justify-end gap-6">
          <div className="hidden lg:flex items-center space-x-2 bg-violet-950/40 border border-violet-800/30 rounded-lg px-3.5 py-1.5 text-xs text-violet-300">
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            <span><strong>Dica da IA:</strong> Reservar 10% do salário este mês acelera seu sonho em 3 meses!</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <h2 className="text-sm font-semibold text-slate-100 m-0">Olá, Usuário!</h2>
              <p className="text-xs text-slate-400 m-0">Vamos organizar suas finanças hoje?</p>
            </div>
            <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600 cursor-pointer hover:border-violet-500 transition-colors">
              <User className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
