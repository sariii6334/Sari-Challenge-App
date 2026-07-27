import React, { useState } from 'react';
import { Tv, ExternalLink, X } from 'lucide-react';

interface AdBannerProps {
  language?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ language = 'ar', className = '' }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  const isAr = language === 'ar';

  return (
    <div className={`w-full max-w-md mx-auto my-2 px-2 ${className}`}>
      <div className="relative flex items-center justify-between p-2.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-white shadow-md text-xs overflow-hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-inner">
            <Tv className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-start">
            <div className="flex items-center gap-1.5">
              <span className="bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded text-[10px]">
                {isAr ? 'إعلان' : 'Ad'}
              </span>
              <span className="font-bold text-slate-200 truncate max-w-[180px]">
                {isAr ? 'ساري ألعاب - تحديات لا تنتهي!' : 'Sari Games - Unlimited Challenges!'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              {isAr ? 'حمل أحدث الألعاب بدون إنترنت' : 'Download top offline games'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{isAr ? 'تثبيت' : 'Install'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
            title={isAr ? 'إغلاق الإعلان' : 'Close Ad'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
