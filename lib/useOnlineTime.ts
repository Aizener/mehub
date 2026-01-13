'use client';

import { siteConfig } from '@/config/site.config';
import { useEffect, useState } from 'react';

import { calculateOnlineTime } from './utils';

/**
 * Hook 用于获取网站运行时间，支持自动计时（每秒更新）
 * @returns 包含天数、小时、分钟、秒数的对象，每秒自动更新
 */
export function useOnlineTime() {
  const [onlineTime, setOnlineTime] = useState(() => calculateOnlineTime(siteConfig.startTime));

  useEffect(() => {
    // 立即更新一次
    setOnlineTime(calculateOnlineTime(siteConfig.startTime));

    // 每秒更新一次
    const interval = setInterval(() => {
      setOnlineTime(calculateOnlineTime(siteConfig.startTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return onlineTime;
}

/**
 * 计算从指定开始时间到现在的运行时间（不自动更新）
 * @param startTime 可选，ISO 时间字符串，默认使用 siteConfig.startTime
 * @returns 包含天数、小时、分钟、秒数的对象
 */
export function getOnlineTime(startTime?: string) {
  return calculateOnlineTime(startTime || siteConfig.startTime);
}
