import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string; // e.g., 'from-violet-500 to-indigo-500'
  showLabels?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  colorClass = 'from-violet-500 to-indigo-500',
  showLabels = true
}) => {
  const percentage = Math.min(100, Math.round((value / max) * 100)) || 0;

  // Format currency helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full">
      {showLabels && (
        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
          <span>{formatCurrency(value)} guardados</span>
          <span className="text-violet-400 font-bold">{percentage}%</span>
        </div>
      )}
      
      {/* Outer track */}
      <div className="w-full h-3 bg-slate-700/60 rounded-full overflow-hidden border border-slate-700/30 shadow-inner">
        {/* Fill */}
        <div
          className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(139,92,246,0.3)]`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showLabels && (
        <div className="flex justify-end text-[10px] text-slate-500 mt-1 font-medium">
          <span>Meta: {formatCurrency(max)}</span>
        </div>
      )}
    </div>
  );
};
