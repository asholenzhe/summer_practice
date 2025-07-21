import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '@/store/AuthStore.tsx';

export function useDropdown<T extends HTMLElement = HTMLDivElement>() {
  const logout = AuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<T>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const toggleDropDown = () => setIsOpen((open) => !open);

  const goProfile = () => navigate('/profile');
  function handleLogout() {
    logout();
    setIsOpen(false);
  }

  return { ref, isOpen, toggleDropDown, handleLogout, goProfile };
}
