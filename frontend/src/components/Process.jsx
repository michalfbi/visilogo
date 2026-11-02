import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockProcess } from '../mock';
import { nb } from '../lib/typo';

const Process = () => (
  <section id="process" className="section section--band" aria-labelledby="process-title">
    <div className="container">
      <div className="head">
        <h2 id="process-title">{nb('Od rozmowy do pierwszych zapytań')}</h2>
        <p className="lead">{nb('Cztery etapy w stałej kolejności. Na każdym widzisz postęp i podejmujesz decyzje.')}</p>
      </div>

      <ol className="steps">
        {mockProcess.map((step) => (
          <li key={step.step}>
            <h3>{nb(step.title)}</h3>
            <p>{nb(step.desc)}</p>
          </li>
        ))}
      </ol>

      <div className="section-foot">
        <Link to="/proces" className="btn crop">
          Poznaj szczegóły procesu
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <span className="label">Cały proces trwa najczęściej 4 do 6 tygodni.</span>
      </div>
    </div>
  </section>
);

export default Process;
