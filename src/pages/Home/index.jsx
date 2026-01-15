import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./styles.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("recentes");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate(); 


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (
      !window.confirm("Tem certeza que deseja excluir esta publicação?")
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
        alert("Publicação excluída com sucesso!");
      } else {
        alert("Erro ao excluir publicação.");
      }
    } catch (error) {
      alert("Erro de conexão ao excluir.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  // Função para navegar para os detalhes
  const handlePostClick = (postId) => {
    navigate(`/NewsDetail/${postId}`);
  };

  return (
    <div className="home-container">
      <header className="top-navbar">
        <div className="navbar-content">
          <div className="brand">
            <span className="material-symbols-outlined logo-icon">school</span>
            <h2>Portal de Notícias UFC</h2>
          </div>

          <div className="search-bar">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por notícias, eventos, editais..."
            />
          </div>

          <div className="user-actions">
            <Link to="/CreatePost" className="new-post-btn">
              <span className="material-symbols-outlined">add</span>
              <span className="btn-text">Nova Publicação</span>
            </Link>

            <Link to="/Profile">
              <div
                className="profile-pic"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop")',
                  cursor: "pointer",
                }}
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="nav-group">
            <h3>Categorias</h3>

            <a href="#" className="nav-item active">
              <span className="material-symbols-outlined">feed</span>
              Todas as Notícias
            </a>
            {/* ... outros itens do menu ... */}
             <a href="#" className="nav-item">
              <span className="material-symbols-outlined">school</span>
              Graduação
            </a>

            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">public</span>
              Extensão
            </a>

            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">science</span>
              Pesquisa
            </a>

            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">event</span>
              Eventos
            </a>
          </div>

          <div className="nav-group mt-auto">
            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">help</span>
              Ajuda & Suporte
            </a>
          </div>
        </aside>

        <main className="content-area">
          <div className="content-wrapper">
            <div className="welcome-section">
              <h1>Olá, Estudante 👋</h1>
              <p>
                Veja as últimas atualizações da comunidade acadêmica.
              </p>
            </div>

            {/* Hero Card Estático */}
            <div className="hero-card">
              <div
                className="hero-image"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop")',
                }}
              >
                <span className="badge">Destaque</span>
              </div>

              <div className="hero-content">
                <div className="meta-tag">Campus do Pici • 2 horas atrás</div>
                <h2>
                  UFC inaugura novo centro de tecnologia e inovação
                </h2>
                <p>
                  Novo complexo promete impulsionar a inovação e o
                  desenvolvimento regional com equipamentos de ponta para
                  pesquisas avançadas em engenharia e computação.
                </p>
                <a href="#" className="read-more">
                  Ler matéria completa →
                </a>
              </div>
            </div>

            <div className="feed-tabs">
              <button
                className={activeTab === "recentes" ? "active" : ""}
                onClick={() => setActiveTab("recentes")}
              >
                Mais Recentes
              </button>

              <button
                className={activeTab === "populares" ? "active" : ""}
                onClick={() => setActiveTab("populares")}
              >
                Populares
              </button>
            </div>

            <div className="news-grid">
              {loading ? (
                <p>Carregando notícias...</p>
              ) : (
                posts.map((post) => (
                  <article 
                    key={post.id} 
                    className="news-card"
                    // Adicionado onClick aqui para navegar ao clicar no card
                    onClick={() => handlePostClick(post.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="card-image"
                      style={{
                        backgroundImage: `url("${post.media}")`,
                      }}
                    >
                      <span className="card-category">{post.category}</span>

                      <button
                        // Atualizado para impedir propagação do clique
                        onClick={(e) => {
                          e.stopPropagation(); // Impede que abra a notícia ao clicar em deletar
                          handleDelete(post.id);
                        }}
                        className="delete-post-btn"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "rgba(255,0,0,0.7)",
                          border: "none",
                          borderRadius: "50%",
                          color: "white",
                          cursor: "pointer",
                          padding: "5px",
                          zIndex: 10 // Garante que o botão fique acima do clique do card
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "18px" }}
                        >
                          delete
                        </span>
                      </button>
                    </div>

                    <div className="card-content">
                      <h3>{post.title}</h3>
                      <p>{post.subtitle}</p>

                      <div className="card-footer">
                        <div className="author-info">
                          <div className="author-avatar" />
                          <span>{post.user.name}</span>
                        </div>
                        <span className="date">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="pagination">
              <button className="load-more-btn" onClick={fetchPosts}>
                Atualizar feed
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;