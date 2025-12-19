
import React from 'react';

interface Props {
  baseSalary: number;
  weeklyHours: number;
  hourlyRate: number;
}

const CalculatorHourlyRate: React.FC<Props> = ({ baseSalary, weeklyHours, hourlyRate }) => {
  return (
    <div className="bg-[#161f30] rounded-2xl shadow-2xl border border-[#242f45] p-8">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        Cálculo do Valor-Hora
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="p-6 bg-[#0a101f] rounded-2xl border border-[#1c273d]">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Fórmula do Código do Trabalho</p>
            <code className="text-lg font-bold text-indigo-400 block break-all">
              (Rb x 12) / (52 x n)
            </code>
            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed italic">
              Onde Rb é a retribuição base mensal e n é o período normal de trabalho semanal.
            </p>
          </div>
          
          <div className="space-y-4 pt-4">
            {[
              { label: 'Salário Base Mensal', value: baseSalary.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }) },
              { label: 'Horas Semanais', value: `${weeklyHours} horas` },
              { label: 'Massa Salarial Anual', value: (baseSalary * 12).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }) }
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-[#242f45] pb-3">
                <span className="text-slate-400 font-medium">{row.label}</span>
                <span className="text-white font-bold">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-10 text-white shadow-xl">
          <p className="text-indigo-200 text-xs font-black uppercase tracking-[0.2em] mb-4">Resultado Final</p>
          <div className="text-6xl md:text-7xl font-black mb-4 tracking-tighter">
            {hourlyRate.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
          </div>
          <p className="text-indigo-200/70 text-sm text-center font-medium">
            Valor bruto por hora de trabalho equivalente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorHourlyRate;
