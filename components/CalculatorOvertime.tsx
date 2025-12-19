
import React, { useState, useMemo } from 'react';
import { Settings } from '../types';

interface Props {
  hourlyRate: number;
  settings: Settings;
}

const CalculatorOvertime: React.FC<Props> = ({ hourlyRate, settings }) => {
  // Up to 100h
  const [n1st, setN1st] = useState<number>(0);
  const [nSub, setNSub] = useState<number>(0);
  const [nHol, setNHol] = useState<number>(0);
  
  // Above 100h
  const [e1st, setE1st] = useState<number>(0);
  const [eSub, setESub] = useState<number>(0);
  const [eHol, setEHol] = useState<number>(0);

  const results = useMemo(() => {
    // Normal Regime
    const valN1st = n1st * hourlyRate * (1 + settings.weekday1st / 100);
    const valNSub = nSub * hourlyRate * (1 + settings.weekdaySub / 100);
    const valNHol = nHol * hourlyRate * (1 + settings.holiday / 100);
    const totalN = valN1st + valNSub + valNHol;

    // Extended Regime (>100h)
    const valE1st = e1st * hourlyRate * (1 + settings.extWeekday1st / 100);
    const valESub = eSub * hourlyRate * (1 + settings.extWeekdaySub / 100);
    const valEHol = eHol * hourlyRate * (1 + settings.extHoliday / 100);
    const totalE = valE1st + valESub + valEHol;

    return {
      normal: { total: totalN, v1: valN1st, vs: valNSub, vh: valNHol },
      extended: { total: totalE, v1: valE1st, vs: valESub, vh: valEHol },
      grandTotal: totalN + totalE
    };
  }, [n1st, nSub, nHol, e1st, eSub, eHol, hourlyRate, settings]);

  const InputRow = ({ label, value, onChange, desc }: { label: string, value: number, onChange: (v: number) => void, desc: string }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{label}</label>
      <input
        type="number"
        min="0"
        step="0.5"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
        className="w-full bg-[#0a101f] text-white px-4 py-3 rounded-xl border border-[#242f45] focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold"
      />
      <span className="text-[9px] text-slate-600 font-medium italic">{desc}</span>
    </div>
  );

  return (
    <div className="bg-[#161f30] rounded-2xl shadow-2xl border border-[#242f45] p-8">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        Trabalho Suplementar
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regime Normal */}
        <div className="bg-[#0a101f] rounded-2xl border border-[#1c273d] p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-[#242f45] pb-4">
             <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Até 100 Horas Anuais</h3>
             <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 font-bold uppercase">Regra Geral</span>
          </div>
          
          <div className="space-y-4">
            <InputRow label="Total de Primeiras Horas" value={n1st} onChange={setN1st} desc={`Acréscimo de ${settings.weekday1st}%`} />
            <InputRow label="Total de Segundas Horas e ss." value={nSub} onChange={setNSub} desc={`Acréscimo de ${settings.weekdaySub}%`} />
            <InputRow label="Total de Horas em Feriados/Descanso" value={nHol} onChange={setNHol} desc={`Acréscimo de ${settings.holiday}%`} />
          </div>

          <div className="pt-4 border-t border-[#242f45] flex justify-between items-center">
             <span className="text-xs font-bold text-slate-400 uppercase">Subtotal</span>
             <span className="text-xl font-black text-white">{results.normal.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</span>
          </div>
        </div>

        {/* Regime Agravado */}
        <div className="bg-[#0a101f] rounded-2xl border border-[#1c273d] p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-[#242f45] pb-4">
             <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest">Acima de 100 Horas Anuais</h3>
             <span className="text-[10px] px-2 py-1 rounded bg-amber-500/10 text-amber-500 font-bold uppercase">Regime Agravado</span>
          </div>

          <div className="space-y-4">
            <InputRow label="Total de Primeiras Horas" value={e1st} onChange={setE1st} desc={`Acréscimo de ${settings.extWeekday1st}%`} />
            <InputRow label="Total de Segundas Horas e ss." value={eSub} onChange={setESub} desc={`Acréscimo de ${settings.extWeekdaySub}%`} />
            <InputRow label="Total de Horas em Feriados/Descanso" value={eHol} onChange={setEHol} desc={`Acréscimo de ${settings.extHoliday}%`} />
          </div>

          <div className="pt-4 border-t border-[#242f45] flex justify-between items-center">
             <span className="text-xs font-bold text-slate-400 uppercase">Subtotal</span>
             <span className="text-xl font-black text-white">{results.extended.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
         <div>
            <p className="text-emerald-100 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Suplementar Bruto</p>
            <p className="text-5xl font-black text-white tracking-tighter">
              {results.grandTotal.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
            </p>
         </div>
         <div className="text-right text-emerald-100/80 text-xs italic font-medium max-w-xs">
            Reflecte a soma dos períodos normais e períodos que excedem as 100h de trabalho suplementar anual.
         </div>
      </div>
    </div>
  );
};

export default CalculatorOvertime;
