
import React, { useState, useMemo } from 'react';
import { Settings } from '../types';

interface Props {
  hourlyRate: number;
  settings: Settings;
}

const CalculatorOvertime: React.FC<Props> = ({ hourlyRate, settings }) => {
  // Até 100h
  const [n1st, setN1st] = useState<number>(0);
  const [nSub, setNSub] = useState<number>(0);
  const [nHol, setNHol] = useState<number>(0);
  
  // Acima de 100h
  const [e1st, setE1st] = useState<number>(0);
  const [eSub, setESub] = useState<number>(0);
  const [eHol, setEHol] = useState<number>(0);

  const results = useMemo(() => {
    // Regime Normal
    const valN1st = n1st * hourlyRate * (1 + settings.weekday1st / 100);
    const valNSub = nSub * hourlyRate * (1 + settings.weekdaySub / 100);
    const valNHol = nHol * hourlyRate * (1 + settings.holiday / 100);
    const totalN = valN1st + valNSub + valNHol;

    // Regime Agravado (>100h)
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

  const InputRow = ({ label, value, onChange, desc, accent }: { label: string, value: number, onChange: (v: number) => void, desc: string, accent?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <input
          type="number"
          min="0"
          step="0.5"
          value={value === 0 ? '' : value}
          placeholder="0"
          onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
          className={`w-full bg-[#0a101f] text-white px-4 py-3 rounded-xl border border-[#242f45] focus:ring-2 outline-none transition-all font-bold ${accent || 'focus:ring-emerald-500'}`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500">HORAS</div>
      </div>
      <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tight">{desc}</span>
    </div>
  );

  return (
    <div className="bg-[#161f30] rounded-2xl shadow-2xl border border-[#242f45] p-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Trabalho Suplementar</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bloco 1: Até 100h */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-[#242f45] pb-4">
             <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
             <h3 className="text-sm font-black text-white uppercase tracking-widest">Até 100 Horas Anuais</h3>
          </div>
          
          <div className="bg-[#0a101f]/50 p-6 rounded-2xl border border-[#1c273d] space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">Dias Úteis</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputRow label="Total de Primeiras Horas" value={n1st} onChange={setN1st} desc={`Acréscimo ${settings.weekday1st}%`} />
                <InputRow label="Total de Segundas e ss." value={nSub} onChange={setNSub} desc={`Acréscimo ${settings.weekdaySub}%`} />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest border-l-2 border-blue-400 pl-2">Descanso e Feriados</p>
              <InputRow label="Total de Horas" value={nHol} onChange={setNHol} desc={`Acréscimo ${settings.holiday}%`} accent="focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Bloco 2: Acima de 100h */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-[#242f45] pb-4">
             <div className="w-2 h-6 bg-amber-500 rounded-full"></div>
             <h3 className="text-sm font-black text-white uppercase tracking-widest">Mais de 100 Horas Anuais</h3>
          </div>
          
          <div className="bg-[#0a101f]/50 p-6 rounded-2xl border border-[#1c273d] space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest border-l-2 border-amber-500 pl-2">Dias Úteis</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputRow label="Total de Primeiras Horas" value={e1st} onChange={setE1st} desc={`Acréscimo ${settings.extWeekday1st}%`} accent="focus:ring-amber-500" />
                <InputRow label="Total de Segundas e ss." value={eSub} onChange={setESub} desc={`Acréscimo ${settings.extWeekdaySub}%`} accent="focus:ring-amber-500" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest border-l-2 border-rose-400 pl-2">Descanso e Feriados</p>
              <InputRow label="Total de Horas" value={eHol} onChange={setEHol} desc={`Acréscimo ${settings.extHoliday}%`} accent="focus:ring-rose-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Sumário de Resultados */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0a101f] border border-[#242f45]">
          <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Subtotal Base</p>
          <p className="text-2xl font-black text-emerald-400">{results.normal.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0a101f] border border-[#242f45]">
          <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Subtotal Agravado</p>
          <p className="text-2xl font-black text-amber-400">{results.extended.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</p>
        </div>
        <div className="p-6 rounded-3xl bg-emerald-600 text-white shadow-xl shadow-emerald-900/20 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase opacity-80 mb-1">Total Suplementar Bruto</p>
          <p className="text-3xl font-black tracking-tighter">{results.grandTotal.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorOvertime;
