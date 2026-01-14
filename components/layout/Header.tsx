'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navs = [
  { path: '/', title: '主页' },
  { path: '/blog', title: '博客' },
  { path: '/daily', title: '碎碎念' },
  // { path: '/about', title: 'About' },
];
function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-background/50 sticky top-0 z-50 flex w-full items-center justify-between border px-4 py-2 shadow backdrop-blur-xs md:my-4 md:mt-4 md:rounded-md">
      <Link href="/">
        <div className="font-mono text-lg font-bold text-gray-700">I&apos;m Cola.</div>
      </Link>
      <nav className="flex items-center gap-x-4 font-sans text-sm">
        {navs.map((nav, idx) => (
          <Link
            key={idx}
            href={nav.path}
            className={cn(
              "relative select-none after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-md after:bg-gray-700 after:transition-all after:duration-300 after:content-[''] hover:text-gray-950 hover:after:w-full",
              pathname === nav.path ? 'text-gray-950 after:w-full' : 'text-gray-700'
            )}
          >
            {nav.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
