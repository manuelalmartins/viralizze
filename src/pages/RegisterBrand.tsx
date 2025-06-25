import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/register.css';
import BackButton from '../components/BackButton';

const RegisterBrand: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cargo, setCargo] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

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

      alert('Marca cadastrada com sucesso!');
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <h1>Seja bem-vinda, Marca!</h1>
        <p>Quer ser um de nossos Influenciadores? <Link to="/login-brand">Faça login aqui.</Link></p>
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
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirme a Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
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
