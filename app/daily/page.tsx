import { getAllDailies } from '@/lib/useContents';
import { getWeatherIcon } from '@/lib/weather';
import { CalendarClock } from 'lucide-react';

const dailies = getAllDailies();

console.log('dailies', dailies);

export const generateMetadata = async () => {
  const title = "I'm Cola's Daily";
  const description = "I'm Cola's Daily";
  return {
    title,
    description,
  };
};

function DailyPage() {
  return (
    <div>
      {Object.entries(dailies).map(([date, list]) => (
        <div key={date}>
          <div className="sticky top-10 inline-flex w-full items-center justify-between bg-white/60 px-3 py-3 backdrop-blur-sm">
            <h1 className="font-[fantasy] text-2xl text-gray-300">{date.split('-')[0]}</h1>
            <h1 className="font-mono text-xl text-gray-500">{date.split('-')[1]}</h1>
          </div>
          {list.map((daily) => {
            const WeatherIcon = getWeatherIcon(daily.weather);
            return (
              <div
                className="mb-2 flex flex-col gap-x-4 md:mb-4 md:flex-row md:items-start"
                key={daily._meta.filePath}
              >
                <div className="flex w-full justify-between gap-y-2 border border-gray-200 p-3 shadow-sm md:w-52 md:flex-col md:rounded-md">
                  <div className="flex items-center gap-x-2 text-sm text-gray-700">
                    <CalendarClock className="h-4 w-4 text-gray-700" />
                    <span>{daily.date.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm text-gray-700">
                    <WeatherIcon className="h-4 w-4 text-gray-700" />
                    <span>{daily.weather}</span>
                  </div>
                </div>
                <div
                  className="flex-1 border border-gray-200 p-4 shadow-sm md:rounded-md"
                  dangerouslySetInnerHTML={{ __html: daily.content }}
                ></div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default DailyPage;
