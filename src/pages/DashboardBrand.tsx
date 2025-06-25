import React, { useEffect, useState } from 'react';
import '../styles/dashboardbrand.css';
import OpportunityModal from '../components/CreateOpportunityModal';
import ApplicantsModal from '../components/ApplicantsModal';
import { FaTimes, FaPen } from 'react-icons/fa';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  requirements: string;
  hashtags: { tag: string }[];
  createdAt: string;
}

const DashboardBrand: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [opportunityToEdit, setOpportunityToEdit] = useState<Opportunity | null>(null);
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3333/opportunities');
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

  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((eid) => eid !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const openApplicantsModal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOpportunityId(id);
    setApplicantsModalOpen(true);
  };

  const openCreateModal = () => {
    setOpportunityToEdit(null);
    setModalOpen(true);
  };

  const openEditModal = (opp: Opportunity, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpportunityToEdit(opp);
    setModalOpen(true);
  };

  const confirmDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(null);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!deletingId) return;

    try {
      const response = await fetch(`http://localhost:3333/opportunities/${deletingId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao excluir oportunidade');
        return;
      }

      setDeletingId(null);
      fetchOpportunities();
    } catch {
      alert('Erro ao conectar para excluir');
    }
  };

  return (
    <div className="dashboard-brand-container">
      <header className="dashboard-header">
        <h1>Minhas Oportunidades</h1>
        <button className="fab" onClick={openCreateModal} aria-label="Criar nova oportunidade">+</button>
      </header>

      {loading && <p>Carregando oportunidades...</p>}
      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && (
        <ul className="opportunity-list">
          {opportunities.length === 0 && <li>Nenhuma oportunidade publicada ainda.</li>}
          {opportunities.map((opp) => (
            <li
              key={opp.id}
              className={`opportunity-card ${expandedIds.includes(opp.id) ? 'expanded' : ''}`}
              onClick={() => toggleExpand(opp.id)}
              tabIndex={0}
            >
              <div className="opportunity-header">
                <h3 className="opportunity-title">{opp.title}</h3>
                <div className="hashtags">
                  {opp.hashtags.map((tagObj, idx) => (
                    <span key={idx} className="hashtag">
                      #{tagObj.tag}
                    </span>
                  ))}
                </div>
                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => openEditModal(opp, e)}
                    aria-label="Editar oportunidade"
                    title="Editar"
                  >
                    <FaPen />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={(e) => confirmDelete(opp.id, e)}
                    aria-label="Excluir oportunidade"
                    title="Excluir"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {expandedIds.includes(opp.id) && (
                <>
                  <p>{opp.description}</p>
                  <p><strong>Requisitos:</strong> {opp.requirements}</p>
                  <small>Criado em: {new Date(opp.createdAt).toLocaleDateString()}</small>
                  <button
                    className="view-applicants-btn"
                    onClick={(e) => openApplicantsModal(opp.id, e)}
                  >
                    Ver Candidatos
                  </button>
                </>
              )}

              {deletingId === opp.id && (
                <div className="delete-confirmation" onClick={(e) => e.stopPropagation()}>
                  <span>Excluir esta oportunidade?</span>
                  <button className="confirm-btn" onClick={handleDelete}>
                    Sim
                  </button>
                  <button className="cancel-btn" onClick={cancelDelete}>
                    Não
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <OpportunityModal
          opportunity={opportunityToEdit || undefined}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            fetchOpportunities();
          }}
        />
      )}

      {applicantsModalOpen && selectedOpportunityId && (
        <ApplicantsModal opportunityId={selectedOpportunityId} onClose={() => setApplicantsModalOpen(false)} />
      )}
    </div>
  );
};

export default DashboardBrand;
