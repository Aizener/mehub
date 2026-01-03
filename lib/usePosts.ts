import { Post, allPosts } from '@/.content-collections/generated';

export const getAllPosts = () => {
  const posts = allPosts.sort(
    (a, b) => new Date(b._meta.directory).getTime() - new Date(a._meta.directory).getTime()
  );
  const articles: Record<string, Array<Post>> = {};
  for (const post of posts) {
    const date = post._meta.directory;
    if (!articles[date]) {
      articles[date] = [];
    }
    articles[date].push(post);
  }
  return articles;
};
