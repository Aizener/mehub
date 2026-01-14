import { cn } from '@/lib/utils';
import React, { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

export default function Link({
  children,
  href,
  target = '_blank',
  className = '',
}: PropsWithChildren<{
  href: string;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
}>) {
  return (
    <a href={href} target={target} className={cn('mx-1 text-green-600 underline', className)}>
      {children}
    </a>
  );
}
