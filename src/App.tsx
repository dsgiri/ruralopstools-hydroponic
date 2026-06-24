import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { trackEvent } from '@/utils';

// Views
import { HomeView } from '@/views/HomeView';
import { EstimateView } from '@/views/EstimateView';
import { NutrientsView } from '@/views/NutrientsView';
import { ECPHView } from '@/views/ECPHView';
import { ProfitView } from '@/views/ProfitView';
import { CompareView } from '@/views/CompareView';
import { FavoritesView } from '@/views/FavoritesView';
import { AboutView, LegalView, ContactView } from '@/views/SharedViews';
import { NotFoundView } from '@/views/NotFoundView';

const VIEW_TITLES: Record<string, string> = {
  home: 'Dashboard | Hydroponic Planning Hub',
  estimate: 'Cost Estimator | Hydroponic',
  nutrients: 'Nutrient Calculator | Hydroponic',
  ecph: 'EC / pH Planner | Hydroponic',
  profit: 'Profit & ROI | Hydroponic',
  compare: 'System Comparison | Hydroponic',
  favorites: 'Saved Tools | Hydroponic',
  about: 'About | Hydroponic Planning Hub',
  legal: 'Legal & Disclaimers | Hydroponic',
  contact: 'Contact Us | Hydroponic Planning Hub'
};

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('hydroponic_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Update document title and track GA page view
  useEffect(() => {
    document.title = VIEW_TITLES[currentView] || 'Hydroponic Planning Hub';
    trackEvent('page_view', { page_path: `/${currentView}` });
  }, [currentView]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('hydroponic_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView favorites={favorites} toggleFavorite={toggleFavorite} onNavigate={handleNavigate} />;
      case 'estimate':
        return <EstimateView />;
      case 'nutrients':
        return <NutrientsView />;
      case 'ecph':
        return <ECPHView />;
      case 'profit':
        return <ProfitView />;
      case 'compare':
        return <CompareView />;
      case 'favorites':
        return <FavoritesView favorites={favorites} toggleFavorite={toggleFavorite} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutView />;
      case 'legal':
        return <LegalView />;
      case 'contact':
        return <ContactView />;
      default:
        return <NotFoundView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F2] flex flex-col font-sans text-slate-800 select-none">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold z-50 shadow-lg">
        Skip to main content
      </a>
      <Header 
        onNavigate={handleNavigate} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 transform w-64 bg-[#F4F5F2] shadow-xl md:shadow-none transition-transform duration-200 ease-in-out flex flex-col
          md:relative md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex-1 overflow-y-auto">
            <Sidebar 
              currentView={currentView} 
              onNavigate={handleNavigate} 
              onCloseMobile={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto flex flex-col pt-4">
          
          <main id="main-content" tabIndex={-1} className="flex-1 px-6 pb-6 w-full max-w-[1400px] mx-auto z-0 outline-none">
            {renderView()}
          </main>
          
          <Footer onNavigate={handleNavigate} />
        </div>
      </div>
      <CookieBanner />
    </div>
  );
}
