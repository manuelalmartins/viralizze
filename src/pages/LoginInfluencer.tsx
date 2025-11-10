import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import '../styles/login.css';
import PasswordReset from '../components/PasswordReset';

const LoginInfluencer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
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

      localStorage.setItem('user', JSON.stringify(data.influencer));
      localStorage.setItem('influencerId', data.influencer.id);
      navigate('/dashboard-influencer');
    } catch {
      alert('Erro na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="gradient-bg" />

      {/* Botão Voltar */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>

      <div className="login-card">
        <h1 className="brand-logo">Viralizze</h1>
        <h2>Login de Influenciador</h2>
        <p className="subtitle">
          Acesse sua conta e conecte-se com marcas que compartilham o seu estilo.
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-icon">
            <FaEnvelope />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-wrapper">
            <FaLock className="lock-icon" />
            <input
              type={showSenha ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <span onClick={() => setShowSenha(!showSenha)} className="eye-icon">
              {showSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="button"
            className="forgot-password-button"
            onClick={() => setModalOpen(true)}
          >
            Esqueceu sua senha?
          </button>

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="login-link">
            Ainda não tem conta? <Link to="/register-influencer">Cadastre-se</Link>
          </p>

          <p className="switch-login">
            É uma marca? <Link to="/login-brand">Entrar como marca</Link>
          </p>
        </form>
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
