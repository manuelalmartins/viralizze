import { useState, useEffect } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import '../styles/dashboard.css';

const DashboardInfluencer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('opportunities');

  const influencerId = localStorage.getItem('influencerId') || '';
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Função só pros requisitos, que transforma texto com \n em lista
  const renderRequirementsAsList = (text?: string) => {
    if (!text) return <p>Não informado</p>;
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    if (lines.length === 0) return <p>Não informado</p>;

    return (
      <ul className="requirements-list">
        {lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    );
  };

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/opportunities');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOpportunities(data);
      } else {
        setOpportunities([]);
      }
    } catch {
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch(`http://localhost:3333/applications?influencerId=${influencerId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const ids = data.map((a: any) => a.opportunityId);
        setAppliedIds(ids);
      } else {
        setAppliedIds([]);
      }
    } catch {
      setAppliedIds([]);
    }
  };

  const applyToOpportunity = async (id: string) => {
    try {
      await fetch('http://localhost:3333/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencerId, opportunityId: id }),
      });
      setAppliedIds((prev) => [...prev, id]);
    } catch {
      alert('Erro ao se candidatar');
    }
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleMenuSelect = (item: string) => setActiveMenu(item);

  useEffect(() => {
    fetchOpportunities();
    fetchApplications();
  }, []);

  return (
    <>
      <SidebarMenu
        userType="influencer"
        activeItem={activeMenu}
        onSelectMenuItem={handleMenuSelect}
        isOpen={sidebarOpen}
        toggleOpen={toggleSidebar}
      />
      <main className={`dashboard-container ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        <header className="dashboard-header">
          <h1>Oportunidades Disponíveis</h1>
        </header>

        {loading && <p>Carregando...</p>}
        {!loading && !opportunities.length && <p>Nenhuma oportunidade disponível.</p>}

        <ul className="opportunity-list">
          {opportunities.map((opp: any) => (
            <li key={opp.id} className="opportunity-card">
              <h3 className="opportunity-title">{opp.title}</h3>

              <p>{opp.description || 'Sem descrição'}</p>

              <strong>Requisitos:</strong>
              {renderRequirementsAsList(opp.requirements)}

              <small>{new Date(opp.createdAt).toLocaleDateString()}</small>

              <div className="hashtags">
                {opp.hashtags?.map((h: any) => (
                  <span key={h.id || h.tag} className="hashtag">#{h.tag || h}</span>
                ))}
              </div>

              <button
                className="apply-button"
                disabled={appliedIds.includes(opp.id)}
                onClick={() => applyToOpportunity(opp.id)}
              >
                {appliedIds.includes(opp.id) ? 'CANDIDATURA ENVIADA' : 'Candidatar-se'}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default DashboardInfluencer;
