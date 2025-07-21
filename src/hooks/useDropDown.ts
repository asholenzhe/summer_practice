import { useNavigate } from 'react-router-dom';
import { AuthStore } from '@/store/AuthStore.tsx';

export function useDropdown() {
  const logout = AuthStore((state) => state.logout);
  const navigate = useNavigate();
  const goProfile = () => navigate('/profile');

  return { logout, goProfile };
}
