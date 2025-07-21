import { UserBox } from '@/components/user-box/UserBox.tsx';

export function Header() {
  return (
    <header className="bg-white w-full shadow-sm mt-4 rounded-lg">
      <div className="max-w-7xl mx-auto px-14 py-4 flex justify-end items-center">
        <UserBox />
      </div>
    </header>
  );
}
