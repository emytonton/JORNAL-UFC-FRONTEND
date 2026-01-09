import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/index'; 
import Home from './pages/Home/index'; 
import CreatePost from './pages/CreatePost/index'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/CreatePost" element={<CreatePost />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;