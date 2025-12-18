// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORTANTE: Verifique se o caminho está certo.
// Se o arquivo for src/pages/Login/index.jsx ou src/pages/Login/Login.jsx
import Login from './pages/Login/LoginPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A rota "/" é a primeira página que abre */}
        <Route path="/" element={<Login />} />

        {/* Futuramente você adicionará outras, ex:
        <Route path="/home" element={<Home />} /> 
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;