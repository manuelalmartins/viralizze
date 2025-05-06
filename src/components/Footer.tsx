import React from 'react';
import '../styles/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © 2025 Viralizze - Todos os direitos reservados.
        </p>
        <div className="footer-links">
          <a href="/privacy-policy" className="footer-link">Política de Privacidade</a>
          <a href="/terms-of-service" className="footer-link">Termos de Serviço</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
