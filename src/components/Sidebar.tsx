import { cn } from '@/utils';
import { Home, Calculator, Droplets, Activity, Leaf, Layers, Heart, Info, Scale, ExternalLink } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  className?: string;
  onCloseMobile?: () => void;
}

export function Sidebar({ currentView, onNavigate, className, onCloseMobile }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home },
    { id: 'estimate', label: 'Cost Estimator', icon: Calculator },
    { id: 'nutrients', label: 'Nutrient Calc', icon: Droplets },
    { id: 'ecph', label: 'EC / pH Planner', icon: Activity },
    { id: 'profit', label: 'Profit & ROI', icon: Leaf },
    { id: 'compare', label: 'System Compare', icon: Layers },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];
  
  const systemItems = [
    { id: 'about', label: 'About Tool', icon: Info },
    { id: 'legal', label: 'Legal & Terms', icon: Scale },
  ]

  const navClass = "flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors w-full";

  const handleNav = (id: string) => {
    onNavigate(id);
    onCloseMobile?.();
  }

  return (
    <aside className={cn("bg-[#F4F5F2] md:bg-transparent border-r md:border-none border-slate-200 w-64 flex-shrink-0 min-h-screen pt-6 pb-6 px-4 flex flex-col", className)}>
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm mb-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Primary Tools</h3>
        <nav className="space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={cn(
                navClass,
                currentView === item.id 
                  ? "bg-emerald-50 text-emerald-700 font-bold" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-4 h-4", currentView === item.id ? "text-emerald-600" : "text-slate-400")} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm mb-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Ecosystem Tools</h3>
        <nav className="space-y-1">
          <a href="https://forecast.ruralutilitycost.com/" target="_blank" rel="noopener noreferrer" className={cn(navClass, "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}>
            <ExternalLink className="w-4 h-4 text-slate-400" />
            Forecast
          </a>
          <a href="https://plan.ruralutilitycost.com/" target="_blank" rel="noopener noreferrer" className={cn(navClass, "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}>
            <ExternalLink className="w-4 h-4 text-slate-400" />
            Plan
          </a>
          <a href="https://whatif.ruralutilitycost.com/" target="_blank" rel="noopener noreferrer" className={cn(navClass, "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}>
            <ExternalLink className="w-4 h-4 text-slate-400" />
            WhatIf
          </a>
          <a href="https://predictor.ruralutilitycost.com/" target="_blank" rel="noopener noreferrer" className={cn(navClass, "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}>
            <ExternalLink className="w-4 h-4 text-slate-400" />
            Predictor
          </a>
        </nav>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Resources</h3>
        <nav className="space-y-1">
          {systemItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={cn(
                navClass,
                currentView === item.id 
                  ? "bg-slate-100 text-slate-900" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="w-4 h-4 text-slate-400" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
