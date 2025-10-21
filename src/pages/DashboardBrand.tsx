import { useState, useEffect } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import OpportunityModal from '../components/CreateOpportunityModal';
import ApplicantsModal from '../components/ApplicantsModal';
import '../styles/dashboard.css';

const DashboardBrand = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('opportunities');
  const [modalOpen, setModalOpen] = useState(false);
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [opportunityEditing, setOpportunityEditing] = useState<any>(null);
  const [opportunities, setOpportunities] = useState([]);

  const brandId = localStorage.getItem('brandId') || '';

  // Busca oportunidades da marca
  const fetchOpportunities = async () => {
    try {
      const res = await fetch('http://localhost:3333/opportunities', {
        headers: { 'brand-id': brandId },
      });
      if (!res.ok) throw new Error('Erro ao buscar oportunidades');
      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      console.error('Erro ao buscar oportunidades', err);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleMenuSelect = (item: string) => {
    setActiveMenu(item);
  };

  const handleCreate = () => {
    setOpportunityEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (opportunity: any) => {
    setOpportunityEditing(opportunity);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir essa oportunidade?')) return;

    try {
      const res = await fetch(`http://localhost:3333/opportunities/${id}`, {
        method: 'DELETE',
        headers: { 'brand-id': brandId },
      });

      if (!res.ok) throw new Error('Erro ao excluir oportunidade');

      fetchOpportunities();
    } catch (error) {
      alert('Erro ao excluir oportunidade.');
    }
  };

  return (
    <>
      <SidebarMenu
        userType="brand"
        activeItem={activeMenu}
        onSelectMenuItem={handleMenuSelect}
        isOpen={sidebarOpen}
        toggleOpen={toggleSidebar}
      />

      <main className={`dashboard-container ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        <header className="dashboard-header">
          <h1>Minhas Oportunidades</h1>
          <button className="fab" onClick={handleCreate}>+</button>
        </header>

        <ul className="opportunity-list">
          {opportunities.map((opp: any) => (
            <li key={opp.id} className="opportunity-card">
              <h3 className="opportunity-title">{opp.title}</h3>
              <p>{opp.description}</p>

              <div>
                <strong>Requisitos:</strong>
                <ul className="requirements-list">
                  {opp.requirements.split('\n').map((req: string, index: number) =>
                    req.trim() && <li key={index}>{req.trim()}</li>
                  )}
                </ul>
              </div>

              <small>{new Date(opp.createdAt).toLocaleDateString()}</small>

              <div className="hashtags">
                {opp.hashtags.map((h: any) => (
                  <span key={h.id || h.tag} className="hashtag">#{h.tag || h}</span>
                ))}
              </div>

              <div className="card-actions">
                <button onClick={() => handleEdit(opp)}>Editar</button>
                <button onClick={() => handleDelete(opp.id)}>Excluir</button>
                <button onClick={() => {
                  setSelectedOpportunityId(opp.id);
                  setApplicantsModalOpen(true);
                }}>Ver Candidatos</button>
              </div>
            </li>
          ))}
        </ul>

        {modalOpen && (
          <OpportunityModal
            opportunity={opportunityEditing}
            onClose={() => setModalOpen(false)}
            onSaved={() => {
              setModalOpen(false);
              fetchOpportunities();
            }}
          />
        )}

        {applicantsModalOpen && selectedOpportunityId && (
          <ApplicantsModal
            opportunityId={selectedOpportunityId}
            onClose={() => setApplicantsModalOpen(false)}
          />
        )}
      </main>
    </>
  );
};

export default DashboardBrand;
