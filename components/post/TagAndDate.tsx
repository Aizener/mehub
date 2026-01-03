import { Badge } from '../ui/badge';

function TagAndDate({ tags, date }: { tags: string[]; date: Date }) {
  return (
    <div className="flex flex-row flex-wrap items-start justify-between gap-y-2 pt-2 md:items-center">
      <div className="flex items-center gap-x-2 text-sm text-gray-700">
        <span className="shrink-0">标签：</span>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <p className="shrink-0 text-sm text-gray-700">时间：{date.toLocaleString()}</p>
    </div>
  );
}

export default TagAndDate;
