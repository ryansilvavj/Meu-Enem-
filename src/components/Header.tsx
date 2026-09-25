import React, { useState } from 'react';
import { Logo } from './Logo';
import { UserProfile } from '../types';
import { Flame, Star } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  onOpenProfile: () => void;
  titleContext?: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenProfile,
  titleContext,
}) => {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-md border-b border-[#e5eeff]/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-md md:max-w-3xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand & Context */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Logo size="md" />
          {titleContext && (
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#3525cd]">
              {titleContext}
            </span>
          )}
        </div>

        {/* User Stats & Avatar */}
        <div className="flex items-center gap-2">
          {/* Streak pill */}
          <div
            title="Sequência de estudos ativa"
            className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#f0e7db] shadow-xs text-xs font-bold text-[#b45309]"
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="tabular-nums">{user.streakDays}d</span>
          </div>

          {/* Points / XP pill */}
          <div
            title="Pontos de experiência"
            className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#d1fae5] shadow-xs text-xs font-bold text-[#059669]"
          >
            <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
            <span className="tabular-nums">{user.coins.toLocaleString('pt-BR')}</span>
          </div>

          {/* Beatriz Avatar Button */}
          <button
            onClick={onOpenProfile}
            type="button"
            aria-label="Ver perfil de Beatriz"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full p-0.5 ring-2 ring-[#4f46e5]/20 hover:ring-[#4f46e5]/40 transition-all active:scale-95"
          >
            {!avatarError ? (
              <img
                src={user.avatarSmallUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                onError={() => setAvatarError(true)}
                className="w-8 h-8 rounded-full object-cover shadow-xs"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {user.name.charAt(0)}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
