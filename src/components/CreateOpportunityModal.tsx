// src/components/CreateOpportunityModal.tsx
import React, { useState } from 'react';
import TagsInput from './TagsInput';
import '../styles/dashboardbrand.css';

interface CreateOpportunityModalProps {
  onClose: () => void;
  onCreated?: () => void;
}

const CreateOpportunityModal: React.FC<CreateOpportunityModalProps> = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setError('Título é obrigatório.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3333/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, requirements, hashtags: tags }),
        credentials: 'include' // se você usar cookies para autenticação
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao criar oportunidade.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Oportunidade criada com sucesso!');
      setTitle('');
      setDescription('');
      setRequirements('');
      setTags([]);

      if (onCreated) onCreated();

      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1500);

    } catch (err) {
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Criar nova oportunidade</h2>
        <form onSubmit={handleSubmit} className="form-opportunity">
          <label>
            Título <span className="required">*</span>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Título da oportunidade"
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descreva a oportunidade e o que você espera"
              rows={4}
            />
          </label>

          <label>
            Requisitos
            <textarea
              value={requirements}
              onChange={e => setRequirements(e.target.value)}
              placeholder="Liste os requisitos para os influenciadores"
              rows={3}
            />
          </label>

          <label>
            Hashtags
            <TagsInput tags={tags} onChange={setTags} />
          </label>

          {error && <p className="error-msg">{error}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar oportunidade'}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOpportunityModal;
