import React, { useState } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import DashboardContentBrand from '../components/DashboardContentBrand';

const DashboardBrand: React.FC = () => {
  const brandId = localStorage.getItem('brandId') || '';
  const [activeItem, setActiveItem] = useState('opportunities'); // menu ativo

  return (
    <div className="dashboard-container">
      <SidebarMenu userType="brand" activeItem={activeItem} onSelectMenuItem={setActiveItem} />
      <main className="dashboard-main">
        {activeItem === 'opportunities' && <DashboardContentBrand brandId={brandId} />}
        {/* Você pode colocar outros conteúdos conforme os itens do menu */}
        {activeItem === 'profile' && <div><h2>Perfil da Marca</h2><p>Conteúdo do perfil aqui</p></div>}
        {activeItem === 'feed' && <div><h2>Feed da Marca</h2><p>Conteúdo do feed aqui</p></div>}
      </main>
    </div>
  );
};

export default DashboardBrand;
