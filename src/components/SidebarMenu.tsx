import React, { useState } from 'react';
import {
  FaBars, FaTimes, FaUser, FaBriefcase, FaRss, FaEnvelope, FaCog, FaSignOutAlt, FaHashtag, FaBullhorn,
} from 'react-icons/fa';
import '../styles/sidebarmenu.css';

interface SidebarMenuProps {
  userType: 'brand' | 'influencer';
  activeItem: string;
  onSelectMenuItem: (item: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ userType, activeItem, onSelectMenuItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

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

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul className="menu-list">
        {items.map(({ key, label, icon }) => (
          <li
            key={key}
            className={`menu-item ${activeItem === key ? 'active' : ''}`}
            onClick={() => onSelectMenuItem(key)}
            tabIndex={0}
            role="button"
            onKeyDown={e => e.key === 'Enter' && onSelectMenuItem(key)}
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
