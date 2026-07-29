import { Translations } from '../translations';

export const tr: Translations = {
  appName: 'Sari Challenge',
  appSubtitle: 'Competitief Minigames Platform',
  createdBy: 'Created by Sari',
  version: 'Sürüm 1.0',

  arabic: 'العربية',
  english: 'English',
  turkish: 'Türkçe',
  german: 'Deutsch',
  french: 'Français',
  korean: '한국어',
  dutch: 'Nederlands',
  spanish: 'Español',
  hindi: 'Hintçe',
  chinese: 'Çince',
  selectLanguageTitle: 'Uygulama Dilini Seçin',
  selectLanguageSubtitle: 'Dili istediğiniz zaman ayarlardan değiştirebilirsiniz',

  start: 'Başla',
  startGame: 'Oyuna Başla',
  playAgain: 'Tekrar Oyna',
  mainMenu: 'Ana Menü',
  back: 'Geri',
  settings: 'Ayarlar',
  about: 'Hakkında',
  gameGuide: 'Oyun Rehberi',
  howToPlay: 'Nasıl Oynanır',
  close: 'Kapat',
  next: 'İleri',
  save: 'Kaydet',
  reset: 'Sıfırla',
  dontShowAgain: 'Bu açıklamayı bir daha gösterme',
  finishGame: 'Maçı Bitir',
  wins: 'Galibiyet',
  bestTime: 'En İyi Süre',
  roundNew: 'Yeni Tur',
  turnNow: 'Mevcut Sıra',
  reached21Lost: '21 Sayısına Ulaştı (Kaybetti)',
  wonRound: 'Turu kazandı! 🎉',

  playSolo: 'Tek Başına Oyna',
  playWithFriend: 'Arkadaşınla Oyna',
  playVsAI: 'Bilgisayara Karşı Oyna',
  selectMode: 'Oyun Modunu Seç',
  selectModeSubtitle: 'Başlamak için meydan okuma modunu seçin',
  aiModeDesc: 'Yapay Zekaya Karşı (%90 Zorluk)',
  friendModeDesc: 'Aynı cihazda arkadaşınızla yarışın',
  soloModeDesc: 'Kendi rekorunuzu kırın ve yüksek doğruluk elde edin',
  friendTurnDesc: 'Sırayla kozlarınızı paylaşın',
  soloResultSubtitle: 'Tekli Meydan Okuma Sonucu',
  versusResultSubtitle: 'Birebir Rekabet Sonuçları',

  player1Default: '1. Oyuncu',
  player2Default: '2. Oyuncu',
  computerName: 'Bilgisayar (Zeki)',
  player1Turn: '1. Oyuncunun Sırası',
  player2Turn: '2. Oyuncunun Sırası',
  computerTurn: 'Bilgisayarın Sırası',
  winner: 'Kazanan!',
  draw: 'Berabere!',
  congratulations: 'Tebrikler!',
  gameOver: 'Oyun Bitti',
  passDeviceTo: 'Cihazı şuna verin:',
  startPlayerTurn: 'Sırayı başlat:',
  finishedTurn: 'turunu tamamladı',

  score: 'Skor',
  accuracy: 'Doğruluk',
  time: 'Süre',
  attempts: 'Deneme',
  bestScore: 'En İyi Skor',
  targetTime: 'Hedef Süre',
  actualTime: 'Gerçek Süre',
  difference: 'Fark',
  grade: 'Değerlendirme',
  level: 'Seviye',
  round: 'Tur',
  excellent: 'Mükemmel! 🌟',
  veryGood: 'Çok İyi! 👏',
  good: 'İyi 👍',
  tryAgain: 'Tekrar Dene 🎯',

  soundEffects: 'Ses Efektleri',
  vibration: 'Titreşim',
  appLanguage: 'Uygulama Dili',
  player1NameLabel: '1. Oyuncu Adı',
  player2NameLabel: '2. Oyuncu Adı',
  resetNames: 'Varsayılan İsimlere Dön',
  showPreGameInfo: 'Oyuna başlamadan önce açıklamayı göster',
  resetSettings: 'Tüm Ayarları Sıfırla',

  games: {
    'perfect-hold': {
      title: 'Perfect Hold',
      desc: 'Milisaniyelik hassasiyetle içsel zaman hissi yarışı',
      guide: [
        '1.00 ile 60.00 saniye arasında rastgele hedef süre verilir.',
        'Hedef süreyi kaybolmadan önce dikkatlice ezberleyin.',
        'Sayaç gizlendiğinde başla butonuna basıp zamanı hissedin.',
        'Görsel sayaç olmadan zaman dolduğunda dur butonuna basın.',
        'Hedefe en yakın olan kazanır!'
      ],
      targetMsg: 'Hedef Süre:',
      memorizeMsg: 'Bu süreyi ezberleyin, şimdi gizlenecek!',
      stopWhenReady: 'Sessiz sayaç çalışıyor... Hazır olunca DUR butonuna basın!',
      pressToStart: 'Sessiz sayacı başlatmak için Basın',
      stop: 'ŞİMDİ DUR'
    },
    '21-game': {
      title: '21 Game',
      desc: 'Arkadaşa veya zeki yapay zekaya karşı taktiksel sayma oyunu',
      guide: [
        'Oyuncular 1’den başlayarak sırayla sayar.',
        'Sıranızda 1, 2 veya 3 ardışık sayı söyleyebilirsiniz.',
        'Bir turda 3’ten fazla sayı söyleyemezsiniz.',
        '21 sayısını söylemek zorunda kalan oyuncu kaybeder!'
      ],
      currentCount: 'Mevcut Sayı:',
      say1: '1 sayı söyle (+1)',
      say2: '2 sayı söyle (+2)',
      say3: '3 sayı söyle (+3)',
      forced21Lose: '21 demek zorunda kaldı ve kaybetti!'
    },
    'perfect-line': {
      title: 'Perfect Line',
      desc: 'Referans çizgi uzunluğuna hassas çizim testi',
      guide: [
        'Birkaç saniyeliğine referans bir çizgi görünür.',
        'Kaybolmadan önce uzunluğu iyice ezberleyin.',
        'Parmağınızla hedef uzunlukta tek bir çizgi çizin.',
        'Uygulama uzunluk farkını ve doğruluk yüzdesini hesaplar.'
      ],
      refLineMsg: 'Bu referans çizgi uzunluğunu ezberleyin:',
      drawNow: 'Parmağınızla hedef uzunlukta bir çizgi çizin:',
      drawnLength: 'Çizdiğiniz Uzunluk:',
      targetLength: 'Hedef Uzunluk:',
      clearCanvas: 'Temizle'
    },
    'perfect-circle': {
      title: 'Perfect Circle',
      desc: 'Tek dokunuşla pürüzsüz ve mükemmel bir daire çizin',
      guide: [
        'Rehber bir daire kısa süreliğine görünür.',
        'Kaybolduktan sonra parmağınızla tek hareketle daire çizin.',
        'Sistem yuvarlaklığı ve pürüzsüzlüğü değerlendirir.',
        'En yüksek daire puanını alan kazanır!'
      ],
      refCircleMsg: 'Mükemmel rehber daireyi inceleyin:',
      drawCircleNow: 'Mümkün olduğunca pürüzsüz bir daire çizin:',
      smoothness: 'Pürüzsüzlük',
      circularity: 'Yuvarlaklık Oranı'
    },
    'memory-order': {
      title: 'Memory Order',
      desc: 'Işıklı buton dizilimlerini hatırlama görsel hafıza testi',
      guide: [
        'Renkli butonlar belirli bir sırayla yanar.',
        'Sıralamayı dikkatlice izleyin ve ezberleyin.',
        'Butonlara aynı sırayla basarak dizilimi tekrarlayın.',
        'Başarılı olduğunuz her seviyede dizilim uzar!'
      ],
      watchSequence: 'Sıralamayı dikkatlice izleyin...',
      repeatSequence: 'Sıra sizde! Sıralamayı tekrarlayın:',
      correctSequence: 'Doğru sıralama!',
      wrongSequence: 'Yanlış sıralama!'
    },
    'color-trap': {
      title: 'Color Trap',
      desc: 'Kelime anlamı ile mürekkep rengi arasındaki Stroop tuzağı',
      guide: [
        'Renk kelimeleri farklı mürekkep renkleriyle yazılır.',
        'ÖNEMLİ: Yazılan kelimeye değil, **MÜREKKEP RENGİNE** basın!',
        'Örnek: MAVİ mürekkeple yazılmış "KIRMIZI" kelimesi -> MAVİ’ye basın!',
        'Hızlı odaklanma ve karar verme gerektirir.'
      ],
      clickInkColor: 'Metnin MÜREKKEP RENGİNE basın:',
      red: 'Kırmızı',
      blue: 'Mavi',
      green: 'Yeşil',
      yellow: 'Sarı',
      purple: 'Mor',
      orange: 'Turuncu'
    },
    'code-break': {
      title: 'Code Break',
      desc: '4 haneli gizli şifreyi renkli ipuçlarıyla çözün',
      guide: [
        '4 haneli gizli şifreyi tahmin edin.',
        '🟢 Yeşil: Rakam doğru ve yeri doğru.',
        '🔵 Mavi: Rakam doğru ama yeri yanlış.',
        '🔴 Kırmızı: Rakam şifrede yok.',
        'En az denemede çözmek için önceki tahminleri kullanın.'
      ],
      legendGreen: '🟢 Rakam doğru & yeri doğru',
      legendBlue: '🔵 Rakam doğru, yeri yanlış',
      legendRed: '🔴 Rakam şifrede yok',
      guessPlaceholder: '4 rakam girin...',
      submitGuess: 'Tahmini Gönder',
      history: 'Önceki Tahminler',
      codeCracked: 'Şifre başarıyla çözüldü! 🎉'
    },
    'copy-move': {
      title: 'Copy Move',
      desc: 'Ok yönlerini ve ses ritimlerini hatırlayıp tuvalde çizin',
      guide: [
        'Ok yönleri ses efektleriyle teker teker görünür.',
        'Dizilim bitince beyaz bir çizim defteri açılır.',
        'Parmağınızı sürükleyerek (Yukarı, Aşağı, Sol, Sağ) oku çizin.',
        'Uygulama hareketinizi oku çevirir. Bir hata turu bitirir!'
      ],
      watchArrows: 'Ok hareketlerini ve ritmi ezberleyin:',
      drawOnPad: 'Çizim defterinde sırayla sürükleyin:',
      up: 'Yukarı ⬆️',
      down: 'Aşağı ⬇️',
      left: 'Sol ⬅️',
      right: 'Sağ ➡️'
    },
    'missing-piece': {
      title: 'Missing Piece',
      desc: 'Hangi parçanın kaybolduğunu bulma hızlı hafıza oyunu',
      guide: [
        'Renkli objeler 3 saniye boyunca gösterilir.',
        'Bir obje kaybolur ve yeri boş kalır (?).',
        'Hangi objenin kaybolduğunu hatırlayıp yerine yerleştirin.',
        'Obje sayısı 4’ten 8’e kadar zorlaşarak artar.'
      ],
      memorizeItems: 'Tüm objeleri inceleyin, birazdan biri kaybolacak:',
      findMissing: 'Boş yerdeki kayıp obje hangisi?',
      dropHere: 'Objeyi buraya sürükleyin'
    },
    'wrong-answer': {
      title: 'Wrong Answer',
      desc: 'Kasıtlı olarak yanlış cevabı seçmeye dayalı hız ve odaklanma oyunu',
      guide: [
        'Sadece 2 seçenekli çok basit ve net bir soru belirir.',
        'Amacınız doğru cevabı seçmek DEĞİL, bilerek YANLIŞ cevaba tıklamaktır!',
        'Her soru için sadece 5 saniyeniz vardır!',
        'Mantıken doğru cevabı seçerseniz veya süre dolarsa hemen kaybedersiniz.'
      ],
      chooseWrong: 'Kasıtlı olarak YANLIŞ cevaba tıklayın!',
      timeLeft: 'Kalan Süre',
      avgTime: 'Ortalama Yanıt Süresi'
    },
    'number-rush': {
      title: 'Number Rush',
      desc: '1’den 25’e kadar sayıları sırasıyla tıklama göz ve hız oyunu',
      guide: [
        '1’den 25’e kadar sayıların rastgele dizildiği 5x5’lik bir ızgara görünür.',
        'Sayıları sırasıyla tıklamalısınız: 1 -> 2 -> 3 ... 25’e kadar.',
        'Süre 1’e tıklandığında başlar, 25’e tıklandığında biter.',
        'En hızlı süreyi elde edip efsanevi unvanı kazanmak için hata yapmayın!'
      ],
      nextNumber: 'Sıradaki Hedef Sayı',
      currentNumber: 'Mevcut Sayı',
      rankLegendary: '👑 Efsanevi',
      rankGold: '🥇 Altın',
      rankSilver: '🥈 Gümüş',
      rankBronze: '🥉 Bronz',
      timeDifference: 'En İyi Süreden Fark',
      tapToStart: 'Başlamak için (1) numarasına dokunun!',
      tapInOrder: 'Sayıları en hızlı şekilde 1’den 25’e kadar sırayla dokunun!'
    },
    'tic-tac-toe': {
      title: 'Tic-Tac-Toe XO',
      desc: 'Klasik X-O strateji oyunu bilgisayara (%90 zorluk) veya arkadaşa karşı',
      guide: [
        'Sırayla 3x3 ızgaraya sembolünüzü (X veya O) yerleştirin.',
        'Yatay, dikey veya çapraz olarak 3 aynı sembolü sıraya dizmeyi hedefleyin.',
        'Bilgisayara karşı oynarken yapay zeka %90 zorluk seviyesinde (Çok Zor) çalışır!',
        'Kazanmak veya rakibinizi engellemek için stratejinizi kullanın.'
      ],
      playerX: 'Oyuncu X',
      playerO: 'Oyuncu O',
      aiTurn: 'Bilgisayar düşünüyor...',
      yourTurn: 'Sıra Sende!',
      xWins: 'X Kazandı! 🎉',
      oWins: 'O Kazandı! 🎉',
      draw: 'Berabere! 🤝',
      difficulty: 'Zorluk',
      hardAI: 'Süper Zeka (%90)',
      score: 'Puan',
      round: 'Raund'
    },
    'same-word': {
      title: 'Tek Kelime 🗣️',
      desc: 'Telefonu elden ele geçirerek kelime çağrışımı yapma oyunu!',
      guide: [
        '1. Tur: Her oyuncu gizlice rastgele bir kelime girer.',
        'İki kelime de ekranda yan yana gösterilir.',
        'Sonraki turlar: İki kelimeyi birleştiren ortak bir kelime yazın.',
        'İki oyuncu da AYNI kelimeyi yazdığında -> ZAFER! 🎉'
      ],
      quickHowToPlay: '💡 Hızlı Nasıl Oynanır:',
      step1: '1. Tur: Her oyuncu gizli ve rastgele bir kelime yazar.',
      step2: 'İki kelime gösterilir, ardından her oyuncu ortak bir kelime girer.',
      step3: 'İkiniz de BİREBİR AYNI kelimeyi yazarsanız ← KAZANDINIZ! 🎉',
      targetWordsNextRound: 'Gelecek tur için hedef kelimeler:',
      readyToStart: 'Hazırım (Başlamak için Dokunun)',
      privacyNotice: 'Diğer oyuncunun düğmeye dokunana kadar ekranı görmediğinden emin olun!',
      initialRoundHint: 'Başlangıç Turu: Rastgele bir kelime girin',
      bridgeRoundHint: '{round}. Tur: Bağlantı kelimesini girin',
      thinkBridgeWord: 'İkisini bağlayan ortak bir kelime düşünün:',
      inputSecretPlaceholder: 'Gizli kelimenizi girin...',
      inputBridgePlaceholder: 'Bağlantı kelimesini girin...',
      confirmWord: 'Kelimeyi Onayla',
      mismatchTitle: 'Kelimeler henüz eşleşmedi!',
      mismatchSub: 'Farklı kelimeler girdiniz. Bunlar gelecek turun hedef kelimeleri olacak!',
      mismatchTargetHint: '{round}. Tur Hedefi: Ortak kelimeyi bulun',
      nextRoundBtn: '{round}. Tura Geç',
      perfectMatchBadge: 'Mükemmel Eşleşme!',
      victoryTitle: 'Tebrikler! Aynı kelimede buluştunuz 🎉',
      victoryMsg: 'Eşleşen kelimeye ulaşıldı:',
      sharedWord: 'Ortak Eşleşen Kelime:',
      associationHistory: 'Kelime Çağrışım Geçmişi:',
      historyModalTitle: 'Mevcut Tur Geçmişi',
      helpModalTitle: 'Tek Kelime Kuralları',
      rulesUnderstood: 'Kuralları Anladım!',
      ruleTarget: 'Ana Hedef: Ortak zihin uyumuna ulaşarak birebir aynı kelimeyi yazmak.',
      rule1: '1️⃣ 1. Tur: 1. Oyuncu gizli bir kelime girer, ardından 2. Oyuncu gizli bir kelime girer.',
      rule2: '2️⃣ Sonraki Turlar: Önceki iki kelime gösterilir ve her oyuncu ikisini bağlayan bir kelime yazar.',
      rule3: '3️⃣ Zafer: İki oyuncu da aynı turda birebir aynı kelimeyi yazdığında!'
    },
    'connect-four': {
      title: '4\'ü Bir Arada 🔴🟡',
      desc: 'Renkli pulları sırayla bırakın ve kazanmak için yan yana 4 pul dizin!',
      guide: [
        'Pulunuzu düşürmek istediğiniz sütuna tıklayın.',
        'Yatay, dikey veya çapraz olarak ilk 4 pulu birleştiren kazanır!',
        'Aynı cihazda bir arkadaşınızla veya Kolay, Orta, Zor yapay zeka seviyelerinde oynayın.'
      ],
      p1Wins: '1. Oyuncu Kazandı! 🎉',
      p2Wins: '2. Oyuncu Kazandı! 🎉',
      aiWins: 'Yapay Zeka Kazandı! 🤖',
      draw: 'Berabere! 🤝',
      selectDifficulty: 'Yapay Zeka Seviyesi:',
      easy: 'Kolay 🟢',
      medium: 'Orta 🟡',
      hard: 'Çok Zor 🔴',
      easyDesc: 'Yeni başlayanlar için rahat oyun',
      mediumDesc: 'Kolay zaferleri engelleyen dengeli rakip',
      hardDesc: 'Çift tehditleri hesaplayan dahi seviye',
      p1Turn: '1. Oyuncu (Sarı)',
      p2Turn: '2. Oyuncu (Pembe)',
      aiTurn: 'Yapay Zeka Düşünüyor...',
      aiThinking: 'En iyi hamle hesaplanıyor...',
      dropHere: 'Pulu bırakmak için dokunun',
      winsCount: 'Galibiyet',
      round: 'Tur'
    },
    'bee-hive-defense': {
      title: 'Arı Kovanı Savunması 🐝',
      desc: 'Altın arı kovanını saldıran arılardan koruyun!',
      guide: [
        'Merkez kovana ulaşmadan önce saldıran arılara dokunun.',
        'Ezilen her arı +10 puan kazandırır.',
        'Kovana ulaşan arılar sağlığı azaltır. Sağlık bitince oyun sona erer.'
      ],
      hiveHealth: 'Kovan Sağlığı',
      score: 'Puan',
      bestScore: 'En Yüksek',
      wave: 'Dalga',
      combo: 'Kombo!',
      startGame: 'Savunmayı Başlat',
      howToPlayTitle: 'Nasıl Oynanır',
      rule1: 'Kovana ulaşmadan önce gelen arılara tıklayın.',
      rule2: 'Her ezilen arı +10 puan verir.',
      rule3: 'Kovana ulaşan arı kovan sağlığını düşürür.',
      rule4: 'Zaman geçtikçe arılar daha hızlı ve çok sayıda gelir.',
      rule5: 'Kovan yıkılmadan önce en yüksek skora ulaşın.',
      gameOverTitle: 'Kovan Yıkıldı!',
      newHighScore: 'Yeni Rekor! 🏆',
      beesSquished: 'Ezilen Arılar',
      waveReached: 'Ulaşılan Dalga',
      waveUp: 'Daha Hızlı Saldırı! 🐝',
      warning: 'Kovan Tehlikede! ⚠️',
      newEnemyDiscovered: 'YENİ DÜŞMAN KEŞFEDİLDİ!',
      continue: 'Devam Et',
      ready: 'HAZIR',
      go: 'BAŞLA!',
      hitsRequired: 'Gerekli Vuruş',
      rewardLabel: 'Ödül',
      enemies: {
        speedy: {
          title: 'Mavi Arı',
          description: 'Çok Hızlı',
          hits: '1',
          reward: '+10 Puan'
        },
        fat: {
          title: 'Şişman Arı',
          description: 'İki dokunuş gerektirir',
          hits: '2',
          reward: '+20 Puan'
        },
        zigzag: {
          title: 'Zigzag Arısı',
          description: 'Zigzag çizerek hareket eder',
          hits: '1',
          reward: '+10 Puan'
        },
        queen: {
          title: 'Kraliçe Arı',
          description: 'Güçlü düşman',
          hits: '5',
          reward: '+100 Puan'
        },
        golden: {
          title: 'Altın Arı',
          description: 'Kovan Sağlığının %10\'unu Yeniler',
          hits: '1',
          reward: '%10 Sağlık Yenileme'
        }
      }
    }
  }
};
