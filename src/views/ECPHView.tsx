import { CROPS } from '@/data';

export function ECPHView() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">EC/pH Target Planner</h1>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Recommended target ranges by crop for controlled hydroponic environments.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-5 py-3 border-r border-slate-100">Crop Type</th>
                <th className="px-5 py-3 border-r border-slate-100">Target EC (mS/cm)</th>
                <th className="px-5 py-3">Target pH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {CROPS.map(crop => (
                <tr key={crop.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 whitespace-nowrap font-bold text-slate-800 border-r border-slate-100">{crop.name}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-emerald-800 font-bold border-r border-slate-100"><span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded inline-block">{crop.targetEC}</span></td>
                  <td className="px-5 py-3 whitespace-nowrap text-sky-800 font-bold"><span className="bg-sky-50 text-sky-700 px-2 py-1 rounded inline-block">{crop.targetPH}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Logic & Formulas</h3>
        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
          <li><strong>Target EC:</strong> Represents the recommended Electrical Conductivity for optimal growth in mS/cm.</li>
          <li><strong>Target pH:</strong> Represents the optimal acidity/alkalinity for nutrient availability.</li>
          <li><strong>Note:</strong> Adjustments may be required based on specific environmental temperatures, humidity levels, and plant maturity.</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Frequently Asked Questions</h3>
        <div className="space-y-3 text-xs text-slate-600">
          <div>
            <strong className="block text-slate-700">What if my plants require a higher EC?</strong>
            <p>During fruiting or peak growth stages, certain crops may tolerate higher EC levels. Always monitor plant stress before making significant adjustments.</p>
          </div>
          <div>
            <strong className="block text-slate-700">How often should I check pH?</strong>
            <p>It is recommended to check pH daily in recirculating systems to prevent nutrient lockout caused by pH drift.</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-lg border border-emerald-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-emerald-900 mb-2">Related Tools</h3>
        <div className="flex flex-wrap gap-3 text-xs">
          <a href="/nutrients" className="text-emerald-700 hover:text-emerald-900 underline font-medium">Nutrient Solution Calculator</a>
          <a href="/profit" className="text-emerald-700 hover:text-emerald-900 underline font-medium">Profitability Forecaster</a>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-400 italic">Disclaimer: These targets are industry standard recommendations. Actual optimal levels may vary based on your specific cultivar, light intensity, and system design.</p>
      </div>
    </div>
  );
}
