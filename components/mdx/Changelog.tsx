'use client';

import { History } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ChangelogItem = {
  date: string;
  content: string;
};

export default function Changelog({
  items = [],
  className,
}: {
  /** 修改记录，按时间倒序（新的在前），单条时传 [{ date, content }] */
  items: ChangelogItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        'mb-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm',
        'dark:border-amber-800 dark:bg-amber-950/40',
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2 font-medium text-amber-800 dark:text-amber-200">
        <History className="h-4 w-4 shrink-0" />
        <span>修改历史</span>
      </div>
      <ul className="mb-0! space-y-2 text-amber-900 dark:text-amber-100">
        {items.map((item, idx) => (
          <li key={idx} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
            <time className="shrink-0 font-mono text-xs text-amber-700 dark:text-amber-300">
              {item.date}
            </time>
            <span className="text-gray-700 dark:text-gray-300">{item.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
