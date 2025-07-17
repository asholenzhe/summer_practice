import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-blue-200 transform active:scale-95",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]',
        destructive:
          'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]',
        outline:
          'border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 shadow-sm hover:shadow-md',
        secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 hover:shadow-md',
        ghost: 'hover:bg-gray-100 hover:text-gray-900 text-gray-700',
        link: 'text-blue-600 underline-offset-4 hover:underline hover:text-blue-800',
      },
      size: {
        default: 'h-10 px-6 py-2 has-[>svg]:px-4',
        sm: 'h-8 rounded-lg gap-1.5 px-4 has-[>svg]:px-3',
        lg: 'h-12 rounded-xl px-8 has-[>svg]:px-6 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
