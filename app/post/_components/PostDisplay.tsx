'use client';
import { Post } from '@/.content-collections/generated';
import TagAndDate from '@/components/post/TagAndDate';
import { useIsMobile } from '@/lib/useMediaQuery';
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

const CatalogList = ({
  toc,
  onItemClick,
  getSavedScrollY,
}: {
  toc: Toc;
  onItemClick?: () => void;
  getSavedScrollY?: () => number;
}) => {
  const toPageTarget = (item: TocItem) => {
    const target = document.querySelector(`#${item.id}`);
    if (!target) return;

    // 在 body fixed 状态下，使用保存的 scrollY 来计算目标位置
    const currentScrollY = getSavedScrollY ? getSavedScrollY() : window.scrollY;
    const targetTop = target.getBoundingClientRect().top + currentScrollY - 64;

    // 如果目录弹窗是打开的，先关闭它
    if (onItemClick) {
      onItemClick();
    }

    // 等待 body 样式恢复后再滚动
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      });
    });
  };

  return (
    <div className="flex max-h-dvh flex-col overflow-hidden md:max-h-[80dvh]">
      <h1 className="text-md mb-2 flex items-center justify-between gap-x-2 border-b border-dashed border-gray-200 pb-2 text-gray-800">
        <span className="font-bold">目录</span>
        <BookImage className="h-5 w-5" />
      </h1>
      <ul className="flex-1 overflow-y-auto pb-4">
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
    </div>
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
  const savedScrollYRef = useRef<number>(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!ref.current) return;
    const toc = getToc(ref.current);
    setToc(toc);
    setMounted(true);
  }, []);

  // 当移动端目录框打开时，阻止body滚动
  useEffect(() => {
    if (!isMobile) return;

    if (showMobileCatalog) {
      savedScrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollYRef.current}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, savedScrollYRef.current);
      };
    }
  }, [showMobileCatalog, isMobile]);

  return (
    <div className="mt-2 w-full overflow-x-hidden rounded-md border border-gray-200 p-4 shadow-sm md:mt-0">
      <div className="w-full border-b border-dashed border-gray-200 pb-4">
        <h1 className="text-xl font-bold text-gray-800">{post.title}</h1>
        <TagAndDate tags={post.tags} date={post.date} />
      </div>
      <article className="prose py-4" ref={ref}>
        {/* <MDXContent code={post.mdx} /> */}
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </article>
      {mounted && toc.length > 0 && isMobile && (
        <>
          <div
            className={cn(
              'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300',
              showMobileCatalog ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            onClick={() => setShowMobileCatalog(false)}
          />

          <div
            className={cn(
              'fixed top-0 right-0 z-50 h-full w-60 bg-white p-2 shadow-md transition-transform duration-300 ease-out',
              showMobileCatalog ? 'translate-x-0' : 'translate-x-full'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <CatalogList
              toc={toc}
              onItemClick={() => setShowMobileCatalog(false)}
              getSavedScrollY={() => savedScrollYRef.current}
            />
          </div>

          {!showMobileCatalog && (
            <div
              className="fixed right-2 bottom-2 z-60 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white"
              onClick={() => setShowMobileCatalog(true)}
            >
              <BookImage className="h-5 w-5 text-gray-700" />
            </div>
          )}
        </>
      )}
      {mounted && toc.length > 0 && <CatelogModal toc={toc} />}
    </div>
  );
}

export default PostDisplay;
