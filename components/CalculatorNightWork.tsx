
import React, { useState } from 'react';
import { Settings } from '../types';

interface Props {
  hourlyRate: number;
  settings: Settings;
}

const CalculatorNightWork: React.FC<Props> = ({ hourlyRate, settings }) => {
  const [hours, setHours] = useState<number>(8);
  
  const increase = (settings.nightWork / 100);
  const totalValueDue = hours * hourlyRate * (1 + increase);
  const extraTotal = hours * hourlyRate * increase;

  return (
    <div className="bg-[#161f30] rounded-2xl shadow-2xl border border-[#242f45] p-8">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </span>
        Trabalho Nocturno
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="space-y-8">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Total de Horas Nocturnas</label>
            <input
              type="number"
              min="0"
              step="1"
              value={hours}
              onChange={(e) => setHours(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-[#0a101f] text-white px-5 py-4 rounded-xl border border-[#242f45] focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold text-lg"
            />
          </div>
          
          <div className="p-6 bg-[#0a101f] rounded-2xl border border-[#1c273d] space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Percentagem de Acréscimo:</span>
                <span className="font-black text-purple-400">+{settings.nightWork}%</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Remuneração Base p/ Hora:</span>
                <span className="font-bold text-white">{hourlyRate.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</span>
             </div>
             <div className="flex justify-between items-center text-sm pt-2 border-t border-[#242f45]">
                <span className="text-slate-400 font-medium text-xs">Valor por Hora Nocturna:</span>
                <span className="font-black text-white">{(hourlyRate * (1 + increase)).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</span>
             </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-indigo-900 rounded-3xl p-10 text-white shadow-xl h-full flex flex-col justify-between">
           <div>
              <p className="text-purple-100 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Devido pelas Horas</p>
              <p className="text-6xl font-black tracking-tighter mb-2">{totalValueDue.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</p>
              <p className="text-purple-200/70 text-sm font-medium">Este valor inclui a base e o acréscimo nocturno.</p>
           </div>
           <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs font-medium text-purple-100 leading-relaxed">
                Suplemento nocturno isolado: <span className="font-black text-white underline underline-offset-4 decoration-2 decoration-white/30">{extraTotal.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</span>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorNightWork;
