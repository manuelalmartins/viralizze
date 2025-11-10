import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import '../styles/login.css';
import PasswordReset from '../components/PasswordReset'

const LoginBrand: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3333/auth/brand/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao fazer login.');
        return;
      }

      if (!data.brand || !data.brand.id) {
        alert('Erro ao carregar dados da marca.');
        return;
      }
      localStorage.setItem('brandId', data.brand.id);
      localStorage.setItem('user', JSON.stringify(data.brand));

      if (!data.brand.profileCompleted) {
        navigate(`/setup-profile/${data.brand.id}`);
      } else {
        navigate('/dashboard-brand');
      }

    } catch {
      alert('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="gradient-bg" />
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>

      <div className="login-card">
        <h1 className="brand-logo">Viralizze</h1>
        <h2>Login de Marca</h2>
        <p className="subtitle">
          Acesse sua conta e descubra novos influenciadores para sua marca.
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
            Ainda não tem conta? <Link to="/register-brand">Cadastre-se</Link>
          </p>

          <p className="switch-login">
            É influenciador? <Link to="/login-influencer">Entrar como influenciador</Link>
          </p>
        </form>
      </div>

      <PasswordReset
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        requestResetEndpoint="http://localhost:3333/auth/brand/request-reset"
        verifyCodeEndpoint="http://localhost:3333/auth/brand/verify-reset"
        resetPasswordEndpoint="http://localhost:3333/auth/brand/reset-password"
      />
    </div>
  );
};

export default LoginBrand;
