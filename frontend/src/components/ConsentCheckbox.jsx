import React from 'react';

const ConsentCheckbox = ({ marketingConsent, setMarketingConsent, disabled }) => (
  <label className="check">
    <input
      type="checkbox"
      name="marketing_consent"
      checked={marketingConsent}
      onChange={(e) => setMarketingConsent(e.target.checked)}
      disabled={disabled}
    />
    <span>
      Wyrażam zgodę na otrzymywanie materiałów marketingowych i informacji handlowych od VisiLogo. Rozumiem, że mogę cofnąć zgodę w każdej chwili.
    </span>
  </label>
);

export default ConsentCheckbox;
