import React, { useState, useEffect } from 'react';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 text-white p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl translate-y-0 shadow-slate-900" role="dialog" aria-labelledby="cookie-banner-text">
      <div className="flex items-start gap-4 flex-1">
        <svg className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p id="cookie-banner-text" className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          We use cookies and analytical tracking to improve your experience and analyze site traffic on the Rural Ops Tools platform. By continuing to use this site, you agree to our GDPR-compliant tracking policies as detailed in our Privacy Policy.
        </p>
      </div>
      <button 
        onClick={accept} 
        className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-8 rounded min-h-[48px] whitespace-nowrap transition-colors focus:ring-4 focus:ring-emerald-500/50 outline-none"
        aria-label="Accept cookies"
      >
        Accept & Close
      </button>
    </div>
  );
}
