import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@/core/pages/auth/Login.tsx';
import { Registration } from '@/core/pages/auth/Registration.tsx';
import { Home } from '@/core/pages/Home.tsx';
import { PublicRoute } from '@/core/routes/PublicRoute.tsx';
import { ProtectedRoute } from '@/core/routes/ProtectedRoute.tsx';
import { Profile } from '@/user/pages/Profile.tsx';
import { PrivateLayout } from '@/core/routes/PrivateLayout.tsx';
import { CardPage } from '@/card/pages/CardPage.tsx';

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
          <Route path="/cards" element={<CardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
