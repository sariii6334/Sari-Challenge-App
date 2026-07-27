import { Translations } from '../translations';

export const ko: Translations = {
  appName: 'Sari Challenge',
  appSubtitle: '경쟁형 미니게임 플랫폼',
  createdBy: 'Created by Sari',
  version: '버전 1.0',

  arabic: 'العربية',
  english: 'English',
  turkish: 'Türkçe',
  german: 'Deutsch',
  french: 'Français',
  korean: '한국어',
  dutch: 'Nederlands',
  spanish: 'Español',
  hindi: '힌디어',
  chinese: '중국어',
  selectLanguageTitle: '언어 선택',
  selectLanguageSubtitle: '설정 메뉴에서 언제든지 언어를 변경할 수 있습니다',

  start: '시작',
  startGame: '게임 시작',
  playAgain: '다시 하기',
  mainMenu: '메인 메뉴',
  back: '뒤로 가기',
  settings: '설정',
  about: '정보',
  gameGuide: '게임 설명',
  howToPlay: '게임 방법',
  close: '닫기',
  next: '다음',
  save: '저장',
  reset: '초기화',
  dontShowAgain: '설명 다시 보지 않기',
  finishGame: '게임 종료',
  wins: '승리',
  bestTime: '최고 기록',
  roundNew: '새 라운드',
  turnNow: '현재 차례',
  reached21Lost: '21 달성 (패배)',
  wonRound: '라운드 승리! 🎉',

  playSolo: '혼자 하기',
  playWithFriend: '친구와 함께',
  playVsAI: '컴퓨터 대전',
  selectMode: '모드 선택',
  selectModeSubtitle: '시작할 모드를 선택하세요',
  aiModeDesc: 'AI 도전 (난이도 90%)',
  friendModeDesc: '한 기기로 친구와 대결',
  soloModeDesc: '최고 기록 경신 및 정밀도 도전',
  friendTurnDesc: '번갈아 가며 진행하는 대결',
  soloResultSubtitle: '솔로 도전 결과',
  versusResultSubtitle: '대결 결과',

  player1Default: '플레이어 1',
  player2Default: '플레이어 2',
  computerName: '컴퓨터 (AI)',
  player1Turn: '플레이어 1 차례',
  player2Turn: '플레이어 2 차례',
  computerTurn: '컴퓨터 차례',
  winner: '승리!',
  draw: '무승부!',
  congratulations: '축하합니다!',
  gameOver: '게임 오버',
  passDeviceTo: '기기를 전달하세요:',
  startPlayerTurn: '턴 시작하기:',
  finishedTurn: '턴 완료',

  score: '점수',
  accuracy: '정확도',
  time: '시간',
  attempts: '시도',
  bestScore: '최고 기록',
  targetTime: '목표 시간',
  actualTime: '측정 시간',
  difference: '오차',
  grade: '등급',
  level: '레벨',
  round: '라운드',
  excellent: '최고예요! 🌟',
  veryGood: '잘했어요! 👏',
  good: '좋아요 👍',
  tryAgain: '다시 도전 🎯',

  soundEffects: '음향 효과',
  vibration: '진동',
  appLanguage: '앱 언어',
  player1NameLabel: '플레이어 1 이름',
  player2NameLabel: '플레이어 2 이름',
  resetNames: '기본 이름으로 변경',
  showPreGameInfo: '시작 전 게임 설명 표시',
  resetSettings: '모든 설정 초기화',

  games: {
    'perfect-hold': {
      title: 'Perfect Hold',
      desc: '0.01초 단위의 정확도로 시간 감각을 테스트하세요',
      guide: [
        '1.00초에서 60.00초 사이의 목표 시간이 지정됩니다.',
        '목표 시간이 사라지기 전에 잘 기억하세요.',
        '시작 버튼을 누른 후 속으로 시간을 측정하세요.',
        '목표 시간에 도달했다고 느낄 때 정지 버튼을 누르세요.',
        '목표 시간에 가장 가까운 사람이 승리합니다!'
      ],
      targetMsg: '목표 시간:',
      memorizeMsg: '목표 시간을 기억하세요. 잠시 후 숨겨집니다!',
      stopWhenReady: '타이머 작동 중... 준비되면 정지 버튼을 누르세요!',
      pressToStart: '시작 버튼을 누르면 타이머가 작동합니다',
      stop: '지금 정지'
    },
    '21-game': {
      title: '21 Game',
      desc: '친구 또는 AI와 펼치는 수싸움 카운팅 배틀',
      guide: [
        '1부터 시작하여 순서대로 숫자를 부릅니다.',
        '자기 차례에 1개, 2개, 또는 3개의 연속된 숫자를 부를 수 있습니다.',
        '한 번에 3개를 초과하여 부를 수 없습니다.',
        '숫자 21을 부르게 되는 사람이 패배합니다!'
      ],
      currentCount: '현재 숫자:',
      say1: '숫자 1개 (+1)',
      say2: '숫자 2개 (+2)',
      say3: '숫자 3개 (+3)',
      forced21Lose: '21을 불러 패배했습니다!'
    },
    'perfect-line': {
      title: 'Perfect Line',
      desc: '기준 선의 길이를 맞추는 정밀 드로잉 테스트',
      guide: [
        '기준선이 몇 초 동안 화면에 표시됩니다.',
        '사라지기 전에 길이를 정확히 기억하세요.',
        '손가락으로 같은 길이의 선을 일직선으로 그리세요.',
        '앱이 오차와 정확도를 정밀하게 계산합니다.'
      ],
      refLineMsg: '기준선의 길이를 기억하세요:',
      drawNow: '같은 길이의 선을 그리세요:',
      drawnLength: '내가 그린 길이:',
      targetLength: '목표 길이:',
      clearCanvas: '지우기'
    },
    'perfect-circle': {
      title: 'Perfect Circle',
      desc: '한 번의 붓터치로 완벽한 원을 그리세요',
      guide: [
        '가이드 원이 잠시 표시됩니다.',
        '끊지 않고 한 번에 원을 그리세요.',
        '원형도와 매끄러움을 종합 평가합니다.',
        '가장 높은 점수를 얻은 사람이 승리합니다!'
      ],
      refCircleMsg: '가이드 원을 관찰하세요:',
      drawCircleNow: '완벽한 원을 그리세요:',
      smoothness: '매끄러움',
      circularity: '원형도'
    },
    'memory-order': {
      title: 'Memory Order',
      desc: '반짝이는 블록 순서를 기억하는 기억력 테스트',
      guide: [
        '색상 블록이 순서대로 반짝입니다.',
        '순서를 주의 깊게 기억하세요.',
        '기억한 순서대로 블록을 누르세요.',
        '단계가 올라갈수록 순서가 길어집니다!'
      ],
      watchSequence: '순서를 주의 깊게 보세요...',
      repeatSequence: '당신의 차례입니다! 순서대로 누르세요:',
      correctSequence: '정답입니다!',
      wrongSequence: '틀렸습니다!'
    },
    'color-trap': {
      title: 'Color Trap',
      desc: '글자의 의미와 글자 색상 사이의 스트룹 착시 트랩',
      guide: [
        '색상 단어가 서로 다른 잉크 색상으로 표시됩니다.',
        '중요: 글자의 뜻이 아닌 **잉크 색상**을 누르세요!',
        '예시: 파란색 잉크로 쓰인 "빨강" 단어 -> 파란색 클릭!',
        '빠른 순발력과 집중력이 필요합니다.'
      ],
      clickInkColor: '글자의 잉크 색상을 클릭하세요:',
      red: '빨강',
      blue: '파랑',
      green: '초록',
      yellow: '노랑',
      purple: '보라',
      orange: '주황'
    },
    'code-break': {
      title: 'Code Break',
      desc: '컬러 힌트로 4자리 암호를 추리하여 해독하세요',
      guide: [
        '4자리 비밀 암호를 맞추세요.',
        '🟢 초록: 숫자와 위치가 모두 맞음.',
        '🔵 파랑: 숫자는 맞지만 위치가 틀림.',
        '🔴 빨강: 암호에 포함되지 않은 숫자.',
        '이전 시도 기록을 활용하여 최소 시도로 맞추세요.'
      ],
      legendGreen: '🟢 숫자와 위치 모두 맞음',
      legendBlue: '🔵 숫자는 맞지만 위치 틀림',
      legendRed: '🔴 암호에 없는 숫자',
      guessPlaceholder: '4자리 숫자 입력...',
      submitGuess: '입력 완료',
      history: '이전 시도 기록',
      codeCracked: '암호 해독 성공! 🎉'
    },
    'copy-move': {
      title: 'Copy Move',
      desc: '화살표 방향과 사운드를 기억하고 드래그하여 그리세요',
      guide: [
        '화살표 방향이 소리와 함께 순서대로 나타납니다.',
        '순서가 끝나면 그리기 드로잉 패드가 나타납니다.',
        '손가락을 드래그하여(상, 하, 좌, 우) 화살표를 그리세요.',
        '한 번이라도 틀리면 기회가 종료됩니다!'
      ],
      watchArrows: '화살표 방향과 리듬을 기억하세요:',
      drawOnPad: '드로잉 패드에 순서대로 드래그하세요:',
      up: '위 ⬆️',
      down: '아래 ⬇️',
      left: '왼쪽 ⬅️',
      right: '오른쪽 ➡️'
    },
    'missing-piece': {
      title: 'Missing Piece',
      desc: '사라진 조각을 찾아내는 순발력 기억력 게임',
      guide: [
        '알록달록한 아이템들이 3초 동안 보여집니다.',
        '아이템 하나가 사라지고 빈자리(?)가 남습니다.',
        '사라진 아이템을 기억하여 제자리에 놓으세요.',
        '아이템 개수가 4개에서 8개까지 늘어납니다.'
      ],
      memorizeItems: '아이템을 기억하세요. 잠시 후 하나가 사라집니다:',
      findMissing: '빈자리에 들어갈 사라진 아이템은?',
      dropHere: '아이템을 여기에 놓으세요'
    },
    'wrong-answer': {
      title: 'Wrong Answer',
      desc: '의도적으로 오답을 골라야 하는 순발력 게임',
      guide: [
        '매우 간단한 2지선다 문제가 출제됩니다.',
        '목표는 정답을 고르는 것이 아니라 의도적으로 **틀린 답**을 고르는 것입니다!',
        '문제당 주어진 시간은 단 3초!',
        '정답을 고르거나 시간이 초과되면 즉시 패배합니다.'
      ],
      chooseWrong: '의도적으로 틀린 답을 누르세요!',
      timeLeft: '남은 시간',
      avgTime: '평균 응답 시간'
    },
    'number-rush': {
      title: 'Number Rush',
      desc: '1부터 25까지의 숫자를 순서대로 터치하는 순발력 게임',
      guide: [
        '1부터 25까지 무작위로 배치된 5x5 그리드가 나타납니다.',
        '1 -> 2 -> 3 순서대로 25까지 빠르게 터치하세요.',
        '1을 누르면 타이머가 시작되고 25를 누르면 종료됩니다.',
        '실수 없이 최고의 기록을 달성하세요!'
      ],
      nextNumber: '다음 누를 숫자',
      currentNumber: '현재 숫자',
      rankLegendary: '👑 전설',
      rankGold: '🥇 골드',
      rankSilver: '🥈 실버',
      rankBronze: '🥉 브론즈',
      timeDifference: '최고 기록과의 차이',
      tapToStart: '시작하려면 숫자 (1)을 누르세요!',
      tapInOrder: '1부터 25까지의 숫자를 순서대로 최대한 빠르게 누르세요!'
    },
    'tic-tac-toe': {
      title: '틱택토 (Tic-Tac-Toe) XO',
      desc: '클래식 오목 XO 게임 (AI 난이도 90% 또는 친구 대전)',
      guide: [
        '3x3 격자에 번갈아가며 모양(X 또는 O)을 놓습니다.',
        '가로, 세로, 대각선으로 3개를 연속으로 연결하면 승리합니다.',
        '컴퓨터 대전 시 AI는 고난도(90%)로 작동합니다!',
        '전략을 세워 상대방을 제압해보세요.'
      ],
      playerX: '플레이어 X',
      playerO: '플레이어 O',
      aiTurn: '컴퓨터 생각 중...',
      yourTurn: '당신의 차례!',
      xWins: 'X 승리! 🎉',
      oWins: 'O 승리! 🎉',
      draw: '무승부! 🤝',
      difficulty: '난이도',
      hardAI: '스마트 AI (90%)',
      score: '점수',
      round: '라운드'
    },
    'same-word': {
      title: '이심전심 한 단어 🗣️',
      desc: '한 기기로 즐기는 단어 연상 파티 게임!',
      guide: [
        '1라운드: 각 플레이어가 상대방 모르게 단어를 입력합니다.',
        '두 단어가 화면에 동시에 공개됩니다.',
        '다음 라운드: 두 단어를 연결해주는 연상 단어를 입력합니다.',
        '두 플레이어가 똑같은 단어를 입력하면 승리! 🎉'
      ],
      quickHowToPlay: '💡 빠른 진행 방법:',
      step1: '1라운드: 각 플레이어가 비밀 단어를 입력합니다.',
      step2: '두 단어가 공개되면 연결할 단어를 입력합니다.',
      step3: '두 사람 모두 완전히 똑같은 단어를 입력하면 ← 승리! 🎉',
      targetWordsNextRound: '다음 라운드 목표 단어:',
      readyToStart: '준비 완료 (누르면 시작)',
      privacyNotice: '버튼을 누르기 전까지 상대방이 화면을 보지 못하게 하세요!',
      initialRoundHint: '첫 라운드: 임의의 비밀 단어 입력',
      bridgeRoundHint: '{round} 라운드: 연결 단어 입력',
      thinkBridgeWord: '두 단어를 연결할 단어를 생각하세요:',
      inputSecretPlaceholder: '비밀 단어를 입력하세요...',
      inputBridgePlaceholder: '연결 단어를 입력하세요...',
      confirmWord: '단어 확인',
      mismatchTitle: '아직 단어가 일치하지 않습니다!',
      mismatchSub: '서로 다른 단어를 입력했습니다. 이 단어들이 다음 라운드의 목표가 됩니다!',
      mismatchTargetHint: '{round} 라운드 목표: 두 단어를 잇는 단어 찾기',
      nextRoundBtn: '{round} 라운드로 이동',
      perfectMatchBadge: '완벽한 일치!',
      victoryTitle: '축하합니다! 마음이 통했습니다 🎉',
      victoryMsg: '목표 일치 단어 달성:',
      sharedWord: '일치한 공통 단어:',
      associationHistory: '단어 연상 히스토리:',
      historyModalTitle: '현재 라운드 기록',
      helpModalTitle: '이심전심 한 단어 규칙',
      rulesUnderstood: '규칙을 이해했습니다!',
      ruleTarget: '주요 목표: 파트너와 텔레파시를 발휘하여 정확히 똑같은 단어를 입력하는 것입니다.',
      rule1: '1️⃣ 1라운드: 플레이어 1이 비밀 단어를 입력하고, 이어서 플레이어 2가 입력합니다.',
      rule2: '2️⃣ 다음 라운드: 공개된 두 단어를 연결하는 연상 단어를 각자 입력합니다.',
      rule3: '3️⃣ 승리: 두 플레이어가 한 라운드에 정확히 똑같은 단어를 입력했을 때!'
    },
    'connect-four': {
      title: '4목 게임 (Connect 4) 🔴🟡',
      desc: '색깔 칩을 번갈아 떨어뜨려 4개를 연속으로 연결하면 승리!',
      guide: [
        '칩을 떨어뜨릴 열을 터치하세요.',
        '가로, 세로, 대각선으로 4개의 칩을 먼저 연결하는 사람이 승리합니다!',
        '한 기기에서 친구와 대결하거나 쉬움, 보통, 어려움 인공지능에 도전하세요.'
      ],
      p1Wins: '플레이어 1 승리! 🎉',
      p2Wins: '플레이어 2 승리! 🎉',
      aiWins: 'AI 승리! 🤖',
      draw: '무승부! 🤝',
      selectDifficulty: 'AI 난이도:',
      easy: '쉬움 🟢',
      medium: '보통 🟡',
      hard: '매우 어려움 🔴',
      easyDesc: '초보자를 위한 가벼운 연습',
      mediumDesc: '쉬운 승리를 차단하는 탄탄한 인공지능',
      hardDesc: '이중 위협을 계산하는 강력한 인공지능',
      p1Turn: '플레이어 1 차례 (노랑)',
      p2Turn: '플레이어 2 차례 (분홍)',
      aiTurn: 'AI 생각 중...',
      aiThinking: '최적의 수를 계산하고 있습니다...',
      dropHere: '터치하여 칩 떨어뜨리기',
      winsCount: '승리',
      round: '라운드'
    },
    'bee-hive-defense': {
      title: '벌집 디펜스 🐝',
      desc: '몰려드는 벌들로부터 황금 벌집을 지켜내세요!',
      guide: [
        '중앙 벌집에 도달하기 전에 공격하는 벌을 터치하세요.',
        '벌을 잡을 때마다 +10점을 획득합니다.',
        '벌집에 공격이 닿으면 체력이 감소하며, 체력이 0이 되면 게임 오버입니다.'
      ],
      hiveHealth: '벌집 체력',
      score: '점수',
      bestScore: '최고 기록',
      wave: '웨이브',
      combo: '콤보!',
      startGame: '디펜스 시작',
      howToPlayTitle: '게임 방법',
      rule1: '벌집으로 몰려드는 벌들을 터치하여 퇴치하세요.',
      rule2: '벌을 터치할 때마다 +10점 획득!',
      rule3: '벌이 벌집에 닿으면 벌집 체력이 감소합니다.',
      rule4: '시간이 지날수록 벌들이 더 빠르고 많이 출현합니다.',
      rule5: '벌집이 무너지기 전에 최고 기록에 도전하세요.',
      gameOverTitle: '벌집이 무너졌습니다!',
      newHighScore: '최고 기록 달성! 🏆',
      beesSquished: '퇴치한 벌',
      waveReached: '도달 웨이브',
      waveUp: '벌떼 습격! 🐝',
      warning: '벌집 위험! ⚠️',
      newEnemyDiscovered: '새로운 적 발견!',
      continue: '계속',
      ready: '준비',
      go: '시작!',
      hitsRequired: '필요한 터치 횟수',
      rewardLabel: '보상',
      enemies: {
        speedy: {
          title: '파란 벌',
          description: '매우 빠름',
          hits: '1',
          reward: '+10 점'
        },
        fat: {
          title: '뚱뚱한 벌',
          description: '두 번 터치 필요',
          hits: '2',
          reward: '+20 점'
        },
        zigzag: {
          title: '지그재그 벌',
          description: '지그재그 패턴으로 이동',
          hits: '1',
          reward: '+10 점'
        },
        queen: {
          title: '여왕벌',
          description: '강력한 적',
          hits: '5',
          reward: '+100 점'
        },
        golden: {
          title: '황금 벌',
          description: '벌통 체력 10% 회복',
          hits: '1',
          reward: '체력 10% 회복'
        }
      }
    }
  }
};
