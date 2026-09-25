import { Question, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Beatriz',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKxcsoy7XEYHA3rH4oo_FQdq9yAc0gDyvDK521juOls9zOSj36f5tuXcBJQt6xI50DoA3RMo2vfb8FzKi4zBkHoUHdGZDRHt5vWSDX7uLvaHR-a59yEB1DwlM7Yq6XEqzaTYbPS_DRI44steyyFI_LUvvCv0-nwAViP80x-dBLLWO_DsEe9SOpmKoTksdq20_ZBAF3Z2YMztsJaewdcxmzJMwOErURJ9X25mEoDZuvtbfD88o6KAUDRQ',
  avatarSmallUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaOUqmhDXJb--d5aEF8pLGTP28yoqbV3TLzNQ0G-QTmUeqXQJkZ_NtDmJ7FUos1pyLzJCiSvWxg_cXt2ctg41Te9Cp5FTm3YrBwieyllt7jy6Pl2spWxJw-0CDn0mlc6uDzuIoV_4CJcORa7VOzVvFM2At7i1fg6IJvE1XJ3MAEOxPLwhgT0oa1ljdgHAOjf5YCBQWqYbVsXm5ZDXiSco-lVj9EMsZfOZClwLBTFrxozvLjh5oo2cgHQ',
  daysRemaining: 142,
  streakDays: 14,
  coins: 2450,
  dailyGoalDone: 15,
  dailyGoalTotal: 20,
  totalResolved: 342,
  totalCorrect: 268,
  accuracyRate: 78.4,
  triScore: 745,
  triDelta: 18,
  targetCourse: 'Medicina',
  targetInstitution: 'USP / SiSU',
  targetCutoff: 790,
  subjectProgress: [
    {
      id: 'lc',
      code: 'LC',
      name: 'Linguagens e Códigos',
      percentage: 74,
      color: '#3525cd',
    },
    {
      id: 'ch',
      code: 'CH',
      name: 'Ciências Humanas',
      percentage: 88,
      color: '#a04500',
    },
    {
      id: 'cn',
      code: 'CN',
      name: 'Ciências da Natureza',
      percentage: 65,
      color: '#006c49',
      badge: 'Atenção!',
    },
    {
      id: 'mt',
      code: 'MT',
      name: 'Matemática e Tecnologias',
      percentage: 82,
      color: '#4d44e3',
    },
  ],
  weeklyEvolution: [
    { day: 'Segunda', shortDay: 'Seg', rate: 70 },
    { day: 'Terça', shortDay: 'Ter', rate: 74 },
    { day: 'Quarta', shortDay: 'Qua', rate: 76 },
    { day: 'Quinta', shortDay: 'Qui', rate: 79 },
    { day: 'Sexta', shortDay: 'Sex', rate: 80 },
    { day: 'Sábado', shortDay: 'Sáb', rate: 77 },
    { day: 'Domingo', shortDay: 'Dom', rate: 82 },
  ],
};

