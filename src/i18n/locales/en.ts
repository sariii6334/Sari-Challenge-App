import { Translations } from '../translations';

export const en: Translations = {
  appName: 'Sari Challenge',
  appSubtitle: 'Competitive Mini-Games Platform',
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
  chinese: 'Chinese',
  selectLanguageTitle: 'Select App Language',
  selectLanguageSubtitle: 'You can change language anytime from settings',

  start: 'Start',
  startGame: 'Start Game',
  playAgain: 'Play Again',
  mainMenu: 'Main Menu',
  back: 'Back',
  settings: 'Settings',
  about: 'About App',
  gameGuide: 'Game Guide',
  howToPlay: 'How to Play',
  close: 'Close',
  next: 'Next',
  save: 'Save',
  reset: 'Reset',
  dontShowAgain: "Don't show this explanation again",
  finishGame: 'Finish Game',
  wins: 'Wins',
  bestTime: 'Best Time',
  roundNew: 'New Round',
  turnNow: 'Current Turn',
  reached21Lost: 'Reached 21 (Lost)',
  wonRound: 'Won the round! 🎉',
  watchAdForRetry: '🎁 Watch an ad for an extra try',

  playSolo: 'Play Solo',
  playWithFriend: 'Play with Friend',
  playVsAI: 'Play vs Computer',
  selectMode: 'Select Game Mode',
  selectModeSubtitle: 'Choose challenge mode to start',
  aiModeDesc: 'Challenge AI (90% Difficulty)',
  friendModeDesc: 'Compete with a friend on the same device',
  soloModeDesc: 'Beat your personal best & reach top accuracy',
  friendTurnDesc: 'Turn-based head-to-head battle',
  soloResultSubtitle: 'Solo Challenge Result',
  versusResultSubtitle: 'Head-to-Head Results',

  player1Default: 'Player 1',
  player2Default: 'Player 2',
  computerName: 'Computer (Smart AI)',
  player1Turn: "Player 1's Turn",
  player2Turn: "Player 2's Turn",
  computerTurn: "Computer's Turn",
  winner: 'Winner!',
  draw: 'Draw!',
  congratulations: 'Congratulations!',
  gameOver: 'Game Over',
  passDeviceTo: 'Pass device to',
  startPlayerTurn: 'Start turn for',
  finishedTurn: 'finished their turn',

  score: 'Score',
  accuracy: 'Accuracy',
  time: 'Time',
  attempts: 'Attempts',
  bestScore: 'Personal Best',
  targetTime: 'Target Time',
  actualTime: 'Actual Time',
  difference: 'Difference',
  grade: 'Rating',
  level: 'Level',
  round: 'Round',
  excellent: 'Excellent! 🌟',
  veryGood: 'Very Good! 👏',
  good: 'Good 👍',
  tryAgain: 'Try Again 🎯',

  soundEffects: 'Sound Effects',
  vibration: 'Vibration',
  appLanguage: 'App Language',
  player1NameLabel: 'Player 1 Name',
  player2NameLabel: 'Player 2 Name',
  resetNames: 'Reset Default Names',
  showPreGameInfo: 'Show game explanation before starting',
  resetSettings: 'Reset All Settings',

  games: {
    'perfect-hold': {
      title: 'Perfect Hold',
      desc: 'Internal time sense challenge accurate to sub-seconds',
      guide: [
        'A random target time between 1.00s and 60.00s is generated.',
        'Memorize the target time carefully before it disappears.',
        'When hidden, press Start and sense the silent passage of time.',
        'Press Stop when you feel the exact time has elapsed without a visual counter.',
        'Closest time to the target wins!'
      ],
      targetMsg: 'Target Time:',
      memorizeMsg: 'Memorize this target time, it will hide now!',
      stopWhenReady: 'Timer running silently... Press Stop when ready!',
      pressToStart: 'Press Start to begin silent timer',
      stop: 'STOP NOW'
    },
    '21-game': {
      title: '21 Game',
      desc: 'Tactical counting battle against a friend or smart AI',
      guide: [
        'Players take turns counting up starting from 1.',
        'On your turn, say 1, 2, or 3 consecutive numbers.',
        'You cannot choose more than 3 numbers per turn.',
        'The player forced to say the number 21 loses immediately!'
      ],
      currentCount: 'Current Count:',
      say1: 'Say 1 number (+1)',
      say2: 'Say 2 numbers (+2)',
      say3: 'Say 3 numbers (+3)',
      forced21Lose: 'was forced to say 21 and lost!'
    },
    'perfect-line': {
      title: 'Perfect Line',
      desc: 'Precision drawing test matching reference line lengths',
      guide: [
        'A reference horizontal line appears for a few seconds.',
        'Memorize its exact length before it disappears.',
        'Draw a single line with your finger matching the target length.',
        'App calculates exact length difference and accuracy score.'
      ],
      refLineMsg: 'Memorize this reference line length:',
      drawNow: 'Draw a single line matching the reference length:',
      drawnLength: 'Your Drawn Length:',
      targetLength: 'Target Length:',
      clearCanvas: 'Clear Drawing'
    },
    'perfect-circle': {
      title: 'Perfect Circle',
      desc: 'Draw a smooth, perfectly symmetrical circle in one touch',
      guide: [
        'A guide circle appears briefly for reference.',
        'Draw a complete single continuous circle with your finger.',
        'The system evaluates circularity, smoothness, and closure.',
        'Highest circular accuracy score wins!'
      ],
      refCircleMsg: 'Observe the perfect guide circle:',
      drawCircleNow: 'Draw a complete smooth circle:',
      smoothness: 'Smoothness',
      circularity: 'Circularity'
    },
    'memory-order': {
      title: 'Memory Order',
      desc: 'Visual memory sequence test following glowing pad patterns',
      guide: [
        'Colored pads light up in a specific visual sequence.',
        'Watch carefully and memorize the order.',
        'Repeat the sequence by tapping pads in exact same order.',
        'Sequence length increases with each successful level!'
      ],
      watchSequence: 'Watch the sequence carefully...',
      repeatSequence: 'Your turn! Repeat the pattern:',
      correctSequence: 'Correct sequence!',
      wrongSequence: 'Wrong order!'
    },
    'color-trap': {
      title: 'Color Trap',
      desc: 'Stroop effect cognitive trap balancing word text vs ink color',
      guide: [
        'Color words appear written in mismatched ink colors.',
        'IMPORTANT: Tap the **INK COLOR**, NOT the written word meaning!',
        'Example: The word "RED" written in BLUE ink -> tap BLUE!',
        'Requires fast optical focus and quick decisions.'
      ],
      clickInkColor: 'Tap the INK COLOR of the text:',
      red: 'Red',
      blue: 'Blue',
      green: 'Green',
      yellow: 'Yellow',
      purple: 'Purple',
      orange: 'Orange'
    },
    'code-break': {
      title: 'Code Break',
      desc: 'Decipher the 4-digit secret code using color clue indicators',
      guide: [
        'Guess the 4-digit secret code.',
        '🟢 Green: Correct digit in correct position.',
        '🔵 Blue: Correct digit in wrong position.',
        '🔴 Red: Digit not in secret code.',
        'Use previous guess logs to break code in fewest attempts.'
      ],
      legendGreen: '🟢 Correct digit & correct place',
      legendBlue: '🔵 Correct digit, wrong place',
      legendRed: '🔴 Digit not in code',
      guessPlaceholder: 'Enter 4 digits...',
      submitGuess: 'Submit Guess',
      history: 'Previous Guesses History',
      codeCracked: 'Code cracked successfully! 🎉'
    },
    'copy-move': {
      title: 'Copy Move',
      desc: 'Remember arrow directional sounds and draw them with gestures',
      guide: [
        'Arrow directions appear one by one with distinct audio ticks.',
        'When sequence finishes, a clean drawing notepad appears.',
        'Draw gestures by swiping your finger (Up, Down, Left, Right).',
        'App converts your gesture to styled arrow. One mistake ends turn!'
      ],
      watchArrows: 'Memorize arrow movements and rhythm:',
      drawOnPad: 'Swipe gestures on drawing pad in order:',
      up: 'Up ⬆️',
      down: 'Down ⬇️',
      left: 'Left ⬅️',
      right: 'Right ➡️'
    },
    'missing-piece': {
      title: 'Missing Piece',
      desc: 'Rapid memory recall finding which item vanished',
      guide: [
        'A set of colorful items is shown for 3 seconds.',
        'One item disappears leaving an empty space (?).',
        'Recall which item went missing and drag/tap it into place.',
        'Item counts scale from 4 up to 8 items for maximum challenge.'
      ],
      memorizeItems: 'Observe all items, one will vanish shortly:',
      findMissing: 'Which item is missing from the empty spot?',
      dropHere: 'Place item here'
    },
    'wrong-answer': {
      title: 'Wrong Answer',
      desc: 'Speed and focus game where you must intentionally choose the wrong answer',
      guide: [
        'A very simple question appears with only 2 choices.',
        'Your goal is NOT to choose the correct answer, but to pick the WRONG answer intentionally!',
        'You have only 5 seconds per question!',
        'Choosing the logically correct answer or running out of time results in an immediate loss.'
      ],
      chooseWrong: 'Tap the INCORRECT answer intentionally!',
      timeLeft: 'Time Left',
      avgTime: 'Avg Response Time'
    },
    'number-rush': {
      title: 'Number Rush',
      desc: 'Visual speed and reaction game tapping numbers 1 to 25 in sequential order',
      guide: [
        'A 5x5 grid displaying numbers 1 to 25 randomly arranged.',
        'Tap numbers in strict order: 1 -> 2 -> 3 all the way to 25.',
        'The timer starts when tapping 1 and stops when tapping 25.',
        'Avoid wrong taps to score your fastest time and achieve legendary rank!'
      ],
      nextNumber: 'Next Target Number',
      currentNumber: 'Current Number',
      rankLegendary: '👑 Legendary',
      rankGold: '🥇 Gold',
      rankSilver: '🥈 Silver',
      rankBronze: '🥉 Bronze',
      timeDifference: 'Diff from Best Time',
      tapToStart: 'Tap number (1) to start!',
      tapInOrder: 'Tap numbers in order from 1 to 25 as fast as possible!'
    },
    'tic-tac-toe': {
      title: 'Tic-Tac-Toe XO',
      desc: 'Classic XO strategy game play against 90% hard AI or a friend',
      guide: [
        'Take turns placing your mark (X or O) on the 3x3 grid.',
        'Form a straight line of 3 matching symbols horizontally, vertically, or diagonally.',
        'When playing against Computer, the AI operates at 90% difficulty (Hard)!',
        'Use clever strategy to claim victory or block your opponent.'
      ],
      playerX: 'Player X',
      playerO: 'Player O',
      aiTurn: 'Computer thinking...',
      yourTurn: 'Your turn!',
      xWins: 'X Wins! 🎉',
      oWins: 'O Wins! 🎉',
      draw: 'It is a Draw! 🤝',
      difficulty: 'Difficulty',
      hardAI: 'Hard AI (90%)',
      score: 'Score',
      round: 'Round'
    },
    'same-word': {
      title: 'Same Word 🗣️',
      desc: 'Fun pass-the-phone word association party game!',
      guide: [
        'Round 1: Each player inputs a secret random word without peeking.',
        'Both words are revealed side-by-side on screen.',
        'Subsequent rounds: Input a bridge word connecting both words.',
        'When both players submit the EXACT same word -> VICTORY! 🎉'
      ],
      quickHowToPlay: '💡 Quick How To Play:',
      step1: 'Round 1: Each player enters a random secret word.',
      step2: 'Both words are shown, then each player inputs a bridging word.',
      step3: 'If both of you enter the EXACT same word ← YOU WIN! 🎉',
      targetWordsNextRound: 'Target words for next round:',
      readyToStart: "I'm Ready (Tap to Start)",
      privacyNotice: 'Ensure the other player does not see the screen until they tap the button!',
      initialRoundHint: 'Initial Round: Enter a random word',
      bridgeRoundHint: 'Round {round}: Enter the bridge word',
      thinkBridgeWord: 'Think of a word connecting:',
      inputSecretPlaceholder: 'Enter your secret word...',
      inputBridgePlaceholder: 'Enter the bridge word...',
      confirmWord: 'Confirm Word',
      mismatchTitle: 'Words did not match yet!',
      mismatchSub: 'You entered different words. They will become the target words for the next round!',
      mismatchTargetHint: 'Goal for Round {round}: Find a word connecting',
      nextRoundBtn: 'Proceed to Round {round}',
      perfectMatchBadge: 'Perfect Match!',
      victoryTitle: 'Congrats! You matched the same word 🎉',
      victoryMsg: 'Reached the matching word in',
      sharedWord: 'Shared Matching Word:',
      associationHistory: 'Word Association History:',
      historyModalTitle: 'Current Round History',
      helpModalTitle: 'Same Word Rules',
      rulesUnderstood: 'Got the Rules!',
      ruleTarget: 'Main Goal: Achieve mind sync with your partner to input the exact same word.',
      rule1: '1️⃣ Round 1: Player 1 enters a random secret word, then Player 2 enters a random secret word.',
      rule2: '2️⃣ Subsequent Rounds: The two previous words are shown, and each player enters one word connecting them.',
      rule3: '3️⃣ Victory: When both players enter the exact same word in the same round!'
    },
    'connect-four': {
      title: '4 in a Row 🔴🟡',
      desc: 'Drop colored discs alternately and make a line of 4 in a row to win!',
      guide: [
        'Tap a column to drop your colored disc into position.',
        'The first player to connect 4 discs horizontally, vertically, or diagonally wins!',
        'Play against a friend on the same device or challenge the AI with Easy, Medium, or Hard difficulty.'
      ],
      p1Wins: 'Player 1 Wins! 🎉',
      p2Wins: 'Player 2 Wins! 🎉',
      aiWins: 'AI Wins! 🤖',
      draw: 'It is a Draw! 🤝',
      selectDifficulty: 'AI Level:',
      easy: 'Easy 🟢',
      medium: 'Medium 🟡',
      hard: 'Hard 🔴',
      easyDesc: 'Fun & relaxing practice for beginners',
      mediumDesc: 'Balanced challenge blocking obvious lines',
      hardDesc: 'Unbeatable master planning double threats',
      p1Turn: 'Player 1 Turn (Yellow)',
      p2Turn: 'Player 2 Turn (Pink)',
      aiTurn: 'AI Thinking...',
      aiThinking: 'Calculating optimal move...',
      dropHere: 'Tap to drop disc',
      winsCount: 'Wins',
      round: 'Round'
    },
    'bee-hive-defense': {
      title: 'Bee Hive Defense 🐝',
      desc: 'Protect the golden bee hive from incoming bee swarms in an endless action test!',
      guide: [
        'Tap/click attacking bees quickly before they reach the central hive.',
        'Each squished bee rewards +10 points to increase your high score.',
        'Watch out! Bees reaching the hive reduce its health. Game over when health hits zero.'
      ],
      hiveHealth: 'Hive Health',
      score: 'Score',
      bestScore: 'Best Score',
      wave: 'Wave',
      combo: 'Combo!',
      startGame: 'Start Defense',
      howToPlayTitle: 'How To Play',
      rule1: 'Tap incoming bees before they reach the central hive.',
      rule2: 'Each squished bee grants +10 points (with streak combos!).',
      rule3: 'If a bee reaches the hive, it damages the hive health.',
      rule4: 'As time progresses, bees spawn faster with higher speeds and new types.',
      rule5: 'Try to achieve the highest record before the hive collapses.',
      gameOverTitle: 'Hive Collapsed!',
      newHighScore: 'New High Score! 🏆',
      beesSquished: 'Bees Squished',
      waveReached: 'Max Wave',
      waveUp: 'Faster Swarm! 🐝',
      warning: 'Hive Under Attack! ⚠️',
      newEnemyDiscovered: 'NEW ENEMY DISCOVERED!',
      continue: 'Continue',
      ready: 'READY',
      go: 'GO!',
      hitsRequired: 'Hits Required',
      rewardLabel: 'Reward',
      enemies: {
        speedy: {
          title: 'Blue Bee',
          description: 'Very Fast',
          hits: '1',
          reward: '+10 Score'
        },
        fat: {
          title: 'Fat Bee',
          description: 'Needs two taps',
          hits: '2',
          reward: '+20 Score'
        },
        zigzag: {
          title: 'Zigzag Bee',
          description: 'Moves in a zigzag pattern',
          hits: '1',
          reward: '+10 Score'
        },
        queen: {
          title: 'Queen Bee',
          description: 'Powerful enemy',
          hits: '5',
          reward: '+100 Score'
        },
        golden: {
          title: 'Golden Bee',
          description: 'Restores 10% Hive Health',
          hits: '1',
          reward: 'Restore 10% Hive Health'
        }
      }
    }
  }
};
