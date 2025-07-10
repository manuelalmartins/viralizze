import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <img
          src="."
          alt="Viralizze"
          className="navbar-logo"
        />
        <nav className="navbar-links">
          <Link to="/">Início</Link>
          <Link to="/register-brand">Sou uma Marca</Link>
          <Link to="/register-influencer">Sou um influenciador</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
