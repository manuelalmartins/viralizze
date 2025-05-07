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
          src="https://cdn.pixabay.com/photo/2020/10/04/08/12/network-5622145_1280.png"
          alt="Banner Viralizze"
          className="home-banner"
        />

        <h1 className="home-title">Bem-vindo à Viralizze</h1>

        <p className="home-description">
          A <strong>Viralizze</strong> é uma plataforma inovadora que conecta criadores de conteúdo e público de forma interativa e eficiente. Nosso objetivo é ajudar ideias criativas a se espalharem pelo mundo com o poder da colaboração e da tecnologia.
        </p>

        <button className="home-button" onClick={handleStartClick}>
          Começar
        </button>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
