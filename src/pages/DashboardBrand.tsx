// src/pages/DashboardBrand.tsx
import React, { useState, useEffect } from 'react';
import CreateOpportunityModal from '../components/CreateOpportunityModal';
import '../styles/dashboardbrand.css';

interface OpportunityHashtag {
  id: string;
  tag: string;
}

interface Opportunity {
  id: string;
  title: string;
  description?: string;
  requirements?: string;
  hashtags: OpportunityHashtag[];
  createdAt: string;
}

const DashboardBrand: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3333/opportunity/list');
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Erro ao carregar oportunidades');
        return;
      }
      setOpportunities(data);
    } catch {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div className="dashboard-brand-container">
      <h1>Dashboard Marca</h1>

      <button
        className="fab"
        onClick={() => setModalOpen(true)}
        aria-label="Criar nova oportunidade"
      >
        +
      </button>

      {loading && <p>Carregando oportunidades...</p>}
      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && (
        <ul className="opportunity-list">
          {opportunities.length === 0 && (
            <li>Nenhuma oportunidade publicada ainda.</li>
          )}
          {opportunities.map((opp) => (
            <li key={opp.id} className="opportunity-item">
              <h3>{opp.title}</h3>
              <p>{opp.description}</p>
              <p>
                <strong>Requisitos:</strong> {opp.requirements}
              </p>
              <p>
                <strong>Hashtags:</strong>{' '}
                {opp.hashtags?.map((h) => `#${h.tag} `)}
              </p>
              <small>
                Criado em: {new Date(opp.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <CreateOpportunityModal
          onClose={() => setModalOpen(false)}
          onCreated={fetchOpportunities}
        />
      )}
    </div>
  );
};

export default DashboardBrand;
