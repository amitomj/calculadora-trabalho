
import React, { useState, useMemo } from 'react';
import { CalculatorTab, Settings, UserContext } from './types';
import { DEFAULT_SETTINGS, DEFAULT_USER_CONTEXT } from './constants';
import CalculatorHourlyRate from './components/CalculatorHourlyRate';
import CalculatorOvertime from './components/CalculatorOvertime';
import CalculatorNightWork from './components/CalculatorNightWork';
import CalculatorExemption from './components/CalculatorExemption';
import SettingsPanel from './components/SettingsPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>(CalculatorTab.DASHBOARD);
  const [userContext, setUserContext] = useState<UserContext>(DEFAULT_USER_CONTEXT);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const hourlyRate = useMemo(() => {
    const rate = (userContext.baseSalary * 12) / (52 * userContext.weeklyHours);
    return Math.round(rate * 100) / 100;
  }, [userContext]);

  const dashboardItems = [
    {
      id: CalculatorTab.SETTINGS,
      tag: 'CONFIGURAÇÃO',
      title: 'Taxas e Percentagens',
      description: 'Personalize as percentagens de acréscimo conforme CCT ou contrato.',
      color: 'slate'
    },
    {
      id: CalculatorTab.HOURLY_RATE,
      tag: 'CÁLCULO BASE',
      title: 'Valor da Hora Trabalhada',
      description: 'Cálculo do valor da hora bruto com base no salário e período normal semanal.',
      color: 'indigo'
    },
    {
      id: CalculatorTab.OVERTIME,
      tag: 'SUPLEMENTAR',
      title: 'Trabalho Suplementar',
      description: 'Cálculo de horas extra separadas por regime normal e acima de 100h anuais.',
      color: 'emerald'
    },
    {
      id: CalculatorTab.NIGHT_WORK,
      tag: 'ADICIONAL',
      title: 'Trabalho Nocturno',
      description: 'Cálculo do valor devido pelo total de horas de trabalho nocturno prestadas.',
      color: 'purple'
    },
    {
      id: CalculatorTab.EXEMPTION,
      tag: 'ISENÇÃO',
      title: 'Isenção de Horário',
      description: 'Cálculo do suplemento por regime de isenção diário ou semanal.',
      color: 'blue'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case CalculatorTab.HOURLY_RATE:
        return <CalculatorHourlyRate baseSalary={userContext.baseSalary} weeklyHours={userContext.weeklyHours} hourlyRate={hourlyRate} />;
      case CalculatorTab.OVERTIME:
        return <CalculatorOvertime hourlyRate={hourlyRate} settings={settings} />;
      case CalculatorTab.NIGHT_WORK:
        return <CalculatorNightWork hourlyRate={hourlyRate} settings={settings} />;
      case CalculatorTab.EXEMPTION:
        return <CalculatorExemption hourlyRate={hourlyRate} settings={settings} />;
      case CalculatorTab.SETTINGS:
        return <SettingsPanel settings={settings} onSettingsChange={setSettings} onReset={() => setSettings(DEFAULT_SETTINGS)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a101f] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Header Section */}
      <header className="pt-16 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Calculadora: direito do trabalho</h1>
        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Portal de Ferramentas Laborais (Portugal)
        </p>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        {activeTab === CalculatorTab.DASHBOARD ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
            {dashboardItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="group relative flex flex-col items-start p-8 rounded-2xl bg-[#161f30] border border-[#242f45] hover:border-slate-500 hover:bg-[#1c273d] transition-all text-left overflow-hidden shadow-2xl"
              >
                <div className="flex justify-between w-full items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                    {item.tag}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">
                  {item.description}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-600 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
            {/* Context Controls Bar */}
            <div className="bg-[#161f30] border border-[#242f45] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
               <button 
                  onClick={() => setActiveTab(CalculatorTab.DASHBOARD)}
                  className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-800"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  VOLTAR AO PORTAL
               </button>

               <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase">SALÁRIO:</span>
                    <input 
                      type="number"
                      value={userContext.baseSalary}
                      onChange={(e) => setUserContext(p => ({...p, baseSalary: Number(e.target.value)}))}
                      className="bg-transparent border-b border-slate-700 focus:border-indigo-500 outline-none text-sm font-bold w-24 px-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase">HORAS:</span>
                    <input 
                      type="number"
                      value={userContext.weeklyHours}
                      onChange={(e) => setUserContext(p => ({...p, weeklyHours: Number(e.target.value)}))}
                      className="bg-transparent border-b border-slate-700 focus:border-indigo-500 outline-none text-sm font-bold w-12 px-1"
                    />
                  </div>
                  <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase">VALOR HORA</p>
                    <p className="text-sm font-black text-indigo-400">{hourlyRate} €</p>
                  </div>
               </div>
            </div>

            {renderContent()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[#1a2333] text-center text-slate-500">
        <p className="text-xs uppercase tracking-widest font-bold">Portugal • Cálculo de Retribuições Laborais</p>
      </footer>
    </div>
  );
};

export default App;
