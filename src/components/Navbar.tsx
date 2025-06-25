import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Viralizze
        </Link>

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
