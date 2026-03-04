'use client';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export type FilterState = {
  dateKey: string;
  tag: string;
  search: string;
};

type BlogFilterBarProps = {
  dateOptions: string[];
  tagOptions: string[];
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
};

export function BlogFilterBar({
  dateOptions,
  tagOptions,
  filter,
  onFilterChange,
}: BlogFilterBarProps) {
  return (
    <div className="bg-background/60 sticky top-11 z-40 flex w-full items-center justify-between gap-2 py-3 text-xs backdrop-blur-xs md:mx-0 md:gap-3 md:py-2">
      <div className="flex items-center gap-2">
        <div className="flex shrink-0 items-center gap-1.5">
          <label className="text-gray-600">时间</label>
          <select
            value={filter.dateKey}
            onChange={(e) => onFilterChange({ ...filter, dateKey: e.target.value })}
            className="h-7 w-20 rounded border border-gray-200 bg-transparent px-1.5 text-gray-700 outline-none focus:border-gray-400 md:w-28"
          >
            <option value="">全部</option>
            {dateOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <label className="text-gray-600">标签</label>
          <select
            value={filter.tag}
            onChange={(e) => onFilterChange({ ...filter, tag: e.target.value })}
            className="h-7 w-20 rounded border border-gray-200 bg-transparent px-1.5 text-gray-700 outline-none focus:border-gray-400 md:w-28"
          >
            <option value="">全部</option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <Search className="h-3.5 w-3.5 shrink-0 text-gray-500" />
        <Input
          type="text"
          placeholder="搜索"
          value={filter.search}
          onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          className="h-8 w-20 px-2 text-xs md:w-40"
          clearable
          onClear={() => onFilterChange({ ...filter, search: '' })}
        />
      </div>
    </div>
  );
}
