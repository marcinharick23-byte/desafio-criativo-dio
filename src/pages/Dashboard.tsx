import { useState } from 'react';
import { useFinance } from '../hooks/useFinance';
import { FinancialCard } from '../components/FinancialCard';
import { CategoryChart } from '../components/CategoryChart';
import { TransactionList } from '../components/TransactionList';
import { ProgressBar } from '../components/ProgressBar';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Sparkles, 
  Award, 
  PlusCircle, 
  Coins
} from 'lucide-react';

export const Dashboard = () => {
  const {
    transactions,
    goals,
    balance,
    totalIncome,
    totalExpenses,
    expensesByCategory,
    addTransaction,
    deleteTransaction,
    updateGoalAmount,
    addGoal
  } = useFinance();

  const [isOpenGoalForm, setIsOpenGoalForm] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle || !goalTarget) return;

    addGoal({
      title: goalTitle,
      targetAmount: parseFloat(goalTarget),
      category: 'Geral',
      deadline: goalDeadline || 'Sem prazo'
    });

    setGoalTitle('');
    setGoalTarget('');
    setGoalDeadline('');
    setIsOpenGoalForm(false);
  };

  // Feedback messages based on financial state
  const getMotivationalTip = () => {
    if (balance > 1000) {
      return {
        title: "Você está no caminho certo!",
        desc: "Seu saldo está super positivo. Que tal simular um investimento de renda fixa para acelerar sua reserva de emergência?",
        icon: Award,
        color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/30"
      };
    } else if (balance >= 0) {
      return {
        title: "Orçamento Equilibrado",
        desc: "Suas receitas cobrem as despesas, mas sua margem está pequena. Tente economizar no lazer ou alimentação fora esta semana.",
        icon: Sparkles,
        color: "text-amber-400 bg-amber-950/40 border-amber-800/30"
      };
    } else {
      return {
        title: "Alerta de Orçamento Estourado",
        desc: "Suas despesas superaram seus ganhos. Revise sua lista abaixo e identifique despesas não essenciais para cortar imediatamente.",
        icon: TrendingDown,
        color: "text-rose-400 bg-rose-950/40 border-rose-800/30"
      };
    }
  };

  const tip = getMotivationalTip();
  const TipIcon = tip.icon;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Motivational / AI Tip Card */}
      <div className={`p-4 border rounded-2xl flex items-start gap-4 transition-all duration-300 ${tip.color}`}>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-current/20 flex-shrink-0">
          <TipIcon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold tracking-tight">{tip.title}</h4>
          <p className="text-xs mt-1 text-slate-300 font-medium leading-relaxed">{tip.desc}</p>
        </div>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FinancialCard
          title="Saldo Geral"
          amount={balance}
          icon={Wallet}
          variant="balance"
          subtitle={balance >= 0 ? "Orçamento positivo e seguro" : "Atenção: Saldo negativo"}
        />
        <FinancialCard
          title="Receitas"
          amount={totalIncome}
          icon={TrendingUp}
          variant="income"
          subtitle="Total acumulado no mês"
        />
        <FinancialCard
          title="Despesas"
          amount={totalExpenses}
          icon={TrendingDown}
          variant="expense"
          subtitle="Total pago no mês"
        />
      </div>

      {/* Main Grid: Chart and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Chart & goals */}
        <div className="lg:col-span-5 space-y-8">
          <CategoryChart data={expensesByCategory} />

          {/* Financial Goals Widget */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-400" />
                  <span>Suas Metas</span>
                </h3>
                <p className="text-xs text-slate-400">Poupe com consistência</p>
              </div>

              <button
                onClick={() => setIsOpenGoalForm(true)}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-700/50 transition-colors"
                title="Criar nova meta"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {goals.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Nenhuma meta ativa. Crie uma para começar a economizar!</p>
              ) : (
                goals.map(g => (
                  <div key={g.id} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30 space-y-3.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200">{g.title}</h4>
                        <span className="text-[10px] text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/50 mt-1 inline-block">
                          Prazo: {g.deadline}
                        </span>
                      </div>

                      {/* Quick Savings simulators */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateGoalAmount(g.id, 100)}
                          disabled={g.currentAmount >= g.targetAmount}
                          className="flex items-center gap-1 text-[10px] font-semibold bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/20 disabled:opacity-30 disabled:pointer-events-none px-2 py-1 rounded-lg transition-all"
                        >
                          <Coins className="w-3 h-3" />
                          + R$100
                        </button>
                        <button
                          onClick={() => updateGoalAmount(g.id, 500)}
                          disabled={g.currentAmount >= g.targetAmount}
                          className="flex items-center gap-1 text-[10px] font-semibold bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/20 disabled:opacity-30 disabled:pointer-events-none px-2 py-1 rounded-lg transition-all"
                        >
                          <Coins className="w-3 h-3" />
                          + R$500
                        </button>
                      </div>
                    </div>

                    <ProgressBar value={g.currentAmount} max={g.targetAmount} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right column: Transaction list */}
        <div className="lg:col-span-7">
          <TransactionList
            transactions={transactions}
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
          />
        </div>

      </div>

      {/* Goal creation modal */}
      {isOpenGoalForm && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200 relative">
            <button
              onClick={() => setIsOpenGoalForm(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            >
              x
            </button>

            <h3 className="text-base font-bold text-slate-100 mb-5">Nova Meta Financeira</h3>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Título da Meta</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Comprar celular, Viagem, Faculdade..."
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-all placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Valor Alvo (R$)</label>
                <input
                  type="number"
                  required
                  placeholder="0.00"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-all placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Prazo / Mês Alvo</label>
                <input
                  type="text"
                  placeholder="Ex: Dezembro 2026, Em 6 meses"
                  value={goalDeadline}
                  onChange={(e) => setGoalDeadline(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-all placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-300 mt-2"
              >
                Criar Meta
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
