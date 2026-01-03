import { getAllPosts } from '@/lib/usePosts';

import PostDisplay from '../_components/PostDisplay';

const posts = getAllPosts();
async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const awaitPrams = await params;
  const [year, fileName] = awaitPrams.slug;

  const post = posts[year]?.find((item) => item._meta.fileName === fileName);

  return post ? (
    <div className="relative w-full">
      <PostDisplay post={post} />
    </div>
  ) : (
    '404'
  );
}

export default PostPage;
