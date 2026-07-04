import { SYSTEMS } from '@/data';

export function CompareView() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">System Comparison Tool</h1>
        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Review average metrics across different controlled environment architectures.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-5 py-3 border-r border-slate-100">System Type</th>
                <th className="px-5 py-3 border-r border-slate-100">Est. Setup Cost (sq ft)</th>
                <th className="px-5 py-3 border-r border-slate-100">Power Use (Mo)</th>
                <th className="px-5 py-3">Water Use (Mo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {SYSTEMS.map(sys => (
                <tr key={sys.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 font-bold text-slate-800 whitespace-nowrap border-r border-slate-100">{sys.name}</td>
                  <td className="px-5 py-3 whitespace-nowrap border-r border-slate-100">
                    <span className="font-semibold text-emerald-800 tracking-tight">
                      ${sys.costPerSqFt.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-slate-700 font-medium border-r border-slate-100">{sys.powerCostPerSqFtMth.toFixed(2)} kW/sqft</td>
                  <td className="px-5 py-3 whitespace-nowrap text-slate-700 font-medium">{sys.waterUsageGalSqFtMth.toFixed(1)} gal/sqft</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Logic & Formulas</h3>
        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
          <li><strong>Est. Setup Cost:</strong> Average capital expense to setup one square foot of the specified system type.</li>
          <li><strong>Power Use (Mo):</strong> Expected monthly electricity consumption per square foot in kilowatts.</li>
          <li><strong>Water Use (Mo):</strong> Expected monthly water usage per square foot in gallons.</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Frequently Asked Questions</h3>
        <div className="space-y-3 text-xs text-slate-600">
          <div>
            <strong className="block text-slate-700">Which system is best for me?</strong>
            <p>This depends on your goals, space, and budget. DWC is great for beginners and leafy greens, while NFT is more space-efficient. Ebb and Flow is versatile but requires more media.</p>
          </div>
          <div>
            <strong className="block text-slate-700">Are these numbers guaranteed?</strong>
            <p>No, these are industry averages meant to give you a baseline for planning. Actual costs and usage will depend on your specific equipment and local rates.</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-lg border border-emerald-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-emerald-900 mb-2">Related Tools</h3>
        <div className="flex flex-wrap gap-3 text-xs">
          <a href="/estimate" className="text-emerald-700 hover:text-emerald-900 underline font-medium">Setup Cost Estimator</a>
          <a href="/profit" className="text-emerald-700 hover:text-emerald-900 underline font-medium">Profitability Forecaster</a>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-400 italic">Disclaimer: The metrics provided are approximate baseline figures. Your actual setup costs, power, and water consumption will vary based on geography, equipment brand, and operational efficiency.</p>
      </div>
    </div>
  );
}
