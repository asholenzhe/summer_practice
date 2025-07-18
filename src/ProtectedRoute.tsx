import { Navigate, Outlet } from 'react-router-dom';
import { AuthStore } from '@/store/AuthStore';

export function ProtectedRoute() {
  const token = AuthStore((s) => s.accessToken);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
