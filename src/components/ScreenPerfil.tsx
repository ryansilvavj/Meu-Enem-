import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Trophy,
  Flame,
  Star,
  Target,
  GraduationCap,
  Calendar,
  CheckCircle,
  Award,
  Bell,
  Sliders,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface ScreenPerfilProps {
  user: UserProfile;
  onUpdateTarget?: (course: string, institution: string) => void;
}

export const ScreenPerfil: React.FC<ScreenPerfilProps> = ({ user }) => {
  const [photoError, setPhotoError] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoalTotal);
  const [reminderActive, setReminderActive] = useState(true);

  // 14 days calendar days for Beatriz's streak
  const streakDaysList = Array.from({ length: 14 }, (_, i) => ({
    dayNumber: i + 12,
    completed: true,
  }));

  return (
    <div className="flex flex-col gap-4 pb-16">
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-[#e2e8f0] shadow-xs flex flex-col items-center text-center gap-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#3525cd] to-[#6366f1] opacity-90" />

        {/* Beatriz Avatar */}
        <div className="relative z-10 mt-6 w-20 h-20 rounded-full p-1 bg-white shadow-md ring-4 ring-white">
          {!photoError ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              onError={() => setPhotoError(true)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#3525cd] to-[#4338ca] text-white text-2xl font-bold flex items-center justify-center">
              {user.name[0]}
            </div>
          )}
        </div>

        <div className="relative z-10">
          <h1 className="text-xl font-extrabold text-[#0b1c30]">
            {user.name} Ribeiro
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Focada no ENEM 2025 • Vestibulanda de {user.targetCourse}
          </p>
        </div>

        {/* Quick Badges Row */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#b45309] bg-[#fef3c7] px-3 py-1 rounded-full border border-[#fde68a]">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{user.streakDays} dias de ofensiva</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] bg-[#ecfdf5] px-3 py-1 rounded-full border border-[#a7f3d0]">
            <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
            <span>{user.coins.toLocaleString('pt-BR')} XP</span>
          </span>
        </div>
      </div>

      {/* 2. Target Course & TRI Goal */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#3525cd]">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#3525cd]">
                Meta de Aprovação
              </h2>
              <h3 className="text-sm font-bold text-[#0b1c30]">
                {user.targetCourse} • {user.targetInstitution}
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-[#64748b]">SiSU 2025</span>
        </div>

        {/* Comparative TRI Score Gauge */}
        <div className="bg-[#f8f9ff] p-3.5 rounded-xl border border-[#e2e8f0] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748b]">Sua Média TRI Atual</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-[#3525cd] tabular-nums">
                {user.triScore}
              </span>
              <span className="text-xs text-[#64748b]">/ {user.targetCutoff}</span>
            </div>
          </div>

          {/* Progress bar towards target cutoff */}
          <div className="w-full h-3 rounded-full bg-[#e2e8f0] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3525cd] via-[#4d44e3] to-[#10b981]"
              style={{
                width: `${Math.min(100, (user.triScore / user.targetCutoff) * 100)}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#64748b]">
            <span className="flex items-center gap-1 text-[#059669] font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              Faltam apenas {user.targetCutoff - user.triScore} pontos para o corte!
            </span>
            <span>Nota de corte: {user.targetCutoff}</span>
          </div>
        </div>
      </div>

      {/* 3. Consecutive Streak Calendar */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#b45309]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">
                Calendário de Ofensiva
              </h3>
              <p className="text-[11px] text-[#64748b]">
                14 dias ininterruptos de treino resolvido
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-[#b45309]">🔥 14 Dias</span>
        </div>

        {/* Days bubbles */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
            <div
              key={i}
              className="text-center text-[10px] font-bold text-[#94a3b8]"
            >
              {d}
            </div>
          ))}
          {streakDaysList.map((st, i) => (
            <div
              key={i}
              className="h-9 rounded-xl bg-[#fffbeb] border border-[#fde68a] text-[#b45309] font-bold text-xs flex flex-col items-center justify-center"
            >
              <CheckCircle className="w-3 h-3 text-[#d97706]" />
              <span className="text-[9px] tabular-nums">{st.dayNumber}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Conquistas & Medalhas */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0b1c30]">
            Conquistas Recentes
          </h3>
          <span className="text-xs text-[#3525cd] font-semibold">Ver todas (8)</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-[#eff4ff] border border-[#dbeafe] flex flex-col items-center text-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#3525cd]">
              <Trophy className="w-5 h-5 text-[#3525cd]" />
            </div>
            <span className="text-xs font-bold text-[#0b1c30] leading-tight">
              Gabarito TRI
            </span>
            <span className="text-[10px] text-[#64748b]">700+ pontos</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex flex-col items-center text-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#b45309]">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <span className="text-xs font-bold text-[#0b1c30] leading-tight">
              Fogo Sagrado
            </span>
            <span className="text-[10px] text-[#64748b]">14 dias streak</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] flex flex-col items-center text-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#059669]">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-[#0b1c30] leading-tight">
              Ecologista
            </span>
            <span className="text-[10px] text-[#64748b]">100% em Ecologia</span>
          </div>
        </div>
      </div>

      {/* 5. Study Preferences */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-xs flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#0b1c30]">
          Configurações de Estudo
        </h3>

        <div className="flex flex-col divide-y divide-[#f1f5f9]">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#64748b]" />
              <span className="text-xs text-[#0b1c30] font-semibold">
                Meta Diária de Questões
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[10, 20, 30].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setDailyGoal(count)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    dailyGoal === count
                      ? 'bg-[#3525cd] text-white'
                      : 'bg-[#f1f5f9] text-[#64748b]'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#64748b]" />
              <span className="text-xs text-[#0b1c30] font-semibold">
                Lembretes diários de treino
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reminderActive}
              onClick={() => setReminderActive(!reminderActive)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                reminderActive ? 'bg-[#3525cd]' : 'bg-[#cbd5e1]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform transform shadow-xs absolute top-0.5 ${
                  reminderActive ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
