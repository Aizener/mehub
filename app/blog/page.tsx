import CardContent from '@/components/CardContent';
import TagAndDate from '@/components/post/TagAndDate';
import { siteConfig } from '@/config/site.config';
import { getAllPosts } from '@/lib/useContents';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

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

const posts = getAllPosts();
function BlogPage() {
  return (
    <div className="w-full px-2 md:px-0">
      {Object.entries(posts).map(([date, list]) => (
        <div className="relative my-6 flex w-full gap-x-4 md:gap-x-8" key={date}>
          <div className="absolute h-full translate-x-8 border-r-2 border-dashed md:translate-x-26"></div>
          <div className="sticky top-12 inline-flex flex-col self-start md:top-20">
            <h1 className="font-[fantasy] text-2xl text-gray-300 md:text-7xl">
              {date.split('-')[0]}
            </h1>
            <h1 className="absolute right-0 bottom-0 translate-1/4 font-mono text-xl text-gray-500 md:text-5xl">
              {date.split('-')[1]}
            </h1>
          </div>
          <div className="flex flex-1 flex-col gap-y-2 overflow-x-hidden">
            {list.map((post, idx) => (
              <CardContent key={idx}>
                <Link href={`/post/${post._meta.filePath}`}>
                  <h1 className="group flex w-full cursor-pointer items-center justify-between border-b border-dashed border-b-gray-200 pb-2 text-lg font-bold text-gray-600 select-none hover:underline">
                    <span>{post.title}</span>
                    <ChevronRight className="h-4 w-4 translate-x-2 text-gray-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h1>
                </Link>
                <div className="border-b border-dashed border-gray-200 py-3 text-sm text-gray-600">
                  {post.summary}
                </div>
                <TagAndDate tags={post.tags} date={post.date} />
              </CardContent>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogPage;
