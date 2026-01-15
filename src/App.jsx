import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/index'; 
import Home from './pages/Home/index'; 
import CreatePost from './pages/CreatePost/index'
import Profile from './pages/Profile';
import NewsDetail from './pages/DetailPost'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/CreatePost" element={<CreatePost />} /> 
        <Route path="/Profile" element={<Profile />} /> 
        <Route path="/NewsDetail" element={<NewsDetail/>} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;