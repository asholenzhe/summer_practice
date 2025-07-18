import { useNavigate } from 'react-router-dom';
import { AuthStore } from '@/store/AuthStore.tsx';
import { Button } from '@/components/ui/Button.tsx';

export function Header() {
  const logout = AuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className="
        bg-white
        rounded-lg
        shadow-sm
        max-w-7xl mx-auto
        px-14 py-4
        mt-4
      "
    >
      <div className="flex justify-end items-center w-full">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
}
