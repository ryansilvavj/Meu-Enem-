import React, { useState, useEffect } from 'react';
import { Question, UserProfile } from '../types';
import { Logo } from './Logo';
import {
  ArrowLeft,
  Clock,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Check,
  X,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface ScreenQuizProps {
  questions: Question[];
  initialIndex?: number;
  user: UserProfile;
  isExplanationModeOnly?: boolean;
  onClose: () => void;
  onFinishQuiz: (results: {
    total: number;
    correct: number;
    triGained: number;
  }) => void;
  onToggleBookmark: (questionId: string) => void;
}

export const ScreenQuiz: React.FC<ScreenQuizProps> = ({
  questions,
  initialIndex = 0,
  user,
  isExplanationModeOnly = false,
  onClose,
  onFinishQuiz,
  onToggleBookmark,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentQ = questions[currentIndex] || questions[0];

  // Answer state for current question
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(
    currentQ?.userAnswer || (isExplanationModeOnly ? currentQ?.correctOption : null)
  );
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(
    isExplanationModeOnly || !!currentQ?.userAnswer
  );
  const [showDistractors, setShowDistractors] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(!!currentQ?.isBookmarked);

  // Timer in seconds
  const [seconds, setSeconds] = useState(102); // 01:42 initial
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(
    currentQ?.isCorrect ? 1 : 0
  );
  const [triTotalGained, setTriTotalGained] = useState(
    currentQ?.isCorrect ? currentQ.triPoints : 0
  );

  // Update question when index changes
  useEffect(() => {
    if (currentQ) {
      setSelectedOption(
        currentQ.userAnswer || (isExplanationModeOnly ? currentQ.correctOption : null)
      );
      setIsAnswerSubmitted(isExplanationModeOnly || !!currentQ.userAnswer);
      setIsBookmarked(!!currentQ.isBookmarked);
      setShowDistractors(false);
    }
  }, [currentIndex, currentQ, isExplanationModeOnly]);

  // Running timer
  useEffect(() => {
    if (quizFinished) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [quizFinished]);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (letter: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isAnswerSubmitted && !isExplanationModeOnly) return;
    setSelectedOption(letter);
    setIsAnswerSubmitted(true);

    const isCorrect = letter === currentQ.correctOption;
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
      setTriTotalGained((prev) => prev + currentQ.triPoints);
    }
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onToggleBookmark(currentQ.id);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleConfirmFinish = () => {
    onFinishQuiz({
      total: questions.length,
      correct: correctAnswersCount,
      triGained: triTotalGained,
    });
    onClose();
  };

  // Completion Summary Modal
  if (quizFinished) {
    const accuracy = Math.round((correctAnswersCount / questions.length) * 100);
    return (
      <div className="fixed inset-0 z-50 bg-[#0b1c30]/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#3525cd] to-[#6366f1] text-white flex items-center justify-center shadow-lg shadow-[#3525cd]/30">
            <Trophy className="w-8 h-8 text-amber-300" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3525cd]">
              Sessão Concluída!
            </span>
            <h3 className="text-xl font-extrabold text-[#0b1c30] mt-1">
              Excelente treino, {user.name}! 🎯
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              Suas respostas foram processadas e calibradas no algoritmo TRI.
            </p>
          </div>

          {/* Stats 2-column */}
          <div className="w-full grid grid-cols-2 gap-2.5 py-2">
            <div className="bg-[#f8f9ff] p-3 rounded-2xl border border-[#e2e8f0]">
              <span className="text-xs text-[#64748b] font-medium block">
                Acertos
              </span>
              <span className="text-xl font-extrabold text-[#059669]">
                {correctAnswersCount} / {questions.length}
              </span>
              <span className="text-[11px] text-[#059669] font-bold block">
                ({accuracy}%)
              </span>
            </div>

            <div className="bg-[#f8f9ff] p-3 rounded-2xl border border-[#e2e8f0]">
              <span className="text-xs text-[#64748b] font-medium block">
                TRI Estimada
              </span>
              <span className="text-xl font-extrabold text-[#3525cd]">
                +{triTotalGained} pts
              </span>
              <span className="text-[11px] text-[#4f46e5] font-bold block">
                Gabarito calibrado
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirmFinish}
            className="w-full h-12 rounded-full bg-[#3525cd] hover:bg-[#281bbb] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#3525cd]/25 cursor-pointer"
          >
            <span>Voltar ao Meu ENEM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const isCurrentCorrect = selectedOption === currentQ.correctOption;

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-between">
      {/* 1. Header (Exact design from Image 10) */}
      <header className="sticky top-0 z-40 bg-[#f8f9ff]/95 backdrop-blur-md border-b border-[#e5eeff]">
        <div className="max-w-md md:max-w-2xl mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              type="button"
              aria-label="Voltar"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Logo size="sm" />
          </div>

          <h2 className="text-base font-bold text-[#0b1c30]">
            {isExplanationModeOnly ? 'Explicação' : 'Praticando'}
          </h2>

          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#4f46e5]/20 bg-white">
            <img
              src={user.avatarSmallUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 2. Subheader & Question Navigation Bar */}
        <div className="max-w-md md:max-w-2xl mx-auto px-4 pb-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xs sm:text-sm font-bold text-[#3525cd]">
              Questão {(currentIndex + 1).toString().padStart(2, '0')}
            </span>
            <span className="text-xs text-[#64748b]">
              de {questions.length.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live Timer */}
            <div className="flex items-center gap-1 text-xs font-semibold text-[#475569] bg-white px-2.5 py-1 rounded-full border border-[#e2e8f0]">
              <Clock className="w-3.5 h-3.5 text-[#3525cd]" />
              <span className="tabular-nums">{formatTimer(seconds)}</span>
            </div>

            {/* Bookmark / Revisar Toggle */}
            <button
              type="button"
              onClick={handleToggleBookmark}
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]'
                  : 'bg-white text-[#64748b] border-[#e2e8f0] hover:text-[#0b1c30]'
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                }`}
              />
              <span>Revisar</span>
            </button>
          </div>
        </div>

        {/* Progress Bar indicator */}
        <div className="w-full h-1 bg-[#e2e8f0] overflow-hidden">
          <div
            className="h-full bg-[#3525cd] transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md md:max-w-2xl mx-auto w-full px-4 py-4 flex-1 flex flex-col gap-4">
        {/* Meta badges */}
        <div className="flex items-center gap-2 text-[11px] font-bold flex-wrap">
          <span className="text-[#3525cd] bg-[#e0e7ff] px-2.5 py-0.5 rounded-full">
            {currentQ.exam}
          </span>
          <span className="text-[#059669] bg-[#ecfdf5] px-2.5 py-0.5 rounded-full">
            • {currentQ.areaLabel}
          </span>
          <span className="text-[#64748b] bg-white border border-[#e2e8f0] px-2 py-0.5 rounded-full">
            Nível: {currentQ.difficulty}
          </span>
        </div>

        {/* Enunciado Oficial Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2e8f0] shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3525cd]">
            <BookOpen className="w-4 h-4" />
            <span>Enunciado Oficial</span>
          </div>

          <p className="text-sm sm:text-[15px] text-[#0b1c30] leading-relaxed font-normal">
            {currentQ.stem}
          </p>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-2.5">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.letter;
            const isCorrectOption = opt.letter === currentQ.correctOption;

            // Compute styling when answer is revealed
            let containerStyle =
              'bg-white border-[#e2e8f0] text-[#0b1c30] hover:border-[#cbd5e1]';
            let badgeStyle = 'bg-[#f1f5f9] text-[#475569]';

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                // Official correct option: Light green highlight
                containerStyle =
                  'bg-[#ecfdf5] border-[#34d399] text-[#064e3b] shadow-xs';
                badgeStyle = 'bg-[#10b981] text-white';
              } else if (isSelected && !isCorrectOption) {
                // Student chose this wrong option: Red highlight
                containerStyle =
                  'bg-[#fef2f2] border-[#f87171] text-[#7f1d1d] shadow-xs';
                badgeStyle = 'bg-[#ef4444] text-white';
              } else {
                containerStyle = 'bg-white border-[#e2e8f0] opacity-50';
              }
            } else if (isSelected) {
              containerStyle =
                'bg-[#eff4ff] border-[#3525cd] ring-1 ring-[#3525cd] text-[#3525cd]';
              badgeStyle = 'bg-[#3525cd] text-white';
            }

            return (
              <button
                key={opt.letter}
                type="button"
                onClick={() => handleSelectOption(opt.letter)}
                className={`w-full p-3.5 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${containerStyle}`}
              >
                <div className="flex items-start gap-3">
                  {/* Option letter circular badge */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${badgeStyle}`}
                  >
                    {isAnswerSubmitted && isCorrectOption ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : isAnswerSubmitted && isSelected && !isCorrectOption ? (
                      <X className="w-4 h-4 stroke-[3]" />
                    ) : (
                      opt.letter
                    )}
                  </div>

                  {/* Option Text and Status Label */}
                  <div className="flex-1 min-w-0">
                    {/* If answered and correct: Show green indicator exactly like Image 10 */}
                    {isAnswerSubmitted && isCorrectOption && (
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#059669]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {isSelected ? 'Sua Resposta Correta' : 'Gabarito Oficial Correto'}
                          </span>
                        </div>
                        <span className="text-[10px] font-extrabold text-white bg-[#059669] px-2 py-0.5 rounded-full">
                          +{currentQ.triPoints} pts TRI
                        </span>
                      </div>
                    )}

                    {isAnswerSubmitted && isSelected && !isCorrectOption && (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#dc2626] mb-1">
                        <X className="w-3.5 h-3.5" />
                        <span>Sua Resposta Incorreta</span>
                      </div>
                    )}

                    <p className="text-xs sm:text-[13px] leading-relaxed font-medium">
                      {opt.text}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. Explanation Box (Exact layout from Image 10) */}
        {isAnswerSubmitted && (
          <div className="flex flex-col gap-3 mt-1 animate-in fade-in duration-300">
            {/* Banner: Resultado / Acerto */}
            <div
              className={`p-3.5 rounded-2xl flex items-center justify-between border ${
                isCurrentCorrect
                  ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#065f46]'
                  : 'bg-[#fffbeb] border-[#fef3c7] text-[#92400e]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${
                    isCurrentCorrect ? 'bg-[#059669]' : 'bg-[#d97706]'
                  }`}
                >
                  {isCurrentCorrect ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : (
                    <RotateCcw className="w-5 h-5 stroke-[2.5]" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold flex items-center gap-1">
                    <span>
                      {isCurrentCorrect
                        ? 'Excelente acerto! 🎯'
                        : 'Oportunidade de Aprendizado!'}
                    </span>
                  </h4>
                  <p className="text-[11px] opacity-90">
                    {isCurrentCorrect
                      ? `Domínio pleno de ${currentQ.topic}`
                      : `Revise os conceitos de ${currentQ.topic}`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-[#059669] block">
                  +{isCurrentCorrect ? currentQ.triPoints : 0} XP
                </span>
                <span className="text-[10px] text-[#64748b] block">
                  TRI Estimada
                </span>
              </div>
            </div>

            {/* Explicação do Especialista Meu ENEM */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2e8f0] shadow-xs flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0b1c30]">
                <div className="w-6 h-6 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#3525cd]">
                  <Lightbulb className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                </div>
                <span>Explicação do Especialista Meu ENEM</span>
              </div>

              <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed">
                {currentQ.explanation}
              </p>

              {/* Accordion: Por que as outras alternativas estão incorretas? */}
              {currentQ.distractors && currentQ.distractors.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[#f1f5f9]">
                  <button
                    type="button"
                    onClick={() => setShowDistractors(!showDistractors)}
                    className="w-full py-2 flex items-center justify-between text-xs font-bold text-[#3525cd] hover:text-[#281bbb] cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#3525cd]" />
                      <span>Por que as outras alternativas estão incorretas?</span>
                    </div>
                    {showDistractors ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {showDistractors && (
                    <div className="flex flex-col gap-2 pt-2 pb-1">
                      {currentQ.distractors.map((dis) => (
                        <div
                          key={dis.option}
                          className="p-2.5 rounded-xl bg-[#f8f9ff] border border-[#e2e8f0] text-xs flex gap-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#e2e8f0] text-[#475569] font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                            {dis.option}
                          </span>
                          <p className="text-[#475569] leading-snug">
                            {dis.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* 4. Bottom Sticky Actions Bar */}
      <footer className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] p-4 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <div className="max-w-md md:max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleToggleBookmark}
            className="flex-1 h-12 rounded-2xl bg-[#eff4ff] hover:bg-[#e0e7ff] text-[#3525cd] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-[#3525cd]' : ''
              }`}
            />
            <span>{isBookmarked ? 'Marcada' : 'Revisar Detalhes'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 h-12 rounded-2xl bg-[#3525cd] hover:bg-[#281bbb] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-[#3525cd]/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>
              {currentIndex < questions.length - 1
                ? 'Próxima Questão'
                : 'Concluir Treino'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
