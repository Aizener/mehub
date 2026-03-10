'use client';

import { PropsWithChildren, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type AnnotationItem = {
  note: string;
};

export default function Annotation({
  children,
  items,
  className,
}: PropsWithChildren<{
  items: AnnotationItem[];
  className?: string;
}>) {
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  const handleOpen = () => {
    clearCloseTimeout();
    setOpen(true);
  };

  if (!items?.length) {
    return <span className={className}>{children}</span>;
  }

  const count = items.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          className={cn(
            'mx-1 inline-flex cursor-help items-baseline gap-0.5 rounded border-b-2 border-amber-400 bg-amber-50 px-1 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-100',
            className
          )}
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
        >
          {children}
          <Badge
            variant="outline"
            className="ml-0.5 h-4 min-w-4 shrink-0 border-none bg-amber-600 px-0.5 text-[10px] font-semibold text-white"
          >
            {count}
          </Badge>
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-3"
        align="start"
        side="top"
        onMouseEnter={handleOpen}
        onMouseLeave={scheduleClose}
      >
        <div
          data-lenis-prevent
          className={cn(
            'custom-scrollbar space-y-0.5 overflow-y-auto text-sm',
            'max-h-64 md:max-h-92'
          )}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="text-muted-foreground text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.note }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
