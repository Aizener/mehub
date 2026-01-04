import { Cloud, CloudHail, Haze, Rainbow, Snowflake, Sun, WindIcon } from 'lucide-react';

export enum Weather {
  Sunny = '晴',
  Cloudy = '阴',
  Rainy = '雨',
  Snowy = '雪',
  Foggy = '雾',
  Haze = '霾',
  Windy = '风',
  Thunder = '雷',
}

// 天气值到枚举的映射（支持多种中文表达）
export const weatherValueMap: Record<string, Weather> = {
  晴: Weather.Sunny,
  晴天: Weather.Sunny,
  阴: Weather.Cloudy,
  阴天: Weather.Cloudy,
  多云: Weather.Cloudy,
  雨: Weather.Rainy,
  小雨: Weather.Rainy,
  雪: Weather.Snowy,
  雾: Weather.Foggy,
  霾: Weather.Haze,
  风: Weather.Windy,
  雷: Weather.Thunder,
};

export const weatherIconMap: Record<Weather, typeof Sun> = {
  [Weather.Sunny]: Sun,
  [Weather.Cloudy]: Cloud,
  [Weather.Rainy]: CloudHail,
  [Weather.Snowy]: Snowflake,
  [Weather.Foggy]: Haze,
  [Weather.Haze]: Rainbow,
  [Weather.Windy]: WindIcon,
  [Weather.Thunder]: Rainbow,
};

// 根据天气字符串值获取图标
export function getWeatherIcon(weather: string) {
  const weatherEnum = weatherValueMap[weather];
  return weatherEnum ? weatherIconMap[weatherEnum] : Cloud; // 默认返回 Cloud
}
