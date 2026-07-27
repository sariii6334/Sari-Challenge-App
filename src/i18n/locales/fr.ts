import { Translations } from '../translations';

export const fr: Translations = {
  appName: 'Sari Challenge',
  appSubtitle: 'Plateforme de Mini-Jeux Compétitifs',
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
  selectLanguageTitle: 'Choisir la Langue',
  selectLanguageSubtitle: 'Vous pouvez changer de langue à tout moment dans les paramètres',

  start: 'Commencer',
  startGame: 'Lancer le Jeu',
  playAgain: 'Rejouer',
  mainMenu: 'Menu Principal',
  back: 'Retour',
  settings: 'Paramètres',
  about: 'À Propos',
  gameGuide: 'Guide des Jeux',
  howToPlay: 'Règles du jeu',
  close: 'Fermer',
  next: 'Suivant',
  save: 'Enregistrer',
  reset: 'Réinitialiser',
  dontShowAgain: 'Ne plus afficher cette explication',
  finishGame: 'Terminer la partie',
  wins: 'Victoires',
  bestTime: 'Meilleur Temps',
  roundNew: 'Nouvelle Manche',
  turnNow: 'Tour actuel',
  reached21Lost: 'A atteint 21 (Perdu)',
  wonRound: 'A gagné la manche ! 🎉',

  playSolo: 'Jouer Solo',
  playWithFriend: 'Jouer avec un Ami',
  playVsAI: 'Jouer contre l\'IA',
  selectMode: 'Choisir le Mode',
  selectModeSubtitle: 'Choisissez un mode de jeu pour démarrer',
  aiModeDesc: 'Défiez l\'IA (Difficulté 90%)',
  friendModeDesc: 'Affrontez un ami sur le même appareil',
  soloModeDesc: 'Battez votre record personnel et visez la précision',
  friendTurnDesc: 'Duel au tour par tour contre votre ami',
  soloResultSubtitle: 'Résultat du Défi Solo',
  versusResultSubtitle: 'Résultats du Face-à-Face',

  player1Default: 'Joueur 1',
  player2Default: 'Joueur 2',
  computerName: 'Ordinateur (IA)',
  player1Turn: 'Tour du Joueur 1',
  player2Turn: 'Tour du Joueur 2',
  computerTurn: 'Tour de l\'Ordinateur',
  winner: 'Gagnant !',
  draw: 'Égalité !',
  congratulations: 'Félicitations !',
  gameOver: 'Fin de partie',
  passDeviceTo: 'Passez l\'appareil à',
  startPlayerTurn: 'Démarrer le tour de',
  finishedTurn: 'a terminé son tour',

  score: 'Score',
  accuracy: 'Précision',
  time: 'Temps',
  attempts: 'Essais',
  bestScore: 'Meilleur Score',
  targetTime: 'Temps Cible',
  actualTime: 'Temps Réel',
  difference: 'Différence',
  grade: 'Note',
  level: 'Niveau',
  round: 'Manche',
  excellent: 'Excellent ! 🌟',
  veryGood: 'Très Bien ! 👏',
  good: 'Bien 👍',
  tryAgain: 'Réessayer 🎯',

  soundEffects: 'Effets Sonores',
  vibration: 'Vibration',
  appLanguage: 'Langue de l\'App',
  player1NameLabel: 'Nom Joueur 1',
  player2NameLabel: 'Nom Joueur 2',
  resetNames: 'Noms par défaut',
  showPreGameInfo: 'Afficher les explications avant de jouer',
  resetSettings: 'Réinitialiser tous les paramètres',

  games: {
    'perfect-hold': {
      title: 'Perfect Hold',
      desc: 'Testez votre sens du temps au millième de seconde près',
      guide: [
        'Un temps cible aléatoire entre 1.00s et 60.00s est généré.',
        'Mémorisez bien le temps avant qu\'il ne disparaisse.',
        'Appuyez sur Démarrer et ressentez le temps qui s\'écoule à l\'aveugle.',
        'Appuyez sur STOP quand vous pensez que le temps est écoulé.',
        'Le plus proche du temps cible gagne !'
      ],
      targetMsg: 'Temps Cible :',
      memorizeMsg: 'Mémorisez ce temps, il va se masquer !',
      stopWhenReady: 'Chrono silencieux en cours... Appuyez sur STOP quand vous êtes prêt !',
      pressToStart: 'Appuyez sur Démarrer pour lancer le chrono',
      stop: 'STOP MAINTENANT'
    },
    '21-game': {
      title: '21 Game',
      desc: 'Bataille de comptage tactique contre un ami ou l\'IA',
      guide: [
        'Les joueurs comptent à tour de rôle en partant de 1.',
        'À votre tour, dites 1, 2 ou 3 nombres consécutifs.',
        'Maximum 3 nombres par tour.',
        'Le joueur forcé de dire 21 perd immédiatement !'
      ],
      currentCount: 'Compte Actuel :',
      say1: 'Dire 1 nombre (+1)',
      say2: 'Dire 2 nombres (+2)',
      say3: 'Dire 3 nombres (+3)',
      forced21Lose: 'a été forcé de dire 21 et a perdu !'
    },
    'perfect-line': {
      title: 'Perfect Line',
      desc: 'Dessin de précision correspondant à une ligne de référence',
      guide: [
        'Une ligne horizontale de référence apparaît quelques secondes.',
        'Mémorisez sa longueur exacte avant qu\'elle ne disparaisse.',
        'Tracez une ligne avec le doigt de la même longueur.',
        'L\'application calcule la différence et le score de précision.'
      ],
      refLineMsg: 'Mémorisez la longueur de cette ligne :',
      drawNow: 'Tracez une ligne de la même longueur :',
      drawnLength: 'Longueur tracée :',
      targetLength: 'Longueur cible :',
      clearCanvas: 'Effacer'
    },
    'perfect-circle': {
      title: 'Perfect Circle',
      desc: 'Tracez un cercle parfait et symétrique d\'un seul trait',
      guide: [
        'Un cercle de guidage apparaît brièvement.',
        'Tracez un cercle complet d\'un mouvement continu.',
        'Le système évalue la circularité et la régularité.',
        'Le meilleur score remporte la partie !'
      ],
      refCircleMsg: 'Observez le cercle de référence :',
      drawCircleNow: 'Tracez un cercle aussi parfait que possible :',
      smoothness: 'Régularité',
      circularity: 'Circularité'
    },
    'memory-order': {
      title: 'Memory Order',
      desc: 'Test de mémoire visuelle sur des séquences lumineuses',
      guide: [
        'Des cases colorées s\'allument dans un ordre précis.',
        'Observez attentivement la séquence.',
        'Répétez la séquence en appuyant sur les cases.',
        'La séquence s\'allonge à chaque niveau réussi !'
      ],
      watchSequence: 'Observez attentivement la séquence...',
      repeatSequence: 'À vous ! Répétez le motif :',
      correctSequence: 'Séquence correcte !',
      wrongSequence: 'Mauvais ordre !'
    },
    'color-trap': {
      title: 'Color Trap',
      desc: 'Piège de l\'effet Stroop : couleur de l\'encre vs texte',
      guide: [
        'Des mots de couleurs apparaissent écrits avec une encre différente.',
        'IMPORTANT : Appuyez sur la **COULEUR DE L\'ENCRE**, pas le mot écrits !',
        'Exemple : Le mot "ROUGE" écrit en BLEU -> appuyez sur BLEU !',
        'Nécessite des réflexes et de la concentration.'
      ],
      clickInkColor: 'Appuyez sur la COULEUR DE L\'ENCRE du texte :',
      red: 'Rouge',
      blue: 'Bleu',
      green: 'Vert',
      yellow: 'Jaune',
      purple: 'Violet',
      orange: 'Orange'
    },
    'code-break': {
      title: 'Code Break',
      desc: 'Décryptez le code secret à 4 chiffres avec les indices de couleur',
      guide: [
        'Devinez le code secret à 4 chiffres.',
        '🟢 Vert : Chiffre correct et bien placé.',
        '🔵 Bleu : Chiffre correct mais mal placé.',
        '🔴 Rouge : Chiffre non présent dans le code.',
        'Utilisez l\'historique pour trouver en un minimum d\'essais.'
      ],
      legendGreen: '🟢 Chiffre correct & bien placé',
      legendBlue: '🔵 Chiffre correct, mal placé',
      legendRed: '🔴 Chiffre absent du code',
      guessPlaceholder: 'Entrez 4 chiffres...',
      submitGuess: 'Valider l\'essai',
      history: 'Historique des essais',
      codeCracked: 'Code secret décrypté avec succès ! 🎉'
    },
    'copy-move': {
      title: 'Copy Move',
      desc: 'Mémorisez le sens des flèches et reproduisez-les',
      guide: [
        'Les flèches apparaissent une à une avec des signaux sonores.',
        'Un bloc-notes blanc apparaît ensuite.',
        'Glissez votre doigt (Haut, Bas, Gauche, Droite) pour dessiner.',
        'Une erreur met fin au tour !'
      ],
      watchArrows: 'Mémorisez le mouvement des flèches :',
      drawOnPad: 'Faites glisser les gestes dans l\'ordre :',
      up: 'Haut ⬆️',
      down: 'Bas ⬇️',
      left: 'Gauche ⬅️',
      right: 'Droite ➡️'
    },
    'missing-piece': {
      title: 'Missing Piece',
      desc: 'Jeu de mémoire rapide : trouvez l\'objet qui a disparu',
      guide: [
        'Des objets colorés s\'affichent pendant 3 secondes.',
        'Un objet disparaît en laissant un emplacement vide (?).',
        'Rappelez-vous de l\'objet et replacez-le.',
        'Le nombre d\'objets augmente de 4 à 8.'
      ],
      memorizeItems: 'Mémorisez les objets, un va disparaître :',
      findMissing: 'Quel objet manque dans la case vide ?',
      dropHere: 'Déposer l\'objet ici'
    },
    'wrong-answer': {
      title: 'Wrong Answer',
      desc: 'Jeu de rapidité : vous devez choisir la MAUVAISE réponse !',
      guide: [
        'Une question simple apparaît avec 2 choix.',
        'Votre but est de choisir volontairement la MAUVAISE réponse !',
        'Vous n\'avez que 3 secondes par question !',
        'Choisir la bonne réponse ou laisser le temps s\'écouler entraîne la défaite.'
      ],
      chooseWrong: 'Appuyez volontairement sur la MAUVAISE réponse !',
      timeLeft: 'Temps Restant',
      avgTime: 'Temps Moyen de Réponse'
    },
    'number-rush': {
      title: 'Number Rush',
      desc: 'Touchez les nombres de 1 à 25 dans l\'ordre séquentiel',
      guide: [
        'Une grille 5x5 affiche les nombres de 1 à 25 mélangés.',
        'Touchez les nombres dans l\'ordre : 1 -> 2 -> 3 jusqu\'à 25.',
        'Le chrono démarre à 1 et s\'arrête à 25.',
        'Évitez les erreurs pour faire le meilleur temps !'
      ],
      nextNumber: 'Prochain Nombre',
      currentNumber: 'Nombre Actuel',
      rankLegendary: '👑 Légendaire',
      rankGold: '🥇 Or',
      rankSilver: '🥈 Argent',
      rankBronze: '🥉 Bronze',
      timeDifference: 'Écart avec le meilleur temps',
      tapToStart: 'Appuyez sur le chiffre (1) pour commencer !',
      tapInOrder: 'Appuyez sur les chiffres de 1 à 25 dans l’ordre le plus vite possible !'
    },
    'tic-tac-toe': {
      title: 'Morpion Tic-Tac-Toe',
      desc: 'Jeu classique du Morpion contre l\'IA (Mode Difficile 90%) ou un ami',
      guide: [
        'Placez tour à tour votre symbole (X ou O) dans la grille 3x3.',
        'Alignez 3 symboles identiques horizontalement, verticalement ou en diagonale.',
        'Contre l\'ordinateur, l\'IA joue au niveau expert (90% Difficile) !',
        'Faites preuve de stratégie pour l\'emporter ou bloquer l\'adversaire.'
      ],
      playerX: 'Joueur X',
      playerO: 'Joueur O',
      aiTurn: 'L\'ordinateur réfléchit...',
      yourTurn: 'À vous de jouer !',
      xWins: 'X a gagné ! 🎉',
      oWins: 'O a gagné ! 🎉',
      draw: 'Match nul ! 🤝',
      difficulty: 'Difficulté',
      hardAI: 'Super IA (90%)',
      score: 'Score',
      round: 'Manche'
    },
    'same-word': {
      title: 'Même Mot 🗣️',
      desc: 'Jeu d\'association de mots amusant à jouer à deux sur un seul appareil !',
      guide: [
        'Manche 1 : Chaque joueur entre un mot secret sans que l\'autre ne regarde.',
        'Les deux mots s\'affichent côte à côte à l\'écran.',
        'Manches suivantes : Proposez un mot qui fait le lien entre les deux.',
        'Lorsque les deux joueurs proposent le MÊME mot -> Victoire ! 🎉'
      ],
      quickHowToPlay: '💡 Règle Rapide :',
      step1: 'Manche 1 : Chaque joueur saisit un mot secret au hasard.',
      step2: 'Les deux mots apparaissent, puis chacun entre un mot de liaison.',
      step3: 'Si vous entrez EXACTEMENT le même mot ← VICTOIRE ! 🎉',
      targetWordsNextRound: 'Mots cibles pour la prochaine manche :',
      readyToStart: 'Je suis prêt (Appuyer pour commencer)',
      privacyNotice: 'Assurez-vous que l’autre joueur ne regarde pas l’écran !',
      initialRoundHint: 'Manche Initiale : Entrez un mot secret',
      bridgeRoundHint: 'Manche {round} : Entrez le mot de liaison',
      thinkBridgeWord: 'Pensez à un mot qui relie :',
      inputSecretPlaceholder: 'Saisissez votre mot secret...',
      inputBridgePlaceholder: 'Saisissez le mot de liaison...',
      confirmWord: 'Confirmer le mot',
      mismatchTitle: 'Les mots ne correspondent pas encore !',
      mismatchSub: 'Vous avez entré des mots différents. Ils deviennent les mots cibles de la manche suivante !',
      mismatchTargetHint: 'Objectif Manche {round} : Trouvez un mot reliant',
      nextRoundBtn: 'Passer à la manche {round}',
      perfectMatchBadge: 'Correspondance Parfaite !',
      victoryTitle: 'Bravo ! Vous avez trouvé le même mot 🎉',
      victoryMsg: 'Mot identique trouvé en',
      sharedWord: 'Mot Commun Identique :',
      associationHistory: 'Historique de l’Association :',
      historyModalTitle: 'Historique des Manches',
      helpModalTitle: 'Règles du jeu Même Mot',
      rulesUnderstood: 'Compris !',
      ruleTarget: 'Objectif : Atteindre une synchronisation d’esprit pour saisir exactement le même mot.',
      rule1: '1️⃣ Manche 1 : Le Joueur 1 saisit un mot secret, puis le Joueur 2 saisit un mot secret.',
      rule2: '2️⃣ Manches Suivantes : Les deux mots précédents sont affichés et chacun propose un mot de liaison.',
      rule3: '3️⃣ Victoire : Lorsque les deux joueurs saisissent exactement le même mot au même tour !'
    },
    'connect-four': {
      title: 'Puissance 4 🔴🟡',
      desc: 'Lâchez les jetons colorés et alignez-en 4 pour gagner !',
      guide: [
        'Touchez une colonne pour y laisser tomber votre jeton.',
        'Le premier joueur à aligner 4 jetons (horizontal, vertical ou diagonal) gagne !',
        'Jouez contre un ami sur le même appareil ou défiez l\'IA (Facile, Moyen, Difficile).'
      ],
      p1Wins: 'Joueur 1 gagne ! 🎉',
      p2Wins: 'Joueur 2 gagne ! 🎉',
      aiWins: 'L\'IA gagne ! 🤖',
      draw: 'Match nul ! 🤝',
      selectDifficulty: 'Niveau de l\'IA :',
      easy: 'Facile 🟢',
      medium: 'Moyen 🟡',
      hard: 'Très Difficile 🔴',
      easyDesc: 'Partie relaxante pour débutants',
      mediumDesc: 'Adversaire solide qui bloque les victoires faciles',
      hardDesc: 'IA imbattable planifiant des doubles menaces',
      p1Turn: 'Tour du Joueur 1 (Jaune)',
      p2Turn: 'Tour du Joueur 2 (Rose)',
      aiTurn: 'L\'IA réfléchit...',
      aiThinking: 'Calcul du meilleur coup...',
      dropHere: 'Appuyez pour lâcher',
      winsCount: 'Victoires',
      round: 'Manche'
    },
    'bee-hive-defense': {
      title: 'Défense de la Ruche 🐝',
      desc: 'Protégez la ruche dorée contre les essaims d\'abeilles en attaque !',
      guide: [
        'Touchez les abeilles avant qu\'elles n\'atteignent la ruche au centre.',
        'Chaque abeille écrasée rapporte +10 points.',
        'Si une abeille atteint la ruche, la santé diminue. Fin de partie à 0.'
      ],
      hiveHealth: 'Santé de la Ruche',
      score: 'Score',
      bestScore: 'Meilleur Score',
      wave: 'Vague',
      combo: 'Combo !',
      startGame: 'Lancer la Défense',
      howToPlayTitle: 'Comment Jouer',
      rule1: 'Touchez les abeilles attaquantes.',
      rule2: 'Chaque abeille éliminée donne +10 points.',
      rule3: 'Les abeilles atteignant la ruche lui infligent des dégâts.',
      rule4: 'Au fil du temps, les abeilles deviennent plus rapides et nombreuses.',
      rule5: 'Obtenez le meilleur score possible.',
      gameOverTitle: 'Ruche Détruite !',
      newHighScore: 'Nouveau Record ! 🏆',
      beesSquished: 'Abeilles Éliminées',
      waveReached: 'Vague Max',
      waveUp: 'Attaque Plus Rapide ! 🐝',
      warning: 'Ruche en Danger ! ⚠️',
      newEnemyDiscovered: 'NOUVEL ENNEMI DÉCOUVERT !',
      continue: 'Continuer',
      ready: 'PRÊT',
      go: 'PARTEZ !',
      hitsRequired: 'Coups requis',
      rewardLabel: 'Récompense',
      enemies: {
        speedy: {
          title: 'Abeille Bleue',
          description: 'Très rapide',
          hits: '1',
          reward: '+10 Score'
        },
        fat: {
          title: 'Grosse Abeille',
          description: 'Nécessite deux tapotements',
          hits: '2',
          reward: '+20 Score'
        },
        zigzag: {
          title: 'Abeille Zigzag',
          description: 'Se déplace en zigzag',
          hits: '1',
          reward: '+10 Score'
        },
        queen: {
          title: 'Abeille Reine',
          description: 'Ennemi puissant',
          hits: '5',
          reward: '+100 Score'
        },
        golden: {
          title: 'Abeille Dorée',
          description: 'Restaure 10 % de la santé de la ruche',
          hits: '1',
          reward: 'Restaure 10 % de la santé'
        }
      }
    }
  }
};
