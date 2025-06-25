import React, { useEffect, useState } from 'react';
import '../styles/dashboardinfluencer.css';

interface Hashtag {
  id: string;
  tag: string;
}

interface Opportunity {
  id: string;
  title: string;
  description: string;
  requirements: string;
  hashtags: Hashtag[];
  createdAt: string;
}

const DashboardInfluencer: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const influencerId = localStorage.getItem('influencerId') || '';

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3333/opportunities');
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erro ao carregar oportunidades');
        setLoading(false);
        return;
      }
      const data = await response.json();
      setOpportunities(data);
    } catch {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const applyToOpportunity = async (opportunityId: string) => {
    if (!influencerId) {
      alert('Faça login para se candidatar');
      return;
    }

    setApplyingId(opportunityId);
    try {
      const response = await fetch('http://localhost:3333/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencerId,
          opportunityId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Erro ao se candidatar');
        setApplyingId(null);
        return;
      }

      alert('Candidatura enviada com sucesso!');
      setAppliedIds((prev) => [...prev, opportunityId]);
    } catch {
      alert('Erro de conexão ao se candidatar');
    } finally {
      setApplyingId(null);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div className="influencer-dashboard-container">
      <h1>Oportunidades Disponíveis</h1>

      {loading && <p>Carregando oportunidades...</p>}
      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && (
        <ul className="opportunity-list">
          {opportunities.length === 0 && <li>Nenhuma oportunidade disponível.</li>}
          {opportunities.map((opp) => (
            <li key={opp.id} className="opportunity-item">
              <h3>{opp.title}</h3>
              <p>{opp.description || 'Sem descrição'}</p>
              <p><strong>Requisitos:</strong> {opp.requirements || 'Não especificado'}</p>
              <p>
                <strong>Hashtags:</strong>{' '}
                {opp.hashtags?.map((ht) => `#${ht.tag}`).join(' ')}
              </p>
              <small>Criado em: {new Date(opp.createdAt).toLocaleDateString()}</small>

              <button
                className="apply-button"
                disabled={applyingId === opp.id || appliedIds.includes(opp.id)}
                onClick={() => applyToOpportunity(opp.id)}
              >
                {appliedIds.includes(opp.id)
                  ? 'Candidatura enviada'
                  : applyingId === opp.id
                  ? 'Enviando...'
                  : 'Candidatar-se'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardInfluencer;
