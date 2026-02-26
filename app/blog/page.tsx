import BlogContent, { type PostItem } from './_components/BlogContent';
import { siteConfig } from '@/config/site.config';
import { getAllPosts } from '@/lib/useContents';

export const generateMetadata = async () => {
  const title = "I'm Cola's Blog";
  const description = 'Cola的个人博客，分享Web前端、全栈开发等技术文章';
  const url = `${siteConfig.url}/blog`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};

function toPostItem(post: {
  title: string;
  summary: string;
  tags: string[];
  date: string;
  _meta: { filePath: string };
}): PostItem {
  return {
    title: post.title,
    summary: post.summary,
    tags: post.tags,
    date: post.date,
    _meta: { filePath: post._meta.filePath },
  };
}

const posts = getAllPosts();
const postsEntries: [string, PostItem[]][] = Object.entries(posts).map(
  ([date, list]) => [date, list.map(toPostItem)]
);

function BlogPage() {
  return <BlogContent postsEntries={postsEntries} />;
}

export default BlogPage;
