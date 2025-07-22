import { Navigate, Outlet } from 'react-router-dom';
import { AuthStore } from '@/core/store/AuthStore.tsx';
import { useFetchUser } from '@/user/hooks/useFetchUser.ts';

export function ProtectedRoute() {
  const token = AuthStore((s) => s.accessToken);
  useFetchUser(token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
