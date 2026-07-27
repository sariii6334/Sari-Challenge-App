import { Translations } from '../translations';

export const nl: Translations = {
  appName: 'Sari Challenge',
  appSubtitle: 'Competitief Minigames Platform',
  createdBy: 'Created by Sari',
  version: 'Versie 1.0',

  arabic: 'العربية',
  english: 'English',
  turkish: 'Türkçe',
  german: 'Deutsch',
  french: 'Français',
  korean: '한국어',
  dutch: 'Nederlands',
  spanish: 'Español',
  hindi: 'Hindi',
  chinese: 'Chinees',
  selectLanguageTitle: 'Selecteer Taal',
  selectLanguageSubtitle: 'Je kunt de taal altijd wijzigen via de instellingen',

  start: 'Start',
  startGame: 'Spel Starten',
  playAgain: 'Opnieuw Spelen',
  mainMenu: 'Hoofdmenu',
  back: 'Terug',
  settings: 'Instellingen',
  about: 'Over de App',
  gameGuide: 'Speluitleg',
  howToPlay: 'Hoe te spelen',
  close: 'Sluiten',
  next: 'Volgende',
  save: 'Opslaan',
  reset: 'Resetten',
  dontShowAgain: 'Deze uitleg niet meer tonen',
  finishGame: 'Spel beëindigen',
  wins: 'Overwinningen',
  bestTime: 'Beste Tijd',
  roundNew: 'Nieuwe Ronde',
  turnNow: 'Huidige Beurt',
  reached21Lost: 'Heeft 21 bereikt (Verloren)',
  wonRound: 'Ronde gewonnen! 🎉',

  playSolo: 'Solo Spelen',
  playWithFriend: 'Met een Vriend',
  playVsAI: 'Tegen Computer',
  selectMode: 'Kies Spelmodus',
  selectModeSubtitle: 'Kies een modus om te starten',
  aiModeDesc: 'Daag AI uit (90% Moeilijkheid)',
  friendModeDesc: 'Speel tegen een vriend op hetzelfde apparaat',
  soloModeDesc: 'Verbreek je persoonlijke record en haal de hoogste precisie',
  friendTurnDesc: 'Om de beurt spelen tegen je vriend',
  soloResultSubtitle: 'Solo Uitdaging Resultaat',
  versusResultSubtitle: 'Onderling Resultaat',

  player1Default: 'Speler 1',
  player2Default: 'Speler 2',
  computerName: 'Computer (AI)',
  player1Turn: 'Speler 1 aan de beurt',
  player2Turn: 'Speler 2 aan de beurt',
  computerTurn: 'Computer aan de beurt',
  winner: 'Winnaar!',
  draw: 'Gelijkspel!',
  congratulations: 'Gefeliciteerd!',
  gameOver: 'Game Over',
  passDeviceTo: 'Geef apparaat aan',
  startPlayerTurn: 'Start beurt van',
  finishedTurn: 'heeft beurt beëindigd',

  score: 'Score',
  accuracy: 'Nauwkeurigheid',
  time: 'Tijd',
  attempts: 'Pogingen',
  bestScore: 'Persoonlijk Record',
  targetTime: 'Doeltijd',
  actualTime: 'Werkelijke Tijd',
  difference: 'Verschil',
  grade: 'Beoordeling',
  level: 'Niveau',
  round: 'Ronde',
  excellent: 'Uitstekend! 🌟',
  veryGood: 'Zeer Goed! 👏',
  good: 'Goed 👍',
  tryAgain: 'Probeer Opnieuw 🎯',

  soundEffects: 'Geluidseffecten',
  vibration: 'Trilling',
  appLanguage: 'App Taal',
  player1NameLabel: 'Naam Speler 1',
  player2NameLabel: 'Naam Speler 2',
  resetNames: 'Standaardnamen',
  showPreGameInfo: 'Uitleg tonen voor de start',
  resetSettings: 'Alle instellingen resetten',

  games: {
    'perfect-hold': {
      title: 'Perfect Hold',
      desc: 'Test je tijdgevoel tot op de milliseconde nauwkeurig',
      guide: [
        'Er wordt een willekeurige doeltijd tussen 1.00s en 60.00s gekozen.',
        'Onthoud de doeltijd goed voordat deze verdwijnt.',
        'Druk op Start en voel het verstrijken van de blinde tijd.',
        'Druk op Stop wanneer je denkt dat de tijd om is.',
        'Wie het dichtst bij de doeltijd zit, wint!'
      ],
      targetMsg: 'Doeltijd:',
      memorizeMsg: 'Onthoud deze doeltijd, hij wordt nu verborgen!',
      stopWhenReady: 'Timer loopt blind... Druk op STOP als je klaar bent!',
      pressToStart: 'Druk op Start om de blinde timer te starten',
      stop: 'NU STOPPEN'
    },
    '21-game': {
      title: '21 Game',
      desc: 'Tactisch telspel tegen een vriend of slimme AI',
      guide: [
        'Spelers tellen om de beurt vanaf 1 omhoog.',
        'Je mag 1, 2 of 3 opeenvolgende getallen zeggen.',
        'Maximaal 3 getallen per beurt.',
        'De speler die gedwongen wordt 21 te zeggen, verliest direct!'
      ],
      currentCount: 'Huidige Stand:',
      say1: 'Zeg 1 getal (+1)',
      say2: 'Zeg 2 getallen (+2)',
      say3: 'Zeg 3 getallen (+3)',
      forced21Lose: 'moest 21 zeggen en heeft verloren!'
    },
    'perfect-line': {
      title: 'Perfect Line',
      desc: 'Precisie tekenen op basis van een referentielijn',
      guide: [
        'Een referentielijn verschijnt enkele seconden.',
        'Onthoud de lengte voordat deze verdwijnt.',
        'Teken een lijn met je vinger van dezelfde lengte.',
        'De app berekent het lengteverschil en de nauwkeurigheid.'
      ],
      refLineMsg: 'Onthoud de lengte van deze lijn:',
      drawNow: 'Teken een lijn van dezelfde lengte:',
      drawnLength: 'Jouw getekende lengte:',
      targetLength: 'Doellengte:',
      clearCanvas: 'Wissen'
    },
    'perfect-circle': {
      title: 'Perfect Circle',
      desc: 'Teken een perfecte symmetrische cirkel in één beweging',
      guide: [
        'Er verschijnt kort een hulpcirkel.',
        'Teken in één vloeiende beweging een cirkel.',
        'Het systeem beoordeelt de rondheid en vloeiendheid.',
        'De hoogste score wint!'
      ],
      refCircleMsg: 'Bekijk de hulpcirkel:',
      drawCircleNow: 'Teken een zo perfect mogelijke cirkel:',
      smoothness: 'Vloeiendheid',
      circularity: 'Rondheid'
    },
    'memory-order': {
      title: 'Memory Order',
      desc: 'Visuele geheugentest door het onthouden van lichtvolgordes',
      guide: [
        'Gekleurde vakken lichten in een specifieke volgorde op.',
        'Bekijk de volgorde aandachtig.',
        'Herhaal de volgorde door op de vakken te tikken.',
        'Bij elk succes wordt de reeks langer!'
      ],
      watchSequence: 'Bekijk de volgorde aandachtig...',
      repeatSequence: 'Jouw beurt! Herhaal het patroon:',
      correctSequence: 'Juiste volgorde!',
      wrongSequence: 'Verkeerde volgorde!'
    },
    'color-trap': {
      title: 'Color Trap',
      desc: 'Stroop-effect valstrik: tekstkleur vs. woordbetekenis',
      guide: [
        'Kleurwoorden verschijnen in afwijkende inktkleuren.',
        'BELANGRIJK: Tik op de **INKTKLEUR**, niet op het woord!',
        'Voorbeeld: Het woord "ROOD" in BLAUWE inkt -> tik BLAUW!',
        'Vereist snelle reflexen en concentratie.'
      ],
      clickInkColor: 'Tik op de INKTKLEUR van de tekst:',
      red: 'Rood',
      blue: 'Blauw',
      green: 'Groen',
      yellow: 'Geel',
      purple: 'Paars',
      orange: 'Oranje'
    },
    'code-break': {
      title: 'Code Break',
      desc: 'Kraak de 4-cijferige geheime code met kleuraanwijzingen',
      guide: [
        'Raad de 4-cijferige geheime code.',
        '🟢 Groen: Juist cijfer op de juiste plek.',
        '🔵 Blauw: Juist cijfer op de verkeerde plek.',
        '🔴 Rood: Cijfer komt niet voor in de code.',
        'Gebruik eerdere pogingen om de code te kraken.'
      ],
      legendGreen: '🟢 Juist cijfer & juiste plek',
      legendBlue: '🔵 Juist cijfer, verkeerde plek',
      legendRed: '🔴 Cijfer niet in de code',
      guessPlaceholder: 'Voer 4 cijfers in...',
      submitGuess: 'Poging insturen',
      history: 'Geschiedenis van pogingen',
      codeCracked: 'Code succesvol gekraakt! 🎉'
    },
    'copy-move': {
      title: 'Copy Move',
      desc: 'Onthoud pijlrichtingen en geluiden en teken ze op het scherm',
      guide: [
        'Pijlrichtingen verschijnen één voor één met geluid.',
        'Daarna verschijnt een blanco tekenblok.',
        'Veeg met je vinger (Omhoog, Omlaag, Links, Rechts) om te tekenen.',
        'Eén fout beëindigt de ronde!'
      ],
      watchArrows: 'Onthoud de pijlen en het ritme:',
      drawOnPad: 'Veeg de gebaren in de juiste volgorde:',
      up: 'Omhoog ⬆️',
      down: 'Omlaag ⬇️',
      left: 'Links ⬅️',
      right: 'Rechts ➡️'
    },
    'missing-piece': {
      title: 'Missing Piece',
      desc: 'Snelle geheugentest: welk item is verdwenen?',
      guide: [
        'Kleurrijke items worden 3 seconden getoond.',
        'Eén item verdwijnt en laat een lege plek (?) achter.',
        'Herinner je welk item ontbreekt en plaats het terug.',
        'Het aantal items stijgt van 4 naar 8.'
      ],
      memorizeItems: 'Bekijk alle items, er verdwijnt er zo één:',
      findMissing: 'Welk item ontbreekt op de lege plek?',
      dropHere: 'Plaats item hier'
    },
    'wrong-answer': {
      title: 'Wrong Answer',
      desc: 'Reactiespel: kies bewust het VERKEERDE antwoord!',
      guide: [
        'Er verschijnt een eenvoudige vraag met slechts 2 opties.',
        'Het doel is NIET om het goede antwoord te kiezen, maar het FOUTE!',
        'Je hebt slechts 3 seconden per vraag!',
        'Het kiezen van het juiste antwoord leidt tot verlies.'
      ],
      chooseWrong: 'Tik bewust op het VERKEERDE antwoord!',
      timeLeft: 'Resterende Tijd',
      avgTime: 'Gemiddelde Reactietijd'
    },
    'number-rush': {
      title: 'Number Rush',
      desc: 'Tik de getallen van 1 tot 25 in de juiste volgorde aan',
      guide: [
        'Een 5x5 raster toont willekeurig geplaatste getallen van 1 tot 25.',
        'Tik getallen aan in volgorde: 1 -> 2 -> 3 tot 25.',
        'De tijd start bij 1 en stopt bij 25.',
        'Vermijd fouten voor de snelste tijd!'
      ],
      nextNumber: 'Volgend Doelgetal',
      currentNumber: 'Huidig Getal',
      rankLegendary: '👑 Legendaries',
      rankGold: '🥇 Goud',
      rankSilver: '🥈 Zilver',
      rankBronze: '🥉 Brons',
      timeDifference: 'Verschil met snelste tijd',
      tapToStart: 'Tik op getal (1) om te starten!',
      tapInOrder: 'Tik de getallen zo snel mogelijk op volgorde van 1 tot 25!'
    },
    'tic-tac-toe': {
      title: 'Boter-Kaas-en-Eieren XO',
      desc: 'Klassiek XO-spel tegen slimme AI (90% Moeilijk) of een vriend',
      guide: [
        'Plaats om de beurt je symbool (X of O) in het 3x3 raster.',
        'Vorm een rij van 3 dezelfde symbolen horizontaal, verticaal of diagonaal.',
        'Tegen de computer speelt de AI op hoog niveau (90% Moeilijk)!',
        'Gebruik tactiek om te winnen of de tegenstander te blokkeren.'
      ],
      playerX: 'Speler X',
      playerO: 'Speler O',
      aiTurn: 'Computer denkt na...',
      yourTurn: 'Jouw beurt!',
      xWins: 'X wint! 🎉',
      oWins: 'O wint! 🎉',
      draw: 'Gelijkspel! 🤝',
      difficulty: 'Moeilijkheidsgraad',
      hardAI: 'Slimme AI (90%)',
      score: 'Punten',
      round: 'Ronde'
    },
    'same-word': {
      title: 'Hetzelfde Woord 🗣️',
      desc: 'Leuk woordassociatiespel voor twee spelers op één apparaat!',
      guide: [
        'Ronde 1: Elke speler voert geheim een willekeurig woord in.',
        'Beide woorden worden naast elkaar op het scherm getoond.',
        'Volgende rondes: Voer een verbindingswoord in dat beide woorden koopt.',
        'Wanneer beide spelers EXACT hetzelfde woord invoeren -> Overwinning! 🎉'
      ],
      quickHowToPlay: '💡 Snelle Speluitleg:',
      step1: 'Ronde 1: Elke speler voert een geheim woord in.',
      step2: 'Beide woorden verschijnen, waarna iedereen een verbindingswoord invoert.',
      step3: 'Voeren jullie EXACT hetzelfde woord in ← GEWONNEN! 🎉',
      targetWordsNextRound: 'Doelwoorden voor de volgende ronde:',
      readyToStart: 'Ik ben er klaar voor (Tik om te starten)',
      privacyNotice: 'Zorg ervoor dat de andere speler het scherm niet ziet!',
      initialRoundHint: 'Eerste Ronde: Voer een willekeurig geheim woord in',
      bridgeRoundHint: 'Ronde {round}: Voer het verbindingswoord in',
      thinkBridgeWord: 'Bedenk een woord dat beide verbindt:',
      inputSecretPlaceholder: 'Voer je geheime woord in...',
      inputBridgePlaceholder: 'Voer het verbindingswoord in...',
      confirmWord: 'Woord Bevestigen',
      mismatchTitle: 'De woorden komen nog niet overeen!',
      mismatchSub: 'Jullie voerden verschillende woorden in. Dit worden de doelwoorden voor de volgende ronde!',
      mismatchTargetHint: 'Doel voor Ronde {round}: Zoek een verbindingswoord',
      nextRoundBtn: 'Ga naar Ronde {round}',
      perfectMatchBadge: 'Perfecte Match!',
      victoryTitle: 'Gefeliciteerd! Jullie kozen hetzelfde woord 🎉',
      victoryMsg: 'Overeenkomend woord bereikt in',
      sharedWord: 'Gedeeld Overeenkomend Woord:',
      associationHistory: 'Woordassociatie Geschiedenis:',
      historyModalTitle: 'Geschiedenis van Huidige Ronde',
      helpModalTitle: 'Regels voor Hetzelfde Woord',
      rulesUnderstood: 'Begrepen!',
      ruleTarget: 'Hoofddoel: Zorg voor gedachtensynchronisatie om exact hetzelfde woord in te voeren.',
      rule1: '1️⃣ Ronde 1: Speler 1 voert een geheim woord in, daarna Speler 2.',
      rule2: '2️⃣ Volgende Rondes: De vorige twee woorden worden getoond en iedereen typt een verbindingswoord.',
      rule3: '3️⃣ Overwinning: Wanneer beide spelers in dezelfde ronde exact hetzelfde woord invoeren!'
    },
    'connect-four': {
      title: 'Vier op een rij 🔴🟡',
      desc: 'Laat gekleurde schijven vallen en maak 4 op een rij om te winnen!',
      guide: [
        'Tik op een kolom om je schijf erin te laten vallen.',
        'De eerste speler die 4 schijven horizontaal, verticaal of diagonaal verbindt, wint!',
        'Speel tegen een vriend op hetzelfde apparaat of daag de AI uit op Makkelijk, Gemiddeld of Moeilijk.'
      ],
      p1Wins: 'Speler 1 Wint! 🎉',
      p2Wins: 'Speler 2 Wint! 🎉',
      aiWins: 'AI Wint! 🤖',
      draw: 'Gelijkspel! 🤝',
      selectDifficulty: 'AI Niveau:',
      easy: 'Makkelijk 🟢',
      medium: 'Gemiddeld 🟡',
      hard: 'Moeilijk 🔴',
      easyDesc: 'Ontspannen spel voor beginners',
      mediumDesc: 'Sterke tegenstander die makkelijke kansen blokkeert',
      hardDesc: 'Onverslaanbare meester met dubbele dreigingsstrategie',
      p1Turn: 'Speler 1 aan de beurt (Geel)',
      p2Turn: 'Speler 2 aan de beurt (Roze)',
      aiTurn: 'AI denkt na...',
      aiThinking: 'Beste zet berekenen...',
      dropHere: 'Tik om te laten vallen',
      winsCount: 'Overwinningen',
      round: 'Ronde'
    },
    'bee-hive-defense': {
      title: 'Bijenkorf Verdediging 🐝',
      desc: 'Bescherm de gouden bijenkorf tegen de aanvallende bijen!',
      guide: [
        'Tik op bijen voordat ze de centrale korf bereiken.',
        'Elke uitgeschakelde bij levert +10 punten op.',
        'Als bijen de korf bereiken, daalt de gezondheid.'
      ],
      hiveHealth: 'Korf Gezondheid',
      score: 'Score',
      bestScore: 'Beste Score',
      wave: 'Golf',
      combo: 'Combo!',
      startGame: 'Start Verdediging',
      howToPlayTitle: 'Hoe Te Spelen',
      rule1: 'Tik op aanvallende bijen.',
      rule2: 'Elke geplette bij geeft +10 punten.',
      rule3: 'Bijen bij de korf veroorzaken schade.',
      rule4: 'Naverloop van tijd worden bijen sneller en talrijker.',
      rule5: 'Behaal de hoogst mogelijke score.',
      gameOverTitle: 'Bijenkorf Verwoest!',
      newHighScore: 'Nieuw Record! 🏆',
      beesSquished: 'Neergeslagen Bijen',
      waveReached: 'Hoogste Golf',
      waveUp: 'Snellere Aanval! 🐝',
      warning: 'Korf in Gevaar! ⚠️',
      newEnemyDiscovered: 'NIEUWE VIJAND ONTDEKT!',
      continue: 'Doorgaan',
      ready: 'KLAAR',
      go: 'START!',
      hitsRequired: 'Vereiste slagen',
      rewardLabel: 'Beloning',
      enemies: {
        speedy: {
          title: 'Blauwe Bij',
          description: 'Zeer snel',
          hits: '1',
          reward: '+10 Score'
        },
        fat: {
          title: 'Dikke Bij',
          description: 'Vereist twee tikken',
          hits: '2',
          reward: '+20 Score'
        },
        zigzag: {
          title: 'Zigzagbij',
          description: 'Beweegt in een zigzagpatroon',
          hits: '1',
          reward: '+10 Score'
        },
        queen: {
          title: 'Koninginbij',
          description: 'Machtige vijand',
          hits: '5',
          reward: '+100 Score'
        },
        golden: {
          title: 'Gouden Bij',
          description: 'Herstelt 10% van de korfgezondheid',
          hits: '1',
          reward: 'Herstel 10% gezondheid'
        }
      }
    }
  }
};
