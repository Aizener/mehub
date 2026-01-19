import { siteConfig } from '@/config/site.config';
import { getAllPosts } from '@/lib/useContents';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import PostDisplay from '../_components/PostDisplay';

const posts = getAllPosts();

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const awaitPrams = await params;
  const [year, fileName] = awaitPrams.slug;
  const post = posts[year]?.find((item) => item._meta.fileName === fileName);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  const url = `${siteConfig.url}/post/${post._meta.filePath}`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      siteName: siteConfig.name,
      type: 'article',
      publishedTime,
      tags: post.tags,
      authors: [siteConfig.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
};

async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const awaitPrams = await params;
  const [year, fileName] = awaitPrams.slug;

  const post = posts[year]?.find((item) => item._meta.fileName === fileName);

  if (!post) {
    notFound();
  }

  const url = `${siteConfig.url}/post/${post._meta.filePath}`;
  const publishedTime = new Date(post.date).toISOString();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: `${siteConfig.url}/imgs/icon-512x512.png`,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/imgs/icon-512x512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative w-full">
        <PostDisplay post={post} />
      </div>
    </>
  );
}

export default PostPage;
