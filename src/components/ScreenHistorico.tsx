import React, { useState, useMemo } from 'react';
import { Question } from '../types';
import {
  Zap,
  Clock,
  Search,
  SlidersHorizontal,
  Bookmark,
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  X,
  RotateCcw,
} from 'lucide-react';

interface ScreenHistoricoProps {
  questions: Question[];
  onOpenQuestionExplanation: (question: Question) => void;
  onStartReviewQuiz: () => void;
  onToggleBookmark: (questionId: string) => void;
}

type TabFilter = 'todas' | 'erros' | 'marcadas';

export const ScreenHistorico: React.FC<ScreenHistoricoProps> = ({
  questions,
  onOpenQuestionExplanation,
  onStartReviewQuiz,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<TabFilter>('erros');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [statusFilterOnlyErrors, setStatusFilterOnlyErrors] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(5);

  const errorCount = useMemo(
    () => questions.filter((q) => q.isCorrect === false).length,
    [questions]
  );
  const bookmarkedCount = useMemo(
    () => questions.filter((q) => q.isBookmarked).length,
    [questions]
  );

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Tab filter
      if (activeTab === 'erros' && q.isCorrect !== false) return false;
      if (activeTab === 'marcadas' && !q.isBookmarked) return false;

      // Filter chip for errors
      if (statusFilterOnlyErrors && q.isCorrect !== false && activeTab === 'todas') {
        return false;
      }

      // Subject filter
      if (selectedSubjectFilter !== 'all' && q.subjectId !== selectedSubjectFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTopic = q.topic.toLowerCase().includes(query);
        const matchStem = q.stem.toLowerCase().includes(query);
        const matchSubject = q.subjectLabel.toLowerCase().includes(query);
        const matchExam = q.exam.toLowerCase().includes(query);
        if (!matchTopic && !matchStem && !matchSubject && !matchExam) {
          return false;
        }
      }

      return true;
    });
  }, [
    questions,
    activeTab,
    statusFilterOnlyErrors,
    selectedSubjectFilter,
    searchQuery,
  ]);

  return (
    <div className="flex flex-col gap-4 pb-16">
      {/* 1. Header Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#eff4ff] rounded-2xl border border-[#dbeafe]">
        <button
          type="button"
          onClick={() => {
            setActiveTab('todas');
            setStatusFilterOnlyErrors(false);
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'todas'
              ? 'bg-white text-[#3525cd] shadow-xs'
              : 'text-[#64748b] hover:text-[#0b1c30]'
          }`}
        >
          Todas (342)
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('erros');
            setStatusFilterOnlyErrors(true);
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'erros'
              ? 'bg-white text-[#b91c1c] shadow-xs'
              : 'text-[#64748b] hover:text-[#0b1c30]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <span>Erros ({errorCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('marcadas')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'marcadas'
              ? 'bg-white text-[#3525cd] shadow-xs'
              : 'text-[#64748b] hover:text-[#0b1c30]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Marcadas ({bookmarkedCount})</span>
        </button>
      </div>

      {/* 2. Hero Card: Modo Super-Revisão Inteligente */}
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#3525cd] via-[#4338ca] to-[#4f46e5] text-white p-4 sm:p-5 shadow-sm overflow-hidden">
        <div className="absolute right-0 bottom-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Zap className="w-3 h-3 fill-current" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
              Modo Super-Revisão Inteligente
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
            Transforme tropeços em pontos
          </h3>

          <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed">
            Pratique agora um quiz sob medida com{' '}
            <strong className="font-bold underline decoration-white/40">10 questões</strong> dos
            temas mais errados nesta semana:{' '}
            <span className="font-semibold underline decoration-white/40">
              Eletrodinâmica, Citologia e Função Quadrática.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-2 pt-2 border-t border-white/15">
            <button
              onClick={onStartReviewQuiz}
              type="button"
              className="h-10 px-4 rounded-full bg-white hover:bg-[#f8f9ff] text-[#3525cd] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Revisar Meus Erros Agora</span>
            </button>

            <div className="flex items-center justify-center gap-1 text-xs text-white/80">
              <Clock className="w-3.5 h-3.5" />
              <span>~15 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por palavra-chave, assunto ou cód..."
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-white border border-[#e2e8f0] text-xs sm:text-sm text-[#0b1c30] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] shadow-xs"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 p-1 text-[#94a3b8] hover:text-[#0b1c30]"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <SlidersHorizontal className="w-4 h-4 text-[#94a3b8] absolute right-3.5 pointer-events-none" />
        )}
      </div>

      {/* 4. Filter Chips Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {/* Subject dropdown simulation */}
        <div className="relative">
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="appearance-none h-8 pl-3 pr-7 rounded-full bg-white border border-[#e2e8f0] text-xs font-semibold text-[#475569] shadow-xs cursor-pointer focus:outline-none"
          >
            <option value="all">Todas as Matérias</option>
            <option value="natureza">Ciências Naturais</option>
            <option value="matematica">Matemática</option>
            <option value="portugues">Língua Portuguesa</option>
            <option value="historia">História & Sociedade</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Status Error chip with remove X */}
        {statusFilterOnlyErrors && (
          <button
            type="button"
            onClick={() => setStatusFilterOnlyErrors(false)}
            className="h-8 px-3 rounded-full bg-[#fee2e2] text-[#b91c1c] text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
            <span>Status: Erros</span>
            <X className="w-3 h-3 ml-0.5" />
          </button>
        )}

        {/* Difficulty pill */}
        <div className="relative">
          <select
            defaultValue="all"
            className="appearance-none h-8 pl-3 pr-7 rounded-full bg-white border border-[#e2e8f0] text-xs font-semibold text-[#475569] shadow-xs cursor-pointer focus:outline-none"
          >
            <option value="all">Dificuldade</option>
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* 5. Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-[#0b1c30]">
            Histórico de Questões
          </h2>
          <span className="text-[11px] font-bold text-[#3525cd] bg-[#e0e7ff] px-2 py-0.5 rounded-full">
            {filteredQuestions.length} para revisar
          </span>
        </div>

        <button
          type="button"
          className="text-xs text-[#64748b] hover:text-[#0b1c30] flex items-center gap-1 font-semibold"
        >
          <span>Mais recentes</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6. Question Cards List */}
      <div className="flex flex-col gap-3">
        {filteredQuestions.slice(0, visibleCount).map((q) => {
          const isError = q.isCorrect === false;
          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-4 border border-[#e2e8f0]/80 shadow-xs flex flex-col gap-2.5 transition-all hover:border-[#cbd5e1]"
            >
              {/* Card Meta Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  {isError ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#b91c1c] bg-[#fee2e2] px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3" />
                      <span>Erro</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-[#ecfdf5] px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>Acerto</span>
                    </span>
                  )}

                  <span className="text-xs font-semibold text-[#475569]">
                    {q.subjectLabel}
                  </span>

                  <span className="text-xs text-[#94a3b8] font-medium">
                    {q.exam}
                  </span>
                </div>

                {/* Bookmark Toggle */}
                <button
                  type="button"
                  onClick={() => onToggleBookmark(q.id)}
                  aria-label="Salvar questão"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    q.isBookmarked
                      ? 'text-[#f59e0b] bg-[#fffbeb]'
                      : 'text-[#94a3b8] hover:text-[#0b1c30]'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      q.isBookmarked ? 'fill-amber-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Question Stem / Excerpt */}
              <p className="text-xs sm:text-[13px] font-semibold text-[#0b1c30] leading-snug line-clamp-2">
                {q.stem}
              </p>

              {/* Timestamp & Level */}
              <div className="text-[11px] text-[#64748b]">
                <span>{q.answeredAt || 'Ontem às 21:15'}</span>
                <span className="mx-1">·</span>
                <span>Nível {q.difficulty}</span>
              </div>

              {/* Answer Status Pills */}
              <div className="flex flex-col gap-1.5">
                {/* User's response */}
                <div
                  className={`p-2 rounded-xl text-xs flex items-center justify-between ${
                    isError
                      ? 'bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]'
                      : 'bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        isError
                          ? 'bg-[#fee2e2] text-[#dc2626]'
                          : 'bg-[#d1fae5] text-[#059669]'
                      }`}
                    >
                      {q.userAnswer || 'A'}
                    </span>
                    <span className="font-semibold">
                      Sua resposta: Alternativa {q.userAnswer || 'A'}{' '}
                      {isError ? '(Incorreta ✕)' : '(Correta ✓)'}
                    </span>
                  </div>

                  {isError ? (
                    <X className="w-3.5 h-3.5 text-[#dc2626]" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5 text-[#059669]" />
                  )}
                </div>

                {/* If error: Official correct answer display */}
                {isError && (
                  <div className="p-2 rounded-xl text-xs bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#d1fae5] text-[#059669] flex items-center justify-center font-bold text-[11px]">
                        {q.correctOption}
                      </span>
                      <span className="font-semibold">
                        Gabarito oficial: Alternativa {q.correctOption} (Correta ✓)
                      </span>
                    </div>
                    <CheckCircle className="w-3.5 h-3.5 text-[#059669]" />
                  </div>
                )}
              </div>

              {/* Card Bottom Row: Duration, Points & Action Button */}
              <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9] mt-1">
                <div className="flex items-center gap-3 text-xs text-[#64748b]">
                  <div className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{q.timeSpent || '01m 45s'}</span>
                  </div>

                  <span className="font-bold text-[#059669]">
                    {isError ? '0 pts' : `+${q.triPoints} pts`}
                  </span>
                </div>

                <button
                  onClick={() => onOpenQuestionExplanation(q)}
                  type="button"
                  className="text-xs font-bold text-[#3525cd] hover:text-[#281bbb] flex items-center gap-1 cursor-pointer group"
                >
                  <span>Ver resolução completa</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#e2e8f0] text-[#64748b]">
            <p className="text-sm font-semibold">Nenhuma questão encontrada com estes filtros.</p>
            <button
              onClick={() => {
                setActiveTab('todas');
                setStatusFilterOnlyErrors(false);
                setSelectedSubjectFilter('all');
                setSearchQuery('');
              }}
              type="button"
              className="mt-2 text-xs text-[#3525cd] font-bold hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>

      {/* 7. Bottom Load More Questions */}
      {filteredQuestions.length > visibleCount && (
        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="text-[11px] text-[#64748b]">
            Exibindo {visibleCount} de {filteredQuestions.length} questões encontradas
          </p>
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 5)}
            className="h-10 px-5 rounded-full bg-white border border-[#e2e8f0] hover:bg-[#f8f9ff] text-xs font-bold text-[#3525cd] flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <ChevronDown className="w-4 h-4" />
            <span>Carregar Mais Questões</span>
          </button>
        </div>
      )}
    </div>
  );
};
