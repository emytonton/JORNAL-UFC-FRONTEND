import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  // Estados para Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Estados para Cadastro
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isStudent, setIsStudent] = useState(false);

  // URL da API atualizada para o Ngrok
  const API_URL = "https://f5f59eb2690a.ngrok-free.app/api/auth";

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      alert("Por favor, preencha o e-mail e a senha antes de entrar.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true", // Evita a tela de bloqueio do ngrok
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message || "Erro ao entrar");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: isStudent ? "student" : "teacher",
    };

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true", // Evita a tela de bloqueio do ngrok
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Conta criada com sucesso!");
        setActiveTab("login");
      } else {
        alert(data.message || "Erro no cadastro");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="login-page">
      <header className="main-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="material-symbols-outlined logo-icon">school</span>
            <h2>Portal UFC</h2>
          </div>

          <button className="help-btn">
            <span className="material-symbols-outlined">help</span>
            Ajuda
          </button>
        </div>
      </header>

      <main className="main-container">
        <div className="login-card">
          <div className="left-side">
            <div className="overlay"></div>

            <div className="left-content">
              <div>
                <div className="icon-box">
                  <span className="material-symbols-outlined">article</span>
                </div>

                <h1>Fique por dentro do que acontece na UFC.</h1>

                <p>
                  Acesse notícias acadêmicas, eventos culturais, editais e
                  interaja com a comunidade universitária em um só lugar.
                </p>
              </div>

              <div className="people-connected">
                <div className="avatars">
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                </div>
                <span>+200 alunos e professores conectados</span>
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="form-header">
              <h2>Bem-vindo ao Portal</h2>
              <p>Entre com suas credenciais ou crie sua conta.</p>
            </div>

            <div className="tabs">
              <button
                className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>

              <button
                className={`tab-btn ${
                  activeTab === "cadastro" ? "active" : ""
                }`}
                onClick={() => setActiveTab("cadastro")}
              >
                Cadastro
              </button>
            </div>

            {activeTab === "login" && (
              <form className="auth-form animate-fade">
                <div className="input-group">
                  <label>E-mail</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      placeholder="aluno@alu.ufc.br"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <span className="material-symbols-outlined input-icon">
                      person
                    </span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="label-row">
                    <label>Senha</label>
                    <a href="#" className="forgot-link">
                      Esqueci minha senha
                    </a>
                  </div>

                  <div className="input-wrapper">
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <span className="material-symbols-outlined input-icon btn-icon">
                      visibility_off
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleLogin}
                >
                  Entrar
                  <span className="material-symbols-outlined arrow-icon">
                    arrow_forward
                  </span>
                </button>
              </form>
            )}

            {activeTab === "cadastro" && (
              <form className="auth-form animate-fade">
                <div className="input-group">
                  <label>Nome Completo</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className="material-symbols-outlined input-icon">
                      badge
                    </span>
                  </div>
                </div>

                <div className="input-group">
                  <label>E-mail</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      placeholder="nome@alu.ufc.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="material-symbols-outlined input-icon">
                      mail
                    </span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Senha</label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      placeholder="Crie uma senha forte"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="material-symbols-outlined input-icon">
                      lock
                    </span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Confirmar Senha</label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      placeholder="Repita a senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="material-symbols-outlined input-icon">
                      lock_reset
                    </span>
                  </div>
                </div>

                <div className="checkbox-group">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={isStudent}
                      onChange={(e) => setIsStudent(e.target.checked)}
                    />
                    <span className="label-text">Você é aluno?</span>
                    <span className="checkmark"></span>
                  </label>
                </div>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleSignUp}
                >
                  Criar Conta
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="main-footer">
        © 2025 Universidade Federal do Ceará. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Login;