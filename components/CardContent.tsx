import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

function CardContent({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('bg-background/50 rounded-md border p-3 shadow-sm', className)}>
      {children}
    </div>
  );
}

export default CardContent;
