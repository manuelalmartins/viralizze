import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="voltar-button" onClick={() => navigate(-1)}>
      ← Voltar
    </button>
  );
};

export default BackButton;
