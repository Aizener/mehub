'use client';

import { Lenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useIsDesktop } from '@/lib/useMediaQuery';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  // 移动端禁用 Lenis，使用原生滚动（data-lenis-prevent 无法解决触摸滚动问题）
  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <Lenis
      root
      options={{
        lerp: 0.1, // 物理插值强度 (0-1)，越小越顺滑
        touchMultiplier: 2, // 触摸滚动灵敏度倍数
        syncTouch: false, // 关闭触摸同步，提升移动端性能
      }}
    >
      <ScrollToTopOnRouteChange pathname={pathname} />
      {children}
    </Lenis>
  );
}

function ScrollToTopOnRouteChange({ pathname }: { pathname: string }) {
  const lenis = useLenis();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
