'use client';

import { getAllDailies } from '@/lib/useContents';
import { cn } from '@/lib/utils';
import { getWeatherIcon } from '@/lib/weather';
import { MDXContent } from '@content-collections/mdx/react';
import { motion } from 'framer-motion';
import { CalendarClock, CalendarHeart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const dailies = getAllDailies();

const getWeekdayName = (weekday: number) => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekdays[weekday];
};

const MAX_HEIGHT = 320;

function DailyPage() {
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [overflowItems, setOverflowItems] = useState<Set<string>>(new Set());
  const [contentHeights, setContentHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    // 检测每个内容是否超过最大高度，并记录实际高度
    const checkOverflow = () => {
      const overflowSet = new Set<string>();
      const heights: Record<string, number> = {};

      Object.entries(contentRefs.current).forEach(([key, ref]) => {
        if (ref) {
          const scrollHeight = ref.scrollHeight;
          heights[key] = scrollHeight;
          if (scrollHeight + 50 > MAX_HEIGHT) {
            overflowSet.add(key);
          }
        }
      });

      setOverflowItems(overflowSet);
      setContentHeights(heights);
    };

    // 初始检测
    checkOverflow();

    // 监听窗口大小变化
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  const toggleExpand = (filePath: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filePath)) {
        newSet.delete(filePath);
      } else {
        newSet.add(filePath);
      }
      return newSet;
    });
  };

  return (
    <div>
      {Object.entries(dailies).map(([date, list]) => (
        <div key={date}>
          <div className="sticky top-10 inline-flex w-full items-center justify-between bg-white/60 px-3 py-3 backdrop-blur-sm">
            <h1 className="font-[fantasy] text-2xl text-gray-300">{date.split('-')[0]}</h1>
            <h1 className="font-mono text-xl text-gray-500">{date.split('-')[1]}</h1>
          </div>
          {list.map((daily) => {
            const WeatherIcon = getWeatherIcon(daily.weather);
            const filePath = daily._meta.filePath;
            const isExpanded = expandedItems.has(filePath);
            const hasOverflow = overflowItems.has(filePath);

            return (
              <div
                className="mb-2 flex flex-col gap-x-4 md:mb-4 md:flex-row md:items-start"
                key={filePath}
              >
                <div className="flex w-full justify-between gap-y-2 border border-gray-200 p-3 shadow-sm md:w-52 md:flex-col md:rounded-md">
                  <div className="flex items-center gap-x-2 text-sm text-gray-700">
                    <CalendarClock className="h-4 w-4 text-gray-700" />
                    <span>{daily.date.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm text-gray-700">
                    <WeatherIcon className="h-4 w-4 text-gray-700" />
                    <span>{daily.weather}</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm text-gray-700">
                    <CalendarHeart className="h-4 w-4 text-gray-700" />
                    <span>{getWeekdayName(daily.weekday)}</span>
                  </div>
                </div>
                <div className="relative flex-1 border border-gray-200 shadow-sm md:rounded-md">
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded
                        ? (contentHeights[filePath] + 50 ?? MAX_HEIGHT)
                        : MAX_HEIGHT,
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
                    <div
                      ref={(el) => {
                        contentRefs.current[filePath] = el;
                        // 当 ref 设置后，重新检测高度
                        if (el && !contentHeights[filePath]) {
                          // 使用 requestAnimationFrame 确保 DOM 已渲染
                          requestAnimationFrame(() => {
                            const scrollHeight = el.scrollHeight;
                            setContentHeights((prev) => ({
                              ...prev,
                              [filePath]: scrollHeight,
                            }));
                            if (scrollHeight > MAX_HEIGHT) {
                              setOverflowItems((prev) => new Set(prev).add(filePath));
                            }
                          });
                        }
                      }}
                    >
                      <MDXContent
                        code={daily.mdx}
                        components={{
                          p: (props) => <div {...props} className="text-sm text-gray-700" />,
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
                        onClick={() => toggleExpand(filePath)}
                        className={cn(
                          'cursor-pointer text-sm text-gray-600 underline hover:text-gray-800'
                        )}
                      >
                        {isExpanded ? '收起' : '阅读更多'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default DailyPage;
