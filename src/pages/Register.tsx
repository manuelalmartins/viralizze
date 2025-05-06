import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link para navegação
import '../styles/register.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nome:', nome, 'Email:', email, 'Senha:', senha);
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
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
            <button type="submit">Cadastrar</button>
          </form>
          <div className="login-link">
            <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
