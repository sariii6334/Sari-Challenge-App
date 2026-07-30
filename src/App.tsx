/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AppSettings, GameId, GameMode, GameResult, Language } from './types';
import { loadSettings, saveSettings } from './utils/storage';
import { soundManager } from './utils/sound';

import { SplashScreen } from './components/SplashScreen';
import { LanguageSelection } from './components/LanguageSelection';
import { Navbar } from './components/Navbar';
import { MainMenu } from './components/MainMenu';
import { SettingsModal } from './components/SettingsModal';
import { AboutModal } from './components/AboutModal';
import { GameGuideModal } from './components/GameGuideModal';
import { GameExplanationModal } from './components/GameExplanationModal';
import { ModeSelectionModal } from './components/ModeSelectionModal';
import { GameResultModal } from './components/GameResultModal';

// Game Components - Lazy loaded so each game's code only downloads when the player opens it
const PerfectHold = lazy(() => import('./components/games/PerfectHold').then(m => ({ default: m.PerfectHold })));
const Game21 = lazy(() => import('./components/games/Game21').then(m => ({ default: m.Game21 })));
const PerfectLine = lazy(() => import('./components/games/PerfectLine').then(m => ({ default: m.PerfectLine })));
const PerfectCircle = lazy(() => import('./components/games/PerfectCircle').then(m => ({ default: m.PerfectCircle })));
const MemoryOrder = lazy(() => import('./components/games/MemoryOrder').then(m => ({ default: m.MemoryOrder })));
const ColorTrap = lazy(() => import('./components/games/ColorTrap').then(m => ({ default: m.ColorTrap })));
const CodeBreak = lazy(() => import('./components/games/CodeBreak').then(m => ({ default: m.CodeBreak })));
const CopyMove = lazy(() => import('./components/games/CopyMove').then(m => ({ default: m.CopyMove })));
const MissingPiece = lazy(() => import('./components/games/MissingPiece').then(m => ({ default: m.MissingPiece })));
const WrongAnswer = lazy(() => import('./components/games/WrongAnswer').then(m => ({ default: m.WrongAnswer })));
const NumberRush = lazy(() => import('./components/games/NumberRush').then(m => ({ default: m.NumberRush })));
const TicTacToe = lazy(() => import('./components/games/TicTacToe').then(m => ({ default: m.TicTacToe })));
const SameWord = lazy(() => import('./components/games/SameWord').then(m => ({ default: m.SameWord })));
const ConnectFour = lazy(() => import('./components/games/ConnectFour').then(m => ({ default: m.ConnectFour })));
const BeeHiveDefense = lazy(() => import('./components/games/BeeHiveDefense').then(m => ({ default: m.BeeHiveDefense })));

