import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/dashboardInfluenciador.css';

const DashboardInfluenciador = () => {
  const [search, setSearch] = useState('');
  const [vagaSelecionada, setVagaSelecionada] = useState<any>(null);

  const vagas = [
    {
      id: 1,
      titulo: 'Campanha de Moda',
      descricao: 'Divulgar nova coleção nas redes sociais.',
      empresa: 'Fashion Brand',
      pagamento: 'R$ 500,00',
    },
    {
      id: 2,
      titulo: 'App Fitness',
      descricao: 'Stories e posts sobre nosso app fitness.',
      empresa: 'FitLife App',
      pagamento: 'R$ 800,00',
    },
    {
      id: 3,
      titulo: 'Lançamento Tech',
      descricao: 'Divulgação de produto de tecnologia.',
      empresa: 'TechPro',
      pagamento: 'R$ 1.200,00',
    },
    {
      id: 4,
      titulo: 'Campanha de Beleza',
      descricao: 'Publis para divulgar produtos de skincare.',
      empresa: 'Beauty Glow',
      pagamento: 'R$ 600,00',
    },
  ];

  const vagasFiltradas = vagas.filter((vaga) =>
    vaga.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-influenciador-container">
      <Navbar />
      <main className="dashboard-main">
        <h1>Vagas Disponíveis</h1>

        <input
          type="text"
          placeholder="Buscar vagas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="vagas-lista">
          {vagasFiltradas.map((vaga) => (
            <div
              key={vaga.id}
              className="vaga-card"
              onClick={() => setVagaSelecionada(vaga)}
            >
              <h2>{vaga.titulo}</h2>
              <p><strong>{vaga.empresa}</strong></p>
            </div>
          ))}
        </div>
      </main>
      <Footer />

      {vagaSelecionada && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setVagaSelecionada(null)}>X</button>
            <h2>{vagaSelecionada.titulo}</h2>
            <p><strong>Empresa:</strong> {vagaSelecionada.empresa}</p>
            <p><strong>Descrição:</strong> {vagaSelecionada.descricao}</p>
            <p><strong>Pagamento:</strong> {vagaSelecionada.pagamento}</p>
            <button className="candidatar-button">Candidatar-se</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInfluenciador;
