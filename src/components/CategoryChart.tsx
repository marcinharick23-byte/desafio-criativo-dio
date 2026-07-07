import React, { useState } from 'react';
import type { CategorySummary } from '../types';

interface CategoryChartProps {
  data: CategorySummary[];
  title?: string;
  subtitle?: string;
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ data, title = "Gastos por Categoria", subtitle = "Este Mês" }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-slate-800/40 rounded-2xl border border-slate-700/50 p-6">
        <p className="text-sm font-semibold">Nenhum gasto registrado</p>
        <p className="text-xs text-slate-600 mt-1">Adicione despesas para visualizar o gráfico.</p>
      </div>
    );
  }

  // Circular math for SVG Donut
  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const center = 60; // center coordinate

  let accumulatedPercentage = 0;

  const totalExpenseAmount = data.reduce((sum, item) => sum + item.total, 0);

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(totalExpenseAmount);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-xs font-normal text-slate-400">{subtitle}</span>
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
        
        {/* SVG Donut Chart */}
        <div className="relative w-40 h-40">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120"
            className="-rotate-90 select-none"
          >
            {/* Background Circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#1e293b" // slate-800
              strokeWidth={strokeWidth - 2}
            />

            {/* Slices */}
            {data.map((item, index) => {
              const strokeLength = (item.percentage / 100) * circumference;
              const strokeOffset = circumference - ((accumulatedPercentage / 100) * circumference);
              
              accumulatedPercentage += item.percentage;

              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;

              return (
                <circle
                  key={item.name}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                  strokeDasharray={`${strokeLength} ${circumference}`}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 cursor-pointer origin-center"
                  style={{
                    opacity: isAnyHovered && !isHovered ? 0.35 : 1,
                    filter: isHovered ? `drop-shadow(0 0 4px ${item.color})` : 'none',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

          {/* Center Info Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Total Pago</span>
            <span className="text-lg font-bold text-slate-100 mt-0.5">{formattedTotal}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full max-w-[200px] flex flex-col gap-2">
          {data.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg transition-all duration-200 cursor-pointer hover:bg-slate-700/40"
                style={{
                  opacity: isAnyHovered && !isHovered ? 0.5 : 1,
                  transform: isHovered ? 'translateX(4px)' : 'none'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-slate-300">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-200 block">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{Math.round(item.percentage)}%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
