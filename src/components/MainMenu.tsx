import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Settings,
  Info,
  BookOpen,
  User,
  Users,
  Bot,
  Search,
  Flame,
  Star,
  Zap,
  Grid,
} from 'lucide-react';
import { GAMES_LIST } from '../data/games';
import { getTranslations } from '../i18n/translations';
import { AppSettings, GameId } from '../types';
import { soundManager } from '../utils/sound';
import { getGameThumbnail, getGameThumbnailStyle } from '../utils/gameThumbnails';

interface MainMenuProps {
  settings: AppSettings;
  onSelectGame: (gameId: GameId) => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenGuide: () => void;
}

type FilterCategory = 'all' | 'popular' | 'solo' | 'ai';

export const MainMenu: React.FC<MainMenuProps> = ({
  settings,
  onSelectGame,
  onOpenSettings,
  onOpenAbout,
  onOpenGuide,
}) => {
  const t = getTranslations(settings.language);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Filter games based on search query and active category filter
  const filteredGames = GAMES_LIST.filter((game) => {
    const gameTrans = t.games[game.id as keyof typeof t.games] || {
      title: game.id,
      desc: '',
    };

    const matchesSearch =
      searchQuery.trim() === '' ||
      gameTrans.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gameTrans.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.badge.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'popular') {
      return game.id === 'bee-hive-defense' || game.id === 'tic-tac-toe' || game.id === 'perfect-hold' || game.id === '21-game' || game.id === 'number-rush';
    }
    if (activeFilter === 'solo') {
      return game.supportsSolo;
    }
    if (activeFilter === 'ai') {
      return game.supportsAI;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white select-none relative overflow-x-hidden flex flex-col justify-between">
      {/* Background Decorative Lighting Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-500/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="fixed -bottom-20 -right-20 w-[400px] h-[400px] bg-amber-500/10 blur-3xl pointer-events-none z-0" />
      <div className="fixed -bottom-20 -left-20 w-[400px] h-[400px] bg-pink-500/10 blur-3xl pointer-events-none z-0" />

      {/* Main Top Header Area */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-4 pb-2">
        {/* Navigation Bar / Top Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {/* Creator Tag / Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 font-black text-xs shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="tracking-wide">Created by Sari</span>
          </motion.div>

          {/* Quick Header Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenGuide();
              }}
              title={t.gameGuide}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenAbout();
              }}
              title={t.about}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pink-300 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenSettings();
              }}
              title={t.settings}
              className="p-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-black hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center my-3">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-pink-200 to-indigo-100 bg-clip-text text-transparent drop-shadow-xl mb-1"
          >
            {t.appName}
          </motion.h1>

          <p className="text-xs sm:text-sm text-slate-300/90 font-medium max-w-md mx-auto">
            {t.appSubtitle}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-5 space-y-3">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 rtl:right-3.5 rtl:left-auto top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={settings.language === 'ar' ? 'بحث عن لعبة...' : 'Search games...'}
              className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 rounded-2xl bg-slate-900/90 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/60 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold bg-white/10 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs font-bold">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveFilter('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-lg scale-105'
                  : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{settings.language === 'ar' ? 'الكل' : 'All'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveFilter('popular');
              }}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'popular'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-lg scale-105'
                  : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{settings.language === 'ar' ? 'الأكثر شعبية' : 'Popular'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveFilter('solo');
              }}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'solo'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-lg scale-105'
                  : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20'
              }`}
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.playSolo}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveFilter('ai');
              }}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'ai'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-lg scale-105'
                  : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.playVsAI}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Games Grid Container (2 columns mobile, 3 columns tablet/desktop) */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 py-4 flex-1">
        {filteredGames.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-slate-900/70 border border-white/10 my-8">
            <p className="text-slate-400 font-bold text-sm sm:text-base">
              {settings.language === 'ar' ? 'لا توجد ألعاب تطابق بحثك' : 'No games match your search'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-colors"
            >
              {settings.language === 'ar' ? 'عرض جميع الألعاب' : 'Show All Games'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4.5 md:gap-6 pb-12">
            <AnimatePresence>
              {filteredGames.map((game, index) => {
                const gameTrans = t.games[game.id as keyof typeof t.games] || {
                  title: game.id,
                  desc: '',
                };
                const thumbnailSrc = getGameThumbnail(game.id);

                return (
                  <motion.button
                    key={game.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    whileHover={{ scale: 1.025, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectGame(game.id);
                    }}
                    className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-slate-900/95 border border-white/15 hover:border-amber-400/60 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden cursor-pointer text-right rtl:text-right transition-all duration-300"
                  >
                    {/* Top Thumbnail Image Frame */}
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-950 rounded-t-2xl sm:rounded-t-3xl">
                      {/* Main Crisp Image - Fully Cover Container */}
                      <img
                        src={thumbnailSrc}
                        alt={gameTrans.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';
                        }}
                        className={`w-full h-full ${getGameThumbnailStyle(game.id)} group-hover:scale-105 transition-transform duration-300 ease-out`}
                      />

                      {/* Subtle Top Shadow for Badge Contrast */}
                      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />

                      {/* Badge / Tag Overlay */}
                      <div className="absolute top-2.5 left-2.5 rtl:right-2.5 rtl:left-auto flex items-center gap-1 z-20">
                        {game.id === 'bee-hive-defense' ? (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs shadow-md flex items-center gap-1 animate-pulse">
                            <Flame className="w-3 h-3 text-slate-950 fill-slate-950" />
                            <span>{settings.language === 'ar' ? 'جديد 🔥' : 'NEW 🔥'}</span>
                          </span>
                        ) : game.supportsAI ? (
                          <span className="px-2 py-0.5 rounded-full bg-purple-600/95 border border-purple-300/30 text-white font-extrabold text-[10px] sm:text-[11px] shadow-sm flex items-center gap-1">
                            <Bot className="w-3 h-3 text-purple-200" />
                            <span>VS AI</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-black/75 border border-white/20 text-amber-200 font-extrabold text-[10px] sm:text-[11px] shadow-sm">
                            {game.badge.split(' ')[0]}
                          </span>
                        )}
                      </div>

                      {/* Accent Glow Ring on Hover */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-amber-400/0 group-hover:border-amber-400/40 transition-colors duration-300 pointer-events-none z-20" />
                    </div>

                    {/* Bottom Card Information */}
                    <div className="p-3 sm:p-4 bg-gradient-to-b from-slate-900/90 to-slate-950 flex flex-col justify-between flex-1 gap-1.5 border-t border-white/10">
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-black text-white group-hover:text-amber-300 transition-colors line-clamp-1 leading-snug">
                          {gameTrans.title}
                        </h3>

                        <p className="text-[11px] sm:text-xs text-slate-300/80 line-clamp-1 font-medium mt-0.5">
                          {gameTrans.desc}
                        </p>
                      </div>

                      {/* Game Support Modes Indicator Bar */}
                      <div className="pt-2 mt-1 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-bold">
                        <div className="flex items-center gap-2">
                          {game.supportsSolo && (
                            <span title={t.playSolo} className="flex items-center gap-0.5 text-cyan-300">
                              <User className="w-3 h-3" />
                              <span className="hidden sm:inline">{t.playSolo}</span>
                            </span>
                          )}
                          {game.supportsAI && (
                            <span title={t.playVsAI} className="flex items-center gap-0.5 text-purple-300">
                              <Bot className="w-3 h-3" />
                            </span>
                          )}
                          {game.supportsFriend && (
                            <span title={t.playWithFriend} className="flex items-center gap-0.5 text-pink-300">
                              <Users className="w-3 h-3" />
                            </span>
                          )}
                        </div>

                        <span className="text-amber-400 font-black text-[11px] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                          ▶
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Footer Branding Bar */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 py-3 text-center text-xs text-slate-400 border-t border-white/10 flex items-center justify-between">
        <span className="font-bold text-slate-300">Sari Challenge</span>
        <span className="text-[11px] text-slate-400 font-medium">Created by Sari</span>
      </footer>
    </div>
  );
};
