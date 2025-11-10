import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import '../styles/dashboard.css';

const DashboardInfluencer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('opportunities');
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [filteredOpps, setFilteredOpps] = useState<any[]>([]);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('recentes');

  const influencerId = localStorage.getItem('influencerId') || '';
  const influencerName = localStorage.getItem('influencerName') || 'Influencer';
  const navigate = useNavigate();

  useEffect(() => {
    fetchOpportunities();
    fetchApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, selectedTags, sortOption, opportunities]);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/opportunities');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOpportunities(data);
        const tags = new Set(
          data.flatMap((opp) => opp.hashtags?.map((h: any) => h.tag))
        );
        setAllTags(Array.from(tags));
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

  const applyFilters = () => {
    let filtered = opportunities;

    if (search) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(search.toLowerCase()) ||
          opp.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((opp) =>
        opp.hashtags?.some((h: any) => selectedTags.includes(h.tag))
      );
    }

    if (sortOption === 'recentes') {
      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      filtered = filtered.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    setFilteredOpps(filtered);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const renderRequirementsAsList = (text?: string) => {
    if (!text) return <p>Não informado</p>;
    const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
    return (
      <ul className="requirements-list">
        {lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    );
  };

  const handleMenuSelect = (item: string) => {
    setActiveMenu(item);
    switch (item) {
      case 'profile':
        navigate(`/profile/${influencerId}`);
        break;
      case 'opportunities':
        navigate('/dashboard-influencer');
        break;
      case 'feed':
        navigate('/feed');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`dashboard-wrapper ${sidebarOpen ? '' : 'sidebar-closed'}`}>
      <SidebarMenu
        userType="influencer"
        activeItem={activeMenu}
        onSelectMenuItem={handleMenuSelect}
        isOpen={sidebarOpen}
        toggleOpen={() => setSidebarOpen((prev) => !prev)}
      />

      <main className="dashboard-container">
        <header className="dashboard-header search-header">
          <div>
            <h1>Olá, {influencerName}</h1>
            <p>Encontre colaborações que combinam com seu estilo</p>
          </div>

          <div className="filters-container">
            <input
              type="text"
              placeholder="Buscar oportunidades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recentes">Mais recentes</option>
              <option value="antigas">Mais antigas</option>
            </select>
          </div>
        </header>

        <div className="tag-filter">
          {allTags.map((tag) => (
            <span
              key={tag}
              className={`filter-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>

        {loading ? (
          <p>Carregando oportunidades...</p>
        ) : filteredOpps.length === 0 ? (
          <p>Nenhuma oportunidade encontrada.</p>
        ) : (
          <ul className="opportunity-list">
            {filteredOpps.map((opp) => (
              <li key={opp.id} className="opportunity-card">
                <h3 className="opportunity-title">{opp.title}</h3>
                <p>{opp.description || 'Sem descrição'}</p>
                <strong>Requisitos:</strong>
                {renderRequirementsAsList(opp.requirements)}
                <small>{new Date(opp.createdAt).toLocaleDateString()}</small>

                <div className="hashtags">
                  {opp.hashtags?.map((h: any) => (
                    <span key={h.id || h.tag} className="hashtag">
                      #{h.tag || h}
                    </span>
                  ))}
                </div>

                <button
                  className="apply-button"
                  disabled={appliedIds.includes(opp.id)}
                  onClick={() => applyToOpportunity(opp.id)}
                >
                  {appliedIds.includes(opp.id)
                    ? 'CANDIDATURA ENVIADA'
                    : 'Candidatar-se'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default DashboardInfluencer;
