import { Badge } from '../ui/badge';

function formatDateTime(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

function TagAndDate({ tags, date }: { tags: string[]; date: string }) {
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
      <p className="shrink-0 text-sm text-gray-700">时间：{formatDateTime(date)}</p>
    </div>
  );
}

export default TagAndDate;
