import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/passwordreset.css';

interface PasswordResetProps {
  isOpen: boolean;
  onClose: () => void;
  requestResetEndpoint: string;
  verifyCodeEndpoint: string;
  resetPasswordEndpoint: string;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  isOpen,
  onClose,
  requestResetEndpoint,
  verifyCodeEndpoint,
  resetPasswordEndpoint,
}) => {
  const [step, setStep] = useState<'email' | 'code' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const resetState = () => {
    setStep('email');
    setEmail('');
    setCode(Array(6).fill(''));
    setNewPassword('');
    setConfirmPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setStatusMessage(null);
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    try {
      const res = await fetch(requestResetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.error || 'Erro ao enviar código.');
      } else {
        setStatusMessage('Código enviado para seu e-mail.');
        setStep('code');
      }
    } catch {
      setStatusMessage('Erro ao conectar ao servidor.');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    try {
      const res = await fetch(verifyCodeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: code.join('') }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.error || 'Código inválido.');
      } else {
        setStatusMessage('Código validado!');
        setStep('newPassword');
      }
    } catch {
      setStatusMessage('Erro ao conectar ao servidor.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    if (newPassword !== confirmPassword) {
      setStatusMessage('As senhas não coincidem.');
      return;
    }
    try {
      const res = await fetch(resetPasswordEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: code.join(''), newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.error || 'Erro ao redefinir senha.');
      } else {
        setStatusMessage('Senha redefinida com sucesso!');
        setTimeout(() => {
          onClose();
          resetState();
        }, 2000);
      }
    } catch {
      setStatusMessage('Erro ao conectar ao servidor.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="passwordreset-overlay" onClick={onClose}>
      <div className="passwordreset-modal" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">Recuperar Senha</h3>

        {step === 'email' && (
          <form onSubmit={handleRequestReset}>
            <input
              className="input-large"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="modal-buttons">
              <button type="submit">Enviar código</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleVerifyCode}>
            <div className="code-inputs">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  className="code-box"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/, '');
                    const newCode = [...code];
                    newCode[idx] = val;
                    setCode(newCode);
                    if (val && idx < 5) {
                      const next = document.getElementById(`code-${idx + 1}`);
                      if (next) next.focus();
                    }
                  }}
                  id={`code-${idx}`}
                />
              ))}
            </div>
            <div className="modal-buttons">
              <button type="submit">Verificar código</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        )}

        {step === 'newPassword' && (
          <form onSubmit={handleResetPassword}>
            <div className="password-input-wrapper">
              <input
                className="input-large"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="password-input-wrapper">
              <input
                className="input-large"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="modal-buttons">
              <button type="submit">Redefinir senha</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        )}

        {statusMessage && <p className="reset-status">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
