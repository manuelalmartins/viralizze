import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/register-influencer"); // ou uma tela de escolha
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
      

        <h1 className="home-title">Conecte sua marca com quem faz acontecer</h1>

        <p className="home-description">
          A <strong>Viralizze</strong> é uma plataforma que une <strong>marcas</strong> e <strong>influenciadores</strong> de forma simples e direta. Aqui, empresas publicam oportunidades de colaboração, e criadores de conteúdo se candidatam em poucos cliques.
        </p>

        <section className="features-section">
          <h2>Como a Viralizze pode te ajudar</h2>
          <div className="features">
            <div className="feature-card">
              <h3>Oportunidades Reais</h3>
              <p>
                Influenciadores de todos os tamanhos encontram campanhas e parcerias com marcas alinhadas ao seu nicho.
              </p>
            </div>
            <div className="feature-card">
              <h3>Gestão Simplificada</h3>
              <p>
                Marcas controlam vagas, analisam candidaturas e acompanham os resultados direto no painel.
              </p>
            </div>
            <div className="feature-card">
              <h3>Conexões por Interesse</h3>
              <p>
                Filtros por hashtags ajudam a conectar marcas e criadores com interesses em comum.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>Quem já usou aprova</h2>
          <div className="testimonials">
            <div className="testimonial-card">
              <p>
                “Graças à Viralizze, consegui fechar parcerias com marcas que sempre admirei!”
              </p>
              <span>- Júlia Marques, Criadora de Conteúdo</span>
            </div>
            <div className="testimonial-card">
              <p>
                “É muito prático gerenciar as oportunidades e encontrar talentos certos para nossas campanhas.”
              </p>
              <span>- Bruno Silva, Marketing na Empreende+</span>
            </div>
          </div>
        </section>

        <div className="cta-final">
          <h2>Pronto para começar sua jornada de parcerias?</h2>
          <button className="home-button" onClick={handleStartClick}>
            Criar Conta
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
