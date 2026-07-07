export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline: string;
}

export interface CategorySummary {
  name: string;
  total: number;
  color: string;
  percentage: number;
}
