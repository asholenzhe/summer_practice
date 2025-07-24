import {
  Menubar as ShadcnMenubar,
  MenubarMenu as ShadcnMenubarMenu,
  MenubarTrigger as ShadcnMenubarTrigger,
  MenubarContent as ShadcnMenubarContent,
  MenubarItem as ShadcnMenubarItem,
  MenubarSeparator as ShadcnMenubarSeparator,
} from '@/shadcn/components/Menubar.tsx';
import { Button } from '@/ui-kit/Button.tsx';

export interface MenuItem {
  key: string;
  label?: string;
  icon?: string;
  onClick?: () => void;
  danger?: boolean;
  type?: 'item' | 'separator';
}

export function Menubar({
  initial,
  label,
  items,
}: {
  initial: string;
  label: string;
  items: MenuItem[];
}) {
  return (
    <ShadcnMenubar className="border-none shadow-none px-0 bg-transparent">
      <ShadcnMenubarMenu>
        <ShadcnMenubarTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer px-2 py-1 rounded hover:bg-purple-100">
            <Button className="h-8 w-8 p-0 rounded-full bg-purple-100 text-purple-600">
              {initial}
            </Button>
            <span className="text-xl font-medium text-gray-700">{label}</span>
          </div>
        </ShadcnMenubarTrigger>

        <ShadcnMenubarContent align="start" className="min-w-[16rem]">
          {items.map((item) =>
            item.type === 'separator' ? (
              <ShadcnMenubarSeparator key={item.key} />
            ) : (
              <ShadcnMenubarItem
                key={item.key}
                onClick={item.onClick}
                className={item.danger ? 'text-red-600 hover:bg-red-100' : undefined}
              >
                {item.icon && <img src={item.icon} alt="" className="h-5 w-5 mr-2" />}
                {item.label}
              </ShadcnMenubarItem>
            ),
          )}
        </ShadcnMenubarContent>
      </ShadcnMenubarMenu>
    </ShadcnMenubar>
  );
}
