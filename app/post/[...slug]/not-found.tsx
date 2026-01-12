import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mt-2 w-full overflow-x-hidden rounded-md border border-gray-200 p-4 shadow-sm md:mt-0">
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mb-2 text-xl font-semibold text-gray-700">文章未找到</h2>
        <p className="mb-8 text-gray-600">抱歉，您访问的文章不存在或已被删除。</p>
        <Link
          href="/blog"
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          返回博客
        </Link>
      </div>
    </div>
  );
}
