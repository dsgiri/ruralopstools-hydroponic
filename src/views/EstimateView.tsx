import { useState, useEffect } from 'react';
import { SYSTEMS } from '@/data';
import { trackEvent } from '@/utils';

export function EstimateView() {
  const [area, setArea] = useState<number>(1000);
  const [systemId, setSystemId] = useState<string>(SYSTEMS[0].id);
  const [elecRate, setElecRate] = useState<number>(0.12);
  
  const selectedSys = SYSTEMS.find(s => s.id === systemId) || SYSTEMS[0];
  
  const setupCost = area * selectedSys.costPerSqFt;
  const powerCostPerMonth = area * selectedSys.powerCostPerSqFtMth * elecRate;
  const annualPower = powerCostPerMonth * 12;

  useEffect(() => {
    trackEvent('tool_completed', { tool_name: 'Startup Cost Estimator' });
    trackEvent('tool_completed', { tool_name: 'Electricity Cost Calculator' });
  }, [area, systemId, elecRate]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Hydroponic Cost Estimator</h1>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Estimate capital setup costs and baseline electricity expenses based on system footprint.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-4 space-y-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm h-min">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">System Parameters</h3>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">System Type</label>
            <select 
              value={systemId}
              onChange={(e) => setSystemId(e.target.value)}
              className="w-full text-sm border-slate-200 rounded border bg-slate-50 p-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SYSTEMS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Growing Area (sq ft)</label>
            <input 
              type="number" 
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full text-sm border-slate-200 rounded border bg-slate-50 p-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Elec. Rate ($/kWh)</label>
            <input 
              type="number" 
              step="0.01"
              value={elecRate}
              onChange={(e) => setElecRate(Number(e.target.value))}
              className="w-full text-sm border-slate-200 rounded border bg-slate-50 p-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="md:col-span-8 space-y-5">
          <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm relative overflow-hidden">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Estimated Capital Expense (CapEx)</h4>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-slate-800 tracking-tight">${setupCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-slate-500 text-xs mt-3">Based on average ${selectedSys.costPerSqFt}/sq.ft. for hardware, plumbing, and basic environmental controls.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">OptEx: Monthly Power</h4>
              <div className="text-3xl font-black text-emerald-800 tracking-tight">${powerCostPerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">OptEx: Annual Power</h4>
              <div className="text-3xl font-black text-emerald-800 tracking-tight">${annualPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase">Estimated Energy Spend</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Logic, Formulas & Insights</h3>
        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 mb-4">
          <li><strong>CapEx:</strong> Growing Area (sq ft) × System Cost Factor ($/sq ft).</li>
          <li><strong>Electricity Formula:</strong> <code className="bg-slate-200 px-1 py-0.5 rounded">lighting (W × hours/day × days) + pump/HVAC load, converted to kWh × price/kWh</code></li>
          <li><strong>Monthly Power:</strong> Growing Area (sq ft) × Power Consumption Factor (kWh/sq ft/month) × Electricity Rate ($/kWh).</li>
          <li><strong>Annual Power:</strong> Monthly Power × 12 months.</li>
        </ul>
        <div className="text-xs text-slate-600 bg-white p-3 rounded border border-slate-200 space-y-2">
          <div>
            <strong className="block text-slate-800 mb-1">LED vs Legacy HID Insight:</strong>
            Research indicates that modern LED grow lights can cut electricity usage by 40-60% compared to older HID (High-Intensity Discharge) lighting setups. This dramatically lowers the OpEx burden on your facility.
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Frequently Asked Questions</h3>
        <div className="space-y-3 text-xs text-slate-600">
          <div>
            <strong className="block text-slate-700">What does the CapEx cover?</strong>
            <p>The estimated capital expense includes primary structural hardware, basic reservoirs, basic plumbing, and standard lighting per square foot. It does not include building construction or land.</p>
          </div>
          <div>
            <strong className="block text-slate-700">Is labor included in the OptEx?</strong>
            <p>No, the operational expense shown here isolates electricity costs. Labor, nutrients, seeds, and water utility costs are separate variables not included in this simple calculation.</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-lg border border-emerald-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-emerald-900 mb-2">Related Tools</h3>
        <div className="flex flex-wrap gap-3 text-xs">
          <a href="/profit" className="text-emerald-700 hover:text-emerald-900 underline font-medium">Profitability Forecaster</a>
          <a href="/ecph" className="text-emerald-700 hover:text-emerald-900 underline font-medium">EC/pH Target Tool</a>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-400 italic">Disclaimer: This calculator provides generalized estimates based on regional averages. Actual costs will vary. Please consult with a contractor or agricultural economist for comprehensive planning.</p>
      </div>
    </div>
  );
}
