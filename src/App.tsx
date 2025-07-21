import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Registration } from '@/pages/Registration';
import { Home } from '@/pages/Home';
import { PublicRoute } from '@/PublicRoute';
import { ProtectedRoute } from '@/ProtectedRoute';
import { Profile } from '@/pages/Profile.tsx';
import { PrivateLayout } from '@/PrivateLayout.tsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Navigate to="/login" replace />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
