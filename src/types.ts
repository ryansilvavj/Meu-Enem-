export type AreaConhecimento = 
  | 'todas'
  | 'linguagens'
  | 'humanas'
  | 'natureza'
  | 'matematica';

export type MateriaId = 
  | 'portugues'
  | 'historia'
  | 'natureza'
  | 'matematica'
  | 'estrangeira';

export type Dificuldade = 'facil' | 'medio' | 'dificil' | 'misto';

export interface DistractorExplanation {
  option: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface Question {
  id: string;
  exam: string; // e.g. "ENEM 2023 • 2ª Aplicação"
  area: AreaConhecimento;
  areaLabel: string; // e.g. "Ciências da Natureza (Biologia)"
  subjectId: MateriaId;
  subjectLabel: string; // e.g. "Biologia • Ecologia"
  topic: string; // e.g. "Fenômeno da Eutrofização"
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  triPoints: number; // e.g. 25
  stem: string; // Enunciado oficial
  imagePrompt?: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  distractors: DistractorExplanation[];
  userAnswer?: 'A' | 'B' | 'C' | 'D' | 'E';
  isCorrect?: boolean;
  timeSpent?: string;
  answeredAt?: string;
  isBookmarked?: boolean;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  avatarSmallUrl: string;
  daysRemaining: number;
  streakDays: number;
  coins: number;
  dailyGoalDone: number;
  dailyGoalTotal: number;
  totalResolved: number;
  totalCorrect: number;
  accuracyRate: number;
  triScore: number;
  triDelta: number;
  targetCourse: string;
  targetInstitution: string;
  targetCutoff: number;
  subjectProgress: {
    id: string;
    code: 'LC' | 'CH' | 'CN' | 'MT';
    name: string;
    percentage: number;
    color: string;
    badge?: string;
  }[];
  weeklyEvolution: {
    day: string;
    shortDay: string;
    rate: number;
  }[];
}

export type ActiveTab = 'inicio' | 'estudar' | 'historico' | 'perfil';
