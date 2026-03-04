'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import CardContent from '@/components/CardContent';
import TagAndDate from '@/components/post/TagAndDate';
import { cn } from '@/lib/utils';

import { BlogFilterBar, type FilterState } from './BlogFilterBar';

export type PostItem = {
  title: string;
  summary: string;
  tags: string[];
  date: string;
  _meta: { filePath: string };
};

type BlogContentProps = {
  postsEntries: [string, PostItem[]][];
};

const DEFAULT_FILTER: FilterState = {
  dateKey: '',
  tag: '',
  search: '',
};

function filterPosts(entries: [string, PostItem[]][], filter: FilterState): [string, PostItem[]][] {
  const searchLower = filter.search.toLowerCase();
  return entries
    .filter(([dateKey]) => !filter.dateKey || dateKey === filter.dateKey)
    .map(([dateKey, list]) => [
      dateKey,
      list.filter(
        (post) =>
          (!filter.tag || post.tags.includes(filter.tag)) &&
          (!searchLower || post.title.toLowerCase().includes(searchLower))
      ),
    ])
    .filter(([, list]) => list.length > 0) as [string, PostItem[]][];
}

export default function BlogContent({ postsEntries }: BlogContentProps) {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const { dateOptions, tagOptions } = useMemo(() => {
    const dates = [...new Set(postsEntries.map(([d]) => d))].sort().reverse();
    const tags = [
      ...new Set(postsEntries.flatMap(([, list]) => list.flatMap((p) => p.tags))),
    ].sort();
    return { dateOptions: dates, tagOptions: tags };
  }, [postsEntries]);

  const filteredEntries = useMemo(() => filterPosts(postsEntries, filter), [postsEntries, filter]);

  return (
    <div className="w-full px-2 md:px-0">
      <BlogFilterBar
        dateOptions={dateOptions}
        tagOptions={tagOptions}
        filter={filter}
        onFilterChange={setFilter}
      />
      {filteredEntries.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-500">暂无匹配的文章</div>
      ) : (
        filteredEntries.map(([date, list], idx) => {
          const [year, month] = date.split('-');
          return (
            <div
              className={cn(
                'relative my-6 flex w-full gap-x-4 md:gap-x-8',
                idx === 0 ? 'mt-0 md:mt-4' : 'mt-6'
              )}
              key={date}
            >
              <div className="absolute h-full translate-x-8 border-r-2 border-dashed md:translate-x-26" />
              <div className="sticky top-24 inline-flex flex-col self-start md:top-28">
                <h1 className="font-[fantasy] text-2xl text-gray-300 md:text-7xl">{year}</h1>
                <h1 className="absolute right-0 bottom-0 translate-1/4 font-mono text-xl text-gray-500 md:text-5xl">
                  {month}
                </h1>
              </div>
              <div className="flex flex-1 flex-col gap-y-2 overflow-x-hidden">
                {list.map((post) => (
                  <CardContent key={post._meta.filePath}>
                    <Link href={`/post/${post._meta.filePath}`}>
                      <h1 className="group flex w-full cursor-pointer items-center justify-between border-b border-dashed border-b-gray-200 pb-2 text-lg font-bold text-gray-600 select-none hover:underline">
                        <span>{post.title}</span>
                        <ChevronRight className="h-4 w-4 translate-x-2 text-gray-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </h1>
                    </Link>
                    <div className="border-b border-dashed border-gray-200 py-3 text-sm text-gray-600">
                      {post.summary}
                    </div>
                    <TagAndDate tags={post.tags} date={post.date} />
                  </CardContent>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
