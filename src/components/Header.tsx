import { ReactNode } from 'react';
import { Leaf, Navigation2 } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (o: boolean) => void;
}

export function Header({ onNavigate, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  return (
    <nav className="bg-[#2D4031] text-white px-6 py-3 flex items-center justify-between border-b border-emerald-900 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-emerald-800 rounded-md text-emerald-200"
        >
          <Navigation2 className="w-5 h-5" />
        </button>
        <div 
          className="flex items-baseline gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 hidden sm:inline-block">Rural Ops Tools</span>
          <span className="text-lg sm:text-xl font-light sm:border-l border-emerald-700 sm:pl-3 tracking-tight">Hydroponic</span>
        </div>
      </div>
      <div className="text-sm font-medium hidden sm:flex items-center gap-6">
        <button onClick={() => onNavigate('about')} className="hover:text-emerald-300 transition-colors">About</button>
        <button onClick={() => onNavigate('legal')} className="hover:text-emerald-300 transition-colors">Legal</button>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors">GitHub</a>
        <div 
          className="bg-emerald-800 px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer hover:bg-emerald-700 transition"
          onClick={() => onNavigate('favorites')}
        >
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span className="text-xs">Favorites</span>
        </div>
      </div>
    </nav>
  );
}
