import { useState, useEffect } from 'react';
import type { Transaction, FinancialGoal, CategorySummary } from '../types';
import { INITIAL_TRANSACTIONS, INITIAL_GOALS, CATEGORY_COLORS } from '../services/mockData';

export const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    const saved = localStorage.getItem('finance_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_goals', JSON.stringify(goals));
  }, [goals]);

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Group expenses by category
  const expensesByCategory: CategorySummary[] = Object.keys(CATEGORY_COLORS).map(catName => {
    const total = transactions
      .filter(t => t.type === 'expense' && t.category === catName)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: catName,
      total,
      color: CATEGORY_COLORS[catName],
      percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0
    };
  }).filter(c => c.total > 0); // Only show categories with actual expenses

  // Fallback for categories not in CATEGORY_COLORS
  const customCategories = Array.from(new Set(transactions
    .filter(t => t.type === 'expense' && !CATEGORY_COLORS[t.category])
    .map(t => t.category)
  ));

  customCategories.forEach(catName => {
    const total = transactions
      .filter(t => t.type === 'expense' && t.category === catName)
      .reduce((sum, t) => sum + t.amount, 0);

    expensesByCategory.push({
      name: catName,
      total,
      color: '#64748b', // Slate-500 fallback
      percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0
    });
  });

  // Actions
  const addTransaction = (t: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addGoal = (g: Omit<FinancialGoal, 'id' | 'currentAmount'>) => {
    const newGoal: FinancialGoal = {
      ...g,
      id: Date.now().toString(),
      currentAmount: 0
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoalAmount = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const nextAmount = Math.max(0, Math.min(g.targetAmount, g.currentAmount + amount));
        return { ...g, currentAmount: nextAmount };
      }
      return g;
    }));
  };

  return {
    transactions,
    goals,
    balance,
    totalIncome,
    totalExpenses,
    expensesByCategory,
    addTransaction,
    deleteTransaction,
    addGoal,
    updateGoalAmount
  };
};
