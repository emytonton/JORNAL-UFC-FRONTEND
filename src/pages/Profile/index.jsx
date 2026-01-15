import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Profile = () => {
  // Dados simulados para a tabela (Array)
  const posts = [
    {
      id: 1,
      title: "Inscrições abertas para Hackathon 2024",
      date: "12 Out 2023",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Novas regras da biblioteca central",
      date: "05 Out 2023",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Resultado do projeto de extensão: Tech4Good",
      date: "28 Set 2023",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Cronograma de final de semestre 2023.2",
      date: "15 Set 2023",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    <div className="page-wrapper">
      {/* Navbar Superior */}
      <header className="top-header">
        <div className="header-left">
          <div className="logo-container">
            <span className="material-symbols-outlined logo-icon">school</span>
            <h2>Portal UFC</h2>
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

          <div
            className="header-avatar"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop")',
            }}
          ></div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="profile-container">
        
        {/* Coluna Esquerda: Informações do Usuário */}
        <div className="left-column">
          <div className="user-card">
            <div className="relative group">
              <div
                className="user-avatar-large"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop")',
                }}
              ></div>
            </div>
            <h1 className="user-name">Carlos Silva</h1>
            <p className="user-role">Professor - Dept. de Computação</p>
            <p className="user-joined">Membro desde Março 2018</p>

            <div className="divider"></div>

            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-value">15</span>
                <span className="stat-label">Publicações</span>
              </div>
              {/* Removidos Comentários e Views */}
            </div>
          </div>

          <div className="menu-card">
            <nav>
              <a href="#" className="menu-item active">
                <span className="material-symbols-outlined">article</span>
                Minhas Publicações
              </a>
              {/* Removidos: Comentários e Configurações */}
              
              <a href="#" className="menu-item logout">
                <span className="material-symbols-outlined">logout</span>
                Sair
              </a>
            </nav>
          </div>
        </div>

        {/* Coluna Direita: Gerenciamento de Publicações */}
        <div className="content-column">
          <div className="section-header">
            <h2 className="section-title">Gerenciar Publicações</h2>
            {/* Filtros removidos */}
          </div>

          <div className="table-container">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Artigo</th>
                  <th className="hidden-mobile">Data</th>
                  {/* Removido Status */}
                  <th style={{ textAlign: "right" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="article-cell">
                        <div
                          className="article-thumb"
                          style={{ backgroundImage: `url("${post.image}")` }}
                        ></div>
                        <div className="article-info">
                          <p className="article-title">{post.title}</p>
                          <span className="article-date-mobile">{post.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden-mobile" style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                      {post.date}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="action-btn" title="Editar">
                          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>edit_square</span>
                        </button>
                        <button className="action-btn delete" title="Excluir">
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
                Mostrando <span style={{ fontWeight: 600 }}>1</span> a <span style={{ fontWeight: 600 }}>4</span> de <span style={{ fontWeight: 600 }}>15</span> resultados
              </p>
              <div className="pagination-controls">
                <button className="page-btn" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="page-btn">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Seção de Acesso Rápido Removida Inteiramente */}
        </div>
      </div>
    </div>
  );
};

export default Profile;