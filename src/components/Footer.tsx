export function Footer({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <footer className="bg-[#F4F5F2] border-t border-slate-200 py-3 px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 mt-auto font-medium">
      <div>
        <span className="italic">Disclaimer: Calculations are based on generalized agricultural models. Verify with your agronomist.</span>
      </div>
      <div className="flex gap-4 flex-wrap justify-center md:justify-end">
        <a href="https://www.ruralopstools.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors uppercase tracking-widest font-bold">Privacy Policy</a>
        <a href="https://www.ruralopstools.com/terms-of-use" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors uppercase tracking-widest font-bold">Terms</a>
        <a href="https://www.ruralopstools.com/disclaimer" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors uppercase tracking-widest font-bold">Disclaimer</a>
        <a href="https://www.ruralopstools.com/contact" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors uppercase tracking-widest font-bold">Contact</a>
        <a href="https://ruralopstools.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors uppercase tracking-widest font-bold">Parent Site</a>
      </div>
    </footer>
  );
}

