import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.svg';
import type { ReactNode } from 'react';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Link to="/study" className="mb-8">
        <img src={Logo} alt="EatEasy Logo" className="h-16 w-auto" />
      </Link>
      <div className="w-full max-w-md mx-auto">{children}</div>
    </div>
  );
}
