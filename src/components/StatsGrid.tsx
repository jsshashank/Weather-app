import React from 'react';
import { WeatherData } from '../types/weather';
import { getUvIndexLevel, getAqiLevel } from '../utils/weatherIcons';

interface StatsGridProps {
  weatherData: WeatherData;
  currentUnit: 'c' | 'f';
}

const StatsGrid: React.FC<StatsGridProps> = ({ weatherData, currentUnit }) => {
  const feelsLike = currentUnit === 'c' 
    ? weatherData.current.feelslike_c 
    : weatherData.current.feelslike_f;

  return (
    <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="stat-card">
        <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
          <i className="fas fa-tint"></i>
          <span>Humidity</span>
        </div>
        <div className="stat-value text-2xl font-semibold">{weatherData.current.humidity}%</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
          <i className="fas fa-wind"></i>
          <span>Wind</span>
        </div>
        <div className="stat-value text-2xl font-semibold">{weatherData.current.wind_kph} km/h</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
          <i className="fas fa-temperature-high"></i>
          <span>Feels Like</span>
        </div>
        <div className="stat-value text-2xl font-semibold">{Math.round(feelsLike)}°</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
          <i className="fas fa-compress-arrows-alt"></i>
          <span>Pressure</span>
        </div>
        <div className="stat-value text-2xl font-semibold">{weatherData.current.pressure_mb} hPa</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
          <i className="fas fa-eye"></i>
          <span>Visibility</span>
        </div>
        <div className="stat-value text-2xl font-semibold">{weatherData.current.vis_km} km</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
          <i className="fas fa-cloud"></i>
          <span>Cloud Cover</span>
        </div>
        <div className="stat-value text-2xl font-semibold">{weatherData.current.cloud}%</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
          <i className="fas fa-umbrella"></i>
          <span>Precipitation</span>
        </div>
        <div className="stat-value text-2xl font-semibold">{weatherData.current.precip_mm} mm</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
          <i className="fas fa-sun"></i>
          <span>UV Index</span>
        </div>
        <div className="stat-value text-2xl font-semibold">
          {weatherData.current.uv} ({getUvIndexLevel(weatherData.current.uv)})
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;