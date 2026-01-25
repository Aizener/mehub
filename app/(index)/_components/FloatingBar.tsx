'use client';

import CardContent from '@/components/CardContent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NoticeCard from './notice/NoticeCard';
import NoticeDetailDrawer from './notice/NoticeDetailDrawer';
import NoticeHistoryDrawer from './notice/NoticeHistoryDrawer';
import { siteConfig } from '@/config/site.config';
import { getNotices, getAllNotices } from '@/lib/useContents';
import { useOnlineTime } from '@/lib/useOnlineTime';
import { BadgeCheckIcon, History } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const searchPlatforms = [
  {
    name: '抖音',
    url: 'https://www.douyin.com',
    path: (key: string) => `jingxuan/search/${key}`,
  },
  {
    name: 'B站',
    url: 'https://search.bilibili.com',
    path: (key: string) => `all?keyword=${key}`,
  },
  {
    name: '知乎',
    url: 'https://www.zhihu.com',
    path: (key: string) => `search?type=content&q=${key}`,
  },
  {
    name: '百度',
    url: 'https://www.baidu.com',
    path: (key: string) => `s?wd=${key}`,
  },
  {
    name: '维基百科',
    url: 'https://zh.wikipedia.org',
    path: (key: string) => `wiki/${key}`,
  },
  {
    name: '谷歌',
    url: 'https://www.google.com',
    path: (key: string) => `search?q=${key}`,
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    path: (key: string) => `search?q=${key}&type=repositories`,
  },
  {
    name: 'npm',
    url: 'https://www.npmjs.com',
    path: (key: string) => `search?q=${key}`,
  },
];

function FloatingBar() {
  const [mounted, setMounted] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const { days, hours, minutes, seconds } = useOnlineTime();

  // 使用 useMemo 缓存公告数据，避免每次渲染都重新计算
  const latestNotice = useMemo(() => {
    const notices = getNotices(1);
    return notices.length > 0 ? notices[0] : null;
  }, []);

  const allNotices = useMemo(() => getAllNotices(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="order-1 overflow-y-auto pb-1 md:fixed md:max-h-[85vh] md:w-3xs">
      <CardContent className="flex items-center gap-x-3">
        <Avatar className="size-10 border border-gray-200 p-0.5">
          <AvatarImage src="/imgs/avatar.jpg" alt="@shadcn" className="rounded-full" />
          <AvatarFallback>Cola</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-1">
          <h1 className="text-md font-bold text-gray-800">可乐爱宅着</h1>
          <div className="flex flex-wrap items-center gap-x-1">
            <Badge
              className="h-5 bg-red-600 text-xs text-white dark:bg-blue-600"
              variant="secondary"
            >
              90后
            </Badge>
            <Badge
              className="h-5 bg-blue-500 text-xs text-white dark:bg-blue-600"
              variant="secondary"
            >
              宅
            </Badge>
            <Badge
              className="h-5 bg-orange-500 text-xs text-white dark:bg-blue-600"
              variant="secondary"
            >
              <BadgeCheckIcon />
              爱打游戏
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardContent className="mt-2 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold flex-1">公告栏</h1>
          <NoticeHistoryDrawer
            notices={allNotices}
            open={historyDrawerOpen}
            onOpenChange={setHistoryDrawerOpen}
            trigger={
              <Button variant="ghost" size="icon-sm" className="h-8 w-8 cursor-pointer">
                <History className="h-4 w-4" />
              </Button>
            }
          />
        </div>
        {latestNotice ? (
          <>
            <NoticeCard
              notice={latestNotice}
              onViewDetail={() => setDetailDrawerOpen(true)}
            />
            <NoticeDetailDrawer
              notice={latestNotice}
              open={detailDrawerOpen}
              onOpenChange={setDetailDrawerOpen}
            />
          </>
        ) : (
          <div className="text-foreground/80 p-2 text-sm text-center">暂无公告</div>
        )}
      </CardContent>

      <CardContent className="mt-2 hidden lg:block">
        <h1 className="text-center text-lg font-bold">便捷搜索</h1>
        <div className="flex flex-col gap-y-2 py-2">
          <Input
            placeholder="请输入后选择需要跳转的平台..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            clearable
          />
          <div className="text-foreground/80 flex flex-wrap items-center gap-2 text-xs">
            {searchPlatforms.map((item) => (
              <a
                key={item.name}
                href={`${item.url}/${item.path(searchText)}`}
                target="_blank"
                rel="noreferrer"
                className="border-background-200 hover:bg-foreground/10 rounded-sm border px-2 py-1 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </CardContent>

      <CardContent className="mt-2 space-y-1">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>版本号</span>
          <span>v{process.env.NEXT_PUBLIC_APP_VERSION}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>备案号</span>
          <span>{siteConfig.recordNumber}</span>
        </div>
        {mounted && (
          <div className="flex items-center justify-between text-sm text-gray-700">
            <span>已运行</span>
            <span className="tracking-tighter">{`${days} 天 ${String(hours).padStart(2, '0')} 小时 ${String(minutes).padStart(2, '0')} 分钟 ${String(seconds).padStart(2, '0')} 秒`}</span>
          </div>
        )}
      </CardContent>
    </div>
  );
}

export default FloatingBar;
