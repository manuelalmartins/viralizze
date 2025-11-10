import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import '../styles/register.css';

const RegisterBrand: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3333/auth/brand/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || 'Erro ao cadastrar marca.');
        return;
      }

      localStorage.setItem('brandId', data.brand.id);
      localStorage.setItem('user', JSON.stringify(data.brand));
      navigate(`/setup-profile-brand/${data.brand.id}`);
    } catch {
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="gradient-bg" />

      {/* 🔹 Botão Voltar */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>

      <div className="register-card">
        <h1 className="brand-logo">Viralizze</h1>
        <h2>Crie sua conta de marca</h2>
        <p className="subtitle">
          Conecte sua marca a influenciadores que compartilham o seu propósito.
        </p>

        <form onSubmit={handleRegister}>
          <div className="input-icon">
            <FaEnvelope />
            <input
              type="email"
              placeholder="E-mail da marca"
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

          <div className="password-wrapper">
            <FaLock className="lock-icon" />
            <input
              type={showConfirmarSenha ? 'text' : 'password'}
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
            <span
              onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
              className="eye-icon"
            >
              {showConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <p className="login-link">
            Já tem uma conta? <Link to="/login-brand">Entrar</Link>
          </p>

          <p className="switch-register">
            É influenciador? <Link to="/register-influencer">Cadastre-se aqui</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterBrand;
