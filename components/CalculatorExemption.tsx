import React from 'react';
import { Settings } from '../types';

interface Props {
  hourlyRate: number;
  settings: Settings;
}

const CalculatorExemption: React.FC<Props> = ({ hourlyRate, settings }) => {
  const [regime, setRegime] = React.useState<'daily' | 'weekly'>('daily');

  const increase = settings.exemption / 100;
  const unitValue = hourlyRate * (1 + increase);
  const finalValue = regime === 'daily' ? unitValue : unitValue * 2;

  return (
    <div className="bg-[#161f30] rounded-2xl shadow-2xl border border-[#242f45] p-8">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17.031V20a1 1 0 01-1 1H8a1 1 0 01-1-1v-2.13l-4.13-4.13a6 6 0 015.743-7.743L15 7z" />
          </svg>
        </span>
        Isenção de Horário
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <div className="space-y-4">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Seleccione o Regime</p>
             <button
                onClick={() => setRegime('daily')}
                className={`w-full text-left p-6 rounded-2xl border transition-all relative ${
                   regime === 'daily' 
                   ? 'border-blue-500 bg-[#1e2a44] ring-1 ring-blue-500/50' 
                   : 'border-[#242f45] bg-[#0a101f] hover:bg-[#111a2e]'
                }`}
             >
                <div className="flex items-center justify-between">
                   <span className="text-lg font-bold text-white">1 Hora por Dia</span>
                   <div className={`w-3 h-3 rounded-full transition-all ${regime === 'daily' ? 'bg-blue-500 scale-125' : 'bg-slate-800'}`}></div>
                </div>
             </button>

             <button
                onClick={() => setRegime('weekly')}
                className={`w-full text-left p-6 rounded-2xl border transition-all relative ${
                   regime === 'weekly' 
                   ? 'border-blue-500 bg-[#1e2a44] ring-1 ring-blue-500/50' 
                   : 'border-[#242f45] bg-[#0a101f] hover:bg-[#111a2e]'
                }`}
             >
                <div className="flex items-center justify-between">
                   <span className="text-lg font-bold text-white">2 Horas por Semana</span>
                   <div className={`w-3 h-3 rounded-full transition-all ${regime === 'weekly' ? 'bg-blue-500 scale-125' : 'bg-slate-800'}`}></div>
                </div>
             </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="bg-slate-950 border border-[#242f45] rounded-3xl p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-40 h-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                 </svg>
              </div>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Suplemento {regime === 'daily' ? 'Diário' : 'Semanal'}</p>
              <p className="text-6xl font-black tracking-tighter mb-4">{finalValue.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</p>
              <div className="pt-6 border-t border-slate-900 mt-4">
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Memória Descritiva:</p>
                 <p className="text-xs text-slate-400 mt-2 font-medium">
                   (Hora: {hourlyRate}€ + {settings.exemption}%) x {regime === 'daily' ? '1h' : '2h'}
                 </p>
              </div>
           </div>
           
           <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <p className="text-xs text-blue-300 font-medium leading-relaxed italic">
                Nota: A isenção de horário implica uma retribuição especial não inferior à remuneração correspondente a uma hora de trabalho suplementar por dia, ou duas horas de trabalho suplementar por semana quando não implica alteração do período de trabalho.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorExemption;