import logoutLogo from '@/assets/logout.svg';
import profileLogo from '@/assets/profile-logo.svg';
import { UserStore } from '@/user/store/UserStore.tsx';
import { useDropdown } from '@/core/hooks/useDropDown.ts';
import { Menubar, type MenuItem } from '@/ui-kit/Menubar.tsx';

export function UserBox() {
  const firstName = UserStore((state) => state.firstName);
  const lastName = UserStore((state) => state.lastName);
  const initial = lastName.charAt(0).toUpperCase();

  const { logout, goProfile } = useDropdown();

  const items: MenuItem[] = [
    { key: 'profile', icon: profileLogo, label: 'Profile', onClick: goProfile },
    { key: 'separator1', type: 'separator' },
    { key: 'logout', icon: logoutLogo, label: 'Logout', onClick: logout, danger: true },
  ];

  return <Menubar initial={initial} label={`${lastName} ${firstName}`} items={items} />;
}
