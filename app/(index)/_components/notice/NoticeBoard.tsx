'use client';

import Link from 'next/link';
import { type Notice } from '@/lib/useContents';

type NoticeBoardProps = {
  notices: Notice[];
  maxNotices?: number;
};

export default function NoticeBoard({ notices, maxNotices = 5 }: NoticeBoardProps) {
  // 按日期排序，最新的在前面
  const sortedNotices = [...notices].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // 如果指定了最大显示数量，则只显示最新的几条
  const displayedNotices = maxNotices ? sortedNotices.slice(0, maxNotices) : sortedNotices;

  return (
    <div className="notice-board">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b">公告栏</h2>

      {displayedNotices.length === 0 ? (
        <p className="text-gray-500 italic">暂无公告</p>
      ) : (
        <ul className="space-y-4">
          {displayedNotices.map((notice) => (
            <li
              key={notice._meta.path}
              className={`p-4 rounded-lg border-l-4 ${
                notice.priority === 'high'
                  ? 'border-red-500 bg-red-50'
                  : notice.priority === 'medium'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <Link href={`/notices/${notice._meta.path.replace('.md', '')}`} className="font-semibold hover:underline">
                  {notice.title}
                </Link>
                <span className="text-sm text-gray-500 ml-2">{notice.date}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {notice.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs bg-gray-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {notices.length > maxNotices && (
        <div className="mt-4 text-center">
          <Link href="/notices" className="text-blue-600 hover:underline">
            查看更多公告 →
          </Link>
        </div>
      )}
    </div>
  );
}
