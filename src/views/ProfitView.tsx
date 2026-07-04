import { useState } from 'react';
import { CROPS } from '@/data';

export function ProfitView() {
  const [cropId, setCropId] = useState<string>(CROPS[0].id);
  const [area, setArea] = useState<number>(1000);
  const [growCycles, setGrowCycles] = useState<number>(10);
  
  const selectedCrop = CROPS.find(c => c.id === cropId) || CROPS[0];
  
  const yieldPerCycle = area * selectedCrop.yieldPerSqFtLbs;
  const annualYield = yieldPerCycle * growCycles;
  const grossRev = annualYield * selectedCrop.marketPricePerLb;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Crop Profitability & Output</h1>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Forecast annual yield and gross revenue based on crop metrics and cycle velocity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-4 space-y-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm h-min">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Crop Configuration</h3>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Selection</label>
            <select 
              value={cropId}
              onChange={(e) => setCropId(e.target.value)}
              className="w-full text-sm border-slate-200 rounded border bg-slate-50 p-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CROPS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Grow Area (sq ft)</label>
            <input 
              type="number" 
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full text-sm border-slate-200 rounded border bg-slate-50 p-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Cycles per Year</label>
            <input 
              type="number" 
              value={growCycles}
              onChange={(e) => setGrowCycles(Number(e.target.value))}
              className="w-full text-sm border-slate-200 rounded border bg-slate-50 p-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-slate-500">Market Price</span>
            <span className="font-bold text-slate-700 text-sm">${selectedCrop.marketPricePerLb.toFixed(2)} / lb</span>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col gap-5">
          <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm relative overflow-hidden flex-1">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Estimated Gross Revenue</h4>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-slate-800 tracking-tight">${grossRev.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              <span className="text-xs text-slate-500 pb-1 mb-0.5">/ yr</span>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Yield (Lbs/Cycle)</span>
                <p className="text-xl font-bold text-slate-800">{yieldPerCycle.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Annual Yield (Lbs)</span>
                <p className="text-xl font-bold text-slate-800">{annualYield.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Logic & Formulas</h3>
        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
          <li><strong>Yield (Lbs/Cycle):</strong> Grow Area (sq ft) × Average Yield (Lbs/sq ft).</li>
          <li><strong>Annual Yield (Lbs):</strong> Yield (Lbs/Cycle) × Cycles per Year.</li>
          <li><strong>Estimated Gross Revenue:</strong> Annual Yield (Lbs) × Market Price ($/lb).</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Frequently Asked Questions</h3>
        <div className="space-y-3 text-xs text-slate-600">
          <div>
            <strong className="block text-slate-700">Does this calculate net profit?</strong>
            <p>No, this tool provides estimated Gross Revenue. To find your net profit, you must subtract CapEx depreciation, utility OpEx, labor, nutrients, and packaging costs from this figure.</p>
          </div>
          <div>
            <strong className="block text-slate-700">How accurate is the market price?</strong>
            <p>The built-in market prices are regional averages. You should adjust the revenue expectations based on your specific off-taker agreements or direct-to-consumer pricing.</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-lg border border-emerald-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-emerald-900 mb-2">Related Tools</h3>
        <div className="flex flex-wrap gap-3 text-xs">
          <a href="/estimate" className="text-emerald-700 hover:text-emerald-900 underline font-medium">Setup Cost Estimator</a>
          <a href="/compare" className="text-emerald-700 hover:text-emerald-900 underline font-medium">System Scenario Comparison</a>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-400 italic">Disclaimer: These projections are based on idealized growing conditions and stable market prices. Unforeseen biological or market risks are not accounted for. Verify with an agronomist.</p>
      </div>
    </div>
  );
}
