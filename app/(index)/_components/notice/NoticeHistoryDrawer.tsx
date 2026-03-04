'use client';

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
  DrawerTrigger,
} from '@/components/ui/drawer';
import { type Notice } from '@/lib/useContents';
import { useState } from 'react';

import { getPreviewText } from './NoticeCard';
import NoticeDetailDrawer from './NoticeDetailDrawer';

type NoticeHistoryDrawerProps = {
  notices: Notice[];
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const getPriorityBorderClass = (priority: Notice['priority']) => {
  switch (priority) {
    case 'high':
      return 'border-red-500 bg-red-50 dark:bg-red-950/20';
    case 'medium':
      return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
    case 'low':
      return 'border-blue-500 bg-blue-50 dark:bg-blue-950/20';
    default:
      return 'border-blue-500 bg-blue-50 dark:bg-blue-950/20';
  }
};

export default function NoticeHistoryDrawer({
  notices,
  trigger,
  open,
  onOpenChange,
}: NoticeHistoryDrawerProps) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setDetailDrawerOpen(true);
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange} direction="right">
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent direction="right">
          <DrawerHeader>
            <DrawerTitle>历史公告</DrawerTitle>
            <DrawerDescription>查看所有历史公告</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
            {notices.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center">暂无公告</p>
            ) : (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice._meta.path}
                    onClick={() => handleNoticeClick(notice)}
                    className={`hover:bg-opacity-80 cursor-pointer rounded-lg border-l-4 p-4 transition-colors ${getPriorityBorderClass(notice.priority)}`}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-base font-semibold">{notice.title}</h3>
                      <span className="text-muted-foreground ml-2 text-xs whitespace-nowrap">
                        {notice.date}
                      </span>
                    </div>
                    <div className="text-muted-foreground mb-2 text-sm">
                      {getPreviewText(notice.content, 150)}
                    </div>
                    {notice.tags && notice.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {notice.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="cursor-pointer">
                关闭
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {selectedNotice && (
        <NoticeDetailDrawer
          notice={selectedNotice}
          open={detailDrawerOpen}
          onOpenChange={setDetailDrawerOpen}
        />
      )}
    </>
  );
}
