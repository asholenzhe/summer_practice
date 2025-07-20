import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import downArrow from '@/assets/down-arrow.png';
import { UserStore } from '@/store/UserStore.tsx';
import { AuthStore } from '@/store/AuthStore.tsx';

export function UserBox() {
  const logout = AuthStore((state) => state.logout);
  const first_name = UserStore((state) => state.first_name);
  const last_name = UserStore((state) => state.last_name);

  const [open, setOpen] = useState(false);
  const initial = last_name ? last_name.charAt(0).toUpperCase() : '?';

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-gray-100 focus:outline-none"
      >
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          {initial}
        </div>

        <div className="flex items-center space-x-1 text-sm font-medium">
          <span>
            {last_name} {first_name}
          </span>
          <img src={downArrow} alt="Down arrow" className="h-4 w-4" />
        </div>
      </Button>

      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
