import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export default function Code({
  children,
  className = '',
}: PropsWithChildren<{
  href: string;
  className?: string;
}>) {
  return (
    <span className={cn('mx-1 rounded-sm bg-green-600 px-1 text-sm text-white', className)}>
      {children}
    </span>
  );
}
