import { Navigate, Outlet } from 'react-router-dom';
import { AuthStore } from '@/store/AuthStore';

export function PublicRoute() {
  const token = AuthStore((s) => s.accessToken);
  return token ? <Navigate to="/" replace /> : <Outlet />;
}
