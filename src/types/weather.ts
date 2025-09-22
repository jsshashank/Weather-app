export interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      code: number;
    };
    is_day: number;
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
    feelslike_f: number;
    pressure_mb: number;
    vis_km: number;
    cloud: number;
    precip_mm: number;
    uv: number;
    air_quality?: {
      "us-epa-index": number;
      pm2_5: number;
      pm10: number;
      co: number;
      no2: number;
      o3: number;
    };
  };
  forecast: {
    forecastday: ForecastDay[];
  };
  alerts?: {
    alert: WeatherAlert[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: {
      code: number;
    };
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
  };
  hour: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    code: number;
  };
  is_day: number;
}

export interface WeatherAlert {
  headline: string;
  desc: string;
}