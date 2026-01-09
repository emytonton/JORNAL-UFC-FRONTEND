import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './styles.css'; 


const Home = () => {
  const [activeTab, setActiveTab] = useState('recentes');

  const newsData = [
    {
      id: 1,
      category: 'Institucional',
      title: 'Calendário Acadêmico 2024: Confira as datas importantes',
      excerpt: 'Prazos de matrícula, início e término das aulas e feriados previstos para o próximo ano letivo já estão disponíveis.',
      author: 'Sec. Acadêmica',
      date: 'Ontem',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop'
    },
    {
      id: 2,
      category: 'Extensão',
      title: 'Projeto de Extensão abre vagas para voluntários',
      excerpt: 'Oportunidade para alunos de todos os cursos participarem de ações comunitárias no interior do estado.',
      author: 'Proex',
      date: '12 Out',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      category: 'Serviços',
      title: 'Restaurante Universitário: Novo cardápio da semana',
      excerpt: 'Confira as opções de refeições balanceadas para esta semana no RU dos campi de Fortaleza.',
      author: 'Nutrição',
      date: '10 Out',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop'
    },
    {
      id: 4,
      category: 'Pesquisa',
      title: 'Pesquisadores da UFC descobrem nova molécula',
      excerpt: 'Descoberta publicada em revista internacional pode auxiliar no tratamento de doenças tropicais.',
      author: 'Lab. Química',
      date: '08 Out',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 5,
      category: 'Cultura',
      title: 'Festival de Cultura da UFC retorna ao presencial',
      excerpt: 'Programação completa inclui shows, exposições e teatro nos jardins da Reitoria.',
      author: 'Sec. Cultura',
      date: '05 Out',
      image: 'https://www.cartacapital.com.br/wp-content/uploads/2020/07/shows.jpg'
    },
    
    {
      id: 6,
      category: 'Esportes',
      title: 'Jogos Universitários: Inscrições abertas para atletas',
      excerpt: 'Participe da seletiva para representar a universidade nas modalidades de futsal, vôlei e basquete.',
      author: 'Desporto',
      date: '02 Out',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop'
    }
  ];

  return (
    <div className="home-container">
      
      <header className="top-navbar">
        <div className="navbar-content">
          <div className="brand">
            <span className="material-symbols-outlined logo-icon">school</span>
            <h2>Portal de Notícias UFC</h2>
          </div>

          <div className="search-bar">
            <span className="material-symbols-outlined search-icon">search</span>
            <input type="text" placeholder="Buscar por notícias, eventos, editais..." />
          </div>

          <div className="user-actions">
            <Link to="/CreatePost" className="new-post-btn">
            <span className="material-symbols-outlined">add</span>
            <span className="btn-text">Nova Publicação</span>
          </Link>
            <div className="profile-pic" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop")'}}></div>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="nav-group">
            <h3>Categorias</h3>
            <a href="#" className="nav-item active">
              <span className="material-symbols-outlined">feed</span> Todas as Notícias
            </a>
            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">school</span> Graduação
            </a>
            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">public</span> Extensão
            </a>
            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">science</span> Pesquisa
            </a>
            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">event</span> Eventos
            </a>
          </div>

          <div className="nav-group mt-auto">
            <a href="#" className="nav-item">
              <span className="material-symbols-outlined">help</span> Ajuda & Suporte
            </a>
          </div>
        </aside>

        <main className="content-area">
          <div className="content-wrapper">
            
            <div className="welcome-section">
              <h1>Olá, Estudante 👋</h1>
              <p>Veja as últimas atualizações da comunidade acadêmica.</p>
            </div>
          
            <div className="hero-card">
              <div className="hero-image" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop")'}}>
                <span className="badge">Destaque</span>
              </div>
              <div className="hero-content">
                <div className="meta-tag">Campus do Pici • 2 horas atrás</div>
                <h2>UFC inaugura novo centro de tecnologia e inovação</h2>
                <p>Novo complexo promete impulsionar a inovação e o desenvolvimento regional com equipamentos de ponta para pesquisas avançadas em engenharia e computação.</p>
                <a href="#" className="read-more">Ler matéria completa →</a>
              </div>
            </div>

            
            <div className="feed-tabs">
              <button 
                className={activeTab === 'recentes' ? 'active' : ''} 
                onClick={() => setActiveTab('recentes')}
              >
                Mais Recentes
              </button>
              <button 
                className={activeTab === 'populares' ? 'active' : ''} 
                onClick={() => setActiveTab('populares')}
              >
                Populares
              </button>
            
            </div>

           
            <div className="news-grid">
              {newsData.map((news) => (
                <article key={news.id} className="news-card">
                  <div className="card-image" style={{backgroundImage: `url("${news.image}")`}}>
                    <span className="card-category">{news.category}</span>
                  </div>
                  <div className="card-content">
                    <h3>{news.title}</h3>
                    <p>{news.excerpt}</p>
                    <div className="card-footer">
                      <div className="author-info">
                        <div className="author-avatar"></div>
                        <span>{news.author}</span>
                      </div>
                      <span className="date">{news.date}</span>
                    </div>
                  </div>
                </article>
              ))}
          
            </div>

            <div className="pagination">
              <button className="load-more-btn">Carregar mais notícias</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;