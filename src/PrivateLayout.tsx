import { Outlet } from 'react-router-dom';
import { Header } from '@/components/header/Header';

export function PrivateLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
