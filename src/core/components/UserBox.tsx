import { Button } from '@/ui-kit/Button.tsx';
import logoutLogo from '@/assets/logout.svg';
import profileLogo from '@/assets/profile-logo.svg';
import { UserStore } from '@/user/store/UserStore.tsx';
import { useDropdown } from '@/core/hooks/useDropDown.ts';
import { cn } from '@/ui-kit/utils/utils.ts';
import { Menubar } from '@/ui-kit/menubar/Menubar.tsx';
import { MenubarMenu } from '@/ui-kit/menubar/MenubarMenu.tsx';
import { MenubarTrigger } from '@/ui-kit/menubar/MenubarTrigger.tsx';
import { MenubarContent } from '@/ui-kit/menubar/MenubarContent.tsx';
import { MenubarItem } from '@/ui-kit/menubar/MenubarItem.tsx';
import { MenubarSeparator } from '@/ui-kit/menubar/MenubarSeparator.tsx';

export function UserBox() {
  const firstName = UserStore((state) => state.firstName);
  const lastName = UserStore((state) => state.lastName);
  const initial = lastName.charAt(0).toUpperCase();

  const { logout, goProfile } = useDropdown();

  return (
    <Menubar className="border-none shadow-none px-0 bg-transparent">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer px-2 py-1 rounded hover:bg-purple-100">
            <Button className="h-8 w-8 p-0 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition">
              {initial}
            </Button>
            <span className="text-xl font-medium text-gray-700">
              {lastName} {firstName}
            </span>
          </div>
        </MenubarTrigger>

        <MenubarContent
          align="start"
          className="min-w-[16rem] max-w-[20rem] h-auto max-h-[24rem] overflow-auto"
        >
          <MenubarItem onClick={goProfile}>
            <img src={profileLogo} alt="Profile" className="h-5 w-5 mr-2" />
            Profile
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={logout}
            className={cn(
              'text-red-600',
              'data-[highlighted]:text-red-600',
              'hover:bg-red-100',
              'data-[highlighted]:bg-red-100',
              'transition-colors',
            )}
          >
            <img src={logoutLogo} alt="Logout" className="h-4 w-4 mr-2" />
            Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
