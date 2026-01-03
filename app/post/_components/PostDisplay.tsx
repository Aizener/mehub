'use client';
import { Post } from '@/.content-collections/generated';
import TagAndDate from '@/components/post/TagAndDate';
import { cn } from '@/lib/utils';
import { MDXContent } from '@content-collections/mdx/react';
import { BookImage } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TocItem = { id: string; text: string; depth: number };
type Toc = TocItem[];

function getToc(container: HTMLElement) {
  const headings = Array.from(container.querySelectorAll('h1, h2'));

  return headings.map((el) => ({
    depth: el.tagName === 'H1' ? 1 : 2,
    text: el.textContent ?? '',
    id: el.id,
  }));
}

const CatalogList = ({ toc }: { toc: Toc }) => {
  const toPageTarget = (item: TocItem) => {
    const target = document.querySelector(`#${item.id}`);
    console.log('item', item, target);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <h1 className="text-md mb-2 flex items-center justify-between gap-x-2 border-b border-dashed border-gray-200 pb-2 text-gray-800">
        <span className="font-bold">目录</span>
        <BookImage className="h-5 w-5" />
      </h1>
      <ul>
        {toc.map((item, idx) => (
          <li
            key={idx}
            className={cn(
              item.depth === 1 ? '' : 'ml-4',
              'text-md line-clamp-1 cursor-pointer text-gray-700 select-none hover:underline'
            )}
            onClick={() => toPageTarget(item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
};

const CatelogModal = ({ toc }: { toc: Toc }) => {
  return createPortal(
    <div className="fixed top-4 left-[calc(48rem+(100%-48rem)*0.5)] hidden translate-x-4 rounded-sm border border-gray-200 p-3 shadow-sm md:flex md:w-52 md:flex-col">
      <CatalogList toc={toc} />
    </div>,
    document.querySelector('#catalog-portal')!
  );
};

function PostDisplay({ post }: { post: Post }) {
  const ref = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<Toc>([]);
  const [mounted, setMounted] = useState(false);
  const [showMobileCatalog, setShowMobileCatalog] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const toc = getToc(ref.current);
    setToc(toc);
    setMounted(true);
  }, []);

  return (
    <div className="mt-2 w-full overflow-x-hidden rounded-md border border-gray-200 p-4 shadow-sm md:mt-0">
      <div className="w-full border-b border-dashed border-gray-200 pb-4">
        <h1 className="text-xl font-bold text-gray-800">{post.title}</h1>
        <TagAndDate tags={post.tags} date={post.date} />
      </div>
      <article className="prose py-4" ref={ref}>
        <MDXContent code={post.mdx} />
      </article>
      <div
        className="fixed right-2 bottom-2 z-60 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white"
        onClick={() => setShowMobileCatalog(!showMobileCatalog)}
      >
        <BookImage className="h-5 w-5 text-gray-700" />
      </div>
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full bg-white shadow-md transition-all duration-300',
          showMobileCatalog ? 'w-60 p-2 opacity-100' : 'w-0 opacity-0'
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <CatalogList toc={toc} />
      </div>
      {mounted && <CatelogModal toc={toc} />}
    </div>
  );
}

export default PostDisplay;
