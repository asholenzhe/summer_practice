import { UserBox } from '@/components/user-box/UserBox.tsx';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';

export function Header() {
  return (
    <header className="bg-white w-full shadow-sm mt-4 rounded-lg">
      <div className="max-w-7xl mx-auto px-14 py-4 flex items-center justify-between">
        <Link to="/study" className="block">
          <img src={logo} alt="Easy English Logo" className="h-14 w-auto" />
        </Link>
        <UserBox />
      </div>
    </header>
  );
}
