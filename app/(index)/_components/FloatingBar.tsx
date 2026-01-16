'use client';

import CardContent from '@/components/CardContent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { siteConfig } from '@/config/site.config';
import { useOnlineTime } from '@/lib/useOnlineTime';
import { BadgeCheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const { days, hours, minutes, seconds } = useOnlineTime();

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
        <h1 className="text-center text-lg font-bold">公告栏</h1>
        <div className="text-foreground/80 p-2 text-sm">小站还在建设中哦~</div>
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
