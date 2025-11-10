import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaUser,
  FaBriefcase,
  FaRss,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaHashtag,
  FaBullhorn,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/sidebarmenu.css';

interface SidebarMenuProps {
  userType: 'brand' | 'influencer';
  activeItem?: string; // agora opcional
  onSelectMenuItem?: (item: string) => void; // agora opcional
  isOpen: boolean;
  toggleOpen: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  userType,
  activeItem,
  onSelectMenuItem,
  isOpen,
  toggleOpen,
}) => {
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>('Usuário');

  // carrega foto/nome do localStorage
  useEffect(() => {
    const load = () => {
      // tenta chaves específicas e depois objeto 'user'
      const byKey =
        localStorage.getItem('influencerPhotoUrl') ||
        localStorage.getItem('brandPhotoUrl') ||
        '';
      const byUser = localStorage.getItem('user');

      if (byKey) setPhotoUrl(byKey);
      if (byUser) {
        try {
          const u = JSON.parse(byUser);
          if (!byKey && u?.photoUrl) setPhotoUrl(u.photoUrl);
          if (u?.name) setName(u.name);
        } catch {
          /* ignore */
        }
      }
    };

    load();
    // se algo atualizar o localStorage em outra aba, reflete aqui
    const onStorage = () => load();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const menuItemsInfluencer = [
    { key: 'opportunities', label: 'Oportunidades', icon: <FaHashtag /> },
    { key: 'feed', label: 'Feed', icon: <FaRss /> },
    { key: 'notifications', label: 'Notificações', icon: <FaBullhorn /> },
    { key: 'settings', label: 'Configurações', icon: <FaCog /> },
    { key: 'logout', label: 'Sair', icon: <FaSignOutAlt /> },
  ];

  const menuItemsBrand = [
    { key: 'profile', label: 'Perfil', icon: <FaUser /> },
    { key: 'opportunities', label: 'Minhas Oportunidades', icon: <FaBriefcase /> },
    { key: 'feed', label: 'Feed', icon: <FaRss /> },
    { key: 'messages', label: 'Mensagens', icon: <FaEnvelope /> },
    { key: 'settings', label: 'Configurações', icon: <FaCog /> },
    { key: 'logout', label: 'Sair', icon: <FaSignOutAlt /> },
  ];

  const items = userType === 'brand' ? menuItemsBrand : menuItemsInfluencer;

  // navegação padrão interna do sidebar (sem depender do pai)
  const defaultNavigate = (key: string) => {
    if (userType === 'influencer') {
      if (key === 'opportunities') navigate('/dashboard-influencer');
      else if (key === 'feed') navigate('/feed');
      else if (key === 'settings') navigate('/settings');
    } else {
      if (key === 'profile') {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user?.id) navigate(`/profile/${user.id}`);
      } else if (key === 'opportunities') navigate('/dashboard-brand');
      else if (key === 'feed') navigate('/feed');
      else if (key === 'messages') navigate('/messages');
      else if (key === 'settings') navigate('/settings');
    }
  };

  const handleClick = (key: string) => {
    if (key === 'logout') {
      localStorage.clear();
      navigate(userType === 'brand' ? '/login-brand' : '/login-influencer', { replace: true });
      return;
    }
    // primeiro deixa o pai saber (se ele quiser)
    onSelectMenuItem?.(key);
    // e sempre navega por conta própria
    defaultNavigate(key);
  };

  const openProfile = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.id) navigate(`/profile/${user.id}`);
  };

  return (
    <nav className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleOpen} aria-label="Abrir/fechar menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        {isOpen && <span className="logo">Viralizze</span>}
      </div>

      {/* Mini Perfil clicável */}
      <button className="sidebar-profile" onClick={openProfile}>
        <div className="profile-photo-wrapper">
          <img
            src={photoUrl || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
            alt="Foto de perfil"
            className="sidebar-profile-photo"
          />
        </div>
        {isOpen && (
          <div className="sidebar-profile-info">
            <h3>{name}</h3>
            <p>Ver perfil</p>
          </div>
        )}
      </button>

      <ul className="menu-list">
        {items.map(({ key, label, icon }) => (
          <li
            key={key}
            className={`menu-item ${activeItem === key ? 'active' : ''}`}
            onClick={() => handleClick(key)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => e.key === 'Enter' && handleClick(key)}
          >
            <span className="icon">{icon}</span>
            {isOpen && <span className="label">{label}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenu;
