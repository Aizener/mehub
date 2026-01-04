import { type Daily, allDailies } from '@/.content-collections/generated';

export const getAllDailies = () => {
  const posts = allDailies.sort(
    (a, b) => new Date(b._meta.directory).getTime() - new Date(a._meta.directory).getTime()
  );
  const dailies: Record<string, Array<Daily>> = {};
  for (const post of posts) {
    const date = post._meta.directory;
    if (!dailies[date]) {
      dailies[date] = [];
    }
    dailies[date].push(post);
  }
  return dailies;
};
