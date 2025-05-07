import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/register.css';
import BackButton from '../components/BackButton';

const Register: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Nome:', nome, 'Email:', email, 'Senha:', senha, 'Confirmar Senha:', confirmarSenha);
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <h1>Seja bem-vindo, Criador!</h1>
        <p>Já tem uma conta? <Link to="/login">Faça login aqui.</Link></p>
      </div>

      <div className="right-section">
        <BackButton />
        <div className="register-box">
          <h2 className="register-title">Crie sua Conta</h2>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
