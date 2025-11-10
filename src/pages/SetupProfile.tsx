import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Camera, X } from "lucide-react";
import "../styles/setupprofile.css";

const SetupProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userType: "brand" | "influencer" = user?.type || "influencer";

  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
      updateProgress();
    }
  };

  const addHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!hashtags.includes(tagInput.trim())) {
        setHashtags([...hashtags, tagInput.trim()]);
      }
      setTagInput("");
      updateProgress();
    }
  };

  const removeTag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
    updateProgress();
  };

  const updateProgress = () => {
    const fields = [
      bio,
      city,
      preview,
      hashtags.length > 0 ? "ok" : "",
      instagram,
    ];

    if (userType === "influencer") {
      fields.push(tiktok, youtube);
    }

    const filled = fields.filter(Boolean).length;
    const total = userType === "influencer" ? 7 : 5;

    setProgress(Math.min(100, Math.round((filled / total) * 100)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("bio", bio);
    form.append("city", city);
    form.append("instagram", instagram);
    if (userType === "influencer") {
      form.append("tiktok", tiktok);
      form.append("youtube", youtube);
    }
    form.append("hashtags", JSON.stringify(hashtags));
    if (photo) form.append("photo", photo);

    const endpoint =
      userType === "brand"
        ? `http://localhost:3333/brands/${id}/profile`
        : `http://localhost:3333/influencers/${id}/profile`;

    try {
      await axios.post(endpoint, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(
        userType === "brand"
          ? "/dashboard-brand"
          : "/dashboard-influencer"
      );
    } catch {
      alert("Erro ao salvar perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="setup-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="setup-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="setup-title">
          {userType === "brand"
            ? "Configurar Perfil da Marca"
            : "Configurar Perfil de Influenciador"}
        </h2>

        <form className="setup-form" onSubmit={handleSubmit}>
          <div className="photo-area">
            <label htmlFor="photo-upload" className="photo-select">
              {preview ? (
                <div className="photo-preview-box">
                  <img src={preview} className="photo-preview" />
                  <div className="photo-edit">
                    <Camera size={26} />
                  </div>
                </div>
              ) : (
                <div className="photo-placeholder-box">
                  <Camera size={36} />
                  <p>Adicionar foto</p>
                </div>
              )}
            </label>

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          <textarea
            placeholder={
              userType === "brand"
                ? "Fale sobre sua marca..."
                : "Fale sobre você..."
            }
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              updateProgress();
            }}
          />

          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              updateProgress();
            }}
          />

          <input
            type="text"
            placeholder="@Instagram"
            value={instagram}
            onChange={(e) => {
              setInstagram(e.target.value);
              updateProgress();
            }}
          />

          {userType === "influencer" && (
            <>
              <input
                type="text"
                placeholder="@TikTok"
                value={tiktok}
                onChange={(e) => {
                  setTiktok(e.target.value);
                  updateProgress();
                }}
              />

              <input
                type="text"
                placeholder="Canal do YouTube"
                value={youtube}
                onChange={(e) => {
                  setYoutube(e.target.value);
                  updateProgress();
                }}
              />
            </>
          )}

          <div className="tags-box">
            <label>Hashtags (Enter)</label>

            <div className="tag-list">
              {hashtags.map((tag) => (
                <span key={tag} className="tag-item">
                  #{tag}
                  <X className="remove-tag" onClick={() => removeTag(tag)} />
                </span>
              ))}
            </div>

            <input
              type="text"
              placeholder="moda, beleza, tech..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addHashtag}
            />
          </div>

          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
            />
          </div>

          <button className="setup-btn" disabled={loading}>
            {loading ? "Salvando..." : "Concluir Perfil"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SetupProfile;
