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
          <Link to="/home">Início</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Cadastro</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
