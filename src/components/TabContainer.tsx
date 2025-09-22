import React, { useState } from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { getAqiLevel } from '../utils/weatherIcons';

interface TabContainerProps {
  weatherData: WeatherData;
  currentUnit: 'c' | 'f';
}

const TabContainer: React.FC<TabContainerProps> = ({ weatherData, currentUnit }) => {
  const [activeTab, setActiveTab] = useState('forecast');

  const renderForecastContent = () => {
    return (
      <div className="forecast-daily grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {weatherData.forecast.forecastday.map((day, index) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString([], { weekday: 'short' });
          const maxTemp = currentUnit === 'c' ? day.day.maxtemp_c : day.day.maxtemp_f;
          const minTemp = currentUnit === 'c' ? day.day.mintemp_c : day.day.mintemp_f;
          const iconClass = getWeatherIcon(day.day.condition.code, 1);

          return (
            <div key={index} className="forecast-day">
              <div className="day-name font-semibold mb-2">{dayName}</div>
              <div className="day-icon text-3xl my-2 h-10 flex items-center justify-center">
                <i className={iconClass}></i>
              </div>
              <div className="day-temp font-semibold">
                {Math.round(maxTemp)}° / {Math.round(minTemp)}°
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAstronomyContent = () => {
    const astro = weatherData.forecast.forecastday[0].astro;
    
    return (
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-sun"></i>
            <span>Sunrise</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{astro.sunrise}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-moon"></i>
            <span>Sunset</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{astro.sunset}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-moon"></i>
            <span>Moonrise</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{astro.moonrise}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-moon"></i>
            <span>Moonset</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{astro.moonset}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-moon"></i>
            <span>Moon Phase</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{astro.moon_phase}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-star"></i>
            <span>Moon Illumination</span>
          </div>
          <div className="stat-value text-2xl font-semibold">
            {Math.round(parseFloat(astro.moon_illumination) * 100)}%
          </div>
        </div>
      </div>
    );
  };

  const renderAirQualityContent = () => {
    const aq = weatherData.current.air_quality;
    
    if (!aq) return <div>No air quality data available</div>;
    
    return (
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-wind"></i>
            <span>Air Quality Index</span>
          </div>
          <div className="stat-value text-2xl font-semibold">
            {aq["us-epa-index"]} ({getAqiLevel(aq["us-epa-index"])})
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-smog"></i>
            <span>PM2.5</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{aq.pm2_5.toFixed(1)} μg/m³</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-smog"></i>
            <span>PM10</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{aq.pm10.toFixed(1)} μg/m³</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-fire"></i>
            <span>Carbon Monoxide</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{aq.co.toFixed(1)} ppb</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-fire"></i>
            <span>Nitrogen Dioxide</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{aq.no2.toFixed(1)} ppb</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title flex items-center gap-2 text-gray-500 mb-2">
            <i className="fas fa-fire"></i>
            <span>Ozone</span>
          </div>
          <div className="stat-value text-2xl font-semibold">{aq.o3.toFixed(1)} ppb</div>
        </div>
      </div>
    );
  };

  return (
    <div className="tab-container">
      <div className="tabs flex gap-4 border-b border-gray-200 pb-4 mb-6">
        <div 
          className={`tab px-4 py-2 cursor-pointer rounded-lg font-medium ${activeTab === 'forecast' ? 'bg-primary text-white' : ''}`}
          onClick={() => setActiveTab('forecast')}
        >
          5-Day Forecast
        </div>
        <div 
          className={`tab px-4 py-2 cursor-pointer rounded-lg font-medium ${activeTab === 'astronomy' ? 'bg-primary text-white' : ''}`}
          onClick={() => setActiveTab('astronomy')}
        >
          Astronomy
        </div>
        <div 
          className={`tab px-4 py-2 cursor-pointer rounded-lg font-medium ${activeTab === 'air-quality' ? 'bg-primary text-white' : ''}`}
          onClick={() => setActiveTab('air-quality')}
        >
          Air Quality
        </div>
      </div>
      
      <div className={`tab-content ${activeTab === 'forecast' ? 'block' : 'hidden'}`}>
        {renderForecastContent()}
      </div>
      
      <div className={`tab-content ${activeTab === 'astronomy' ? 'block' : 'hidden'}`}>
        {renderAstronomyContent()}
      </div>
      
      <div className={`tab-content ${activeTab === 'air-quality' ? 'block' : 'hidden'}`}>
        {renderAirQualityContent()}
      </div>
    </div>
  );
};

export default TabContainer;