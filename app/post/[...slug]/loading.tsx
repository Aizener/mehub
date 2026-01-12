function Loading() {
  return (
    <div className="mt-2 w-full overflow-x-hidden rounded-md border border-gray-200 p-4 shadow-sm md:mt-0">
      {/* 标题区域骨架 */}
      <div className="w-full border-b border-dashed border-gray-200 pb-4">
        <div className="mb-3 h-7 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center gap-x-2">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* 内容区域骨架 */}
      <article className="py-4">
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>
      </article>
    </div>
  );
}

export default Loading;
