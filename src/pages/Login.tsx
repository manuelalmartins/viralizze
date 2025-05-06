import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link para navegação
import '../styles/login.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email, 'Senha:', senha);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Bem-vindo</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
          </form>
          <div className="register-link">
            <p>Não tem conta? <Link to="/register">Crie a sua</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
