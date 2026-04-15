import React from 'react';

const ConsentCheckbox = ({ marketingConsent, setMarketingConsent, disabled }) => (
  <label className="flex cursor-pointer flex-col gap-3 rounded-3xl border border-white/10 bg-[#050505]/95 p-4 text-sm text-gray-300 sm:flex-row sm:items-start">
    <input
      type="checkbox"
      checked={marketingConsent}
      onChange={(e) => setMarketingConsent(e.target.checked)}
      disabled={disabled}
      className="mt-1 h-5 w-5 shrink-0 rounded-lg border border-white/15 bg-black text-[#00FFD1] focus:ring-2 focus:ring-[#00FFD1] focus:ring-offset-0"
    />
    <span className="leading-relaxed text-sm text-gray-300">
      Wyrażam zgodę na otrzymywanie materiałów marketingowych i informacji handlowych od VisiLogo. Rozumiem, że mogę cofnąć zgodę w każdej chwili.
    </span>
  </label>
);

export default ConsentCheckbox;
