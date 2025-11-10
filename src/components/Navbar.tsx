import { Link } from "react-router-dom";
import "../styles/navbar.css";
import ViralizzeLogo from "../assets/img/Viralizze.png";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <img
          src={ViralizzeLogo}
          alt="Logo Viralizze"
          className="navbar-logo"
        />
        <nav className="navbar-links">
          <Link to="/register-brand">Sou uma Marca</Link>
          <Link to="/register-influencer">Sou um influenciador</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
