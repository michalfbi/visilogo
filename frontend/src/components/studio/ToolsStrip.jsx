import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TOOLS = [
  { href: '/pojedynek', title: 'Pojedynek stron', desc: 'Szybkość Twojej strony na tle rywala, dane z Google.' },
  { href: '/szpieg-reklam', title: 'Szpieg reklam', desc: 'Reklamy, które konkurencja puszcza na Facebooku i w Google.' },
  { href: '/skaner', title: 'Skaner linków', desc: 'Jak wygląda Twój link po wklejeniu na LinkedIn czy w komunikatorze.' },
  { href: '/baza-promptow', title: 'Baza promptów AI', desc: 'Gotowe polecenia do tekstów sprzedażowych B2B.' },
  { href: '/generator-qr', title: 'Generator QR', desc: 'Darmowe kody QR do druku, bez znaków wodnych.' },
];

/* The other free tools, shown at the foot of each tool page. */
const ToolsStrip = ({ current }) => (
  <section className="section--band tools-strip" aria-labelledby="tools-strip-title">
    <div className="container">
      <h2 id="tools-strip-title" className="tools-strip__h">
        Pozostałe darmowe narzędzia
      </h2>
      <ul className="tools-strip__list">
        {TOOLS.filter((t) => t.href !== current).map((tool) => (
          <li key={tool.href}>
            <Link to={tool.href}>
              <strong>
                {tool.title}
                <ArrowUpRight size={16} aria-hidden="true" />
              </strong>
              <span>{tool.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ToolsStrip;
