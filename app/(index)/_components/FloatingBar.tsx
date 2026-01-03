'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';

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
  const [searchText, setSearchText] = useState('');

  return (
    <div className="overflow-y-auto md:w-3xs lg:fixed lg:max-h-[85vh]">
      <div className="bg-background/50 rounded-md border p-3 shadow-sm">
        <h1 className="text-center text-lg font-bold">公告栏</h1>
        <div className="text-foreground/80 p-2 text-sm">小站还在建设中哦~</div>
      </div>

      <div className="bg-background/50 mt-4 hidden rounded-md border p-3 shadow-sm lg:block">
        <h1 className="text-center text-lg font-bold">便捷搜索</h1>
        <div className="flex flex-col gap-y-2 py-2">
          <Input
            placeholder="请输入后选择需要跳转的平台..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
      </div>

      <div className="bg-background/50 mt-4 space-y-1 rounded-md border p-3 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span>版本</span>
          <span>v0.0.1</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>已运行</span>
          <span>1天</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>备案号</span>
          <span>@蜀20260101</span>
        </div>
      </div>
    </div>
  );
}

export default FloatingBar;
