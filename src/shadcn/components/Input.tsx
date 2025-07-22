import { cn } from '@/shadcn/utils/utils.ts';
import type { ComponentProps } from 'react';

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-gray-500 selection:bg-blue-100 selection:text-blue-900',
        'bg-gray-50 border-gray-200 flex h-11 w-full min-w-0 rounded-lg border-2 px-4 py-2 text-base shadow-sm transition-all duration-200 outline-none',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:shadow-md',
        'hover:border-gray-300 hover:bg-white',
        'aria-invalid:ring-red-100 aria-invalid:border-red-500 aria-invalid:bg-red-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
