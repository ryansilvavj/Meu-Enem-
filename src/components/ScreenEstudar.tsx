import React, { useState } from 'react';
import { AreaConhecimento, MateriaId, Dificuldade } from '../types';
import {
  Zap,
  ArrowRight,
  Book,
  Globe2,
  FlaskConical,
  Sigma,
  Languages,
  Clock,
  Filter,
  Play,
  Award,
} from 'lucide-react';

interface ScreenEstudarProps {
  onStartCustomWorkout: (config: {
    area: AreaConhecimento;
    selectedSubjects: MateriaId[];
    difficulty: Dificuldade;
    questionCount: number;
    withTimer: boolean;
    onlyUnseen: boolean;
  }) => void;
  onStartRandomQuiz: () => void;
}

export const ScreenEstudar: React.FC<ScreenEstudarProps> = ({
  onStartCustomWorkout,
  onStartRandomQuiz,
}) => {
  const [selectedArea, setSelectedArea] = useState<AreaConhecimento>('todas');
  const [selectedSubjects, setSelectedSubjects] = useState<MateriaId[]>([
    'portugues',
    'historia',
    'natureza',
    'matematica',
  ]);
  const [difficulty, setDifficulty] = useState<Dificuldade>('medio');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [withTimer, setWithTimer] = useState<boolean>(true);
  const [onlyUnseen, setOnlyUnseen] = useState<boolean>(false);

  const toggleSubject = (id: MateriaId) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStartWorkout = () => {
    onStartCustomWorkout({
      area: selectedArea,
      selectedSubjects,
      difficulty,
      questionCount,
      withTimer,
      onlyUnseen,
    });
  };

  return (
    <div className="flex flex-col gap-5 pb-16">
      {/* Top Header Pill & Title */}
      <div className="flex flex-col gap-1 pt-1">
        <span className="self-start text-[11px] font-bold text-[#3525cd] bg-[#e0e7ff] px-2.5 py-0.5 rounded-full">
          Modo Treino Diário
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] tracking-tight">
          Praticar com Questões
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b]">
          Monte seu treino personalizado ou jogue um quiz rápido.
        </p>
      </div>

      {/* Hero Card: Quiz Aleatório */}
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#3525cd] via-[#4338ca] to-[#4f46e5] text-white p-4 sm:p-5 shadow-sm overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Quiz Aleatório
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed">
            10 questões variadas de provas oficiais anteriores para testar seus reflexos agora.
          </p>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/15">
            <div className="flex items-center gap-1 text-xs text-white/80">
              <Clock className="w-3.5 h-3.5" />
              <span>~15 min</span>
            </div>

            <button
              onClick={onStartRandomQuiz}
              type="button"
              className="h-9 px-3.5 rounded-full bg-[#6cf8bb] hover:bg-[#5ae6ab] text-[#004d34] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span>Iniciar Quiz Rápido</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 1. Área do Conhecimento */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0b1c30]">
            1. Área do Conhecimento
          </h2>
          <span className="text-[10px] font-bold text-[#4338ca] uppercase tracking-wider">
            Obrigatório
          </span>
        </div>

        {/* Horizontal scrollable area pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'linguagens', label: 'Linguagens' },
            { id: 'humanas', label: 'Ciências Humanas' },
            { id: 'natureza', label: 'Ciências da Natureza' },
            { id: 'matematica', label: 'Matemática' },
          ].map((item) => {
            const isSelected = selectedArea === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedArea(item.id as AreaConhecimento)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#3525cd] text-white shadow-xs'
                    : 'bg-white border border-[#e2e8f0] text-[#475569] hover:bg-[#f8f9ff]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Matérias Específicas */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0b1c30]">
            2. Matérias Específicas
          </h2>
          <span className="text-[11px] text-[#64748b]">Toque para selecionar</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Português */}
          <button
            type="button"
            onClick={() => toggleSubject('portugues')}
            className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
              selectedSubjects.includes('portugues')
                ? 'bg-white border-[#3525cd] ring-1 ring-[#3525cd] shadow-xs'
                : 'bg-white border-[#e2e8f0] opacity-60'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#3525cd]">
              <Book className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                Língua Portuguesa
              </span>
              <span className="text-[10px] text-[#64748b] line-clamp-1">
                Gramática, Literatura &...
              </span>
            </div>
          </button>

          {/* Card 2: História & Sociedade */}
          <button
            type="button"
            onClick={() => toggleSubject('historia')}
            className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
              selectedSubjects.includes('historia')
                ? 'bg-white border-[#3525cd] ring-1 ring-[#3525cd] shadow-xs'
                : 'bg-white border-[#e2e8f0] opacity-60'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] flex items-center justify-center text-[#059669]">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                História & Sociedade
              </span>
              <span className="text-[10px] text-[#64748b] line-clamp-1">
                Geografia, Filo e...
              </span>
            </div>
          </button>

          {/* Card 3: Ciências Naturais */}
          <button
            type="button"
            onClick={() => toggleSubject('natureza')}
            className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
              selectedSubjects.includes('natureza')
                ? 'bg-white border-[#3525cd] ring-1 ring-[#3525cd] shadow-xs'
                : 'bg-white border-[#e2e8f0] opacity-60'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#fef2f2] flex items-center justify-center text-[#dc2626]">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                Ciências Naturais
              </span>
              <span className="text-[10px] text-[#64748b] line-clamp-1">
                Biologia, Química e Física
              </span>
            </div>
          </button>

          {/* Card 4: Matemática */}
          <button
            type="button"
            onClick={() => toggleSubject('matematica')}
            className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
              selectedSubjects.includes('matematica')
                ? 'bg-white border-[#3525cd] ring-1 ring-[#3525cd] shadow-xs'
                : 'bg-white border-[#e2e8f0] opacity-60'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#faf5ff] flex items-center justify-center text-[#7c3aed]">
              <Sigma className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                Matemática & Aplicações
              </span>
              <span className="text-[10px] text-[#64748b] line-clamp-1">
                Álgebra, Geometria e...
              </span>
            </div>
          </button>

          {/* Card 5: Língua Estrangeira (Full width) */}
          <button
            type="button"
            onClick={() => toggleSubject('estrangeira')}
            className={`col-span-2 p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
              selectedSubjects.includes('estrangeira')
                ? 'bg-white border-[#3525cd] ring-1 ring-[#3525cd] shadow-xs'
                : 'bg-white border-[#e2e8f0] opacity-60'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#2563eb] flex-shrink-0">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                Língua Estrangeira
              </span>
              <span className="text-[10px] text-[#64748b]">
                Inglês ou Espanhol Instrumental
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Nível de Dificuldade */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-[#0b1c30]">
          3. Nível de Dificuldade
        </h2>

        <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#eff4ff] rounded-xl border border-[#dbeafe]">
          {[
            { id: 'facil', label: 'Fácil' },
            { id: 'medio', label: 'Médio' },
            { id: 'dificil', label: 'Difícil' },
            { id: 'misto', label: 'Misto' },
          ].map((item) => {
            const isSelected = difficulty === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDifficulty(item.id as Dificuldade)}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#3525cd] shadow-xs'
                    : 'text-[#64748b] hover:text-[#0b1c30]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Quantidade de Questões */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0b1c30]">
            4. Quantidade de Questões
          </h2>
          <span className="text-[11px] text-[#64748b]">Meta por sessão</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[5, 10, 20, 30].map((num) => {
            const isSelected = questionCount === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setQuestionCount(num)}
                className={`h-11 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#3525cd] text-white shadow-xs'
                    : 'bg-white border border-[#e2e8f0] text-[#0b1c30] hover:bg-[#f8f9ff]'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Simulado Completo Button */}
        <button
          type="button"
          onClick={() => setQuestionCount(90)}
          className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
            questionCount === 90
              ? 'bg-[#fffbeb] border-[#f59e0b] text-[#b45309]'
              : 'bg-white border-[#fef3c7] text-[#b45309] hover:bg-[#fffbeb]'
          }`}
        >
          <Award className="w-4 h-4 text-[#f59e0b]" />
          <span>Simulado Completo (90 questões)</span>
        </button>
      </div>

      {/* 5. Opções de Treino */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-sm font-bold text-[#0b1c30]">5. Opções de Treino</h2>

        <div className="bg-white rounded-xl border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
          {/* Toggle 1: Cronômetro */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#3525cd]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0b1c30] block">
                  Modo com Cronômetro
                </span>
                <span className="text-[11px] text-[#64748b]">
                  Simula o tempo de 3 min por questão
                </span>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={withTimer}
              onClick={() => setWithTimer(!withTimer)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                withTimer ? 'bg-[#3525cd]' : 'bg-[#cbd5e1]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-xs absolute top-1 ${
                  withTimer ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Apenas Inéditas */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] flex items-center justify-center text-[#059669]">
                <Filter className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0b1c30] block">
                  Apenas Inéditas
                </span>
                <span className="text-[11px] text-[#64748b]">
                  Questões que você ainda não respondeu
                </span>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={onlyUnseen}
              onClick={() => setOnlyUnseen(!onlyUnseen)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                onlyUnseen ? 'bg-[#3525cd]' : 'bg-[#cbd5e1]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-xs absolute top-1 ${
                  onlyUnseen ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Button */}
      <div className="sticky bottom-16 left-0 right-0 z-20 pt-2 pb-1 bg-gradient-to-t from-[#f8f9ff] via-[#f8f9ff] to-transparent">
        <button
          onClick={handleStartWorkout}
          type="button"
          className="w-full h-12 rounded-full bg-[#3525cd] hover:bg-[#2e1eb7] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(53,37,205,0.35)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white stroke-none" />
          <span>Iniciar Treino ({questionCount} questões)</span>
        </button>
      </div>
    </div>
  );
};
