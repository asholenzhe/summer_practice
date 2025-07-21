import { Button } from '@/components/ui/Button';
import downArrow from '@/assets/arrow-right.svg';
import logoutLogo from '@/assets/logout.svg';
import { UserStore } from '@/store/UserStore.tsx';
import { useDropdown } from '@/hooks/useDropDown.ts';

export function UserBox() {
  const firstName = UserStore((state) => state.firstName);
  const lastName = UserStore((state) => state.lastName);
  const initial = lastName.charAt(0).toUpperCase();

  const { ref, isOpen, toggleDropDown, handleLogout, goProfile } = useDropdown();

  return (
    <div ref={ref} className="relative inline-flex items-center space-x-2">
      <Button
        onClick={goProfile}
        className="h-8 w-8 p-0 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition"
      >
        {initial}
      </Button>

      <span className="text-sm font-medium text-gray-700">
        {lastName} {firstName}
      </span>

      <button
        onClick={toggleDropDown}
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

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow
    max-h-60 overflow-auto"
        >
          <button
            onClick={handleLogout}
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
