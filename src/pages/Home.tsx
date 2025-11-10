import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLink, FaRocket, FaUserFriends, FaTags } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/register-influencer");
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        <motion.section
          className="hero-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="home-title">
            Conecte <span className="highlight">marcas</span> e{" "}
            <span className="highlight">influenciadores</span> que fazem acontecer.
          </h1>

          <p className="home-description">
            A <strong>Viralizze</strong> é a plataforma onde colaborações ganham vida. 
            Aqui, marcas encontram influenciadores com o match perfeito,
            e criadores transformam oportunidades em parcerias reais.
          </p>

          <motion.button
            className="home-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartClick}
          >
            Começar Agora
          </motion.button>
        </motion.section>

        {/* FEATURES */}
        <section className="features-section">
          <h2>Como a Viralizze impulsiona conexões</h2>
          <div className="features">
            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaLink className="feature-icon" />
              <h3>Conexões Estratégicas</h3>
              <p>
                Aproxime-se de quem compartilha seus valores. 
                Aqui, o foco é o feat entre propósito, público e autenticidade.
              </p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaRocket className="feature-icon" />
              <h3>Processo Rápido e Intuitivo</h3>
              <p>
                Cadastre-se, configure seu perfil e candidate-se em poucos cliques. 
                Sem barreiras, sem burocracia.
              </p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaUserFriends className="feature-icon" />
              <h3>Gestão Inteligente</h3>
              <p>
                Acompanhe candidaturas, mensagens e oportunidades de um painel moderno e centralizado.
              </p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaTags className="feature-icon" />
              <h3>Descubra por Hashtags</h3>
              <p>
                Explore categorias como <strong>#moda</strong>, <strong>#beleza</strong> ou{" "}
                <strong>#tech</strong> e encontre o nicho ideal para se destacar.
              </p>
            </motion.div>
          </div>
        </section>

        {/* NOVA SEÇÃO — IMPACTO */}
        <motion.section
          className="impact-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>Transformando o marketing de influência</h2>
          <p>
            A Viralizze nasceu para simplificar o mercado de parcerias digitais. 
            Criamos uma ponte direta entre marcas e criadores, transparente, justa e colaborativa.
          </p>

          <div className="impact-stats">
            <div className="stat">
              <h3>+500</h3>
              <p>Conexões realizadas</p>
            </div>
            <div className="stat">
              <h3>+120</h3>
              <p>Marcas cadastradas</p>
            </div>
            <div className="stat">
              <h3>+900</h3>
              <p>Candidaturas enviadas</p>
            </div>
          </div>
        </motion.section>

        {/* CTA FINAL */}
        <motion.section
          className="cta-final"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Pronto para dar o próximo passo?</h2>
          <p>
            Junte-se à comunidade que está redefinindo a forma como marcas e criadores colaboram.
          </p>
          <motion.button
            className="home-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStartClick}
          >
            Criar Conta
          </motion.button>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
