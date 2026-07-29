import { Translations } from '../translations';

export const de: Translations = {
  appName: 'Sari Challenge',
  appSubtitle: 'Plattform für kompetitive Minispiele',
  createdBy: 'Created by Sari',
  version: 'Version 1.0',

  arabic: 'العربية',
  english: 'English',
  turkish: 'Türkçe',
  german: 'Deutsch',
  french: 'Français',
  korean: '한국어',
  dutch: 'Nederlands',
  spanish: 'Español',
  hindi: 'Hindi',
  chinese: 'Chinesisch',
  selectLanguageTitle: 'Sprache auswählen',
  selectLanguageSubtitle: 'Du kannst die Sprache jederzeit in den Einstellungen ändern',

  start: 'Start',
  startGame: 'Spiel starten',
  playAgain: 'Nochmal spielen',
  mainMenu: 'Hauptmenü',
  back: 'Zurück',
  settings: 'Einstellungen',
  about: 'Über die App',
  gameGuide: 'Spielanleitung',
  howToPlay: 'Spielanleitung',
  close: 'Schließen',
  next: 'Weiter',
  save: 'Speichern',
  reset: 'Zurücksetzen',
  dontShowAgain: 'Diese Erklärung nicht mehr anzeigen',
  finishGame: 'Spiel beenden',
  wins: 'Siege',
  bestTime: 'Beste Zeit',
  roundNew: 'Neue Runde',
  turnNow: 'Aktueller Zug',
  reached21Lost: 'Hat 21 erreicht (Verloren)',
  wonRound: 'Runde gewonnen! 🎉',
  watchAdForRetry: '🎁 Werbung ansehen für einen zusätzlichen Versuch',

  playSolo: 'Einzelspieler',
  playWithFriend: 'Mit Freund spielen',
  playVsAI: 'Gegen Computer',
  selectMode: 'Spielmodus wählen',
  selectModeSubtitle: 'Wähle einen Modus zum Starten',
  aiModeDesc: 'Gegen KI antreten (90% Schwierigkeit)',
  friendModeDesc: 'Fordere deinen Freund auf demselben Gerät heraus',
  soloModeDesc: 'Schlage deinen Rekord und erreiche höchste Präzision',
  friendTurnDesc: 'Abwechselndes Duell gegen deinen Freund',
  soloResultSubtitle: 'Einzelspieler-Ergebnis',
  versusResultSubtitle: 'Direktvergleich-Ergebnisse',

  player1Default: 'Spieler 1',
  player2Default: 'Spieler 2',
  computerName: 'Computer (KI)',
  player1Turn: 'Spieler 1 ist dran',
  player2Turn: 'Spieler 2 ist dran',
  computerTurn: 'Computer ist dran',
  winner: 'Gewinner!',
  draw: 'Unentschieden!',
  congratulations: 'Herzlichen Glückwunsch!',
  gameOver: 'Spiel vorbei',
  passDeviceTo: 'Gib das Gerät an',
  startPlayerTurn: 'Zug starten für',
  finishedTurn: 'hat den Zug beendet',

  score: 'Punktzahl',
  accuracy: 'Genauigkeit',
  time: 'Zeit',
  attempts: 'Versuche',
  bestScore: 'Persönlicher Rekord',
  targetTime: 'Zielzeit',
  actualTime: 'Tatsächliche Zeit',
  difference: 'Differenz',
  grade: 'Bewertung',
  level: 'Level',
  round: 'Runde',
  excellent: 'Ausgezeichnet! 🌟',
  veryGood: 'Sehr gut! 👏',
  good: 'Gut 👍',
  tryAgain: 'Nächster Versuch 🎯',

  soundEffects: 'Soundeffekte',
  vibration: 'Vibration',
  appLanguage: 'App-Sprache',
  player1NameLabel: 'Name Spieler 1',
  player2NameLabel: 'Name Spieler 2',
  resetNames: 'Standardnamen wiederherstellen',
  showPreGameInfo: 'Spielerklärung vor dem Start anzeigen',
  resetSettings: 'Alle Einstellungen zurücksetzen',

  games: {
    'perfect-hold': {
      title: 'Perfect Hold',
      desc: 'Testen Sie Ihr Zeitgefühl auf die Millisekunde genau',
      guide: [
        'Eine zufällige Zielzeit zwischen 1.00s und 60.00s wird angezeigt.',
        'Prägen Sie sich die Zeit gut ein, bevor sie verschwindet.',
        'Drücken Sie Start und spüren Sie das verstreichen der verdeckten Zeit.',
        'Drücken Sie Stopp, wenn Sie glauben, dass die Zeit abgelaufen ist.',
        'Wer am nächsten dran ist, gewinnt!'
      ],
      targetMsg: 'Zielzeit:',
      memorizeMsg: 'Zielzeit einprägen, sie wird gleich verdeckt!',
      stopWhenReady: 'Timer läuft verdeckt... Drücke STOPP, wenn bereit!',
      pressToStart: 'Start drücken für verdeckten Timer',
      stop: 'JETZT STOPP'
    },
    '21-game': {
      title: '21 Game',
      desc: 'Taktisches Zählspiel gegen einen Freund oder die KI',
      guide: [
        'Spieler zählen abwechselnd ab 1 hoch.',
        'In jedem Zug können 1, 2 oder 3 Zahlen genannt werden.',
        'Maximal 3 Zahlen pro Zug.',
        'Wer gezwungen ist 21 zu sagen, verliert sofort!'
      ],
      currentCount: 'Aktueller Stand:',
      say1: '1 Zahl sagen (+1)',
      say2: '2 Zahlen sagen (+2)',
      say3: '3 Zahlen sagen (+3)',
      forced21Lose: 'musste 21 sagen und hat verloren!'
    },
    'perfect-line': {
      title: 'Perfect Line',
      desc: 'Präzisionszeichnen basierend auf einer Referenzlinie',
      guide: [
        'Eine Referenzlinie erscheint für wenige Sekunden.',
        'Prägen Sie sich die Länge ein, bevor sie verschwindet.',
        'Zeichnen Sie mit dem Finger eine Linie gleicher Länge.',
        'Die App berechnet Längendifferenz und Genauigkeit.'
      ],
      refLineMsg: 'Prägen Sie sich die Referenzlänge ein:',
      drawNow: 'Zeichnen Sie eine Linie der gleichen Länge:',
      drawnLength: 'Ihre gezeichnete Länge:',
      targetLength: 'Ziellänge:',
      clearCanvas: 'Löschen'
    },
    'perfect-circle': {
      title: 'Perfect Circle',
      desc: 'Zeichnen Sie einen perfekten symmetrischen Kreis mit einem Strich',
      guide: [
        'Ein Leitkreis erscheint kurz zur Orientierung.',
        'Zeichnen Sie in einer durchgehenden Bewegung einen Kreis.',
        'Das System bewertet Rundheit und Gleichmäßigkeit.',
        'Der Höchstwert gewinnt!'
      ],
      refCircleMsg: 'Betrachten Sie den idealen Leitkreis:',
      drawCircleNow: 'Zeichnen Sie einen möglichst perfekten Kreis:',
      smoothness: 'Gleichmäßigkeit',
      circularity: 'Rundheit'
    },
    'memory-order': {
      title: 'Memory Order',
      desc: 'Visueller Gedächtnistest durch Merken von Leucht-Sequenzen',
      guide: [
        'Farbige Felder leuchten in einer bestimmten Reihenfolge auf.',
        'Beobachten Sie die Sequenz aufmerksam.',
        'Wiederholen Sie die Sequenz durch Antippen.',
        'Mit jedem Erfolg wird die Sequenz länger!'
      ],
      watchSequence: 'Sequenz aufmerksam beobachten...',
      repeatSequence: 'Du bist dran! Wiederhole das Muster:',
      correctSequence: 'Richtige Sequenz!',
      wrongSequence: 'Falsche Reihenfolge!'
    },
    'color-trap': {
      title: 'Color Trap',
      desc: 'Stroop-Effekt: Textinhalt vs. Tintenfarbe',
      guide: [
        'Farbwörter erscheinen in abweichenden Schriftfarben.',
        'WICHTIG: Tippen Sie auf die **SCHRIFTFARBE**, nicht das Wort!',
        'Beispiel: Das Wort "ROT" in BLAUER Schrift -> Tippe BLAU!',
        'Erfordert schnelle Reflexe und Konzentration.'
      ],
      clickInkColor: 'Tippe auf die SCHRIFTFARBE des Wortes:',
      red: 'Rot',
      blue: 'Blau',
      green: 'Grün',
      yellow: 'Gelb',
      purple: 'Violett',
      orange: 'Orange'
    },
    'code-break': {
      title: 'Code Break',
      desc: 'Knacken Sie den 4-stelligen Geheimcode mit Farbhinweisen',
      guide: [
        'Erraten Sie den 4-stelligen Geheimcode.',
        '🟢 Grün: Richtige Ziffer an richtiger Stelle.',
        '🔵 Blau: Richtige Ziffer an falscher Stelle.',
        '🔴 Rot: Ziffer kommt im Code nicht vor.',
        'Nutzen Sie vorherige Versuche, um den Code zu knacken.'
      ],
      legendGreen: '🟢 Richtige Ziffer & Position',
      legendBlue: '🔵 Richtige Ziffer, falsche Position',
      legendRed: '🔴 Ziffer nicht im Code',
      guessPlaceholder: '4 Ziffern eingeben...',
      submitGuess: 'Tipp abgeben',
      history: 'Verlauf der Versuche',
      codeCracked: 'Code erfolgreich geknackt! 🎉'
    },
    'copy-move': {
      title: 'Copy Move',
      desc: 'Pfeilrichtungen und Töne merken und nachzeichnen',
      guide: [
        'Pfeilrichtungen erscheinen einzeln mit Audiosignalen.',
        'Danach erscheint ein leeres Zeichenfeld.',
        'Wischen Sie in die entsprechende Richtung (Oben, Unten, Links, Rechts).',
        'Ein Fehler beendet die Runde!'
      ],
      watchArrows: 'Pfeile und Rhythmus einprägen:',
      drawOnPad: 'Wischgesten in Reihenfolge ausführen:',
      up: 'Oben ⬆️',
      down: 'Unten ⬇️',
      left: 'Links ⬅️',
      right: 'Rechts ➡️'
    },
    'missing-piece': {
      title: 'Missing Piece',
      desc: 'Schneller Gedächtnistest: Welches Element ist verschwunden?',
      guide: [
        'Bunte Elemente werden für 3 Sekunden angezeigt.',
        'Ein Element verschwindet und hinterlässt ein Fragezeichen (?).',
        'Erinnern Sie sich an das Element und fügen Sie es wieder ein.',
        'Die Anzahl der Elemente steigt von 4 auf 8.'
      ],
      memorizeItems: 'Alle Elemente einprägen, gleich verschwindet eins:',
      findMissing: 'Welches Element fehlt an der leeren Stelle?',
      dropHere: 'Element hier platzieren'
    },
    'wrong-answer': {
      title: 'Wrong Answer',
      desc: 'Reaktionsspiel: Wählen Sie bewusst die FALSCHE Antwort!',
      guide: [
        'Eine einfache Frage mit nur 2 Antwortmöglichkeiten erscheint.',
        'Ziel ist es NICHT die richtige Antwort zu wählen, sondern die FALSCHE!',
        'Du hast nur 3 Sekunden pro Frage!',
        'Logisch richtige Antworten oder Zeitablauf führen zum Verlust.'
      ],
      chooseWrong: 'Tippe bewusst die FALSCHE Antwort an!',
      timeLeft: 'Verbleibende Zeit',
      avgTime: 'Durschnittliche Antwortzeit'
    },
    'number-rush': {
      title: 'Number Rush',
      desc: 'Tippen Sie die Zahlen von 1 bis 25 der Reihe nach an',
      guide: [
        'Ein 5x5 Feld zeigt zufällig angeordnete Zahlen von 1 bis 25.',
        'Tippe die Zahlen in Reihenfolge an: 1 -> 2 -> 3 bis 25.',
        'Die Zeit startet bei 1 und stoppt bei 25.',
        'Vermeide Fehler für die beste Zeit!'
      ],
      nextNumber: 'Nächste Zielzahl',
      currentNumber: 'Aktuelle Zahl',
      rankLegendary: '👑 Legendär',
      rankGold: '🥇 Gold',
      rankSilver: '🥈 Silber',
      rankBronze: '🥉 Bronze',
      timeDifference: 'Differenz zur Bestzeit',
      tapToStart: 'Tippe auf Zahl (1) zum Starten!',
      tapInOrder: 'Tippe die Zahlen von 1 bis 25 so schnell wie möglich in Reihenfolge!'
    },
    'tic-tac-toe': {
      title: 'Tic-Tac-Toe XO',
      desc: 'Klassisches XO-Spiel gegen KI (90% Schwer) oder einen Freund',
      guide: [
        'Setzen Sie abwechselnd Ihr Symbol (X oder O) in das 3x3 Feld.',
        'Bilden Sie eine Dreierreihe waagerecht, senkrecht oder diagonal.',
        'Gegen den Computer spielt die KI auf hohem Niveau (90% Schwer)!',
        'Nutzen Sie Taktik zum Sieg oder zum Blockieren des Gegners.'
      ],
      playerX: 'Spieler X',
      playerO: 'Spieler O',
      aiTurn: 'Computer denkt nach...',
      yourTurn: 'Du bist dran!',
      xWins: 'X gewinnt! 🎉',
      oWins: 'O gewinnt! 🎉',
      draw: 'Unentschieden! 🤝',
      difficulty: 'Schwierigkeit',
      hardAI: 'Super KI (90%)',
      score: 'Punkte',
      round: 'Runde'
    },
    'same-word': {
      title: 'Gleiches Wort 🗣️',
      desc: 'Lustiges Wortassoziationsspiel für zwei Spieler an einem Gerät!',
      guide: [
        'Runde 1: Jeder Spieler gibt verdeckt ein geheimes Wort ein.',
        'Beide Wörter werden nebeneinander auf dem Bildschirm gezeigt.',
        'Folgerunden: Gib ein Brückenwort ein, das beide Begriffe verbindet.',
        'Geben beide genau das GLEICHE Wort ein -> Sieg! 🎉'
      ],
      quickHowToPlay: '💡 Schnellanleitung:',
      step1: 'Runde 1: Jeder Spieler gibt ein geheimes Wort ein.',
      step2: 'Beide Wörter werden gezeigt, dann gibt jeder ein Brückenwort ein.',
      step3: 'Geben beide genau das GLEICHE Wort ein ← SIEG! 🎉',
      targetWordsNextRound: 'Zielwörter für die nächste Runde:',
      readyToStart: 'Ich bin bereit (Tippen zum Starten)',
      privacyNotice: 'Stelle sicher, dass der andere Spieler den Bildschirm nicht sieht!',
      initialRoundHint: 'Startrunde: Gib ein beliebiges Wort ein',
      bridgeRoundHint: 'Runde {round}: Gib das Brückenwort ein',
      thinkBridgeWord: 'Denke an ein Wort, das beide verbindet:',
      inputSecretPlaceholder: 'Gib dein geheimes Wort ein...',
      inputBridgePlaceholder: 'Gib das Brückenwort ein...',
      confirmWord: 'Wort bestätigen',
      mismatchTitle: 'Wörter stimmen noch nicht überein!',
      mismatchSub: 'Ihr habt verschiedene Wörter eingegeben. Sie werden die Zielwörter für die nächste Runde!',
      mismatchTargetHint: 'Ziel für Runde {round}: Finde ein verbindendes Wort',
      nextRoundBtn: 'Weiter zu Runde {round}',
      perfectMatchBadge: 'Perfekte Übereinstimmung!',
      victoryTitle: 'Glückwunsch! Ihr habt dasselbe Wort getroffen 🎉',
      victoryMsg: 'Übereinstimmendes Wort erreicht in',
      sharedWord: 'Gemeinsames Wort:',
      associationHistory: 'Wortassoziations-Verlauf:',
      historyModalTitle: 'Aktueller Rundenverlauf',
      helpModalTitle: 'Regeln für Gleiches Wort',
      rulesUnderstood: 'Verstanden!',
      ruleTarget: 'Hauptziel: Gleicher Gedankengang mit deinem Partner, um exakt dasselbe Wort einzugeben.',
      rule1: '1️⃣ Runde 1: Spieler 1 gibt ein geheimes Wort ein, dann Spieler 2.',
      rule2: '2️⃣ Folgerunden: Die vorherigen zwei Wörter werden angezeigt und jeder gibt ein Brückenwort ein.',
      rule3: '3️⃣ Sieg: Wenn beide Spieler in derselben Runde exakt dasselbe Wort eingeben!'
    },
    'connect-four': {
      title: '4 gewinnt 🔴🟡',
      desc: 'Werfe abwechselnd farbige Chips ein und verbinde 4 in einer Reihe!',
      guide: [
        'Klicke auf eine Spalte, um deinen Chip einzuwerfen.',
        'Wer zuerst 4 Chips waagerecht, senkrecht oder diagonal verbindet, gewinnt!',
        'Spiele gegen einen Freund oder fordere die KI auf Leicht, Mittel oder Schwer heraus.'
      ],
      p1Wins: 'Spieler 1 gewinnt! 🎉',
      p2Wins: 'Spieler 2 gewinnt! 🎉',
      aiWins: 'KI gewinnt! 🤖',
      draw: 'Unentschieden! 🤝',
      selectDifficulty: 'KI-Schwierigkeit:',
      easy: 'Einfach 🟢',
      medium: 'Mittel 🟡',
      hard: 'Sehr Schwer 🔴',
      easyDesc: 'Entspanntes Spiel für Anfänger',
      mediumDesc: 'Starker Gegner, der einfache Siege blockiert',
      hardDesc: 'Unschlagbar mit Doppelbedrohungs-Strategie',
      p1Turn: 'Spieler 1 am Zug (Gelb)',
      p2Turn: 'Spieler 2 am Zug (Pink)',
      aiTurn: 'KI überlegt...',
      aiThinking: 'Berechne den besten Zug...',
      dropHere: 'Klicken zum Einwerfen',
      winsCount: 'Siege',
      round: 'Runde'
    },
    'bee-hive-defense': {
      title: 'Bienenstock-Verteidigung 🐝',
      desc: 'Schütze den goldenen Bienenstock vor den angreifenden Bienen!',
      guide: [
        'Tippe auf Bienen, bevor sie den Bienenstock erreichen.',
        'Jede erledigte Biene bringt +10 Punkte.',
        'Wenn Bienen den Stock erreichen, sinkt die Gesundheit.'
      ],
      hiveHealth: 'Stock-Gesundheit',
      score: 'Punkte',
      bestScore: 'Rekord',
      wave: 'Welle',
      combo: 'Kombination!',
      startGame: 'Verteidigung starten',
      howToPlayTitle: 'Spielanleitung',
      rule1: 'Tippe auf herannahende Bienen.',
      rule2: 'Jede zerquetschte Biene gibt +10 Punkte.',
      rule3: 'Bienen am Stock verursachen Schaden.',
      rule4: 'Im Laufe der Zeit werden die Bienen schneller und zahlreicher.',
      rule5: 'Erreiche den höchsten Rekord.',
      gameOverTitle: 'Bienenstock zerstört!',
      newHighScore: 'Neuer Rekord! 🏆',
      beesSquished: 'Erledigte Bienen',
      waveReached: 'Höchste Welle',
      waveUp: 'Schnellere Welle! 🐝',
      warning: 'Stock unter Angriff! ⚠️',
      newEnemyDiscovered: 'NEUER FEIND ENTDECKT!',
      continue: 'Weiter',
      ready: 'BEREIT',
      go: 'LOS!',
      hitsRequired: 'Treffer erforderlich',
      rewardLabel: 'Belohnung',
      enemies: {
        speedy: {
          title: 'Blaue Biene',
          description: 'Sehr schnell',
          hits: '1',
          reward: '+10 Punkte'
        },
        fat: {
          title: 'Dicke Biene',
          description: 'Benötigt zwei Tippen',
          hits: '2',
          reward: '+20 Punkte'
        },
        zigzag: {
          title: 'Zickzack-Biene',
          description: 'Bewegt sich im Zickzack',
          hits: '1',
          reward: '+10 Punkte'
        },
        queen: {
          title: 'Bienenkönigin',
          description: 'Mächtiger Feind',
          hits: '5',
          reward: '+100 Punkte'
        },
        golden: {
          title: 'Goldene Biene',
          description: 'Stellt 10 % Bienenstock-Gesundheit wieder her',
          hits: '1',
          reward: '10 % Gesundheit wiederherstellen'
        }
      }
    }
  }
};
