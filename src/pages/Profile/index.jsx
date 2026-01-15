import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Profile = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditData({ name: parsedUser.name, email: parsedUser.email });
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Você precisa estar logado para acessar seu perfil.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            
          },
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts || []);
        } else {
          setError(data.error || "Erro ao carregar publicações.");
        }
      } catch (err) {
        setError("Erro de conexão ao carregar publicações.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [API_BASE_URL]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...user, ...data.user };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsModalOpen(false);
        alert("Perfil atualizado com sucesso!");
      } else {
        alert(data.error || "Erro ao atualizar perfil.");
      }
    } catch (err) {
      alert("Erro de conexão ao atualizar perfil.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatMemberSince = (dateString) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta publicação?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          
        },
      });
      if (response.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      } else {
        const data = await response.json();
        alert(data.error || "Erro ao excluir publicação.");
      }
    } catch (err) {
      alert("Erro de conexão ao excluir.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredPosts = user?.id ? posts.filter((post) => post.user?.id === user.id) : posts;

  return (
    <div className="page-wrapper">
      <header className="top-header">
        <div className="header-left">
          <div className="logo-container">
            <span className="material-symbols-outlined logo-icon">school</span>
            <Link to="/home" className="logo-link">Portal UFC</Link>
          </div>
          <nav className="main-nav">
            <Link to="/news" className="nav-link">Notícias</Link>
            <Link to="/events" className="nav-link">Eventos</Link>
            <Link to="/community" className="nav-link">Comunidade</Link>
          </nav>
        </div>
        <div className="header-right">
          <div className="search-wrapper">
            <span className="material-symbols-outlined" style={{ color: "var(--text-secondary)" }}>search</span>
            <input className="search-input" placeholder="Buscar..." />
          </div>
          <button className="new-post-btn">
            <span className="material-symbols-outlined">add</span>
            <span style={{ display: "none" }} className="desktop-text">Nova Publicação</span>
          </button>
          <div className="header-avatar" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop")' }}></div>
        </div>
      </header>

      <div className="profile-container">
        <div className="left-column">
          <div className="user-card" style={{ position: "relative" }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="edit-profile-btn"
              title="Editar Perfil"
            >
              <img 
                className="image_edit_profile" 
                src="src/assets/edit_profile.png" 
                alt="edit profile" 
              />
            </button>
            <div className="user-avatar-large" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop")' }}></div>
            <h1 className="user-name">{user?.name || "Usuário"}</h1>
            <p className="user-role">{user?.role ? user.role : "Perfil"}</p>
            <p className="user-joined">Membro desde {formatMemberSince(user?.createdAt)}</p>
            <div className="divider"></div>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-value">{filteredPosts.length}</span>
                <span className="stat-label">Publicações</span>
              </div>
            </div>
          </div>

          <div className="menu-card">
            <nav>
              <a href="#" className="menu-item active">
                <span className="material-symbols-outlined">article</span>
                Minhas Publicações
              </a>
              <button type="button" className="menu-item logout" onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span>
                Sair
              </button>
            </nav>
          </div>
        </div>

        <div className="content-column">
          <div className="section-header">
            <h2 className="section-title">Gerenciar Publicações</h2>
          </div>
          <div className="table-container">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Artigo</th>
                  <th className="hidden-mobile">Data</th>
                  <th style={{ textAlign: "right" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={3}>Carregando publicações...</td></tr>
                )}
                {!loading && error && (
                  <tr><td colSpan={3}>{error}</td></tr>
                )}
                {!loading && !error && filteredPosts.length === 0 && (
                  <tr><td colSpan={3}>Nenhuma publicação encontrada.</td></tr>
                )}
                {!loading && !error && filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="article-cell">
                        <div className="article-thumb" style={{ backgroundImage: `url("${post.media}")` }}></div>
                        <div className="article-info">
                          <p className="article-title">{post.title}</p>
                          <span className="article-date-mobile">{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden-mobile" style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                      {formatDate(post.createdAt)}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="action-btn delete" title="Excluir" onClick={() => handleDelete(post.id)}>
                          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <p className="pagination-info">
                Mostrando <span style={{ fontWeight: 600 }}>{filteredPosts.length === 0 ? 0 : 1}</span> a <span style={{ fontWeight: 600 }}>{filteredPosts.length}</span> de <span style={{ fontWeight: 600 }}>{filteredPosts.length}</span> resultados
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Editar Perfil</h2>
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdateProfile}>
              <div className="input-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  value={editData.name} 
                  onChange={(e) => setEditData({...editData, name: e.target.value})} 
                  placeholder="Seu nome"
                />
              </div>
              <div className="input-group">
                <label>E-mail</label>
                <input 
                  type="email" 
                  value={editData.email} 
                  onChange={(e) => setEditData({...editData, email: e.target.value})} 
                  placeholder="seu@email.com"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-save">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;