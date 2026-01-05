import { type Daily, allDailies } from '@/.content-collections/generated';
import { Post, allPosts } from '@/.content-collections/generated';

const getContents = <T extends { _meta: { directory: string } }>(
  contents: T[]
): Record<string, T[]> => {
  const sorted = [...contents].sort(
    (a, b) => new Date(b._meta.directory).getTime() - new Date(a._meta.directory).getTime()
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
  console.log(111, allPosts);
  return getContents<Post>(allPosts);
};
