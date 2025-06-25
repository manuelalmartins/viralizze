import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';

const DashboardInfluencer: React.FC = () => {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const influencerId = localStorage.getItem('influencerId') || '';

  useEffect(() => {
    fetch('http://localhost:3333/opportunity/list')
      .then((res) => res.json())
      .then(setOpportunities);
  }, []);

  const handleApply = async (opportunityId: string) => {
    const res = await fetch('http://localhost:3333/opportunity/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ influencerId, opportunityId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Erro ao se candidatar.');
    } else {
      alert('Candidatura enviada!');
    }
  };

  return (
    <div className="container">
      <h2>Oportunidades</h2>
      {opportunities.map((opp) => (
        <div key={opp.id} className="opportunity-card">
          <strong>{opp.title}</strong><br />
          <small>{opp.brand.companyName}</small><br />
          <button onClick={() => handleApply(opp.id)}>Candidatar-se</button>
        </div>
      ))}
    </div>
  );
};

export default DashboardInfluencer;
