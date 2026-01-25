import { type Daily, allDailies, Post, allPosts, type Notice, allNotices } from '@/.content-collections/generated';

export type { Notice };

const getContents = <T extends { _meta: { directory: string }; date: string }>(
  contents: T[]
): Record<string, T[]> => {
  const sorted = [...contents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const result: Record<string, T[]> = {};
  for (const content of sorted) {
    const date = content._meta.directory;
    if (!result[date]) result[date] = [];
    result[date].push(content);
  }
  return result;
};

export const getAllDailies = () => {
  return getContents<Daily>(allDailies);
};

export const getAllPosts = () => {
  return getContents<Post>(allPosts);
};

export const getAllNotices = () => {
  return [...allNotices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getNotices = (limit?: number) => {
  const all = getAllNotices();
  return limit ? all.slice(0, limit) : all;
};

export const getNoticeBySlug = (slug: string) => {
  return allNotices.find((notice) => notice._meta.path.replace('.md', '') === slug);
};
