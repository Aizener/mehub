import { getAllPosts } from '@/lib/useContents';
import { notFound } from 'next/navigation';

import PostDisplay from '../_components/PostDisplay';

const posts = getAllPosts();

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const awaitPrams = await params;
  const [year, fileName] = awaitPrams.slug;
  const post = posts[year]?.find((item) => item._meta.fileName === fileName);
  return {
    title: post?.title,
    description: post?.summary,
  };
};

async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const awaitPrams = await params;
  const [year, fileName] = awaitPrams.slug;

  const post = posts[year]?.find((item) => item._meta.fileName === fileName);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative w-full">
      <PostDisplay post={post} />
    </div>
  );
}

export default PostPage;
