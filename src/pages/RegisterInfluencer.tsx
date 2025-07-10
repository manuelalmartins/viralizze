import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';
import BackButton from '../components/BackButton';

const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!senhaForte.test(senha)) {
      alert('A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/auth/influencer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome,
          email,
          password: senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao cadastrar influenciador.');
        return;
      }

      alert('Cadastro realizado com sucesso!');
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboardinfluencer');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <h1>Seja bem-vindo, Influenciador!</h1>
        <p>Deseja encontrar influenciadores? <Link to="/login-brand">Clique aqui.</Link></p>
      </div>

      <div className="right-section">
        <BackButton />
        <div className="register-box">
          <h2 className="register-title">Crie sua Conta</h2>
          <form onSubmit={handleRegister} className="register-form">
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <input type="password" placeholder="Confirme a Senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
            <button type="submit">Cadastrar</button>
            <div className="register-link">
              <p>
                Já tem uma conta? <Link to="/login-influencer">Faça Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
