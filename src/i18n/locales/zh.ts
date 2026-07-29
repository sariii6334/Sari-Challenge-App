import { Translations } from '../translations';

export const zh: Translations = {
  appName: 'Sari Challenge',
  appSubtitle: '竞技迷你游戏平台',
  createdBy: 'Created by Sari',
  version: '版本 1.0',

  arabic: 'العربية',
  english: 'English',
  turkish: 'Türkçe',
  german: 'Deutsch',
  french: 'Français',
  korean: '한국어',
  dutch: 'Nederlands',
  spanish: 'Español',
  hindi: 'हिन्दी',
  chinese: '中文',
  selectLanguageTitle: '选择语言',
  selectLanguageSubtitle: '您可以随时在设置中更改语言',

  start: '开始',
  startGame: '开始游戏',
  playAgain: '再玩一次',
  mainMenu: '主菜单',
  back: '返回',
  settings: '设置',
  about: '关于应用',
  gameGuide: '游戏指南',
  howToPlay: '玩法说明',
  close: '关闭',
  next: '下一步',
  save: '保存',
  reset: '重置',
  dontShowAgain: '不再显示此说明',
  finishGame: '结束游戏',
  wins: '胜场',
  bestTime: '最佳时间',
  roundNew: '新一轮',
  turnNow: '当前回合',
  reached21Lost: '达到21（失败）',
  wonRound: '赢得本轮！ 🎉',

  playSolo: '单人模式',
  playWithFriend: '双人同屏',
  playVsAI: '人机对战',
  selectMode: '选择游戏模式',
  selectModeSubtitle: '选择模式以开始游戏',
  aiModeDesc: '挑战AI电脑（90%高难度）',
  friendModeDesc: '在同一台设备上挑战朋友',
  soloModeDesc: '刷新个人纪录，追求更高精准度',
  friendTurnDesc: '与朋友轮流对决',
  soloResultSubtitle: '单人游戏结算',
  versusResultSubtitle: '对战结算',

  player1Default: '玩家 1',
  player2Default: '玩家 2',
  computerName: '电脑 (AI)',
  player1Turn: '玩家 1 的回合',
  player2Turn: '玩家 2 的回合',
  computerTurn: '电脑的回合',
  winner: '获胜者！',
  draw: '平局！',
  congratulations: '恭喜！',
  gameOver: '游戏结束',
  passDeviceTo: '请将设备交给',
  startPlayerTurn: '开始回合：',
  finishedTurn: '已完成回合',

  score: '得分',
  accuracy: '准确度',
  time: '时间',
  attempts: '尝试次数',
  bestScore: '最高得分',
  targetTime: '目标时间',
  actualTime: '实际时间',
  difference: '误差',
  grade: '评级',
  level: '关卡',
  round: '回合',
  excellent: '极佳！ 🌟',
  veryGood: '很好！ 👏',
  good: '不错 👍',
  tryAgain: '继续努力 🎯',

  soundEffects: '音效',
  vibration: '震动',
  appLanguage: '应用语言',
  player1NameLabel: '玩家 1 名字',
  player2NameLabel: '玩家 2 名字',
  resetNames: '恢复默认名字',
  showPreGameInfo: '开始前显示游戏说明',
  resetSettings: '重置所有设置',

  rewardAds: '激励广告',
  watchRewardAd: '观看广告以获取奖励',
  adNotReady: '广告尚未加载完成，请稍后再试。',
  adClosed: '广告已关闭，未发放奖励。',
  rewardGranted: '恭喜！奖励已成功发放 🎉',

  games: {
    'perfect-hold': {
      title: 'Perfect Hold',
      desc: '精准测试你对毫秒级时间的感知能力',
      guide: [
        '系统将显示一个 1.00s 到 60.00s 之间的随机目标时间。',
        '在目标时间消失前牢记它。',
        '点击开始，感知隐形计时器的倒计时。',
        '当你认为时间到了，点击停止。',
        '误差最小者获胜！'
      ],
      targetMsg: '目标时间：',
      memorizeMsg: '牢记目标时间，即将隐藏！',
      stopWhenReady: '计时器运行中... 准备好后按停止！',
      pressToStart: '按开始启动隐形计时器',
      stop: '立即停止'
    },
    '21-game': {
      title: '21 Game',
      desc: '与朋友或电脑进行的策略报数博弈',
      guide: [
        '玩家轮流从 1 开始报数。',
        '每回合可报 1、2 或 3 个数字。',
        '每回合最多报 3 个数字。',
        '迫于喊出 21 的人立即失败！'
      ],
      currentCount: '当前数字：',
      say1: '报 1 个数 (+1)',
      say2: '报 2 个数 (+2)',
      say3: '报 3 个数 (+3)',
      forced21Lose: '被迫喊出 21，游戏失败！'
    },
    'perfect-line': {
      title: 'Perfect Line',
      desc: '根据参考线画出等长的精准直线',
      guide: [
        '一条参考线将显示数秒。',
        '在它消失前记住它的长度。',
        '用手指画一条同等长度的直线。',
        '系统将计算长度偏差和准确度。'
      ],
      refLineMsg: '记住参考线的长度：',
      drawNow: '画一条同等长度的直线：',
      drawnLength: '您绘制的长度：',
      targetLength: '目标长度：',
      clearCanvas: '清除画板'
    },
    'perfect-circle': {
      title: 'Perfect Circle',
      desc: '一笔画出一个完美的对称圆圈',
      guide: [
        '虚线指引圆圈将短暂出现。',
        '连续一笔画出一个圆。',
        '系统将评估圆润度和平滑度。',
        '高分者获胜！'
      ],
      refCircleMsg: '观察标准指引圆：',
      drawCircleNow: '画一个尽可能完美的圆：',
      smoothness: '平滑度',
      circularity: '圆润度'
    },
    'memory-order': {
      title: 'Memory Order',
      desc: '通过记忆发光顺序测试视觉记忆',
      guide: [
        '彩色方格按特定顺序发光。',
        '仔细观察发光序列。',
        '按顺序点击重复序列。',
        '每次成功后序列都会变长！'
      ],
      watchSequence: '仔细观察序列...',
      repeatSequence: '轮到你了！重复发光顺序：',
      correctSequence: '顺序正确！',
      wrongSequence: '顺序错误！'
    },
    'color-trap': {
      title: 'Color Trap',
      desc: '斯特鲁普效应：文字内容与墨水颜色的对抗',
      guide: [
        '颜色词语会以不同的墨水颜色显示。',
        '重点：点击**墨水颜色**，而非文字字面意思！',
        '例如：用蓝字写的“红”字 -> 点击蓝色！',
        '需要极快的反应力和专注力。'
      ],
      clickInkColor: '点击字体的**墨水颜色**：',
      red: '红色',
      blue: '蓝色',
      green: '绿色',
      yellow: '黄色',
      purple: '紫色',
      orange: '橙色'
    },
    'code-break': {
      title: 'Code Break',
      desc: '根据颜色提示破解 4 位数字密码',
      guide: [
        '推测 4 位数字密码。',
        '🟢 绿色：数字正确且位置正确。',
        '🔵 蓝色：数字正确但位置错误。',
        '🔴 红色：密码中不含此数字。',
        '结合历史尝试推断最终密码。'
      ],
      legendGreen: '🟢 数字与位置皆正确',
      legendBlue: '🔵 数字正确，位置错误',
      legendRed: '🔴 密码中无此数字',
      guessPlaceholder: '输入 4 位数字...',
      submitGuess: '提交推测',
      history: '尝试历史',
      codeCracked: '成功破解密码！ 🎉'
    },
    'copy-move': {
      title: 'Copy Move',
      desc: '记忆箭头方向和音效，并在画板上临摹',
      guide: [
        '箭头方向配合音效逐个显示。',
        '随后出现空白手势板。',
        '按顺序滑动对应方向（上、下、左、右）。',
        '一次划错即结束！'
      ],
      watchArrows: '记住箭头方向与节奏：',
      drawOnPad: '按顺序在手势板上滑动：',
      up: '向上 ⬆️',
      down: '向下 ⬇️',
      left: '向左 ⬅️',
      right: '向右 ➡️'
    },
    'missing-piece': {
      title: 'Missing Piece',
      desc: '快速记忆测试：究竟哪一件物品消失了？',
      guide: [
        '彩色物品展示 3 秒钟。',
        '一件物品消失并留下问号 (?)。',
        '回忆消失的物品并将其填回。',
        '物品数量将从 4 个增加到 8 个。'
      ],
      memorizeItems: '牢记所有物品，即将消失一个：',
      findMissing: '问号处缺少了哪件物品？',
      dropHere: '放入此处'
    },
    'wrong-answer': {
      title: 'Wrong Answer',
      desc: '反向思维游戏：请故意选择【错误】的答案！',
      guide: [
        '出现仅有两个选项的简单问题。',
        '目标不是选对，而是必须故意选【错】！',
        '每题仅有 3 秒思考时间！',
        '选对正确答案或超时都会导致失败。'
      ],
      chooseWrong: '请故意点击【错误】的答案！',
      timeLeft: '剩余时间',
      avgTime: '平均答题时间'
    },
    'number-rush': {
      title: 'Number Rush',
      desc: '按顺序快速点击 1 到 25 的数字',
      guide: [
        '5x5 网格随机分布 1 到 25 的数字。',
        '按 1 -> 2 -> 3 直到 25 的顺序快速点击。',
        '点击 1 时开始计时，点击 25 停止。',
        '避免按错以取得最佳成绩！'
      ],
      nextNumber: '下一个目标数字',
      currentNumber: '当前数字',
      rankLegendary: '👑 传奇',
      rankGold: '🥇 黄金',
      rankSilver: '🥈 白银',
      rankBronze: '🥉 青铜',
      timeDifference: '与最佳纪录差距',
      tapToStart: '点击数字 (1) 开始！',
      tapInOrder: '以最快速度按顺序点击 1 到 25 的数字！'
    },
    'tic-tac-toe': {
      title: '井字棋 XO',
      desc: '对战高难度电脑(90%)或与朋友同屏竞技',
      guide: [
        '轮流在 3x3 棋盘上放置你的棋子（X 或 O）。',
        '率先在横向、纵向或斜向连成 3 子者获胜。',
        '电脑 AI 具备 90% 极高智商难度！',
        '运用战术取得胜利或封堵对手。'
      ],
      playerX: '玩家 X',
      playerO: '玩家 O',
      aiTurn: '电脑思考中...',
      yourTurn: '轮到你了！',
      xWins: 'X 获胜！ 🎉',
      oWins: 'O 获胜！ 🎉',
      draw: '平局！ 🤝',
      difficulty: '难度',
      hardAI: '超强 AI (90%)',
      score: '比分',
      round: '回合'
    },
    'same-word': {
      title: '心有灵犀 🗣️',
      desc: '双人同屏默契词语联想趣味游戏！',
      guide: [
        '第1轮：每位玩家秘密输入一个词语。',
        '两个词语将同时在屏幕上展示。',
        '后续轮次：输入一个连接两个词语的桥梁词。',
        '若两人输入了完全相同的词语 -> 胜利！ 🎉'
      ],
      quickHowToPlay: '💡 快速玩法：',
      step1: '第1轮：两位玩家各秘密输入一个词语。',
      step2: '词语展示后，两人各输入一个联想桥梁词。',
      step3: '若两人输入完全相同的词语 ← 胜利！ 🎉',
      targetWordsNextRound: '下一轮的目标词语：',
      readyToStart: '我准备好了（点击开始）',
      privacyNotice: '请确保对方看不到您的输入界面！',
      initialRoundHint: '初始轮：请输入任意词语',
      bridgeRoundHint: '第 {round} 轮：请输入联想桥梁词',
      thinkBridgeWord: '思考一个能将两者联系起来的词语：',
      inputSecretPlaceholder: '输入您的秘密词语...',
      inputBridgePlaceholder: '输入联想桥梁词...',
      confirmWord: '确认词语',
      mismatchTitle: '词语尚未匹配成功！',
      mismatchSub: '你们输入了不同的词语。它们将成为下一轮的目标词！',
      mismatchTargetHint: '第 {round} 轮目标：寻找连接词',
      nextRoundBtn: '进入第 {round} 轮',
      perfectMatchBadge: '完美匹配！',
      victoryTitle: '恭喜！你们心有灵犀，匹配成功 🎉',
      victoryMsg: '成功达成匹配词语，历经',
      sharedWord: '默契词语：',
      associationHistory: '联想历史轨迹：',
      historyModalTitle: '当前轮次历史',
      helpModalTitle: '心有灵犀 规则说明',
      rulesUnderstood: '明白了！',
      ruleTarget: '核心目标：与同伴产生思维共鸣，输入完全一致的词语。',
      rule1: '1️⃣ 第1轮：玩家1秘密输入词语，随后玩家2秘密输入。',
      rule2: '2️⃣ 后续轮：展示上一轮的两个词语，两人各输入一个连接词。',
      rule3: '3️⃣ 胜利：当两名玩家在同一轮输入完全相同的词语时！'
    },
    'connect-four': {
      title: '四子棋 (Connect 4) 🔴🟡',
      desc: '轮流投下彩色棋子，率先连成四子获胜！',
      guide: [
        '点击列顶部投下您的棋子。',
        '率先在横向、纵向或斜向连成 4 子者获胜！',
        '与朋友对决，或挑战简单、中等、高难度 AI。'
      ],
      p1Wins: '玩家 1 获胜！ 🎉',
      p2Wins: '玩家 2 获胜！ 🎉',
      aiWins: 'AI 获胜！ 🤖',
      draw: '平局！ 🤝',
      selectDifficulty: 'AI 难度：',
      easy: '简单 🟢',
      medium: '中等 🟡',
      hard: '困难 🔴',
      easyDesc: '适合初学者练手',
      mediumDesc: '具备防守意识的高手',
      hardDesc: '精通双重陷阱策略的顶级 AI',
      p1Turn: '玩家 1 的回合 (黄色)',
      p2Turn: '玩家 2 的回合 (粉色)',
      aiTurn: 'AI 思考中...',
      aiThinking: '正在计算最佳落子...',
      dropHere: '点击投下棋子',
      winsCount: '胜场',
      round: '回合'
    },
    'bee-hive-defense': {
      title: '蜂巢保卫战 🐝',
      desc: '保护金色蜂巢，击退来袭的蜜蜂！',
      guide: [
        '在蜜蜂到达蜂巢之前点击消灭它们。',
        '每消灭一只蜜蜂获得 +10 分。',
        '如果蜜蜂入侵蜂巢，生命值会降低。'
      ],
      hiveHealth: '蜂巢生命值',
      score: '得分',
      bestScore: '最高纪录',
      wave: '波次',
      combo: '连击！',
      startGame: '开始保卫战',
      howToPlayTitle: '玩法说明',
      rule1: '点击靠近的蜜蜂。',
      rule2: '每拍扁一只蜜蜂获得 +10 分。',
      rule3: '蜜蜂入侵蜂巢会造成伤害。',
      rule4: '随着时间推移，蜜蜂速度更快、数量更多。',
      rule5: '挑战最高得分纪录。',
      gameOverTitle: '蜂巢沦陷！',
      newHighScore: '创下新纪录！ 🏆',
      beesSquished: '拍扁蜜蜂数',
      waveReached: '最高到达波次',
      waveUp: '敌军攻势加强！ 🐝',
      warning: '蜂巢遭受攻击！ ⚠️',
      newEnemyDiscovered: '发现新型敌人！',
      continue: '继续',
      ready: '准备',
      go: '开战！',
      hitsRequired: '需点击次数',
      rewardLabel: '奖励',
      enemies: {
        speedy: {
          title: '蓝蜂',
          description: '速度极快',
          hits: '1',
          reward: '+10 分'
        },
        fat: {
          title: '胖蜂',
          description: '需要点击两次',
          hits: '2',
          reward: '+20 分'
        },
        zigzag: {
          title: '锯齿蜂',
          description: '呈锯齿状飞行',
          hits: '1',
          reward: '+10 分'
        },
        queen: {
          title: '蜂后',
          description: '强大的领袖敌人',
          hits: '5',
          reward: '+100 分'
        },
        golden: {
          title: '金蜂',
          description: '恢复 10% 蜂巢生命值',
          hits: '1',
          reward: '恢复 10% 生命值'
        }
      }
    }
  }
};
