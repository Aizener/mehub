import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export default function Code({
  children,
  className = '',
}: PropsWithChildren<{
  href: string;
  className?: string;
}>) {
  return (
    <span className={cn('mx-1 bg-green-600 px-1 rounded-sm text-white text-sm', className)}>{children}</span>
  );
}
