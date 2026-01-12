'use client';

import { type Daily } from '@/.content-collections/generated';
import Link from '@/components/mdx/Link';
import { useIsDesktop } from '@/lib/useMediaQuery';
import { cn, throttle } from '@/lib/utils';
import { getWeatherIcon } from '@/lib/weather';
import { MDXContent } from '@content-collections/mdx/react';
import { motion } from 'framer-motion';
import { CalendarClock, CalendarHeart } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const getWeekdayName = (weekday: number) => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekdays[weekday];
};

interface DailyItemProps {
  daily: Daily;
}

const MAX_HEIGHT_DESKTOP = 500;
const MAX_HEIGHT_MOBILE = 300;

export default function DailyItem({ daily }: DailyItemProps) {
  const WeatherIcon = getWeatherIcon(daily.weather);
  const isDesktop = useIsDesktop();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  const MAX_HEIGHT = useMemo(
    () => (isDesktop ? MAX_HEIGHT_DESKTOP : MAX_HEIGHT_MOBILE),
    [isDesktop]
  );

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        setContentHeight(scrollHeight);
        if (scrollHeight + 50 > MAX_HEIGHT) {
          setHasOverflow(true);
        } else {
          setHasOverflow(false);
        }
      }
    };

    // 使用 requestAnimationFrame 确保 DOM 已渲染
    requestAnimationFrame(() => {
      checkOverflow();
    });

    // 使用节流函数限制 resize 事件执行频率（每 150ms 最多执行一次）
    const throttledCheckOverflow = throttle(checkOverflow, 150);

    // 监听窗口大小变化（使用节流）
    window.addEventListener('resize', throttledCheckOverflow);
    return () => {
      window.removeEventListener('resize', throttledCheckOverflow);
    };
  }, [MAX_HEIGHT]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const animatedHeight = useMemo(() => {
    const defaultHeight = MAX_HEIGHT * 0.5;
    if (isExpanded) {
      return contentHeight ? contentHeight + 50 : defaultHeight;
    }
    return contentHeight ? Math.min(contentHeight + 36, MAX_HEIGHT) : defaultHeight;
  }, [isExpanded, contentHeight, MAX_HEIGHT]);

  return (
    <div className="mb-2 flex flex-col gap-x-4 md:mb-4 md:flex-row md:items-start">
      <div className="flex w-full justify-between gap-y-2 border border-gray-200 p-3 shadow-sm md:w-52 md:flex-col md:rounded-md">
        <div className="flex items-center gap-x-2 text-sm text-gray-700">
          <CalendarClock className="h-4 w-4 text-gray-700" />
          <span>{daily.date.toLocaleString()}</span>
        </div>
        <div className="flex gap-x-4 md:flex-col md:gap-y-2">
          <div className="flex items-center gap-x-2 text-sm text-gray-700">
            <WeatherIcon className="h-4 w-4 text-gray-700" />
            <span>{daily.weather}</span>
          </div>
          <div className="flex items-center gap-x-2 text-sm text-gray-700">
            <CalendarHeart className="h-4 w-4 text-gray-700" />
            <span>{getWeekdayName(daily.weekday)}</span>
          </div>
        </div>
      </div>
      <div className="relative flex-1 border border-gray-200 shadow-sm md:rounded-md">
        <motion.div
          initial={false}
          animate={{
            height: animatedHeight,
          }}
          transition={{
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            overflow: 'hidden',
          }}
          className="p-4"
        >
          <div ref={contentRef}>
            <MDXContent
              code={daily.mdx}
              components={{
                p: (props) => <div {...props} className="text-sm text-gray-700" />,
                Link,
              }}
            />
          </div>
        </motion.div>
        {hasOverflow && (
          <div
            className={cn(
              'absolute right-0 bottom-0 left-0 flex items-center justify-center bg-linear-to-t from-white via-white to-transparent p-2'
            )}
          >
            <button
              onClick={toggleExpand}
              className={cn('cursor-pointer text-sm text-gray-600 underline hover:text-gray-800')}
            >
              {isExpanded ? '收起' : '阅读更多'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
