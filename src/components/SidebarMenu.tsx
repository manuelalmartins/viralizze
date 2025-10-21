import React from 'react';
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

interface SidebarMenuProps {
  userType: 'brand' | 'influencer';
  activeItem: string;
  onSelectMenuItem: (item: string) => void;
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
  const menuItemsBrand = [
    { key: 'profile', label: 'Perfil', icon: <FaUser /> },
    { key: 'opportunities', label: 'Minhas Oportunidades', icon: <FaBriefcase /> },
    { key: 'feed', label: 'Feed', icon: <FaRss /> },
    { key: 'messages', label: 'Mensagens', icon: <FaEnvelope /> },
    { key: 'settings', label: 'Configurações', icon: <FaCog /> },
    { key: 'logout', label: 'Sair', icon: <FaSignOutAlt /> },
  ];

  const menuItemsInfluencer = [
    { key: 'profile', label: 'Perfil', icon: <FaUser /> },
    { key: 'opportunities', label: 'Oportunidades', icon: <FaHashtag /> },
    { key: 'feed', label: 'Feed', icon: <FaRss /> },
    { key: 'notifications', label: 'Notificações', icon: <FaBullhorn /> },
    { key: 'settings', label: 'Configurações', icon: <FaCog /> },
    { key: 'logout', label: 'Sair', icon: <FaSignOutAlt /> },
  ];

  const items = userType === 'brand' ? menuItemsBrand : menuItemsInfluencer;

  const handleClick = (key: string) => {
    if (key === 'logout') {
      // Logout completo: limpa localStorage, redireciona conforme userType
      localStorage.clear();

      if (userType === 'brand') {
        window.location.href = '/login-brand';
      } else if (userType === 'influencer') {
        window.location.href = '/login-influencer';
      } else {
        window.location.href = '/login';
      }
    } else {
      onSelectMenuItem(key);
    }
  };

  return (
    <nav className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleOpen} aria-label="Toggle Menu">
        {isOpen ? <FaTimes /> : <FaBars />}
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
