'use client';

import { type Notice } from '@/lib/useContents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { memo } from 'react';

type NoticeDetailDrawerProps = {
  notice: Notice;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function NoticeDetailDrawer({
  notice,
  open,
  onOpenChange,
}: NoticeDetailDrawerProps) {
  const getPriorityLabel = (priority: Notice['priority']) => {
    switch (priority) {
      case 'high':
        return '高优先级';
      case 'medium':
        return '中优先级';
      case 'normal':
        return '正常';
      case 'low':
        return '低优先级';
      default:
        return '-';
    }
  };

  const getPriorityClassName = (priority: Notice['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent direction="right">
        <DrawerHeader>
          <DrawerTitle>{notice.title}</DrawerTitle>
          <DrawerDescription className="sr-only">
            公告详情：{notice.title}
          </DrawerDescription>
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center justify-between mt-2">
              <time dateTime={notice.date} className="text-sm">
                {notice.date}
              </time>
              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClassName(notice.priority)}`}>
                {getPriorityLabel(notice.priority)}
              </span>
            </div>
            {notice.tags && notice.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {notice.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </DrawerHeader>
        <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
          <div
            className="prose prose-sm max-w-none dark:prose-invert text-sm text-gray-800 select-text"
            dangerouslySetInnerHTML={{ __html: notice.html }}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className='cursor-pointer'>关闭</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default memo(NoticeDetailDrawer);
