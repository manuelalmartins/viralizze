import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/login.css';
import BackButton from '../components/BackButton';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', email, 'Senha:', senha);
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1>Seja bem-vindo, Influenciador!</h1>
        <p>Quer encontrar influenciadores? <Link to="/find-influencers">Clique aqui.</Link></p>
      </div>

      <div className="right-section">
        <BackButton />
        <div className="login-box">
          <h2 className="login-title">Faça Login</h2>
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
            <div className="forgot-password">
              <Link to="/forgot-password">Esqueceu sua senha?</Link>
            </div>
            <button type="submit">Entrar</button>
          </form>
          <div className="register-link">
            <p>Não tem conta? <Link to="/register">Crie a sua</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
