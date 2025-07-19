import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Registration } from '@/pages/Registration';
import { Home } from '@/pages/Home';
import { PublicRoute } from '@/PublicRoute';
import { ProtectedRoute } from '@/ProtectedRoute';
import { AuthStore } from '@/store/AuthStore.tsx';
import { useEffect } from 'react';

export default function App() {
  const token = AuthStore((s) => s.accessToken);
  const navigate = useNavigate();
  const logout = AuthStore((state) => state.logout);
  const { pathname } = useLocation();

  useEffect(() => {
    const publicPaths = ['/login', '/register'];
    if (publicPaths.includes(pathname)) return;

    if (token === null) {
      logout();
      navigate('/login');
    }
  }, [token, logout, navigate, pathname]);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Navigate to="/login" replace />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to={token ? '/' : '/login'} replace />} />
    </Routes>
  );
}
