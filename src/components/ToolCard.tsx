import React from 'react';
import { ToolItem } from '@/types';
import { Star, Calculator, Droplets, Activity, Leaf, Layers, Zap, TrendingUp } from 'lucide-react';
import { cn } from '@/utils';

interface ToolCardProps { key?: React.Key;
  tool: ToolItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpen: (viewId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  'calculator': Calculator,
  'droplets': Droplets,
  'activity': Activity,
  'leaf': Leaf,
  'layers': Layers,
  'zap': Zap,
  'trending-up': TrendingUp
};

export function ToolCard({ tool, isFavorite, onToggleFavorite, onOpen }: ToolCardProps) {
  const Icon = iconMap[tool.iconId] || Calculator;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <button 
          onClick={(e) => onToggleFavorite(tool.id, e)}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            isFavorite ? "text-rose-500 bg-rose-50 hover:bg-rose-100" : "text-slate-300 hover:bg-slate-50 hover:text-rose-400"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className="w-4 h-4" strokeWidth={isFavorite ? 2 : 2} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {tool.category}
      </div>
      <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">{tool.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
        {tool.description}
      </p>
      
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-[10px] uppercase font-bold text-slate-400">{tool.primaryOutcome}</span>
        <button 
          onClick={() => onOpen(tool.viewId)}
          className="text-xs font-semibold text-white hover:text-white bg-slate-900 hover:bg-black px-4 py-2 rounded shadow-sm transition-colors uppercase tracking-wide"
        >
          Open Tool
        </button>
      </div>
    </div>
  );
}
