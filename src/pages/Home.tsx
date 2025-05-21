import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        <img
          src="."
          alt="Banner Viralizze"
          className="home-banner"
        />

        <h1 className="home-title">Bem-vindo à Viralizze</h1>

        <p className="home-description">
          A <strong>Viralizze</strong> é uma plataforma inovadora que conecta
          criadores de conteúdo e público de forma interativa e eficiente.
          Nosso objetivo é ajudar ideias criativas a se espalharem pelo mundo
          com o poder da colaboração e da tecnologia.
        </p>

        <section className="features-section">
          <h2>O que oferecemos</h2>
          <div className="features">
            <div className="feature-card">
              <h3>Encontre Parceiros</h3>
              <p>
                Conecte-se com marcas, influenciadores e criadores que combinam
                com seu perfil.
              </p>
            </div>
            <div className="feature-card">
              <h3>Gestão de Campanhas</h3>
              <p>
                Gerencie suas campanhas, monitore resultados e alcance mais
                pessoas com facilidade.
              </p>
            </div>
            <div className="feature-card">
              <h3>Análise de Dados</h3>
              <p>
                Acompanhe métricas, alcance, engajamento e tenha insights para
                crescer.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>Depoimentos</h2>
          <div className="testimonials">
            <div className="testimonial-card">
              <p>
                “A Viralizze me ajudou a encontrar parcerias incríveis! Meu
                engajamento dobrou em menos de um mês.”
              </p>
              <span>- Ana Souza, Influenciadora</span>
            </div>
            <div className="testimonial-card">
              <p>
                “A plataforma é intuitiva e prática. Facilitou muito a gestão
                das minhas campanhas.”
              </p>
              <span>- Agência XYZ</span>
            </div>
          </div>
        </section>

        <div className="cta-final">
          <h2>Pronto para viralizar seu conteúdo?</h2>
          <button className="home-button" onClick={handleStartClick}>
            Começar Agora
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
