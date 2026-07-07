import React, { useState } from 'react';
import type { Transaction } from '../types';
import { Trash2, Plus, ArrowUpRight, ArrowDownRight, Tag, Calendar, X } from 'lucide-react';
import { CATEGORY_COLORS } from '../services/mockData';

interface TransactionListProps {
  transactions: Transaction[];
  onAddTransaction: (t: Omit<Transaction, 'id' | 'date'>) => void;
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onAddTransaction,
  onDeleteTransaction
}) => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [isOpenForm, setIsOpenForm] = useState(false);

  // Form State
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Outros');

  const filtered = transactions.filter(t => {
    if (filter === 'income') return t.type === 'income';
    if (filter === 'expense') return t.type === 'expense';
    return true;
  });

  const categories = Object.keys(CATEGORY_COLORS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAddTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category
    });

    // Reset Form
    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('Outros');
    setIsOpenForm(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year.slice(-2)}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      
      {/* Header of list */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Transações Recentes</h3>
          <p className="text-xs text-slate-400">Histórico de seus lançamentos</p>
        </div>
        
        <button
          onClick={() => setIsOpenForm(true)}
          className="flex items-center space-x-1.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/35 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>Lançar</span>
        </button>
      </div>

      {/* Filter and Content */}
      <div className="flex space-x-1 bg-slate-900/80 p-1 rounded-xl mb-4 border border-slate-700/30">
        {(['all', 'income', 'expense'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 ${
              filter === f
                ? 'bg-slate-700 text-slate-100 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {f === 'all' ? 'Tudo' : f === 'income' ? 'Receitas' : 'Despesas'}
          </button>
        ))}
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs font-medium">
            Nenhuma transação encontrada para este filtro.
          </div>
        ) : (
          filtered.map(t => (
            <div
              key={t.id}
              className="group flex items-center justify-between p-3.5 bg-slate-800/40 border border-slate-700/30 rounded-xl hover:border-slate-600/50 hover:bg-slate-800/80 transition-all duration-300"
            >
              <div className="flex items-center space-x-3.5">
                {/* Indicator icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  t.type === 'income'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                </div>

                {/* Info */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-slate-100 transition-colors leading-tight">
                    {t.description}
                  </h4>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-500" />
                      {t.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {formatDate(t.date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount & Actions */}
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-bold ${
                  t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'
                }`}>
                  {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                </span>
                
                <button
                  onClick={() => onDeleteTransaction(t.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all duration-300"
                  title="Excluir lançamento"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Simple overlay popup form */}
      {isOpenForm && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200 relative">
            <button
              onClick={() => setIsOpenForm(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-100 mb-5">Novo Lançamento</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type toggle buttons */}
              <div className="flex border border-slate-700 p-0.5 rounded-xl bg-slate-950/40">
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                    type === 'expense'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Despesa (-)
                </button>
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                    type === 'income'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Receita (+)
                </button>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Almoço, Uber, Salário..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-all cursor-pointer"
                >
                  {type === 'income' ? (
                    <>
                      <option value="Salário">Salário</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Investimentos">Investimentos</option>
                      <option value="Outros">Outros</option>
                    </>
                  ) : (
                    categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))
                  )}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-300 mt-2"
              >
                Confirmar Lançamento
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
