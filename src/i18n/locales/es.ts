import { Translations } from '../../types';

export const es: Translations = {
  appName: 'Sari Challenge',
  appSubtitle: 'Plataforma de Minijuegos Competitivos',
  createdBy: 'Created by Sari',
  version: 'Versión 1.0',

  arabic: 'العربية',
  english: 'English',
  turkish: 'Türkçe',
  german: 'Deutsch',
  french: 'Français',
  korean: '한국어',
  dutch: 'Nederlands',
  spanish: 'Español',
  hindi: 'Hindi',
  chinese: 'Chino',
  selectLanguageTitle: 'Seleccionar Idioma',
  selectLanguageSubtitle: 'Puedes cambiar el idioma en cualquier momento desde los ajustes',

  start: 'Iniciar',
  startGame: 'Iniciar Juego',
  playAgain: 'Jugar de Nuevo',
  mainMenu: 'Menú Principal',
  back: 'Volver',
  settings: 'Ajustes',
  about: 'Acerca de',
  gameGuide: 'Guía de Juegos',
  howToPlay: 'Cómo jugar',
  close: 'Cerrar',
  next: 'Siguiente',
  save: 'Guardar',
  reset: 'Restablecer',
  dontShowAgain: 'No volver a mostrar esta explicación',
  finishGame: 'Finalizar partida',
  wins: 'Victorias',
  bestTime: 'Mejor Tiempo',
  roundNew: 'Nueva Ronda',
  turnNow: 'Turno Actual',
  reached21Lost: 'Alcanzó el 21 (Perdió)',
  wonRound: '¡Ganó la ronda! 🎉',
  watchAdForRetry: '🎁 Ver un anuncio para obtener un intento adicional',

  playSolo: 'Jugar Solo',
  playWithFriend: 'Jugar con un Amigo',
  playVsAI: 'Jugar contra la IA',
  selectMode: 'Seleccionar Modo',
  selectModeSubtitle: 'Elige un modo de desafío para comenzar',
  aiModeDesc: 'Desafía a la IA (Dificultad 90%)',
  friendModeDesc: 'Compite con tu amigo en el mismo dispositivo',
  soloModeDesc: 'Supera tu récord personal y alcanza máxima precisión',
  friendTurnDesc: 'Duelo por turnos contra tu amigo',
  soloResultSubtitle: 'Resultado del Desafío Solo',
  versusResultSubtitle: 'Resultados Cara a Cara',

  player1Default: 'Jugador 1',
  player2Default: 'Jugador 2',
  computerName: 'Computadora (IA)',
  player1Turn: 'Turno del Jugador 1',
  player2Turn: 'Turno del Jugador 2',
  computerTurn: 'Turno de la Computadora',
  winner: '¡Ganador!',
  draw: '¡Empate!',
  congratulations: '¡Felicidades!',
  gameOver: 'Fin del juego',
  passDeviceTo: 'Pasa el dispositivo a',
  startPlayerTurn: 'Iniciar turno de',
  finishedTurn: 'ha terminado su turno',

  score: 'Puntuación',
  accuracy: 'Precisión',
  time: 'Tiempo',
  attempts: 'Intentos',
  bestScore: 'Mejor Récord',
  targetTime: 'Tiempo Objetivo',
  actualTime: 'Tiempo Real',
  difference: 'Diferencia',
  grade: 'Calificación',
  level: 'Nivel',
  round: 'Ronda',
  excellent: '¡Excelente! 🌟',
  veryGood: '¡Muy Bien! 👏',
  good: 'Bien 👍',
  tryAgain: 'Inténtalo de nuevo 🎯',

  soundEffects: 'Efectos de Sonido',
  vibration: 'Vibración',
  appLanguage: 'Idioma de la App',
  player1NameLabel: 'Nombre Jugador 1',
  player2NameLabel: 'Nombre Jugador 2',
  resetNames: 'Restablecer Nombres',
  showPreGameInfo: 'Mostrar explicación antes de empezar',
  resetSettings: 'Restablecer todos los ajustes',

  games: {
    'perfect-hold': {
      title: 'Perfect Hold',
      desc: 'Pon a prueba tu sentido del tiempo con precisión de milisegundos',
      guide: [
        'Se genera un tiempo objetivo aleatorio entre 1.00s y 60.00s.',
        'Memoriza el tiempo antes de que desaparezca.',
        'Presiona Iniciar y siente el paso del tiempo a ciegas.',
        'Presiona Detener cuando creas que ha transcurrido el tiempo.',
        '¡El más cercano al tiempo objetivo gana!'
      ],
      targetMsg: 'Tiempo Objetivo:',
      memorizeMsg: '¡Memoriza este tiempo, se ocultará ahora!',
      stopWhenReady: 'Cronómetro oculto en marcha... ¡Presiona DETENER cuando estés listo!',
      pressToStart: 'Presiona Iniciar para activar el cronómetro a ciegas',
      stop: 'DETENER AHORA'
    },
    '21-game': {
      title: '21 Game',
      desc: 'Batalla táctica de conteo contra un amigo o la IA',
      guide: [
        'Los jugadores cuentan por turnos empezando desde el 1.',
        'En tu turno, di 1, 2 o 3 números consecutivos.',
        'Máximo 3 números por turno.',
        '¡El jugador obligado a decir 21 pierde inmediatamente!'
      ],
      currentCount: 'Conteo Actual:',
      say1: 'Decir 1 número (+1)',
      say2: 'Decir 2 números (+2)',
      say3: 'Decir 3 números (+3)',
      forced21Lose: '¡se vio obligado a decir 21 y perdió!'
    },
    'perfect-line': {
      title: 'Perfect Line',
      desc: 'Dibujo de precisión para igualar la longitud de una línea de referencia',
      guide: [
        'Una línea de referencia aparece unos segundos.',
        'Memoriza su longitud antes de que desaparezca.',
        'Dibuja una línea recta con el dedo de la misma longitud.',
        'La app calcula la diferencia de longitud y la precisión.'
      ],
      refLineMsg: 'Memoriza la longitud de esta línea:',
      drawNow: 'Dibuja una línea de la misma longitud:',
      drawnLength: 'Tu longitud dibujada:',
      targetLength: 'Longitud objetivo:',
      clearCanvas: 'Borrar'
    },
    'perfect-circle': {
      title: 'Perfect Circle',
      desc: 'Dibuja un círculo perfecto y simétrico de un solo trazo',
      guide: [
        'Aparece brevemente un círculo de guía.',
        'Dibuja un círculo completo con un movimiento continuo.',
        'El sistema evalúa la circularidad y la suavidad del trazo.',
        '¡La mayor puntuación gana!'
      ],
      refCircleMsg: 'Observa el círculo de guía:',
      drawCircleNow: 'Dibuja un círculo lo más perfecto posible:',
      smoothness: 'Suavidad',
      circularity: 'Circularidad'
    },
    'memory-order': {
      title: 'Memory Order',
      desc: 'Prueba de memoria visual recordando secuencias luminosas',
      guide: [
        'Las casillas de colores se iluminan en una secuencia específica.',
        'Observa atentamente la secuencia.',
        'Repite la secuencia tocando las casillas.',
        '¡La secuencia se hace más larga con cada nivel completado!'
      ],
      watchSequence: 'Observa la secuencia atentamente...',
      repeatSequence: '¡Tu turno! Repite la secuencia:',
      correctSequence: '¡Secuencia correcta!',
      wrongSequence: '¡Orden incorrecto!'
    },
    'color-trap': {
      title: 'Color Trap',
      desc: 'Trampa del efecto Stroop: color de tinta vs significado de la palabra',
      guide: [
        'Aparecen palabras de colores escritas con tintas diferentes.',
        'IMPORTANTE: Toca el **COLOR DE LA TINTA**, ¡no la palabra escrita!',
        'Ejemplo: La palabra "ROJO" escrita en tinta AZUL -> ¡Toca AZUL!',
        'Requiere reflejos rápidos y concentración.'
      ],
      clickInkColor: 'Toca el COLOR DE LA TINTA del texto:',
      red: 'Rojo',
      blue: 'Azul',
      green: 'Verde',
      yellow: 'Amarillo',
      purple: 'Morado',
      orange: 'Naranja'
    },
    'code-break': {
      title: 'Code Break',
      desc: 'Descifra el código secreto de 4 dígitos con pistas de color',
      guide: [
        'Adivina el código secreto de 4 dígitos.',
        '🟢 Verde: Dígito correcto y en la posición correcta.',
        '🔵 Azul: Dígito correcto pero en posición incorrecta.',
        '🔴 Rojo: El dígito no está en el código.',
        'Utiliza el historial previo para descifrar en pocos intentos.'
      ],
      legendGreen: '🟢 Dígito correcto y bien ubicado',
      legendBlue: '🔵 Dígito correcto, mal ubicado',
      legendRed: '🔴 Dígito no presente en el código',
      guessPlaceholder: 'Ingresa 4 dígitos...',
      submitGuess: 'Enviar intento',
      history: 'Historial de intentos',
      codeCracked: '¡Código descifrado con éxito! 🎉'
    },
    'copy-move': {
      title: 'Copy Move',
      desc: 'Memoriza la dirección de las flechas y sus sonidos y dibújalas',
      guide: [
        'Las flechas aparecen una a una con señales sonoras.',
        'Luego aparece un bloc de dibujo en blanco.',
        'Desliza el dedo (Arriba, Abajo, Izquierda, Derecha) para dibujar.',
        '¡Un solo error termina el turno!'
      ],
      watchArrows: 'Memoriza las flechas y el ritmo:',
      drawOnPad: 'Desliza los gestos en orden en el bloc:',
      up: 'Arriba ⬆️',
      down: 'Abajo ⬇️',
      left: 'Izquierda ⬅️',
      right: 'Derecha ➡️'
    },
    'missing-piece': {
      title: 'Missing Piece',
      desc: 'Juego de memoria rápida: descubre qué objeto ha desaparecido',
      guide: [
        'Se muestran objetos de colores durante 3 segundos.',
        'Un objeto desaparece dejando un espacio vacío (?).',
        'Recuerda el objeto que falta y colócalo en su sitio.',
        'El número de objetos aumenta de 4 a 8.'
      ],
      memorizeItems: 'Observa todos los objetos, uno desaparecerá pronto:',
      findMissing: '¿Qué objeto falta en el espacio vacío?',
      dropHere: 'Coloca el objeto aquí'
    },
    'wrong-answer': {
      title: 'Wrong Answer',
      desc: 'Juego de velocidad: ¡debes elegir intencionadamente la respuesta INCORRECTA!',
      guide: [
        'Aparece una pregunta sencilla con solo 2 opciones.',
        'Tu objetivo NO es elegir la respuesta correcta, ¡sino la INCORRECTA!',
        '¡Solo tienes 3 segundos por pregunta!',
        'Elegir la respuesta correcta o quedarse sin tiempo provoca la derrota.'
      ],
      chooseWrong: '¡Toca intencionadamente la respuesta INCORRECTA!',
      timeLeft: 'Tiempo Restante',
      avgTime: 'Tiempo Medio de Respuesta'
    },
    'number-rush': {
      title: 'Number Rush',
      desc: 'Toca los números del 1 al 25 en orden secuencial',
      guide: [
        'Una cuadrícula de 5x5 muestra números del 1 al 25 al azar.',
        'Toca los números en estricto orden: 1 -> 2 -> 3 hasta el 25.',
        'El tiempo empieza al tocar el 1 y se detiene al tocar el 25.',
        '¡Evita errores para lograr tu mejor tiempo!'
      ],
      nextNumber: 'Siguiente Número',
      currentNumber: 'Número Actual',
      rankLegendary: '👑 Legendario',
      rankGold: '🥇 Oro',
      rankSilver: '🥈 Plata',
      rankBronze: '🥉 Bronce',
      timeDifference: 'Diferencia con el mejor tiempo',
      tapToStart: '¡Toca el número (1) para comenzar!',
      tapInOrder: '¡Toca los números en orden del 1 al 25 lo más rápido posible!'
    },
    'tic-tac-toe': {
      title: 'Tres en Raya Tic-Tac-Toe',
      desc: 'Juego clásico de Tres en Raya contra la IA (Modo Difícil 90%) o un amigo',
      guide: [
        'Turnense para colocar su símbolo (X u O) en la cuadrícula de 3x3.',
        'Formen una línea de 3 símbolos iguales horizontal, vertical o diagonalmente.',
        'Contra la computadora, ¡la IA juega al nivel más alto (90% Difícil)!',
        'Usa la estrategia para ganar o bloquear a tu oponente.'
      ],
      playerX: 'Jugador X',
      playerO: 'Jugador O',
      aiTurn: 'Computadora pensando...',
      yourTurn: '¡Tu turno!',
      xWins: '¡X ha ganado! 🎉',
      oWins: '¡O ha ganado! 🎉',
      draw: '¡Empate! 🤝',
      difficulty: 'Dificultad',
      hardAI: 'Super IA (90%)',
      score: 'Puntos',
      round: 'Ronda'
    },
    'same-word': {
      title: 'Misma Palabra 🗣️',
      desc: '¡Divertido juego de asociación de palabras para dos jugadores en un solo dispositivo!',
      guide: [
        'Ronda 1: Cada jugador escribe en secreto una palabra sin que el otro mire.',
        'Ambas palabras se muestran juntas en pantalla.',
        'Siguientes rondas: Escribe una palabra puente que conecte ambas palabras.',
        'Cuando ambos jugadores escriban la MISMA palabra -> ¡Victoria! 🎉'
      ],
      quickHowToPlay: '💡 Cómo jugar rápido:',
      step1: 'Ronda 1: Cada jugador ingresa una palabra secreta al azar.',
      step2: 'Se muestran ambas palabras y luego cada uno ingresa una palabra de enlace.',
      step3: 'Si ambos ingresan EXACTAMENTE la misma palabra ← ¡GANAN! 🎉',
      targetWordsNextRound: 'Palabras objetivo para la siguiente ronda:',
      readyToStart: 'Estoy listo (Toca para comenzar)',
      privacyNotice: '¡Asegúrate de que el otro jugador no vea la pantalla hasta que toque el botón!',
      initialRoundHint: 'Ronda Inicial: Ingresa una palabra aleatoria',
      bridgeRoundHint: 'Ronda {round}: Ingresa la palabra de enlace',
      thinkBridgeWord: 'Piensa en una palabra que conecte:',
      inputSecretPlaceholder: 'Ingresa tu palabra secreta...',
      inputBridgePlaceholder: 'Ingresa la palabra de enlace...',
      confirmWord: 'Confirmar Palabra',
      mismatchTitle: '¡Las palabras aún no coinciden!',
      mismatchSub: 'Ingresaron palabras diferentes. ¡Se convertirán en las palabras objetivo para la siguiente ronda!',
      mismatchTargetHint: 'Objetivo Ronda {round}: Encuentren una palabra que conecte',
      nextRoundBtn: 'Ir a la Ronda {round}',
      perfectMatchBadge: '¡Coincidencia Perfecta!',
      victoryTitle: '¡Felicidades! Llegaron a la misma palabra 🎉',
      victoryMsg: 'Palabra coincidente alcanzada en',
      sharedWord: 'Palabra Coincidente Compartida:',
      associationHistory: 'Historial de Asociación:',
      historyModalTitle: 'Historial de la Ronda Actual',
      helpModalTitle: 'Reglas de Misma Palabra',
      rulesUnderstood: '¡Entendido!',
      ruleTarget: 'Objetivo Principal: Lograr sincronía mental con tu compañero para ingresar exactamente la misma palabra.',
      rule1: '1️⃣ Ronda 1: El Jugador 1 ingresa una palabra secreta y luego el Jugador 2 ingresa otra.',
      rule2: '2️⃣ Siguientes Rondas: Se muestran las dos palabras anteriores y cada uno escribe una palabra de enlace.',
      rule3: '3️⃣ Victoria: ¡Cuando ambos jugadores escriben exactamente la misma palabra en el mismo turno!'
    },
    'connect-four': {
      title: '4 en Raya 🔴🟡',
      desc: '¡Suelta fichas de colores de forma alterna y conecta 4 en raya para ganar!',
      guide: [
        'Toca una columna para soltar tu ficha.',
        '¡El primer jugador en conectar 4 fichas horizontal, vertical o diagonalmente gana!',
        'Juega contra un amigo en el mismo dispositivo o desafía a la IA en Fácil, Medio o Difícil.'
      ],
      p1Wins: '¡Jugador 1 Gana! 🎉',
      p2Wins: '¡Jugador 2 Gana! 🎉',
      aiWins: '¡La IA Gana! 🤖',
      draw: '¡Empate! 🤝',
      selectDifficulty: 'Nivel de IA:',
      easy: 'Fácil 🟢',
      medium: 'Medio 🟡',
      hard: 'Muy Difícil 🔴',
      easyDesc: 'Partida relajante para principiantes',
      mediumDesc: 'Oponente sólido que bloquea victorias fáciles',
      hardDesc: 'IA imbatible que planea dobles amenazas',
      p1Turn: 'Turno Jugador 1 (Amarillo)',
      p2Turn: 'Turno Jugador 2 (Rosa)',
      aiTurn: 'La IA está pensando...',
      aiThinking: 'Calculando el mejor movimiento...',
      dropHere: 'Toca para soltar',
      winsCount: 'Victorias',
      round: 'Ronda'
    },
    'bee-hive-defense': {
      title: 'Defensa de la Colmena 🐝',
      desc: '¡Protege la colmena dorada de los ataques de abejas!',
      guide: [
        'Toca las abejas antes de que lleguen a la colmena central.',
        'Cada abeja eliminada te da +10 puntos.',
        'Si las abejas alcanzan la colmena, disminuyen su salud.'
      ],
      hiveHealth: 'Salud de la Colmena',
      score: 'Puntuación',
      bestScore: 'Mejor Récord',
      wave: 'Oleada',
      combo: '¡Combo!',
      startGame: 'Iniciar Defensa',
      howToPlayTitle: 'Cómo Jugar',
      rule1: 'Toca las abejas atacantes.',
      rule2: 'Cada abeja aplastada da +10 puntos.',
      rule3: 'Las abejas que llegan a la colmena dañan su salud.',
      rule4: 'Con el tiempo, las abejas son más rápidas y numerosas.',
      rule5: 'Consigue la mayor puntuación posible.',
      gameOverTitle: '¡Colmena Caída!',
      newHighScore: '¡Nuevo Récord! 🏆',
      beesSquished: 'Abejas Eliminadas',
      waveReached: 'Oleada Máxima',
      waveUp: '¡Ataque Más Rápido! 🐝',
      warning: '¡Colmena en Peligro! ⚠️',
      newEnemyDiscovered: '¡NUEVO ENEMIGO DESCUBIERTO!',
      continue: 'Continuar',
      ready: 'LISTO',
      go: '¡YA!',
      hitsRequired: 'Golpes requeridos',
      rewardLabel: 'Recompensa',
      enemies: {
        speedy: {
          title: 'Abeja Azul',
          description: 'Muy rápida',
          hits: '1',
          reward: '+10 Puntos'
        },
        fat: {
          title: 'Abeja Gorda',
          description: 'Requiere dos toques',
          hits: '2',
          reward: '+20 Puntos'
        },
        zigzag: {
          title: 'Abeja Zigzag',
          description: 'Se mueve en patrón zigzag',
          hits: '1',
          reward: '+10 Puntos'
        },
        queen: {
          title: 'Abeja Reina',
          description: 'Enemigo poderoso',
          hits: '5',
          reward: '+100 Puntos'
        },
        golden: {
          title: 'Abeja Dorada',
          description: 'Restaura el 10% de la salud de la colmena',
          hits: '1',
          reward: 'Restaurar 10% de salud'
        }
      }
    }
  }
};
