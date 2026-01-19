import { siteConfig } from '@/config/site.config';
import { getAllDailies } from '@/lib/useContents';

import DailyItem from './_components/DailyItem';

export const generateMetadata = async () => {
  const title = "I'm Cola's Daily";
  const description = 'Cola的日常记录，记录生活点滴和技术思考';
  const url = `${siteConfig.url}/daily`;
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

async function DailyPage() {
  const dailies = getAllDailies();

  return (
    <div>
      {Object.entries(dailies).map(([date, list]) => (
        <div key={date}>
          <div className="sticky top-10 inline-flex w-full items-center justify-between bg-background/50 px-3 py-3 backdrop-blur-xs z-30">
            <h1 className="font-[fantasy] text-2xl text-gray-300">{date.split('-')[0]}</h1>
            <h1 className="font-mono text-xl text-gray-500">{date.split('-')[1]}</h1>
          </div>
          {list.map((daily) => (
            <DailyItem key={daily._meta.filePath} daily={daily} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default DailyPage;
