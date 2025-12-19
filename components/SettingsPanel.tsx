
import React from 'react';
import { Settings } from '../types';

interface Props {
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
  onReset: () => void;
}

const SettingsPanel: React.FC<Props> = ({ settings, onSettingsChange, onReset }) => {
  const handleChange = (field: keyof Settings, value: string) => {
    const numValue = parseFloat(value) || 0;
    onSettingsChange({ ...settings, [field]: numValue });
  };

  const Field: React.FC<{ label: string; field: keyof Settings }> = ({ label, field }) => (
    <div>
      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{label}</label>
      <div className="relative">
        <input
          type="number"
          step="0.1"
          value={settings[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full pl-6 pr-12 py-4 bg-[#0a101f] text-white rounded-xl border border-[#242f45] focus:ring-2 focus:ring-slate-400 outline-none transition-all font-bold"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 font-black">%</span>
      </div>
    </div>
  );

  return (
    <div className="bg-[#161f30] rounded-2xl shadow-2xl border border-[#242f45] p-8">
      <div className="flex flex-wrap justify-between items-center gap-6 mb-12 border-b border-[#242f45] pb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="p-3 bg-slate-500/20 text-slate-400 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </span>
          Taxas Personalizadas (CCT)
        </h2>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-rose-500/10 text-rose-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-500/20 transition-all border border-rose-500/30"
        >
          Repor Valores Legais
        </button>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-slate-800 flex-1"></div>
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Regra Geral Suplementar</h3>
             <div className="h-px bg-slate-800 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Field label="1ª Hora (Dia Útil)" field="weekday1st" />
            <Field label="Subsequentes" field="weekdaySub" />
            <Field label="Descanso / Feriado" field="holiday" />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-slate-800 flex-1"></div>
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Extensão > 100 Horas</h3>
             <div className="h-px bg-slate-800 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Field label="1ª Hora (Dia Útil)" field="extWeekday1st" />
            <Field label="Subsequentes" field="extWeekdaySub" />
            <Field label="Descanso / Feriado" field="extHoliday" />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-slate-800 flex-1"></div>
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Outros Acréscimos</h3>
             <div className="h-px bg-slate-800 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="Trabalho Nocturno" field="nightWork" />
            <Field label="Isenção de Horário" field="exemption" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPanel;
