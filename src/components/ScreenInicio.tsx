import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Play,
  BookOpen,
  FileEdit,
  CheckCircle,
  TrendingUp,
  Flame,
  ArrowUp,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';

interface ScreenInicioProps {
  user: UserProfile;
  onStartQuiz: () => void;
  onContinueMath: () => void;
  onReviewErrors: () => void;
  onSelectSubjectArea: (areaId: string) => void;
}

export const ScreenInicio: React.FC<ScreenInicioProps> = ({
  user,
  onStartQuiz,
  onContinueMath,
  onReviewErrors,
  onSelectSubjectArea,
}) => {
  const [photoError, setPhotoError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<string | null>('Dom');

  return (
    <div className="flex flex-col gap-4 pb-8">
      {/* 1. Header / Greeting Section */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col min-w-0 pr-3">
          <h1 className="text-[22px] sm:text-[24px] font-extrabold tracking-tight text-[#0b1c30] flex items-center gap-1.5">
            <span>Olá, {user.name}!</span>
            <span>🎯</span>
          </h1>
          <p className="text-[13px] sm:text-sm text-[#475569] mt-0.5 leading-snug">
            Faltam{' '}
            <strong className="font-bold text-[#3525cd]">
              {user.daysRemaining} dias
            </strong>{' '}
            para o ENEM 2025. Bora gabaritar hoje?
          </p>
        </div>

        {/* Beatriz Portrait Avatar */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full overflow-hidden shadow-sm ring-2 ring-[#4f46e5]/25 p-0.5 bg-white">
          {!photoError ? (
            <img
              src={user.avatarUrl}
              alt="Beatriz"
              referrerPolicy="no-referrer"
              onError={() => setPhotoError(true)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#3525cd] to-[#6366f1] text-white flex items-center justify-center font-bold text-lg">
              {user.name[0]}
            </div>
          )}
        </div>
      </div>

      {/* 2. Hero Quick Action Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#3525cd] via-[#4d44e3] to-[#4f46e5] p-4 sm:p-5 text-white shadow-md">
        <div className="absolute -right-6 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -top-6 right-16 w-24 h-24 rounded-full bg-[#6cf8bb]/20 blur-lg pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-white backdrop-blur-md">
              <span className="text-xs">⚡</span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
              Meta Diária • {user.dailyGoalDone}/{user.dailyGoalTotal} questões
            </span>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
              Quiz de Aquecimento Rápido
            </h2>
            <p className="text-xs sm:text-[13px] text-white/85 mt-0.5 line-clamp-1">
              5 questões calibradas pela TRI para turbinar sua nota
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <button
              onClick={onStartQuiz}
              type="button"
              className="w-full h-11 px-4 rounded-full bg-white text-[#3525cd] hover:bg-[#f8f9ff] text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current stroke-none" />
              <span>Começar Quiz Rápido</span>
            </button>

            <button
              onClick={onContinueMath}
              type="button"
              className="w-full h-10 px-4 rounded-full bg-white/15 hover:bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span className="truncate">Continuar: Matemática (Funções)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Key Metrics 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {/* Card 1: Resolvidas */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e2e8f0]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748b] font-semibold">Resolvidas</span>
            <div className="w-7 h-7 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#3525cd]">
              <FileEdit className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-[#0b1c30] tabular-nums">
              {user.totalResolved}
            </span>
            <span className="text-[11px] text-[#64748b] block mt-0.5">
              questões no total
            </span>
          </div>
        </div>

        {/* Card 2: Taxa de Acerto */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e2e8f0]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748b] font-semibold">Taxa de Acerto</span>
            <div className="w-7 h-7 rounded-full bg-[#ecfdf5] flex items-center justify-center text-[#059669]">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-[#059669] tabular-nums">
              {user.accuracyRate}%
            </span>
            <span className="text-[11px] text-[#64748b] block mt-0.5">
              {user.totalCorrect} acertos confirmados
            </span>
          </div>
        </div>

        {/* Card 3: TRI Estimada */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e2e8f0]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748b] font-semibold">Média TRI</span>
            <div className="w-7 h-7 rounded-full bg-[#e0e7ff] flex items-center justify-center text-[#3525cd]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-[#3525cd] tabular-nums">
                {user.triScore}
              </span>
              <span className="text-[11px] font-bold text-[#059669]">
                +{user.triDelta} pts
              </span>
            </div>
            <span className="text-[11px] text-[#64748b] block mt-0.5">
              Nota de corte {user.targetCourse}
            </span>
          </div>
        </div>

        {/* Card 4: Sequência / Streak */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e2e8f0]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748b] font-semibold">Sequência</span>
            <div className="w-7 h-7 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#b45309]">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-[#b45309] tabular-nums">
                {user.streakDays}
              </span>
              <span className="text-xs font-bold text-[#b45309]">dias</span>
            </div>
            <span className="text-[11px] text-[#64748b] block mt-0.5">
              Recorde pessoal! 🔥
            </span>
          </div>
        </div>
      </div>

      {/* 4. Weekly Evolution Chart Card */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/60 flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0b1c30]">Evolução Semanal</h3>
            <p className="text-[11px] text-[#64748b]">Taxa de acertos nos últimos 7 dias</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-[#ecfdf5] px-2 py-0.5 rounded-full">
            <ArrowUp className="w-3 h-3" />
            82% máx
          </span>
        </div>

        {/* Responsive SVG Composite Line & Bar Visualization */}
        <div className="w-full mt-1">
          <svg
            className="w-full h-28 overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 320 120"
          >
            <defs>
              <linearGradient id="areaGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle reference grid lines */}
            <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="10" x2="310" y1="20" y2="20" />
            <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="10" x2="310" y1="58" y2="58" />
            <line stroke="#f1f5f9" strokeWidth="1" x1="10" x2="310" y1="95" y2="95" />

            {/* Soft column bars for each day */}
            <rect fill="#f1f5f9" height="48" rx="6" width="18" x="21" y="47" />
            <rect fill="#f1f5f9" height="54" rx="6" width="18" x="66" y="41" />
            <rect fill="#f1f5f9" height="60" rx="6" width="18" x="111" y="35" />
            <rect fill="#f1f5f9" height="66" rx="6" width="18" x="156" y="29" />
            <rect fill="#f1f5f9" height="69" rx="6" width="18" x="201" y="26" />
            <rect fill="#f1f5f9" height="62" rx="6" width="18" x="246" y="33" />
            {/* Highlighted Sunday bar */}
            <rect fill="#e0e7ff" height="78" rx="6" width="18" x="286" y="17" />

            {/* Smooth Area Gradient Fill */}
            <path
              d="M 30,52 Q 75,44 120,38 T 210,26 T 295,18 L 295,95 L 30,95 Z"
              fill="url(#areaGrad)"
            />

            {/* Trend Line */}
            <path
              d="M 30,52 Q 75,44 120,38 T 210,26 T 295,18"
              fill="none"
              stroke="#4f46e5"
              strokeLinecap="round"
              strokeWidth="3"
            />

            {/* Interactive Data Points */}
            <circle cx="30" cy="52" fill="#ffffff" r="3.5" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="75" cy="46" fill="#ffffff" r="3.5" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="120" cy="38" fill="#ffffff" r="3.5" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="165" cy="32" fill="#ffffff" r="3.5" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="210" cy="26" fill="#ffffff" r="3.5" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="255" cy="33" fill="#ffffff" r="3.5" stroke="#4f46e5" strokeWidth="2.5" />
            {/* Sunday peak with pulsating ring */}
            <circle cx="295" cy="18" fill="#3525cd" r="5" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Day Labels */}
          <div className="flex justify-between items-center px-1 mt-1">
            {user.weeklyEvolution.map((item) => (
              <button
                key={item.shortDay}
                type="button"
                onClick={() => setHoveredDay(item.shortDay)}
                className={`text-[11px] text-center w-7 py-0.5 rounded transition-colors ${
                  item.shortDay === 'Dom'
                    ? 'font-bold text-[#3525cd]'
                    : hoveredDay === item.shortDay
                    ? 'font-semibold text-[#0b1c30] bg-[#eff4ff]'
                    : 'text-[#64748b]'
                }`}
              >
                {item.shortDay}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Review Recommendation Card */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/60 flex flex-col gap-2.5 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#b45309]" />
        <div className="flex items-start justify-between gap-2 pl-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ffedd5] flex items-center justify-center text-[#c2410c] flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#b45309] font-bold">
                Revisão Recomendada
              </span>
              <h4 className="text-sm font-bold text-[#0b1c30] leading-tight mt-0.5">
                8 questões pendentes
              </h4>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#b91c1c]">
            Urgente
          </span>
        </div>

        <p className="text-xs sm:text-[13px] text-[#475569] pl-1 leading-relaxed">
          Você teve erros recentes em{' '}
          <strong className="font-bold text-[#0b1c30]">Física (Cinemática)</strong> e{' '}
          <strong className="font-bold text-[#0b1c30]">Química Orgânica</strong>. Reforçar esses tópicos eleva sua nota TRI!
        </p>

        <div className="pl-1 pt-1">
          <button
            onClick={onReviewErrors}
            type="button"
            className="w-full h-10 px-4 rounded-full bg-[#eff4ff] hover:bg-[#e0e7ff] text-[#3525cd] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Revisar agora</span>
          </button>
        </div>
      </div>

      {/* 6. Progress By Subject Area */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/60 flex flex-col gap-3.5 w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0b1c30]">Progresso por Área do ENEM</h3>
          <span className="text-[11px] text-[#64748b]">Ciclo 2025</span>
        </div>

        <div className="flex flex-col gap-3">
          {user.subjectProgress.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => onSelectSubjectArea(sub.id)}
              className="flex flex-col gap-1.5 text-left group hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: `${sub.color}15`,
                      color: sub.color,
                    }}
                  >
                    {sub.code}
                  </span>
                  <span className="text-xs font-semibold text-[#0b1c30] truncate">
                    {sub.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {sub.badge && (
                    <span className="text-[10px] font-bold text-[#b91c1c] bg-[#fee2e2] px-1.5 py-0.5 rounded-full">
                      {sub.badge}
                    </span>
                  )}
                  <span
                    className="text-xs font-bold tabular-nums"
                    style={{ color: sub.color }}
                  >
                    {sub.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full h-2 rounded-full bg-[#f1f5f9] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${sub.percentage}%`,
                    backgroundColor: sub.color,
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 7. Student Daily Tip Banner */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#eff4ff] text-[#0b1c30] border border-[#dbeafe]">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#3525cd] flex-shrink-0 shadow-xs">
          <Lightbulb className="w-4 h-4 fill-indigo-600 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-xs font-bold text-[#0b1c30]">Dica TRI do Dia</h5>
          <p className="text-[11px] text-[#475569] truncate">
            Nunca chute questões fáceis aleatoriamente; consistência eleva a nota global!
          </p>
        </div>
      </div>
    </div>
  );
};
