import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import downArrow from '@/assets/arrow-right.svg';
import logoutLogo from '@/assets/logout.svg';
import { UserStore } from '@/store/UserStore.tsx';
import { AuthStore } from '@/store/AuthStore.tsx';

export function UserBox() {
  const navigate = useNavigate();
  const logout = AuthStore((state) => state.logout);
  const first_name = UserStore((state) => state.first_name);
  const last_name = UserStore((state) => state.last_name);

  const [open, setOpen] = useState(false);
  const initial = last_name ? last_name.charAt(0).toUpperCase() : '?';

  return (
    <div className="relative inline-flex items-center space-x-2">
      <Button
        onClick={() => navigate('/profile')}
        className="h-8 w-8 p-0 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition"
      >
        {initial}
      </Button>

      <span className="text-sm font-medium text-gray-700">
        {last_name} {first_name}
      </span>

      <button
        onClick={() => setOpen((o) => !o)}
        className="
    h-8 w-8
    p-0
    rounded-full
    overflow-hidden
    flex items-center justify-center
    hover:bg-gray-200 transition
    focus:outline-none
  "
      >
        <img src={downArrow} alt="Toggle menu" className="h-full w-full object-contain" />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow
    max-h-60 overflow-auto"
        >
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <img src={logoutLogo} alt="Logout logo" className="h-4 w-4 object-contain mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
