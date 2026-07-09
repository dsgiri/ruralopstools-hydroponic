import React, { useState } from 'react';
import { TOOLS } from '@/data';
import { ToolCard } from '@/components/ToolCard';

interface HomeViewProps {
  favorites: string[];
  toggleFavorite: (id: string, e: React.MouseEvent) => void;
  onNavigate: (view: string) => void;
}

export function HomeView({ favorites, toggleFavorite, onNavigate }: HomeViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = ['all', 'economics', 'nutrients', 'comparison', 'planning'];
  
  const filteredTools = TOOLS.filter(t => activeCategory === 'all' || t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Hydroponic Planning Hub</h2>
        <p className="text-[10px] uppercase font-bold text-slate-500 mt-1 tracking-wider">Estimate costs, plan nutrients, and forecast profitability.</p>
      </div>

      <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-slate-900 text-white' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map(tool => (
          <ToolCard 
            key={tool.id} 
            tool={tool} 
            isFavorite={favorites.includes(tool.id)}
            onToggleFavorite={toggleFavorite}
            onOpen={onNavigate}
          />
        ))}
        {filteredTools.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No tools found for this category.
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm mt-12 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <details className="group border-b border-slate-100 pb-4" onToggle={(e) => {
            if ((e.target as HTMLDetailsElement).open) {
              import('@/utils').then(m => m.trackEvent('faq_expanded', { question: 'How long does it take for a hydroponic system to pay for itself?' }));
            }
          }}>
            <summary className="text-sm font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center group-open:text-emerald-700">
              How long does it take for a hydroponic system to pay for itself?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Payback period varies enormously by crop type. High-value herbs (like basil and mint) typically pay back in 3-6 months. Leafy greens and lettuces generally take 6-12 months. Fruiting crops like tomatoes and strawberries also take 6-12 months but yield a higher revenue per pound. Microgreens can be the fastest of all, often paying back in under 3 months.
            </p>
          </details>

          <details className="group border-b border-slate-100 pb-4" onToggle={(e) => {
            if ((e.target as HTMLDetailsElement).open) {
              import('@/utils').then(m => m.trackEvent('faq_expanded', { question: 'What\'s the most profitable crop to grow hydroponically?' }));
            }
          }}>
            <summary className="text-sm font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center group-open:text-emerald-700">
              What's the most profitable crop to grow hydroponically?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Herbs (basil, mint, chives) and microgreens are consistently ranked as the most profitable hydroponic crops due to their rapid growth cycles, compact size, and high market value per pound, especially when selling direct-to-consumer or to local restaurants.
            </p>
          </details>

          <details className="group border-b border-slate-100 pb-4" onToggle={(e) => {
            if ((e.target as HTMLDetailsElement).open) {
              import('@/utils').then(m => m.trackEvent('faq_expanded', { question: 'How much does electricity cost for a hydroponic grow system?' }));
            }
          }}>
            <summary className="text-sm font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center group-open:text-emerald-700">
              How much does electricity cost for a hydroponic grow system?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Electricity is one of the largest operational expenses. It primarily depends on your lighting setup (W × hours/day × days) plus your pump and HVAC load. Using modern LED grow lights can cut electricity usage by 40-60% compared to legacy HID systems, significantly lowering costs.
            </p>
          </details>

          <details className="group border-b border-slate-100 pb-4" onToggle={(e) => {
            if ((e.target as HTMLDetailsElement).open) {
              import('@/utils').then(m => m.trackEvent('faq_expanded', { question: 'What EC and pH levels do different crops need?' }));
            }
          }}>
            <summary className="text-sm font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center group-open:text-emerald-700">
              What EC and pH levels do different crops need?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Requirements vary by crop. For example, lettuce typically prefers a lower EC (1.2-1.8) and a pH of 5.8-6.0, whereas heavy fruiting crops like tomatoes need a much higher EC (2.0-5.0) and a pH around 5.5-6.5. Always tailor your nutrient solution to the specific crop you are growing.
            </p>
          </details>

          <details className="group pb-2" onToggle={(e) => {
            if ((e.target as HTMLDetailsElement).open) {
              import('@/utils').then(m => m.trackEvent('faq_expanded', { question: 'Is hydroponic farming actually profitable compared to buying produce?' }));
            }
          }}>
            <summary className="text-sm font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center group-open:text-emerald-700">
              Is hydroponic farming actually profitable compared to buying produce?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              It is nuanced. High-value crops like herbs and microgreens are clearly profitable and easily beat grocery store prices. However, commodities like leafy greens and lettuces often just break even or cost slightly more to grow yourself when factoring in electricity, nutrients, and initial system costs.
            </p>
          </details>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How long does it take for a hydroponic system to pay for itself?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Payback period varies enormously by crop type. High-value herbs (like basil and mint) typically pay back in 3-6 months. Leafy greens and lettuces generally take 6-12 months. Fruiting crops like tomatoes and strawberries also take 6-12 months but yield a higher revenue per pound. Microgreens can be the fastest of all, often paying back in under 3 months."
              }
            },
            {
              "@type": "Question",
              "name": "What's the most profitable crop to grow hydroponically?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Herbs (basil, mint, chives) and microgreens are consistently ranked as the most profitable hydroponic crops due to their rapid growth cycles, compact size, and high market value per pound, especially when selling direct-to-consumer or to local restaurants."
              }
            },
            {
              "@type": "Question",
              "name": "How much does electricity cost for a hydroponic grow system?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Electricity is one of the largest operational expenses. It primarily depends on your lighting setup (W × hours/day × days) plus your pump and HVAC load. Using modern LED grow lights can cut electricity usage by 40-60% compared to legacy HID systems, significantly lowering costs."
              }
            },
            {
              "@type": "Question",
              "name": "What EC and pH levels do different crops need?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Requirements vary by crop. For example, lettuce typically prefers a lower EC (1.2-1.8) and a pH of 5.8-6.0, whereas heavy fruiting crops like tomatoes need a much higher EC (2.0-5.0) and a pH around 5.5-6.5. Always tailor your nutrient solution to the specific crop you are growing."
              }
            },
            {
              "@type": "Question",
              "name": "Is hydroponic farming actually profitable compared to buying produce?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "It is nuanced. High-value crops like herbs and microgreens are clearly profitable and easily beat grocery store prices. However, commodities like leafy greens and lettuces often just break even or cost slightly more to grow yourself when factoring in electricity, nutrients, and initial system costs."
              }
            }
          ]
        })
      }} />
    </div>
  );
}
