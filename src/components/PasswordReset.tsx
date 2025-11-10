import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/passwordreset.css";

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
  const [step, setStep] = useState<"email" | "code" | "password" | "done">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const closeAll = () => {
    setEmail("");
    setCode(Array(6).fill(""));
    setPassword("");
    setConfirm("");
    setStep("email");
    setMsg(null);
    setLoading(false);
    onClose();
  };

  const fakeDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const sendEmail = async (e: any) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    await fakeDelay(1000);

    try {
      const res = await fetch(requestResetEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Erro.");
        setLoading(false);
        return;
      }

      setStep("code");
      setLoading(false);
    } catch {
      setMsg("Erro ao conectar.");
      setLoading(false);
    }
  };

  const verifyCode = async (e: any) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    await fakeDelay(1000);

    try {
      const res = await fetch(verifyCodeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: code.join("") }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Código inválido.");
        document.querySelector(".pr-code-area")?.classList.add("shake");
        setTimeout(() => {
          document.querySelector(".pr-code-area")?.classList.remove("shake");
        }, 600);
        setLoading(false);
        return;
      }

      setStep("password");
      setLoading(false);
    } catch {
      setMsg("Erro ao conectar.");
      setLoading(false);
    }
  };

  const resetPassword = async (e: any) => {
    e.preventDefault();
    setMsg(null);

    if (password !== confirm) {
      setMsg("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    await fakeDelay(1000);

    try {
      const res = await fetch(resetPasswordEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: code.join(""),
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Erro.");
        setLoading(false);
        return;
      }

      setStep("done");
      setLoading(false);
    } catch {
      setMsg("Erro ao conectar.");
      setLoading(false);
    }
  };

  return (
    <div className="pr-overlay">
      <div className="pr-modal">

        <button className="pr-close" onClick={closeAll}>×</button>

        {loading && (
          <div className="pr-loading-overlay">
            <div className="pr-spinner"></div>
          </div>
        )}

        {step !== "done" && (
          <h2 className="pr-title">Recuperar senha</h2>
        )}

        {step === "email" && (
          <form onSubmit={sendEmail} className="pr-form fade">
            <input
              className="pr-input"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="pr-btn-primary" type="submit">
              Enviar código
            </button>

            {msg && <p className="pr-msg">{msg}</p>}
          </form>
        )}

        {step === "code" && (
          <form onSubmit={verifyCode} className="pr-form fade">
            <div className="pr-code-area">
              {code.map((n, i) => (
                <input
                  key={i}
                  id={`pr-code-${i}`}
                  className="pr-code-box"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={n}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    const newCode = [...code];
                    newCode[i] = val;
                    setCode(newCode);

                    if (val && i < 5) {
                      document.getElementById(`pr-code-${i + 1}`)?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !code[i] && i > 0) {
                      document.getElementById(`pr-code-${i - 1}`)?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <button className="pr-btn-primary" type="submit">
              Verificar código
            </button>

            {msg && <p className="pr-msg">{msg}</p>}
          </form>
        )}

        {step === "password" && (
          <form onSubmit={resetPassword} className="pr-form fade">
            <div className="pr-pw-group">
              <input
                className="pr-input"
                type={showPw ? "text" : "password"}
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="pr-eye" onClick={() => setShowPw(!showPw)}>
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="pr-pw-group">
              <input
                className="pr-input"
                type={showPw2 ? "text" : "password"}
                placeholder="Confirmar senha"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <span className="pr-eye" onClick={() => setShowPw2(!showPw2)}>
                {showPw2 ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="pr-btn-primary" type="submit">
              Redefinir senha
            </button>

            {msg && <p className="pr-msg">{msg}</p>}
          </form>
        )}

        {step === "done" && (
          <div className="pr-success-box fade">
            <div className="pr-success-icon">✔</div>
            <p className="pr-success-text">Senha redefinida com sucesso!</p>
            <button className="pr-btn-primary" onClick={closeAll}>
              Voltar ao login
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PasswordReset;
