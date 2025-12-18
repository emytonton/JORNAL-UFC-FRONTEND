import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import para navegação
import './styles.css'; 

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  
  // 2. Estados para guardar os dados dos inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Hook de navegação

  // 3. Função para verificar e entrar
  const handleLogin = () => {
    // Verifica se os campos estão vazios
    if (!email || !password) {
      alert("Por favor, preencha o e-mail e a senha antes de entrar.");
      return;
    }

    // Se estiver tudo certo, vai para a Home
    navigate('/home');
  };

  return (
    <div className="login-page">
      {/* Header */}
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
          
          {/* Lado Esquerdo */}
          <div className="left-side">
            <div className="overlay"></div>
            <div className="left-content">
              <div>
                <div className="icon-box">
                  <span className="material-symbols-outlined">article</span>
                </div>
                <h1>Fique por dentro do que acontece na UFC.</h1>
                <p>Acesse notícias acadêmicas, eventos culturais, editais e interaja com a comunidade universitária em um só lugar.</p>
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

          {/* Lado Direito */}
          <div className="right-side">
            <div className="form-header">
              <h2>Bem-vindo ao Portal</h2>
              <p>Entre com suas credenciais ou crie sua conta.</p>
            </div>

            <div className="tabs">
              <button 
                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button 
                className={`tab-btn ${activeTab === 'cadastro' ? 'active' : ''}`}
                onClick={() => setActiveTab('cadastro')}
              >
                Cadastro
              </button>
            </div>

            {/* --- FORMULÁRIO DE LOGIN --- */}
            {activeTab === 'login' && (
              <form className="auth-form animate-fade">
                <div className="input-group">
                  <label>E-mail</label>
                  <div className="input-wrapper">
                    <input 
                      type="email" 
                      placeholder="aluno@alu.ufc.br" 
                      value={email} // Conecta ao estado
                      onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
                    />
                    <span className="material-symbols-outlined input-icon">person</span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="label-row">
                    <label>Senha</label>
                    <a href="#" className="forgot-link">Esqueci minha senha</a>
                  </div>
                  <div className="input-wrapper">
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password} // Conecta ao estado
                      onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
                    />
                    <span className="material-symbols-outlined input-icon btn-icon">visibility_off</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="primary-btn"
                  onClick={handleLogin} // Chama a função ao clicar
                >
                  Entrar 
                  <span className="material-symbols-outlined arrow-icon">arrow_forward</span>
                </button>
              </form>
            )}

            {/* --- FORMULÁRIO DE CADASTRO --- */}
            {activeTab === 'cadastro' && (
               <form className="auth-form animate-fade">
                  <div className="input-group">
                    <label>Nome Completo</label>
                    <div className="input-wrapper">
                      <input type="text" placeholder="Seu nome" />
                      <span className="material-symbols-outlined input-icon">badge</span>
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label>E-mail</label>
                    <div className="input-wrapper">
                      <input type="email" placeholder="nome@alu.ufc.br" />
                      <span className="material-symbols-outlined input-icon">mail</span>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Senha</label>
                    <div className="input-wrapper">
                      <input type="password" placeholder="Crie uma senha forte" />
                      <span className="material-symbols-outlined input-icon">lock</span>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Confirmar Senha</label>
                    <div className="input-wrapper">
                      <input type="password" placeholder="Repita a senha" />
                      <span className="material-symbols-outlined input-icon">lock_reset</span>
                    </div>
                  </div>

                  <div className="checkbox-group">
                    <label className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="label-text">Você é aluno?</span>
                    </label>
                  </div>

                  <button type="button" className="primary-btn">Criar Conta</button>
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