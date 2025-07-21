import { UserBox } from '@/components/user-box/UserBox.tsx';

export function Header() {
  return (
    <header
      className="
        bg-white
        rounded-lg
        shadow-sm
        max-w-7xl mx-auto
        px-14 py-4
        mt-4
        flex
        justify-end
        items-center
      "
    >
      <UserBox />
    </header>
  );
}
