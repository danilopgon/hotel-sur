import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function Select({ className, children, ...props }: React.ComponentProps<'select'>) {
  return (
    <div className='relative w-full'>
      <select
        data-slot='select'
        className={cn(
          'border-input flex h-9 w-full appearance-none rounded-md border bg-transparent px-3 py-1 pr-9 text-base shadow-xs outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className='pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 opacity-60'
      />
    </div>
  );
}

export { Select };
