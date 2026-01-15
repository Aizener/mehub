import CardContent from '@/components/CardContent';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

import FloatingBar from './_components/FloatingBar';

const imgs = [
  'js.png',
  'ts.png',
  'vue.png',
  'react.png',
  'next.png',
  'nuxt.png',
  'node.png',
  'nest.png',
  'docker.png',
  'postgresql.png',
  // 'mysql.png',
  'vscode.png',
  'cursor.png',
];

export const generateMetadata = async () => {
  const title = 'Cola的个人小站';
  const description = '这是Cola的个人小站，主要分享Web前端、全栈开发等相关技术';
  return {
    title,
    description,
    keywords: [
      'Cola',
      '个人小站',
      'Web前端',
      'Web全栈',
      'JavaScript',
      'TypeScript',
      'next.js',
      'next.js',
      'node.js',
      'vue.js',
      'react.js',
    ],
  };
};

async function HomePage() {
  return (
    <div className="flex w-full flex-col gap-y-4 px-2 pt-2 md:gap-x-4 md:px-0 md:pt-0 lg:flex-row">
      <div className="order-2 w-full">
        <CardContent>
          <h1 className="after:from-foreground after:to-foreground/50 relative inline-flex text-lg font-bold after:absolute after:-bottom-1 after:-left-1 after:h-1 after:w-2/3 after:rounded-md after:bg-linear-to-r after:content-['']">
            小站介绍
          </h1>
          <div className="mt-4 text-sm">
            <p>哈喽，欢迎来此小站的朋友~</p>
            <p className="mt-1 break-all">
              这个小站是我记录<strong>Web全栈开发</strong>
              的一个小角落，编程语言主要是<strong>JavaScript(TypeScript)</strong>
              ，我喜欢它们，也一直在学习中...或许也会分享其他的内容。
            </p>
          </div>
        </CardContent>

        <div className="mt-2 flex flex-col">
          <h2 className="my-4 flex items-center gap-x-2 overflow-hidden">
            <Separator className="flex-1" />
            <span className="font-bold">常用的技术/工具</span>
            <Separator className="flex-1" />
          </h2>
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {imgs.map((img) => (
              <div
                key={img}
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-sm border shadow-sm"
              >
                <Image
                  width={48}
                  height={48}
                  src={`/imgs/tech/${img}`}
                  alt={img}
                  className="object-contain"
                  quality={100}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
        <CardContent className="my-6">
          <h1 className="after:from-foreground after:to-foreground/50 relative inline-flex text-lg font-bold after:absolute after:-bottom-1 after:-left-1 after:h-1 after:w-2/3 after:rounded-md after:bg-linear-to-r after:content-['']">
            关于我
          </h1>

          <div className="mt-4 text-sm">
            <p>其实我个人没啥好说的，不过作为一个个人网站，还是得说一说叭叭一下才对￣□￣｜｜...</p>
            <p className="mt-2">
              从学校学习<strong>Java</strong>
              开始，因为大专学历找工作实在受限，差点没找到工作，有幸通过
              <strong>PHP开发</strong>入行 ，一直到如今开始从事
              <strong>Web前端开发</strong>的工作，这期间也在不断学习和探索中...
            </p>
            <p className="mt-2">
              目前的话，个人还是比较倾向于
              <strong>JS/TS全栈开发</strong>
              。我很喜欢这门语言，语法是我的菜，而且有<strong>NestJS</strong>
              能写后端服务，对于个人而言已经足够了！
            </p>
            <p className="mt-2">
              现在的目标：做合适的<strong>JavaScript前端或全栈工作</strong>
              ，其他方向倒是对游戏开发还蛮感兴趣，不过那又是其他话题了~
            </p>
          </div>
        </CardContent>
        {/* <div className="bg-background/50 mt-6 rounded-md border p-3 shadow-sm">
          <h1 className="after:from-foreground after:to-foreground/50 relative inline-flex text-lg font-bold after:absolute after:-bottom-1 after:-left-1 after:h-1 after:w-2/3 after:rounded-md after:bg-linear-to-r after:content-['']">
            我的工具
          </h1>

          <div className="mt-4 text-sm">
            <div className="flex gap-x-4 border-b border-dashed py-4">
              <div className="relative h-16 w-16">
                <Image fill alt="tools" src="/tools/cherry.png" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-bold">单词学习工具(部署于阿里云，最好别翻墙)</h2>
                  <Link
                    className="text-blue-500 underline"
                    href="http://cherry.iamcola.cc/"
                    target="_blank"
                  >
                    访问&gt;
                  </Link>
                </div>
                <div className="mt-2">
                  该网站是一款帮助学习单词的应用，可以记单词、查错词以及模拟小考试等，单词涵盖日常常用单词...
                  <p className="mt-1 font-bold">技术相关：Nuxt.JS/Nest.JS/Prisma/Postgresql</p>
                </div>
              </div>
            </div>

            <div className="flex gap-x-4 border-b border-dashed py-4">
              <div className="relative h-16 w-16">
                <Image fill alt="tools" src="/tools/ai-expense.png" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-bold">AI消费管理(部署于Vercel，需翻墙)</h2>
                  <Link
                    className="text-blue-500 underline"
                    href="https://test3-cola-ai.vercel.app/"
                    target="_blank"
                  >
                    访问&gt;
                  </Link>
                </div>
                <div className="mt-2">
                  该网站是一款基于AI的消费记录与分析的SAAS应用...
                  <p className="mt-1 font-bold">
                    技术相关：Next.JS/Prisma/Postgresql/OpenRouter/Clerk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="relative flex-1">
        <div className="w-3xs"></div>
        <FloatingBar />
      </div>
    </div>
  );
}

export default HomePage;
