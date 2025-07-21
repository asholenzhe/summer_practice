import { Navigate, Outlet } from 'react-router-dom';
import { AuthStore } from '@/store/AuthStore';
import { useFetchUser } from '@/hooks/useFetchUser.ts';

export function ProtectedRoute() {
  const token = AuthStore((s) => s.accessToken);
  useFetchUser(token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