export const INITIAL_QUESTIONS: Question[] = [
  // 1. Biologia / Ecologia (Screen from Image 10)
  {
    id: 'cn-bio-2023-eutrofizacao',
    exam: 'ENEM 2023 • 2ª Aplicação',
    area: 'natureza',
    areaLabel: 'Ciências da Natureza (Biologia)',
    subjectId: 'natureza',
    subjectLabel: 'Biologia • Ecologia',
    topic: 'Fenômeno da eutrofização em lagos urbanos',
    difficulty: 'Médio',
    triPoints: 25,
    stem: 'Em um ecossistema aquático continental, a proliferação excessiva de algas unicelulares decorrente do aporte excessivo de nutrientes ricos em fósforo e nitrogênio desencadeia o fenômeno denominado eutrofização. Um dos efeitos ecológicos imediatos mais graves desse processo na coluna d\'água superficial e profunda é:',
    options: [
      {
        letter: 'A',
        text: 'O aumento substancial da disponibilidade de oxigênio dissolvido pela alta taxa fotossintética superficial.',
      },
      {
        letter: 'B',
        text: 'A redução drástica do oxigênio dissolvido causada pela decomposição aeróbica da biomassa de algas mortas.',
      },
      {
        letter: 'C',
        text: 'A diminuição da turbidez da água facilitando a penetração de luz nas zonas bentônicas.',
      },
      {
        letter: 'D',
        text: 'A proliferação descontrolada de peixes carnívoros de topo de cadeia trófica.',
      },
      {
        letter: 'E',
        text: 'O aumento imediato do pH da água para níveis extremos de basicidade.',
      },
    ],
    correctOption: 'B',
    explanation: 'A eutrofização leva à morte rápida das algas superficiais devido à competição por luz. As bactérias decompositoras aeróbicas proliferam e consomem vorazmente o oxigênio dissolvido (DBO elevada), provocando anóxia e asfixia em massa de peixes e outros organismos aeróbicos da coluna d\'água.',
    distractors: [
      {
        option: 'A',
        text: 'Embora ocorra um pico superficial fugaz, as algas inferiores morrem por falta de luz e a decomposição esgota todo o oxigênio rapidamente.',
      },
      {
        option: 'C',
        text: 'A turbidez da água na verdade aumenta exponencialmente ("bloom" de algas), bloqueando quase toda a radiação solar para as camadas mais profundas.',
      },
      {
        option: 'D',
        text: 'Peixes carnívoros exigem alta taxa de oxigênio dissolvido, sofrendo mortalidade severa com a anóxia da coluna d\'água.',
      },
      {
        option: 'E',
        text: 'A decomposição biológica e a liberação de compostos sulfurados e gás carbônico tendem a acidificar o meio aquático, e não basicizá-lo a extremos.',
      },
    ],
    userAnswer: 'B',
    isCorrect: true,
    timeSpent: '01m 42s',
    answeredAt: 'Ontem às 20:58',
    isBookmarked: false,
  },

  // 2. Física / Eletrodinâmica (Error from Screen 8)
  {
    id: 'cn-fis-2023-resistores',
    exam: 'ENEM 2023',
    area: 'natureza',
    areaLabel: 'Ciências da Natureza (Física)',
    subjectId: 'natureza',
    subjectLabel: 'Física • Eletrodinâmica',
    topic: 'Associação de resistores em circuito misto',
    difficulty: 'Difícil',
    triPoints: 35,
    stem: 'Associação de resistores em circuito misto com lâmpadas incandescentes sob variação de ddp: um circuito elétrico alimentado por uma fonte de tensão constante possui duas lâmpadas idênticas em paralelo conectadas em série a uma terceira lâmpada de mesmo valor de resistência. Ao se fechar uma chave que adiciona um resistor em paralelo a uma das partes, observa-se que:',
    options: [
      {
        letter: 'A',
        text: 'O brilho de todas as lâmpadas permanece inalterado por conservação de carga.',
      },
      {
        letter: 'B',
        text: 'A corrente elétrica em cada lâmpada paralela dobra instantaneamente.',
      },
      {
        letter: 'C',
        text: 'A ddp sobre o ramo paralelo aumenta proporcionalmente à resistência equivalente.',
      },
      {
        letter: 'D',
        text: 'A potência dissipada total do gerador diminui devido ao acréscimo de resistência.',
      },
      {
        letter: 'E',
        text: 'A corrente total fornecida pela fonte aumenta pois a resistência equivalente do circuito diminui ao fechar a chave em paralelo.',
      },
    ],
    correctOption: 'E',
    explanation: 'Ao associar resistores em paralelo, a resistência equivalente daquela seção diminui (Req = R/n). Consequentemente, a resistência equivalente total de todo o circuito reduz-se, o que pela 1ª Lei de Ohm (I = U / Req_total) faz com que a corrente total fornecida pelo gerador aumente.',
    distractors: [
      {
        option: 'A',
        text: 'A redistribuição de correntes e quedas de tensão altera a potência consumida individualmente pelas lâmpadas.',
      },
      {
        option: 'B',
        text: 'A corrente não dobra em cada uma; ela se divide conforme o novo número de ramificações resistivas.',
      },
      {
        option: 'C',
        text: 'Ao diminuir a resistência equivalente do trecho paralelo, a ddp desse trecho na verdade diminui em relação ao restante do circuito.',
      },
      {
        option: 'D',
        text: 'A fonte fornece mais corrente sob a mesma tensão total, logo P = U · I aumenta, e não diminui.',
      },
    ],
    userAnswer: 'C',
    isCorrect: false,
    timeSpent: '03m 12s',
    answeredAt: 'Ontem às 21:15',
    isBookmarked: true,
  },

  // 3. Matemática / Função Afim (Success from Screen 8)
  {
    id: 'mt-fun-2021-corrida',
    exam: 'ENEM 2021',
    area: 'matematica',
    areaLabel: 'Matemática e suas Tecnologias',
    subjectId: 'matematica',
    subjectLabel: 'Matemática • Função Afim',
    topic: 'Modelagem de corrida de aplicativo',
    difficulty: 'Fácil',
    triPoints: 18,
    stem: 'Modelagem de corrida de aplicativo com tarifa fixa combinada com quilômetro rodado e taxa por minuto de viagem. Um passageiro contratou um serviço cujo valor total V(x) é dado por uma taxa fixa de embarque de R$ 5,00 acrescida de R$ 2,50 por cada quilômetro x percorrido. Se o passageiro pagou um total de R$ 42,50 por sua viagem, a distância total percorrida foi de:',
    options: [
      {
        letter: 'A',
        text: '15 km, obtida resolvendo a equação do 1º grau 42,50 = 5,00 + 2,50x.',
      },
      {
        letter: 'B',
        text: '17 km, dividindo o valor total pago diretamente pelo custo variável.',
      },
      {
        letter: 'C',
        text: '19 km, descontando uma taxa de cancelamento antes do cálculo.',
      },
      {
        letter: 'D',
        text: '12 km, subtraindo os impostos estaduais do montante cobrado.',
      },
      {
        letter: 'E',
        text: '14 km, aplicando arredondamento tarifário no valor final.',
      },
    ],
    correctOption: 'A',
    explanation: 'A função afim é V(x) = 2,50x + 5,00. Igualando ao valor pago: 42,50 = 2,50x + 5,00 => 2,50x = 37,50 => x = 37,50 / 2,50 = 15 km. Resolução direta e sem pegadinhas!',
    distractors: [
      {
        option: 'B',
        text: '42,50 / 2,50 = 17 km ignora a taxa fixa inicial de embarque de R$ 5,00.',
      },
      {
        option: 'C',
        text: '19 km decorre de erro na subtração do termo independente (42,50 + 5,00 em vez de - 5,00).',
      },
      {
        option: 'D',
        text: 'Não há menção de impostos descontáveis além da expressão da função.',
      },
      {
        option: 'E',
        text: 'Cálculo aritmético truncado incorretamente.',
      },
    ],
    userAnswer: 'A',
    isCorrect: true,
    timeSpent: '01m 08s',
    answeredAt: 'Anteontem às 18:20',
    isBookmarked: false,
  },

  // 4. Química Orgânica (Recommended error topic in dashboard)
  {
    id: 'cn-qui-2022-isomeria',
    exam: 'ENEM 2022',
    area: 'natureza',
    areaLabel: 'Ciências da Natureza (Química)',
    subjectId: 'natureza',
    subjectLabel: 'Química • Química Orgânica',
    topic: 'Isomeria óptica e fármacos enantiômeros',
    difficulty: 'Difícil',
    triPoints: 30,
    stem: 'A talidomida é um fármaco que possui um carbono quiral em sua estrutura molecular. Enquanto um de seus enantiômeros apresenta ação sedativa e antiemética eficaz, o outro isômero óptico possui ação teratogênica, provocando malformações congênitas graves no desenvolvimento fetal. A propriedade química que diferencia tais enantiômeros entre si é:',
    options: [
      {
        letter: 'A',
        text: 'O ponto de fusão e ebulição medidos a 1 atm de pressão.',
      },
      {
        letter: 'B',
        text: 'O desvio do plano da luz polarizada em sentidos opostos (dextrógiro e levógiro).',
      },
      {
        letter: 'C',
        text: 'A fórmula molecular e o peso molecular estequiométrico.',
      },
      {
        letter: 'D',
        text: 'A solubilidade em solventes aquosos e polares como a água.',
      },
      {
        letter: 'E',
        text: 'A reatividade perante reagentes aquirais simétricos em laboratório.',
      },
    ],
    correctOption: 'B',
    explanation: 'Enantiômeros possuem propriedades físicas idênticas (ponto de fusão, ebulição, densidade e solubilidade em solventes aquirais). Diferenciam-se exclusivamente pelo sentido de rotação do plano da luz plano-polarizada (dextrógiro para a direita, levógiro para a esquerda) e pela interação com outros ambientes quirais, como os receptores biológicos humanos.',
    distractors: [
      {
        option: 'A',
        text: 'Ponto de fusão e ebulição de enantiômeros são idênticos em substâncias puras.',
      },
      {
        option: 'C',
        text: 'A fórmula e massa molecular são exatamente as mesmas, pois são isômeros.',
      },
      {
        option: 'D',
        text: 'A solubilidade em água é a mesma, já que a água é uma molécula aquiral.',
      },
      {
        option: 'E',
        text: 'Reagem com a mesma velocidade com reagentes aquirais.',
      },
    ],
    userAnswer: 'A',
    isCorrect: false,
    timeSpent: '02m 45s',
    answeredAt: 'Ontem às 22:04',
    isBookmarked: true,
  },

  // 5. Linguagens / Língua Portuguesa
  {
    id: 'lc-por-2023-variacao',
    exam: 'ENEM 2023',
    area: 'linguagens',
    areaLabel: 'Linguagens, Códigos e suas Tecnologias',
    subjectId: 'portugues',
    subjectLabel: 'Língua Portuguesa • Variação Linguística',
    topic: 'Variação diatópica e identidade cultural regional',
    difficulty: 'Médio',
    triPoints: 22,
    stem: 'Em um conto regionalista brasileiro, o narrador emprega expressões do falar sertanejo ("arribar", "carecer", "alumiar") entremeadas a construções de registro formal. O uso intencional dessas marcas linguísticas tem como função predominante no texto:',
    options: [
      {
        letter: 'A',
        text: 'Evidenciar o desconhecimento das regras da gramática normativa por parte do autor.',
      },
      {
        letter: 'B',
        text: 'Valorizar a identidade sócio-cultural do homem sertanejo e dar verossimilhança à narrativa.',
      },
      {
        letter: 'C',
        text: 'Ironizar a simplicidade lexical das comunidades ribeirinhas do semiárido.',
      },
      {
        letter: 'D',
        text: 'Dificultar a leitura do público urbano com vocabulário hermético e arcaico.',
      },
      {
        letter: 'E',
        text: 'Padronizar a língua portuguesa falada nas metrópoles em oposição ao campo.',
      },
    ],
    correctOption: 'B',
    explanation: 'A literatura regionalista utiliza as variedades diatópicas (geográficas) e diastráticas (sociais) para criar expressividade estética, autenticidade psicológica e conferir dignidade à fala dos grupos representados, rompendo com o preconceito linguístico.',
    distractors: [
      {
        option: 'A',
        text: 'O autor domina a norma culta e usa o dialeto de modo expressivo e consciente.',
      },
      {
        option: 'C',
        text: 'Não há intenção depreciativa ou irônica, mas sim celebração da verossimilhança.',
      },
      {
        option: 'D',
        text: 'O objetivo é a comunicação e a sensibilidade poética, não o hermetismo.',
      },
      {
        option: 'E',
        text: 'Não busca padronização nem homogeneização da língua.',
      },
    ],
    userAnswer: 'B',
    isCorrect: true,
    timeSpent: '01m 15s',
    answeredAt: 'Há 3 dias',
    isBookmarked: false,
  },

  // 6. Ciências Humanas / História & Sociedade
  {
    id: 'ch-his-2022-cidadania',
    exam: 'ENEM 2022',
    area: 'humanas',
    areaLabel: 'Ciências Humanas e suas Tecnologias',
    subjectId: 'historia',
    subjectLabel: 'História & Sociedade • Cidadania',
    topic: 'Constituição de 1988 e direitos fundamentais',
    difficulty: 'Médio',
    triPoints: 24,
    stem: 'A promulgação da Constituição da República Federativa do Brasil de 1988, cognominada "Constituição Cidadã" por Ulysses Guimarães, representou um marco histórico na transição democrática brasileira porque:',
    options: [
      {
        letter: 'A',
        text: 'Restringiu a atuação de partidos de oposição em prol da estabilidade econômica.',
      },
      {
        letter: 'B',
        text: 'Consagrou ampla carta de direitos civis, políticos e sociais e instituiu o SUS e o voto aos 16 anos.',
      },
      {
        letter: 'C',
        text: 'Manteve os decretos-leis autoritários do AI-5 no âmbito da segurança nacional.',
      },
      {
        letter: 'D',
        text: 'Eliminou a independência entre os Poderes Executivo, Legislativo e Judiciário.',
      },
      {
        letter: 'E',
        text: 'Subordinou as decisões jurídicas do STF ao aval prévio das Forças Armadas.',
      },
    ],
    correctOption: 'B',
    explanation: 'A Carta Magna de 1988 ampliou substancialmente os direitos sociais (criação do Sistema Único de Saúde, seguridade social, direitos trabalhistas e indígenas) e democratizou a participação eleitoral (voto facultativo aos analfabetos e jovens de 16 e 17 anos).',
    distractors: [
      {
        option: 'A',
        text: 'A Constituição garantiu o pluralismo político e a livre manifestação partidária.',
      },
      {
        option: 'C',
        text: 'Os atos institucionais da ditadura foram revogados pela redemocratização.',
      },
      {
        option: 'D',
        text: 'A tripartição dos poderes foi reestabelecida com freios e contrapesos.',
      },
      {
        option: 'E',
        text: 'O poder militar foi expressamente subordinado à autoridade civil constitucional.',
      },
    ],
    userAnswer: 'B',
    isCorrect: true,
    timeSpent: '01m 30s',
    answeredAt: 'Há 3 dias',
    isBookmarked: false,
  },

  // 7. Matemática / Função Quadrática (Citada no Modo Super Revisão)
  {
    id: 'mt-mat-2023-vertice',
    exam: 'ENEM 2023',
    area: 'matematica',
    areaLabel: 'Matemática e suas Tecnologias',
    subjectId: 'matematica',
    subjectLabel: 'Matemática • Função Quadrática',
    topic: 'Vértice da parábola e lucro máximo',
    difficulty: 'Médio',
    triPoints: 26,
    stem: 'Uma pequena cooperativa de produtores rurais modelou seu lucro mensal L (em milhares de reais) em função da quantidade x (em toneladas) de fertilizante orgânico utilizado pela equação L(x) = -2x² + 24x - 40. Para obter o lucro máximo mensal, a quantidade x de fertilizante a ser empregada deve ser de:',
    options: [
      {
        letter: 'A',
        text: '4 toneladas, que anula a derivada primeira do custo fixo.',
      },
      {
        letter: 'B',
        text: '6 toneladas, correspondente à abscissa do vértice da parábola Xv = -b / (2a).',
      },
      {
        letter: 'C',
        text: '8 toneladas, ponto médio entre as raízes reais da produção.',
      },
      {
        letter: 'D',
        text: '12 toneladas, quociente entre o coeficiente linear e a concavidade.',
      },
      {
        letter: 'E',
        text: '32 toneladas, correspondente à ordenada máxima do lucro Yv.',
      },
    ],
    correctOption: 'B',
    explanation: 'Como a parábola possui concavidade voltada para baixo (a = -2 < 0), o ponto de máximo ocorre exatamente no vértice. A abscissa do vértice é dada por Xv = -b / (2a) = -24 / (2 · (-2)) = -24 / -4 = 6 toneladas.',
    distractors: [
      {
        option: 'A',
        text: '4 toneladas corresponde a uma das raízes da função onde o lucro é zero, e não máximo.',
      },
      {
        option: 'C',
        text: 'As raízes são x = 2 e x = 10, cuja média é (2 + 10)/2 = 6, e não 8.',
      },
      {
        option: 'D',
        text: '12 é -b / a, esquecendo de dividir pelo dobro de a.',
      },
      {
        option: 'E',
        text: '32 milhares de reais é o lucro máximo obtido (Yv), mas a pergunta pede a quantidade x de fertilizante.',
      },
    ],
    userAnswer: 'E',
    isCorrect: false,
    timeSpent: '02m 10s',
    answeredAt: 'Ontem às 19:40',
    isBookmarked: true,
  },

  // 8. Língua Estrangeira (Inglês)
  {
    id: 'lc-ing-2023-fake-news',
    exam: 'ENEM 2023',
    area: 'linguagens',
    areaLabel: 'Linguagens, Códigos e suas Tecnologias',
    subjectId: 'estrangeira',
    subjectLabel: 'Língua Estrangeira • Inglês Instrumental',
    topic: 'Compreensão textual e desinformação digital',
    difficulty: 'Fácil',
    triPoints: 20,
    stem: 'In an article discussing online disinformation, the author highlights: "Algorithmic echo chambers tend to reinforce pre-existing biases, blinding users to nuanced counter-arguments." According to the excerpt, the primary issue caused by algorithms is:',
    options: [
      {
        letter: 'A',
        text: 'A restrição da velocidade de conexão dos usuários em áreas remotas.',
      },
      {
        letter: 'B',
        text: 'O reforço de preconceitos prévios, dificultando o contato com visões contrapostas mais ponderadas.',
      },
      {
        letter: 'C',
        text: 'A cobrança indevida por assinaturas digitais não solicitadas.',
      },
      {
        letter: 'D',
        text: 'O vazamento criminoso de senhas bancárias em redes sociais.',
      },
      {
        letter: 'E',
        text: 'A exclusão automática de perfis que não compartilham notícias diariamente.',
      },
    ],
    correctOption: 'B',
    explanation: 'A expressão "reinforce pre-existing biases" traduz-se como "reforçar vieses pré-existentes" e "blinding users to nuanced counter-arguments" indica que os usuários ficam cegos/insensíveis a contra-argumentos ponderados.',
    distractors: [
      {
        option: 'A',
        text: 'O texto não trata de conexão física de banda larga.',
      },
      {
        option: 'C',
        text: 'Não há menção a assinaturas ou pagamentos.',
      },
      {
        option: 'D',
        text: 'Trata de comportamento e viés cognitivo, não de segurança de senhas.',
      },
      {
        option: 'E',
        text: 'Não menciona banimento ou exclusão de contas.',
      },
    ],
    userAnswer: 'B',
    isCorrect: true,
    timeSpent: '00m 58s',
    answeredAt: 'Há 2 dias',
    isBookmarked: false,
  },
];
