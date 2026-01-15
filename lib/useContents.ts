import { type Daily, allDailies } from '@/.content-collections/generated';
import { Post, allPosts } from '@/.content-collections/generated';

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
