import React, { useState } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import DashboardContentInfluencer from '../components/DashboardContentInfluencer';

const DashboardInfluencer: React.FC = () => {
  const influencerId = localStorage.getItem('influencerId') || '';
  const [activeItem, setActiveItem] = useState('opportunities');

  return (
    <div className="dashboard-container">
      <SidebarMenu userType="influencer" activeItem={activeItem} onSelectMenuItem={setActiveItem} />
      <main className="dashboard-main">
        {activeItem === 'opportunities' && <DashboardContentInfluencer influencerId={influencerId} />}
        {activeItem === 'profile' && <div><h2>Perfil do Influenciador</h2><p>Conteúdo do perfil aqui</p></div>}
        {activeItem === 'feed' && <div><h2>Feed do Influenciador</h2><p>Conteúdo do feed aqui</p></div>}
      </main>
    </div>
  );
};

export default DashboardInfluencer;
