'use client';

import { Lenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
