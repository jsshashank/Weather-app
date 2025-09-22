export const getWeatherIcon = (code: number, isDay: number): string => {
  const iconMap: Record<number, string> = {
    1000: isDay ? 'fas fa-sun' : 'fas fa-moon',
    1003: isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon',
    1006: 'fas fa-cloud',
    1009: 'fas fa-cloud',
    1030: 'fas fa-smog',
    1063: isDay ? 'fas fa-cloud-sun-rain' : 'fas fa-cloud-moon-rain',
    1066: isDay ? 'fas fa-cloud-snow' : 'fas fa-snowflake',
    1069: 'fas fa-sleet',
    1072: 'fas fa-icicles',
    1087: 'fas fa-bolt',
    1114: 'fas fa-wind',
    1117: 'fas fa-wind',
    1135: 'fas fa-smog',
    1147: 'fas fa-smog',
    1150: 'fas fa-cloud-rain',
    1153: 'fas fa-cloud-rain',
    1168: 'fas fa-icicles',
    1171: 'fas fa-icicles',
    1180: 'fas fa-cloud-sun-rain',
    1183: 'fas fa-cloud-rain',
    1186: 'fas fa-cloud-rain',
    1189: 'fas fa-cloud-showers-heavy',
    1192: 'fas fa-cloud-showers-heavy',
    1195: 'fas fa-cloud-showers-heavy',
    1198: 'fas fa-icicles',
    1201: 'fas fa-icicles',
    1204: 'fas fa-sleet',
    1207: 'fas fa-sleet',
    1210: 'fas fa-snowflake',
    1213: 'fas fa-snowflake',
    1216: 'fas fa-snowflake',
    1219: 'fas fa-snowflake',
    1222: 'fas fa-snowflake',
    1225: 'fas fa-snowflake',
    1237: 'fas fa-hail',
    1240: 'fas fa-cloud-sun-rain',
    1243: 'fas fa-cloud-showers-heavy',
    1246: 'fas fa-cloud-showers-heavy',
    1249: 'fas fa-sleet',
    1252: 'fas fa-sleet',
    1255: 'fas fa-snowflake',
    1258: 'fas fa-snowflake',
    1261: 'fas fa-hail',
    1264: 'fas fa-hail',
    1273: 'fas fa-bolt',
    1276: 'fas fa-bolt',
    1279: 'fas fa-bolt',
    1282: 'fas fa-bolt',
  };

  return iconMap[code] || 'fas fa-cloud';
};

export const getUvIndexLevel = (uv: number): string => {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
};

export const getAqiLevel = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};