// Simple loading fallback shown for the brief moment a game's code is downloading
const GameLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [currentScreen, setCurrentScreen] = useState<
    'splash' | 'language_selection' | 'main_menu' | 'game_play'
  >('splash');

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Active game setup state
  const [selectedGameId, setSelectedGameId] = useState<GameId | null>(null);
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode>('solo');
  const [gameSessionId, setGameSessionId] = useState<number>(0);
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [isModeSelectionOpen, setIsModeSelectionOpen] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);

  // Counter used to show an interstitial ad twice every 5 finished games
  const [gamesPlayedCount, setGamesPlayedCount] = useState<number>(0);

  // Update HTML document direction and sound settings whenever settings change
  useEffect(() => {
    soundManager.updateSettings(settings.soundEnabled, settings.vibrationEnabled);
    const htmlElem = document.documentElement;
    htmlElem.lang = settings.language;
    htmlElem.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
  }, [settings]);

  const handleUpdateSettings = (newPartial: Partial<AppSettings>) => {
    const updated = { ...settings, ...newPartial };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSplashFinish = () => {
    if (!settings.hasSelectedLanguage) {
      setCurrentScreen('language_selection');
    } else {
      setCurrentScreen('main_menu');
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    const updated = {
      ...settings,
      language: lang,
      hasSelectedLanguage: true,
    };
    setSettings(updated);
    saveSettings(updated);
    setCurrentScreen('main_menu');
  };

  const handleSelectGameCard = (gameId: GameId) => {
    setSelectedGameId(gameId);
    if (settings.showPreGameExplanation) {
      setIsExplanationOpen(true);
    } else {
      setIsModeSelectionOpen(true);
    }
  };

  const handleStartFromExplanation = () => {
    setIsExplanationOpen(false);
    setIsModeSelectionOpen(true);
  };

  const handleToggleDontShowExplanation = (dontShow: boolean) => {
    handleUpdateSettings({ showPreGameExplanation: !dontShow });
  };

  const handleStartGameWithMode = (mode: GameMode) => {
    setSelectedGameMode(mode);
    setIsModeSelectionOpen(false);
    setGameSessionId((prev) => prev + 1);
    setCurrentScreen('game_play');
  };

  const handleGameFinish = (result: GameResult) => {
    window.AndroidAds?.prepareForTransition?.();
    setGameResult(result);
    setIsResultOpen(true);

    setGamesPlayedCount((prev) => {
      const next = prev + 1;
      const cyclePos = next % 5;
      // يعرض إعلان بيني عند اللعبة الثانية والخامسة من كل دورة 5 ألعاب
      if ((cyclePos === 2 || cyclePos === 0) && window.AndroidAds?.showInterstitialAd) {
        window.AndroidAds.showInterstitialAd();
      }
      return next;
    });
  };

  const handlePlayAgain = () => {
    setIsResultOpen(false);
    // Restart current game with fresh component state
    setGameSessionId((prev) => prev + 1);
    setCurrentScreen('game_play');
  };

  const handleReturnToMainMenu = () => {
    setIsResultOpen(false);
    setSelectedGameId(null);
    setCurrentScreen('main_menu');
  };

  const renderActiveGame = () => {
    if (!selectedGameId) return null;

    const gameKey = `${selectedGameId}-${selectedGameMode}-${gameSessionId}`;

    const gameProps = {
      mode: selectedGameMode,
      settings,
      onFinish: handleGameFinish,
      onBack: handleReturnToMainMenu,
    };

    switch (selectedGameId) {
      case 'perfect-hold':
        return <PerfectHold key={gameKey} {...gameProps} />;
      case '21-game':
        return <Game21 key={gameKey} {...gameProps} />;
      case 'perfect-line':
        return <PerfectLine key={gameKey} {...gameProps} />;
      case 'perfect-circle':
        return <PerfectCircle key={gameKey} {...gameProps} />;
      case 'memory-order':
        return <MemoryOrder key={gameKey} {...gameProps} />;
      case 'color-trap':
        return <ColorTrap key={gameKey} {...gameProps} />;
      case 'code-break':
        return <CodeBreak key={gameKey} {...gameProps} />;
      case 'copy-move':
        return <CopyMove key={gameKey} {...gameProps} />;
      case 'missing-piece':
        return <MissingPiece key={gameKey} {...gameProps} />;
      case 'wrong-answer':
        return <WrongAnswer key={gameKey} {...gameProps} />;
      case 'number-rush':
        return <NumberRush key={gameKey} {...gameProps} />;
      case 'tic-tac-toe':
        return <TicTacToe key={gameKey} {...gameProps} />;
      case 'same-word':
        return <SameWord key={gameKey} {...gameProps} />;
      case 'connect-four':
        return <ConnectFour key={gameKey} {...gameProps} />;
      case 'bee-hive-defense':
        return <BeeHiveDefense key={gameKey} {...gameProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Splash Screen */}
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      {/* 2. Language Selection Screen */}
      {currentScreen === 'language_selection' && (
        <LanguageSelection
          currentLanguage={settings.language}
          onSelectLanguage={handleLanguageSelect}
        />
      )}

      {/* 3. Main Application Flow */}
      {(currentScreen === 'main_menu' || currentScreen === 'game_play') && (
        <div className={`flex flex-col ${currentScreen === 'game_play' ? 'h-screen h-[100dvh] w-full overflow-hidden' : 'min-h-screen'}`}>
          {currentScreen === 'main_menu' && (
            <Navbar
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenAbout={() => setIsAboutOpen(true)}
              onOpenGuide={() => setIsGuideOpen(true)}
            />
          )}

          <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {currentScreen === 'main_menu' ? (
              <MainMenu
                settings={settings}
                onSelectGame={handleSelectGameCard}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenAbout={() => setIsAboutOpen(true)}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            ) : (
              <Suspense fallback={<GameLoadingFallback />}>
                {renderActiveGame()}
              </Suspense>
            )}
          </main>
        </div>
      )}

      {/* Global Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSet) => {
          setSettings(newSet);
          saveSettings(newSet);
        }}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        settings={settings}
      />

      <GameGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        settings={settings}
        onSelectGame={(gId) => {
          setIsGuideOpen(false);
          handleSelectGameCard(gId);
        }}
      />

      <GameExplanationModal
        isOpen={isExplanationOpen}
        gameId={selectedGameId}
        settings={settings}
        onStart={handleStartFromExplanation}
        onCancel={() => setIsExplanationOpen(false)}
        onToggleDontShow={handleToggleDontShowExplanation}
      />

      <ModeSelectionModal
        isOpen={isModeSelectionOpen}
        gameId={selectedGameId}
        settings={settings}
        onSelectMode={handleStartGameWithMode}
        onClose={() => setIsModeSelectionOpen(false)}
      />

      <GameResultModal
        isOpen={isResultOpen}
        result={gameResult}
        settings={settings}
        onPlayAgain={handlePlayAgain}
        onMainMenu={handleReturnToMainMenu}
      />
    </div>
  );
}
