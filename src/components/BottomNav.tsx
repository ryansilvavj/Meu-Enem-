import React from 'react';
import { ActiveTab } from '../types';
import { LayoutDashboard, BookOpen, Zap, ClipboardList, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onQuickQuiz: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onQuickQuiz,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#e2e8f0]/80 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] pb-safe">
      <div className="max-w-md md:max-w-xl mx-auto h-16 px-4 flex items-center justify-around relative">
        {/* Tab 1: Início */}
        <button
          onClick={() => onSelectTab('inicio')}
          type="button"
          aria-label="Ir para tela de Início"
          className={`min-w-[48px] min-h-[44px] flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            activeTab === 'inicio'
              ? 'text-[#3525cd] font-bold'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${activeTab === 'inicio' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight">Início</span>
        </button>

        {/* Tab 2: Estudar */}
        <button
          onClick={() => onSelectTab('estudar')}
          type="button"
          aria-label="Ir para tela de Estudar"
          className={`min-w-[48px] min-h-[44px] flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            activeTab === 'estudar'
              ? 'text-[#3525cd] font-bold'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'estudar' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight">Estudar</span>
        </button>

        {/* Central Floating Quick Quiz Button */}
        <div className="relative flex-1 flex items-center justify-center">
          <button
            onClick={onQuickQuiz}
            type="button"
            aria-label="Iniciar Quiz Rápido de Aquecimento"
            className="w-12 h-12 -mt-5 rounded-full bg-gradient-to-tr from-[#3525cd] to-[#5a4cf0] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(53,37,205,0.4)] hover:shadow-[0_8px_20px_rgba(53,37,205,0.5)] active:scale-95 transition-all ring-4 ring-white"
          >
            <Zap className="w-6 h-6 fill-white stroke-none" />
          </button>
        </div>

        {/* Tab 3: Histórico */}
        <button
          onClick={() => onSelectTab('historico')}
          type="button"
          aria-label="Ir para tela de Histórico"
          className={`min-w-[48px] min-h-[44px] flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            activeTab === 'historico'
              ? 'text-[#3525cd] font-bold'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <ClipboardList className={`w-5 h-5 ${activeTab === 'historico' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight">Histórico</span>
        </button>

        {/* Tab 4: Perfil */}
        <button
          onClick={() => onSelectTab('perfil')}
          type="button"
          aria-label="Ir para tela de Perfil"
          className={`min-w-[48px] min-h-[44px] flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            activeTab === 'perfil'
              ? 'text-[#3525cd] font-bold'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'perfil' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-tight">Perfil</span>
        </button>
      </div>
    </nav>
  );
};
