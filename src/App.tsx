// src/App.tsx
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Registration } from '@/pages/Registration';
import { Home } from '@/pages/Home';
import { ProtectedRoute } from '@/ProtectedRoute';
import { PublicRoute } from '@/PublicRoute';
import { AuthStore } from '@/store/AuthStore';

export default function App() {
  const token = AuthStore((s) => s.accessToken);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to={token ? '/' : '/login'} replace />} />
    </Routes>
  );
}
