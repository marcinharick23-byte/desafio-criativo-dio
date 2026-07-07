import type { LucideIcon } from 'lucide-react';

interface FinancialCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  variant: 'balance' | 'income' | 'expense';
  subtitle?: string;
}

export const FinancialCard: React.FC<FinancialCardProps> = ({
  title,
  amount,
  icon: Icon,
  variant,
  subtitle
}) => {
  const styles = {
    balance: {
      card: 'bg-gradient-to-br from-slate-800 to-indigo-950/70 border-indigo-500/20 shadow-indigo-950/20',
      iconContainer: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
      amountText: 'text-slate-50',
    },
    income: {
      card: 'bg-gradient-to-br from-slate-800 to-emerald-950/50 border-emerald-500/20 shadow-emerald-950/15',
      iconContainer: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      amountText: 'text-emerald-400',
    },
    expense: {
      card: 'bg-gradient-to-br from-slate-800 to-rose-950/50 border-rose-500/20 shadow-rose-950/15',
      iconContainer: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
      amountText: 'text-rose-400',
    }
  };

  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);

  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${styles[variant].card}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <h3 className={`text-2xl lg:text-3xl font-bold mt-2 tracking-tight ${styles[variant].amountText}`}>
            {formattedAmount}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${styles[variant].iconContainer}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {subtitle && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center text-xs text-slate-400">
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
};
