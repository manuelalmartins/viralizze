import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import '../styles/login.css';
import BackButton from '../components/BackButton';
import PasswordReset from '../components/PasswordReset';

const LoginInfluencer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/auth/influencer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao fazer login.');
        return;
      }

      // Salvar o influencer e o id separadamente no localStorage
      localStorage.setItem('user', JSON.stringify(data.influencer));
      localStorage.setItem('influencerId', data.influencer.id);

      navigate('/dashboard-influencer');
    } catch (error) {
      alert('Erro na conexão com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1>Seja bem-vindo, Influenciador!</h1>
        <p>
          Quer encontrar influenciadores? <Link to="/login-brand">Clique aqui.</Link>
        </p>
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

            <div className="password-input-wrapper">
              <input
                type={showSenha ? 'text' : 'password'}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowSenha(!showSenha)}
                aria-label="Mostrar/Esconder senha"
                tabIndex={-1}
              >
                {showSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="forgot-password">
              <button
                type="button"
                className="forgot-password-button"
                onClick={() => setModalOpen(true)}
              >
                Esqueceu sua senha?
              </button>
            </div>

            <button type="submit">Entrar</button>
          </form>

          <div className="register-link">
            <p>
              Não tem conta? <Link to="/register-influencer">Crie a sua</Link>
            </p>
          </div>
        </div>
      </div>

      <PasswordReset
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        requestResetEndpoint="http://localhost:3333/auth/influencer/request-reset"
        verifyCodeEndpoint="http://localhost:3333/auth/influencer/verify-reset"
        resetPasswordEndpoint="http://localhost:3333/auth/influencer/reset-password"
      />
    </div>
  );
};

export default LoginInfluencer;
