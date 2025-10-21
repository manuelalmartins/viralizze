import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';
import BackButton from '../components/BackButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterBrand: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cargo, setCargo] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/auth/brand/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nome,
          email,
          password: senha,
          companyName: empresa,
          role: cargo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao cadastrar marca.');
        return;
      }

      if (data.brand && data.brand.id) {
        localStorage.setItem('brandId', data.brand.id);
      } else {
        alert('Erro interno: ID da marca não recebido. Faça login após o cadastro.');
        return;
      }

      alert('Marca cadastrada com sucesso!');
      navigate('/dashboard-brand');
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <h1>Seja bem-vinda, Marca!</h1>
        <p>Quer ser um de nossos Influenciadores? <Link to="/login-influencer">Faça login aqui.</Link></p>
      </div>

      <div className="right-section">
        <BackButton />
        <div className="register-box">
          <h2 className="register-title">Cadastre sua Marca</h2>
          <form onSubmit={handleRegister} className="register-form">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nome da Empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            />

            <div className="password-wrapper">
              <input
                type={showSenha ? 'text' : 'password'}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <span onClick={() => setShowSenha(!showSenha)} className="eye-icon" tabIndex={0} role="button" aria-label={showSenha ? 'Esconder senha' : 'Mostrar senha'}>
                {showSenha ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="password-wrapper">
              <input
                type={showConfirmarSenha ? 'text' : 'password'}
                placeholder="Confirme a Senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
              <span onClick={() => setShowConfirmarSenha(!showConfirmarSenha)} className="eye-icon" tabIndex={0} role="button" aria-label={showConfirmarSenha ? 'Esconder senha' : 'Mostrar senha'}>
                {showConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">Cadastrar</button>

            <div className="register-link">
              <p>
                Já tem uma conta? <Link to="/login-brand">Faça Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterBrand;
