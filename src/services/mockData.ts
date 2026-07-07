import type { Transaction, FinancialGoal } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Salário Principal',
    amount: 4500.00,
    type: 'income',
    category: 'Salário',
    date: '2026-07-01'
  },
  {
    id: '2',
    description: 'Projeto Freelance',
    amount: 850.00,
    type: 'income',
    category: 'Freelance',
    date: '2026-07-03'
  },
  {
    id: '3',
    description: 'Aluguel do Apartamento',
    amount: 1200.00,
    type: 'expense',
    category: 'Moradia',
    date: '2026-07-02'
  },
  {
    id: '4',
    description: 'Supermercado Mensal',
    amount: 650.00,
    type: 'expense',
    category: 'Alimentação',
    date: '2026-07-04'
  },
  {
    id: '5',
    description: 'Combustível',
    amount: 180.00,
    type: 'expense',
    category: 'Transporte',
    date: '2026-07-05'
  },
  {
    id: '6',
    description: 'Cinema e Jantar',
    amount: 150.00,
    type: 'expense',
    category: 'Lazer',
    date: '2026-07-05'
  },
  {
    id: '7',
    description: 'Assinatura Streaming',
    amount: 45.90,
    type: 'expense',
    category: 'Lazer',
    date: '2026-07-06'
  }
];

export const INITIAL_GOALS: FinancialGoal[] = [
  {
    id: 'g1',
    title: 'Reserva de Emergência',
    targetAmount: 10000.00,
    currentAmount: 6000.00,
    category: 'Reserva',
    deadline: 'Dezembro 2026'
  },
  {
    id: 'g2',
    title: 'Novo Notebook',
    targetAmount: 5000.00,
    currentAmount: 2500.00,
    category: 'Tecnologia',
    deadline: 'Outubro 2026'
  },
  {
    id: 'g3',
    title: 'Viagem de Férias',
    targetAmount: 8000.00,
    currentAmount: 1200.00,
    category: 'Lazer',
    deadline: 'Março 2027'
  }
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Moradia': '#f43f5e',     // rose-500
  'Alimentação': '#eab308', // yellow-500
  'Transporte': '#06b6d4',  // cyan-500
  'Lazer': '#a855f7',       // purple-500
  'Educação': '#3b82f6',    // blue-500
  'Saúde': '#10b981',       // emerald-500
  'Outros': '#64748b'       // slate-500
};
