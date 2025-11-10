import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import '../styles/register.css';

const RegisterInfluencer: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!senhaForte.test(senha)) {
      alert('A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/auth/influencer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, email, password: senha }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Erro ao cadastrar influenciador.');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.influencer));
      localStorage.setItem('userId', data.influencer.id);

      if (!data.influencer.profileCompleted) {
        navigate(`/setup-profile/${data.influencer.id}`);
      } else {
        navigate('/dashboardinfluencer');
      }
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
        <h2>Crie sua conta de influenciador</h2>
        <p className="subtitle">
          Conecte-se com marcas e encontre oportunidades que combinam com o seu estilo.
        </p>

        <form onSubmit={handleRegister}>
          <div className="input-icon">
            <FaUser />
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

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
            Já tem uma conta? <Link to="/login-influencer">Entrar</Link>
          </p>

          <p className="switch-register">
            É uma marca? <Link to="/register-brand">Cadastre-se aqui</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterInfluencer;
