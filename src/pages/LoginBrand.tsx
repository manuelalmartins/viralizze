import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/login.css';
import BackButton from '../components/BackButton';
import PasswordReset from '../components/PasswordReset';

const LoginBrand: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/auth/brand/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro no login.');
        return;
      }

      // **Salva o brandId no localStorage**
      if (data.brand && data.brand.id) {
        localStorage.setItem('brandId', data.brand.id);
      } else {
        alert('ID da marca não recebido. Faça login novamente.');
        return;
      }

      navigate('/dashboard-brand');
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1>Seja bem-vinda, Marca!</h1>
        <p>
          Quer ser um de nossos influenciadores?{' '}
          <Link to="/login-influencer">Clique aqui.</Link>
        </p>
      </div>

      <div className="right-section">
        <BackButton />
        <div className="login-box">
          <h2 className="login-title">Login de Marca</h2>

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
                aria-label={showSenha ? 'Esconder senha' : 'Mostrar senha'}
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
              Não tem conta? <Link to="/register-brand">Cadastre-se</Link>
            </p>
          </div>
        </div>
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
