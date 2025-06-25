
import React, { useEffect, useState } from 'react';
import '../styles/applicantsmodal.css';

interface Props {
  opportunityId: string;
  onClose: () => void;
}

interface Applicant {
  id: string;
  message: string;
  status: string;
  influencer: {
    id: string;
    name: string;
    email: string;
  };
}

const ApplicantsModal: React.FC<Props> = ({ opportunityId, onClose }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3333/opportunities/${opportunityId}/applications`)
      .then((res) => res.json())
      .then((data) => setApplicants(data.applications))
      .finally(() => setLoading(false));
  }, [opportunityId]);

  const updateStatus = async (applicationId: string, status: 'APPROVED' | 'REJECTED') => {
    await fetch(`http://localhost:3333/applications/${applicationId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status } : app))
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Candidatos</h2>
        {loading ? <p>Carregando...</p> : (
          applicants.length === 0 ? <p>Nenhuma candidatura ainda.</p> : (
            <ul className="applicants-list">
              {applicants.map((app) => (
                <li key={app.id} className="applicant-item">
                  <p><strong>{app.influencer.name}</strong> ({app.influencer.email})</p>
                  <p><em>{app.message}</em></p>
                  <p>Status: {app.status}</p>
                  <div className="action-buttons">
                    <button onClick={() => updateStatus(app.id, 'APPROVED')}>Aprovar</button>
                    <button onClick={() => updateStatus(app.id, 'REJECTED')}>Rejeitar</button>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default ApplicantsModal;