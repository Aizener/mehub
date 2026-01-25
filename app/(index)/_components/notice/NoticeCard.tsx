'use client';

import { type Notice } from '@/lib/useContents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type NoticeCardProps = {
  notice: Notice;
  onViewDetail: () => void;
};

/**
 * 截取公告内容的前N个字符作为预览
 */
export const getPreviewText = (content: string, maxLength: number = 100): string => {
  // 移除 markdown 格式标记
  const plainText = content.replace(/[#*_`\[\]()]/g, '').trim();
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
};

export default function NoticeCard({ notice, onViewDetail }: NoticeCardProps) {
  return (
    <div className="space-y-2">
      <div className="text-foreground/80 p-2 text-sm">
        <div className="font-semibold mb-1">{notice.title}</div>
        <div className="line-clamp-3">{getPreviewText(notice.content, 120)}</div>
      </div>
      <Button variant="outline" size="sm" className="w-full cursor-pointer" onClick={onViewDetail}>
        查看详情
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
