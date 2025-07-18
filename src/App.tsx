import './App.css';
import { Login } from '@/pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Registration } from '@/pages/Registration';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
