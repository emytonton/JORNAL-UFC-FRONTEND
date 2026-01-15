import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css";

const NewsDetail = () => {
  const { id } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useMemo(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("ID da publicação não informado.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Você precisa estar logado para acessar esta notícia.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPost(data.post);
          setLikesCount(data.likesCount || 0);
          setComments(data.comments || []);
        } else {
          setError(data.error || "Não foi possível carregar a notícia.");
        }
      } catch (err) {
        setError("Erro de conexão ao carregar a notícia.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [API_BASE_URL, id]);

  const handleToggleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado para curtir.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${id}/likes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLiked(data.liked);
        setLikesCount((prev) =>
          data.liked ? prev + 1 : Math.max(prev - 1, 0)
        );
      } else {
        alert(data.error || "Erro ao curtir.");
      }
    } catch (err) {
      alert("Erro de conexão ao curtir.");
    }
  };

  const handleCreateComment = async () => {
    const text = commentText.trim();

    if (!text) {
      alert("Escreva um comentário antes de publicar.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado para comentar.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ text, postId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        const newComment = {
          ...data.comment,
          user: user
            ? { id: user.id, name: user.name, role: user.role }
            : null,
        };

        setComments((prev) => [newComment, ...prev]);
        setCommentText("");
      } else {
        alert(data.error || "Erro ao publicar comentário.");
      }
    } catch (err) {
      alert("Erro de conexão ao comentar.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const readTime = useMemo(() => {
    if (!post?.body) return 0;
    const words = post.body.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [post]);

  const tags = useMemo(() => {
    if (!post?.tag) return [];
    return post.tag.split(",").map((tag) => tag.trim()).filter(Boolean);
  }, [post]);

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
        <article className="article-container">
          {loading && <p>Carregando notícia...</p>}
          {!loading && error && <p>{error}</p>}
          {!loading && !error && post && (
            <>
              <div className="breadcrumbs">
                <Link to="/home" className="breadcrumb-link">
                  Início
                </Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">
                  {post.category || "Categoria"}
                </span>
              </div>

              <div>
                <h1 className="article-title">{post.title}</h1>
                <p className="article-subtitle">{post.subtitle}</p>
              </div>

              <div className="meta-section">
                <div className="author-info">
                  <img
                    src={
                      post.user?.avatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
                    }
                    alt={post.user?.name || "Autor"}
                    className="author-avatar"
                  />
                  <div className="author-details">
                    <p className="author-name">
                      {post.user?.name || "Autor"}
                    </p>
                    <p className="publish-date">
                      {formatDate(post.createdAt)} • {readTime} min de leitura
                    </p>
                  </div>
                </div>

                <div className="actions-bar">
                  <button className="action-btn" onClick={handleToggleLike}>
                    <span className="material-symbols-outlined">thumb_up</span>
                    <span className="action-label">
                      {liked ? "Curtido" : "Curtir"} ({likesCount})
                    </span>
                  </button>
                </div>
              </div>

              <div className="featured-image-container">
                <img
                  src={post.media}
                  alt={post.title}
                  className="featured-image"
                />
              </div>

              <div className="article-body">
                <p>{post.body}</p>
              </div>

              {tags.length > 0 && (
                <div className="tags-container">
                  {tags.map((tag) => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <hr className="divider" />

              <div className="comments-section">
                <h3 className="comments-title">
                  Comentários{" "}
                  <span className="comment-count">{comments.length}</span>
                </h3>

                <div className="comment-input-wrapper">
                  <div className="user-avatar-placeholder">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : "VC"}
                  </div>
                  <div className="comment-form">
                    <textarea
                      className="comment-textarea"
                      placeholder="Participe da discussão..."
                      rows="3"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <div style={{ overflow: "hidden" }}>
                      <button
                        className="publish-btn"
                        onClick={handleCreateComment}
                      >
                        Publicar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="comment-list">
                  {comments.length === 0 && (
                    <p>Seja o primeiro a comentar.</p>
                  )}
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <img
                        src={
                          comment.user?.avatar ||
                          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
                        }
                        alt={comment.user?.name || "Usuário"}
                        className="comment-avatar"
                      />
                      <div>
                        <div className="comment-header">
                          <span className="comment-author">
                            {comment.user?.name || "Usuário"}
                          </span>
                          <span className="comment-time">Agora</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <div className="comment-actions">
                          <button className="like-action">
                            <span
                              className="material-symbols-outlined"
                              style={{ fontSize: "16px" }}
                            >
                              thumb_up
                            </span>{" "}
                            Curtir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </article>
      </main>
    </div>
  );
};

export default NewsDetail;