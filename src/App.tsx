import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Registration } from '@/pages/Registration';
import { Home } from '@/pages/Home';
import { PublicRoute } from '@/PublicRoute';
import { ProtectedRoute } from '@/ProtectedRoute';
import { AuthStore } from '@/store/AuthStore.tsx';
import { Profile } from '@/pages/Profile.tsx';
import { UserStore } from '@/store/UserStore.tsx';
import { useEffect } from 'react';
import { getUser } from '@/api/userApi/userApi.ts';

export default function App() {
  const token = AuthStore((s) => s.accessToken);
  const setNames = UserStore((s) => s.setNames);

  useEffect(() => {
    if (token) {
      getUser()
        .then((u) => setNames(u.first_name, u.last_name))
        .catch(() => AuthStore.getState().logout());
    }
  }, [token, setNames]);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Navigate to="/login" replace />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to={token ? '/' : '/login'} replace />} />
    </Routes>
  );
}
