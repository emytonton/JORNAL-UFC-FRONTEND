import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Image as ImageIcon,
  Info,
  ChevronDown,
} from "lucide-react";

import "./NewsPublish.css";

export default function NewsPublish() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    tag: "",
    content: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("write");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePublish = async () => {
    if (
      !formData.title ||
      !formData.content ||
      !formData.category ||
      !selectedFile
    ) {
      alert(
        "Por favor, preencha todos os campos e selecione uma imagem de capa."
      );
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado para publicar.");
        navigate("/login");
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("body", formData.content);
      data.append("tag", formData.tag);
      data.append("category", formData.category.toLowerCase());
      data.append("media", selectedFile);

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Notícia publicada com sucesso!");
        navigate("/home");
      } else {
        alert(result.error || "Erro ao publicar a notícia.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publish-page">
      <header className="publish-header">
        <div className="header-left">
          <div className="brand">
            <div className="brand-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                school
              </span>
            </div>
            <h2 className="brand-name">Portal UFC</h2>
          </div>

          <nav className="header-nav">
            <Link to="/home" className="nav-link">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="publish-main">
        <div className="publish-container">
          <div className="page-header">
            <div className="page-title-wrapper">
              <h1>Nova Publicação</h1>
              <p>Crie e submeta notícias para a comunidade acadêmica.</p>
            </div>

            <div className="page-actions">
              <button
                onClick={handlePublish}
                className="btn-primary"
                disabled={loading}
              >
                <Send size={18} />
                {loading ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </div>

          <div className="form-card">
            <div className="form-section">
              <div className="input-group">
                <label htmlFor="post-title">Título da Notícia</label>
                <input
                  id="post-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  type="text"
                  className="input-title"
                  placeholder="Digite um título impactante..."
                />
              </div>

              <div className="input-group">
                <label htmlFor="post-subtitle">Subtítulo</label>
                <input
                  id="post-subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  type="text"
                  className="input-subtitle"
                  placeholder="Uma breve descrição ou linha de apoio..."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Categoria</label>
                <div className="select-wrapper">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione uma categoria...</option>
                    <option value="graduação">Graduação</option>
                    <option value="extensão">Extensão</option>
                    <option value="pesquisa">Pesquisa</option>
                    <option value="eventos">Eventos</option>
                  </select>
                  <ChevronDown size={20} className="select-icon" />
                </div>
              </div>

              <div className="input-group">
                <label>Tag Principal</label>
                <input
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="input-default"
                  placeholder="Ex: editais"
                />
              </div>
            </div>

            <div className="input-group">
              <span className="label-text">Imagem de Capa</span>
              <div className="upload-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div className="upload-icon-wrapper">
                  <ImageIcon size={32} color={selectedFile ? "#4caf50" : "currentColor"} />
                </div>
                <p className="upload-text-main">
                  {selectedFile ? selectedFile.name : "Clique para carregar ou arraste e solte"}
                </p>
                <p className="upload-text-sub">SVG, PNG, JPG ou GIF (max. 10MB)</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="editor-header">
                <label>Conteúdo (Markdown)</label>

                <div className="editor-tabs">
                  <button
                    onClick={() => setActiveTab("write")}
                    className={`tab-btn ${
                      activeTab === "write" ? "active" : ""
                    }`}
                  >
                    Escrever
                  </button>

                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`tab-btn ${
                      activeTab === "preview" ? "active" : ""
                    }`}
                  >
                    Visualizar
                  </button>
                </div>
              </div>

              <div className="editor-container">
                {activeTab === "write" ? (
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="markdown-textarea"
                    placeholder="Escreva usando Markdown..."
                  />
                ) : (
                  <div className="markdown-preview">
                    {formData.content ? (
                      <ReactMarkdown>
                        {formData.content}
                      </ReactMarkdown>
                    ) : (
                      <p className="empty-msg">
                        Nada para visualizar ainda.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="guidelines-card">
            <div className="guidelines-content">
              <Info size={20} className="info-icon" />

              <div>
                <p className="guidelines-title">
                  Dicas para uma boa publicação
                </p>

                <ul className="guidelines-list">
                  <li>Utilize títulos curtos e objetivos.</li>
                  <li>O arquivo de imagem não deve exceder 10MB.</li>
                  <li>Você pode usar Markdown para formatar seu texto.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
