import React, { useState } from 'react';
import { ActiveTab, Question, UserProfile, MateriaId, AreaConhecimento, Dificuldade } from './types';
import { INITIAL_USER, INITIAL_QUESTIONS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ScreenInicio } from './components/ScreenInicio';
import { ScreenEstudar } from './components/ScreenEstudar';
import { ScreenHistorico } from './components/ScreenHistorico';
import { ScreenPerfil } from './components/ScreenPerfil';
import { ScreenQuiz } from './components/ScreenQuiz';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);

  // Active quiz runner state
  const [activeQuiz, setActiveQuiz] = useState<{
    questions: Question[];
    initialIndex: number;
    isExplanationOnly: boolean;
  } | null>(null);

  // Device frame toggle for wide screens
  const [useDeviceFrame, setUseDeviceFrame] = useState(true);

  // Toggle Bookmark
  const handleToggleBookmark = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, isBookmarked: !q.isBookmarked } : q
      )
    );
  };

  // Launch a rapid quiz
  const handleStartRapidQuiz = () => {
    const quizSet = questions.slice(0, 5);
    setActiveQuiz({
      questions: quizSet,
      initialIndex: 0,
      isExplanationOnly: false,
    });
  };

  // Launch Math focused practice
  const handleContinueMath = () => {
    const mathQuestions = questions.filter((q) => q.area === 'matematica');
    setActiveQuiz({
      questions: mathQuestions.length > 0 ? mathQuestions : questions.slice(0, 3),
      initialIndex: 0,
      isExplanationOnly: false,
    });
  };

  // Launch Super-Review (Errors only)
  const handleReviewErrors = () => {
    const errorQuestions = questions.filter((q) => q.isCorrect === false);
    setActiveQuiz({
      questions: errorQuestions.length > 0 ? errorQuestions : questions,
      initialIndex: 0,
      isExplanationOnly: false,
    });
  };

  // Open single question in official explanation view (matching Image 10)
  const handleOpenExplanation = (q: Question) => {
    const index = questions.findIndex((item) => item.id === q.id);
    setActiveQuiz({
      questions: questions,
      initialIndex: index >= 0 ? index : 0,
      isExplanationOnly: true,
    });
  };

  // Launch custom workout from ScreenEstudar
  const handleStartCustomWorkout = (config: {
    area: AreaConhecimento;
    selectedSubjects: MateriaId[];
    difficulty: Dificuldade;
    questionCount: number;
    withTimer: boolean;
    onlyUnseen: boolean;
  }) => {
    let pool = [...questions];

    if (config.area !== 'todas') {
      pool = pool.filter((q) => q.area === config.area);
    }

    if (config.selectedSubjects.length > 0) {
      pool = pool.filter((q) => config.selectedSubjects.includes(q.subjectId));
    }

    if (pool.length === 0) {
      pool = [...questions];
    }

    // Limit to configured count
    const finalSet = pool.slice(0, Math.min(config.questionCount, pool.length));

    setActiveQuiz({
      questions: finalSet,
      initialIndex: 0,
      isExplanationOnly: false,
    });
  };

  // Finish quiz and update stats
  const handleFinishQuiz = (results: {
    total: number;
    correct: number;
    triGained: number;
  }) => {
    setUser((prev) => {
      const newTotal = prev.totalResolved + results.total;
      const newCorrect = prev.totalCorrect + results.correct;
      const newRate = Number(((newCorrect / newTotal) * 100).toFixed(1));
      return {
        ...prev,
        totalResolved: newTotal,
        totalCorrect: newCorrect,
        accuracyRate: newRate,
        triScore: prev.triScore + Math.round(results.triGained / 2),
        coins: prev.coins + results.triGained * 10,
        dailyGoalDone: Math.min(prev.dailyGoalTotal, prev.dailyGoalDone + results.total),
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0b1c30] flex flex-col items-center">
      {/* Top Helper Bar for Desktop Screen Size (Device Frame Switcher) */}
      <div className="hidden lg:flex w-full bg-[#0b1c30] text-white py-2 px-6 items-center justify-between text-xs z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#6cf8bb]">ENEM+</span>
          <span className="text-white/60">·</span>
          <span className="text-white/80">Plataforma Oficial de Questões & TRI</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUseDeviceFrame(true)}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              useDeviceFrame
                ? 'bg-white text-[#0b1c30] font-bold shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Formato Mobile (iPhone)</span>
          </button>
          <button
            type="button"
            onClick={() => setUseDeviceFrame(false)}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              !useDeviceFrame
                ? 'bg-white text-[#0b1c30] font-bold shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Tela Expandida</span>
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Shell */}
      <div
        className={`w-full transition-all duration-300 ${
          useDeviceFrame
            ? 'max-w-[430px] my-0 lg:my-6 rounded-none lg:rounded-[44px] shadow-none lg:shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-0 lg:border-[8px] lg:border-[#1e293b] overflow-hidden min-h-screen lg:min-h-[880px]'
            : 'max-w-2xl min-h-screen'
        } bg-[#f8f9ff] flex flex-col relative`}
      >
        {/* If Active Quiz is running, display ScreenQuiz */}
        {activeQuiz ? (
          <ScreenQuiz
            questions={activeQuiz.questions}
            initialIndex={activeQuiz.initialIndex}
            user={user}
            isExplanationModeOnly={activeQuiz.isExplanationOnly}
            onClose={() => setActiveQuiz(null)}
            onFinishQuiz={handleFinishQuiz}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          <>
            {/* Standard Header */}
            <Header
              user={user}
              onOpenProfile={() => setActiveTab('perfil')}
              titleContext={
                activeTab === 'inicio'
                  ? 'Início'
                  : activeTab === 'estudar'
                  ? 'Estudar'
                  : activeTab === 'historico'
                  ? 'Histórico'
                  : 'Meu Perfil'
              }
            />

            {/* Tab Body */}
            <main className="flex-1 px-4 pt-3 pb-24 overflow-y-auto">
              {activeTab === 'inicio' && (
                <ScreenInicio
                  user={user}
                  onStartQuiz={handleStartRapidQuiz}
                  onContinueMath={handleContinueMath}
                  onReviewErrors={handleReviewErrors}
                  onSelectSubjectArea={() => setActiveTab('estudar')}
                />
              )}

              {activeTab === 'estudar' && (
                <ScreenEstudar
                  onStartCustomWorkout={handleStartCustomWorkout}
                  onStartRandomQuiz={handleStartRapidQuiz}
                />
              )}

              {activeTab === 'historico' && (
                <ScreenHistorico
                  questions={questions}
                  onOpenQuestionExplanation={handleOpenExplanation}
                  onStartReviewQuiz={handleReviewErrors}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {activeTab === 'perfil' && <ScreenPerfil user={user} />}
            </main>

            {/* Bottom Nav Bar */}
            <BottomNav
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onQuickQuiz={handleStartRapidQuiz}
            />
          </>
        )}
      </div>
    </div>
  );
}
