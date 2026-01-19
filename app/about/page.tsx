import { siteConfig } from '@/config/site.config';

export const generateMetadata = async () => {
  const title = '关于我';
  const description = '关于Cola的个人介绍，Web前端和全栈开发者';
  const url = `${siteConfig.url}/about`;
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
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
};

function AboutPage() {
  return <div>AboutPage</div>;
}

export default AboutPage;
