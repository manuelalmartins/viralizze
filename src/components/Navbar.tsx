import React from 'react';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Viralizze
        </a>
        <div className="navbar-links">
          <a href="/" className="navbar-link">Home</a>
          <a href="/login" className="navbar-link">Login</a>
          <a href="/register" className="navbar-link">Cadastrar</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
