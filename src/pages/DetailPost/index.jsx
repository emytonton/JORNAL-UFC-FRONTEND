import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const NewsDetail = () => {
  return (
    <div className="page-wrapper">
      {/* Top Navigation Bar */}
      <header className="top-header">
        <div className="header-left">
          <Link to="/" className="logo-container">
            <span className="material-symbols-outlined logo-icon">school</span>
            <h2>Portal de Notícias UFC</h2>
          </Link>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Início</Link>
            <Link to="/categories" className="nav-link">Categorias</Link>
            <Link to="/about" className="nav-link">Sobre</Link>
          </nav>
        </div>
        <div className="header-right">
          <div className="search-wrapper">
            <span className="material-symbols-outlined" style={{ color: "var(--text-secondary)" }}>search</span>
            <input className="search-input" placeholder="Buscar..." />
          </div>
          <button className="login-btn">Entrar</button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="main-content">
        {/* Article Wrapper */}
        <article className="article-container">
          
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumb-link">Início</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/campus" className="breadcrumb-link">Campus do Pici</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Ciência</span>
          </div>

          {/* Page Heading */}
          <div>
            <h1 className="article-title">
              Novas pesquisas do Departamento de Física ganham destaque internacional
            </h1>
            <p className="article-subtitle">
              Estudo sobre novos materiais supercondutores foi publicado na revista Nature e abre portas para avanços tecnológicos na computação quântica.
            </p>
          </div>

          {/* Author & Meta Info */}
          <div className="meta-section">
            <div className="author-info">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
                alt="Prof. Carlos Silva" 
                className="author-avatar"
              />
              <div className="author-details">
                <p className="author-name">Prof. Carlos Silva</p>
                <p className="publish-date">24 de Outubro, 2023 • 5 min de leitura</p>
              </div>
            </div>

            {/* Actions Bar - COMPARTILHAR E SALVAR REMOVIDOS */}
            <div className="actions-bar">
              <button className="action-btn">
                <span className="material-symbols-outlined">thumb_up</span>
                <span className="action-label">Curtir</span>
              </button>
            </div>
          </div>

          {/* Main Featured Image  */}
          <div className="featured-image-container">
            <img 
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop" 
              alt="Laboratório de Física" 
              className="featured-image"
            />
          </div>
          <p className="image-caption">Laboratório de Materiais Avançados do Campus do Pici (Foto: Divulgação/UFC)</p>

          {/* Article Body Text */}
          <div className="article-body">
            <p>
              Pesquisadores do Departamento de Física da Universidade Federal do Ceará (UFC) alcançaram um marco histórico nesta semana. O grupo liderado pelo professor Carlos Silva publicou um artigo na renomada revista científica <strong>Nature</strong>, detalhando a descoberta de um novo comportamento em materiais supercondutores à temperatura ambiente.
            </p>
            <p>
              A pesquisa, que durou cerca de quatro anos, envolveu colaboração com universidades da Alemanha e dos Estados Unidos. O avanço promete revolucionar a forma como a energia é transmitida e armazenada, além de impactar diretamente o desenvolvimento de computadores quânticos mais estáveis e acessíveis.
            </p>

            <h2>Impacto na Tecnologia</h2>
            <p>
              Segundo o professor Silva, a aplicação prática dessa descoberta pode levar décadas, mas os fundamentos teóricos já permitem sonhar com dispositivos eletrônicos ultra-eficientes.
            </p>

            <blockquote className="highlight-quote">
              "Estamos diante de uma mudança de paradigma na física da matéria condensada. O que observamos aqui no Ceará coloca o Brasil na vanguarda da pesquisa em materiais quânticos."
            </blockquote>

            <p>
              O projeto recebeu financiamento do CNPq e da FUNCAP, demonstrando a importância do investimento contínuo em ciência básica. Alunos de pós-graduação da UFC foram fundamentais para a realização dos experimentos e análise de dados complexos.
            </p>

            <h3>Próximos Passos</h3>
            <p>
              A equipe agora foca em replicar os resultados em diferentes condições de pressão e temperatura. Novos equipamentos estão sendo adquiridos pelo laboratório para permitir testes ainda mais precisos. A expectativa é que novas parcerias internacionais sejam firmadas no próximo semestre.
            </p>
          </div>

          {/* Tags */}
          <div className="tags-container">
            <a href="#" className="tag">#Física</a>
            <a href="#" className="tag">#Pesquisa</a>
            <a href="#" className="tag">#Inovação</a>
            <a href="#" className="tag">#UFC</a>
          </div>

          <hr className="divider" />

          {/* Comments Section */}
          <div className="comments-section">
            <h3 className="comments-title">
              Comentários <span className="comment-count">3</span>
            </h3>

            {/* Comment Input */}
            <div className="comment-input-wrapper">
              <div className="user-avatar-placeholder">VC</div>
              <div className="comment-form">
                <textarea 
                  className="comment-textarea" 
                  placeholder="Participe da discussão..." 
                  rows="3"
                ></textarea>
                <div style={{ overflow: "hidden" }}>
                  <button className="publish-btn">Publicar</button>
                </div>
              </div>
            </div>

            {/* Existing Comments */}
            <div className="comment-list">
              {/* Comment 1 */}
              <div className="comment-item">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" 
                  alt="Ana Souza" 
                  className="comment-avatar"
                />
                <div>
                  <div className="comment-header">
                    <span className="comment-author">Ana Souza</span>
                    <span className="comment-time">Há 2 horas</span>
                  </div>
                  <p className="comment-text">
                    Incrível ver a UFC ganhando esse tipo de reconhecimento! Orgulho de estudar aqui. Parabéns ao professor Carlos e equipe.
                  </p>
                  <div className="comment-actions">
                    <button className="like-action">
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>thumb_up</span> Curtir
                    </button>
                  </div>
                </div>
              </div>

              {/* Comment 2 */}
              <div className="comment-item">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" 
                  alt="Marcos Oliveira" 
                  className="comment-avatar"
                />
                <div>
                  <div className="comment-header">
                    <span className="comment-author">Marcos Oliveira</span>
                    <span className="comment-time">Há 5 horas</span>
                  </div>
                  <p className="comment-text">
                    Alguém sabe se haverá palestra sobre o tema na semana de física? Gostaria muito de entender melhor a metodologia usada.
                  </p>
                  <div className="comment-actions">
                    <button className="like-action">
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>thumb_up</span> 2
                    </button>
                    <button className="like-action">Responder</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Read Next Section */}
          <div className="read-next-section">
            <h3 className="read-next-title">Leia também</h3>
            <div className="related-grid">
              {/* Card 1 */}
              <a href="#" className="related-card">
                <div className="related-thumb">
                  <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop" alt="Biblioteca" />
                </div>
                <div>
                  <span className="related-category">Educação</span>
                  <h4 className="related-headline">Novo horário de funcionamento da Biblioteca Central</h4>
                  <p className="related-date">23 Out, 2023</p>
                </div>
              </a>

              {/* Card 2 */}
              <a href="#" className="related-card">
                <div className="related-thumb">
                  <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&auto=format&fit=crop" alt="Biologia" />
                </div>
                <div>
                  <span className="related-category">Biologia</span>
                  <h4 className="related-headline">Projeto de extensão mapeia flora local do Campus</h4>
                  <p className="related-date">22 Out, 2023</p>
                </div>
              </a>

              {/* Card 3 */}
              <a href="#" className="related-card">
                <div className="related-thumb">
                  <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop" alt="Reunião" />
                </div>
                <div>
                  <span className="related-category">Institucional</span>
                  <h4 className="related-headline">Reunião do CONSUNI define calendário acadêmico 2024</h4>
                  <p className="related-date">20 Out, 2023</p>
                </div>
              </a>
            </div>
          </div>

        </article>
      </main>
    </div>
  );
};

export default NewsDetail;