import React, { useState, useEffect } from 'react';
import { Sprout, Menu, Star, Pin } from 'lucide-react';
import { useMasterPins } from '../hooks/useMasterPins';

interface HeaderProps {
  onNavigate?: (path: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  currentView: string;
}

export function Header({ onNavigate, isMobileMenuOpen, setIsMobileMenuOpen, currentView }: HeaderProps) {
  const { isPinned, pinTool, unpinTool } = useMasterPins(currentView);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const localFav = localStorage.getItem(`fav_${currentView}`);
    setIsFavorite(localFav === 'true');
  }, [currentView]);

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    localStorage.setItem(`fav_${currentView}`, String(newState));
    showToast(newState ? 'Saved to Favorites' : 'Removed from Favorites');
  };

  const togglePin = () => {
    if (isPinned) {
      unpinTool();
      showToast('Unpinned from Dashboard');
    } else {
      pinTool();
      showToast('Pinned to Dashboard');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <>
      <header className="bg-slate-900 border-b-4 border-emerald-500 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 hover:bg-slate-800 rounded-sm text-slate-300 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div 
              className="bg-emerald-500 p-1.5 rounded-sm cursor-pointer"
              onClick={() => onNavigate?.('home')}
            >
              <Sprout className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-bold tracking-widest uppercase text-sm font-mono ml-2 truncate max-w-[150px] sm:max-w-none">Hydroponic Planning Hub</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 hidden sm:inline-block ml-2 border-l border-slate-700 pl-3">Rural Ops Tools</span>
          </div>
          
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button
              onClick={toggleFavorite}
              className={`flex items-center justify-center p-2 rounded-sm border-2 transition-all ${
                isFavorite 
                  ? 'bg-amber-400 border-amber-400 text-black hover:bg-amber-500' 
                  : 'bg-transparent border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
              title="Save to Favorites"
            >
              <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={togglePin}
              className={`flex items-center justify-center p-2 rounded-sm border-2 transition-all ${
                isPinned
                  ? 'bg-emerald-500 border-emerald-500 text-black hover:bg-emerald-600'
                  : 'bg-transparent border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
              title="Pin to Dashboard"
            >
              <Pin className="w-4 h-4" fill={isPinned ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </header>

      {/* Brutalist Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-emerald-500 text-black px-4 py-2 font-mono font-bold text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
}
