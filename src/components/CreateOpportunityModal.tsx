import React, { useState, useEffect } from 'react';
import '../styles/opportunitymodal.css';

interface OpportunityModalProps {
  opportunity?: {
    id: string;
    title: string;
    description: string;
    requirements: string;
    hashtags: { tag: string }[];
  };
  onClose: () => void;
  onSaved: () => void;
}

const OpportunityModal: React.FC<OpportunityModalProps> = ({ opportunity, onClose, onSaved }) => {
  const [title, setTitle] = useState(opportunity?.title || '');
  const [description, setDescription] = useState(opportunity?.description || '');
  const [requirements, setRequirements] = useState(opportunity?.requirements || '');
  const [hashtags, setHashtags] = useState(
    opportunity ? opportunity.hashtags.map(h => h.tag).join(', ') : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(opportunity?.title || '');
    setDescription(opportunity?.description || '');
    setRequirements(opportunity?.requirements || '');
    setHashtags(opportunity ? opportunity.hashtags.map(h => h.tag).join(', ') : '');
  }, [opportunity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Título é obrigatório.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const brandId = localStorage.getItem('brandId');
      if (!brandId) {
        setError('ID da marca não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }

      const body = {
        title,
        description,
        requirements,
        brandId,  // <--- Adicionado aqui, manda no corpo!
        hashtags: hashtags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };

      const url = opportunity
        ? `http://localhost:3333/opportunities/${opportunity.id}`
        : 'http://localhost:3333/opportunities';

      const method = opportunity ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'brand-id': brandId,  // mantém no header também
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao salvar oportunidade.');
        setLoading(false);
        return;
      }

      onSaved();
      onClose();
    } catch {
      setError('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{opportunity ? 'Editar Oportunidade' : 'Criar Oportunidade'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            placeholder="Requisitos"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
          <input
            type="text"
            placeholder="Hashtags (separadas por vírgula)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? (opportunity ? 'Salvando...' : 'Criando...') : (opportunity ? 'Salvar' : 'Criar')}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default OpportunityModal;
