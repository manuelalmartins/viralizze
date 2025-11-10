import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaMapMarkerAlt,
  FaHashtag,
  FaAward,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import SidebarMenu from "../components/SidebarMenu";
import "../styles/profilepage.css";

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3333/influencers/${id}`);
        setProfile(data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <p className="loading">Carregando perfil...</p>;

  return (
    <div className="profile-layout">
      <SidebarMenu
        userType="influencer"
        activeItem="profile"
        onSelectMenuItem={() => {}}
        isOpen={sidebarOpen}
        toggleOpen={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={profile.photoUrl || "/default-avatar.png"}
              alt="Foto de perfil"
              className="profile-photo"
            />
            <div className="profile-info">
              <h2 className="profile-name">
                {profile.name}
                <div className="badges">
                  <div className="badge" title="Concluiu 10 trabalhos">
                    <FaAward />
                  </div>
                  <div className="badge" title="Bons feedbacks recebidos">
                    <FaStar />
                  </div>
                  <div className="badge" title="Perfil verificado">
                    <FaCheckCircle />
                  </div>
                </div>
              </h2>
              {profile.city && (
                <p className="profile-city">
                  <FaMapMarkerAlt /> {profile.city}
                </p>
              )}
            </div>
          </div>

          <p className="profile-bio">{profile.bio || "Ainda não escreveu uma bio."}</p>

          <div className="profile-hashtags">
            {profile.hashtags?.length ? (
              profile.hashtags.map((h: any) => (
                <span key={h.id} className="tag">
                  <FaHashtag /> {h.tag}
                </span>
              ))
            ) : (
              <p className="no-tags">Nenhum nicho definido</p>
            )}
          </div>

          <div className="social-links">
            {profile.instagram && (
              <a
                href={`https://instagram.com/${profile.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                title="Instagram"
              >
                <FaInstagram />
              </a>
            )}
            {profile.tiktok && (
              <a
                href={`https://tiktok.com/@${profile.tiktok.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                title="TikTok"
              >
                <FaTiktok />
              </a>
            )}
            {profile.youtube && (
              <a
                href={`https://youtube.com/${profile.youtube.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                title="YouTube"
              >
                <FaYoutube />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
