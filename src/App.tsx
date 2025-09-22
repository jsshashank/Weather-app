import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCard from './components/HeroCard';
import StatsGrid from './components/StatsGrid';
import TabContainer from './components/TabContainer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useWeatherData } from './hooks/useWeatherData';
import { WeatherData } from './types/weather';

function App() {
  const [searchQuery, setSearchQuery] = useState('New Delhi');
  const [currentUnit, setCurrentUnit] = useState<'c' | 'f'>('c');
  const { weatherData, loading, error, fetchWeatherData } = useWeatherData();

  useEffect(() => {
    fetchWeatherData(searchQuery);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery);
    }
  };

  const updateBackgroundBasedOnWeather = (data: WeatherData) => {
    const conditionCode = data.current.condition.code;
    const isDay = data.current.is_day;
    const heroCard = document.querySelector('.hero-card') as HTMLElement;

    let gradient;

    if (conditionCode === 1000) {
      gradient = isDay 
        ? 'linear-gradient(135deg, #4da0ff, #81c784)'
        : 'linear-gradient(135deg, #0f172a, #1e3a8a)';
    } else if (conditionCode === 1003 || conditionCode === 1006) {
      gradient = isDay 
        ? 'linear-gradient(135deg, #64b5f6, #90caf9)' 
        : 'linear-gradient(135deg, #1e3a8a, #374151)';
    } else if (conditionCode === 1009 || conditionCode > 1009) {
      if (conditionCode >= 1063 && conditionCode <= 1276) {
        gradient = 'linear-gradient(135deg, #374151, #1e293b)';
      } else if (conditionCode >= 1114 && conditionCode <= 1258) {
        gradient = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
      } else {
        gradient = 'linear-gradient(135deg, #64748b, #475569)';
      }
    } else {
      gradient = 'linear-gradient(135deg, #3b82f6, #0ea5e9)';
    }

    if (heroCard) {
      heroCard.style.background = gradient;
    }

    document.body.style.backgroundColor = isDay ? '#f1f5f9' : '#1e293b';
  };

  useEffect(() => {
    if (weatherData) {
      updateBackgroundBasedOnWeather(weatherData);
    }
  }, [weatherData]);

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        currentUnit={currentUnit}
        setCurrentUnit={setCurrentUnit}
      />
      
      {error && <ErrorMessage message={error} />}
      
      {loading && <LoadingSpinner />}
      
      {weatherData && !loading && (
        <>
          <HeroCard weatherData={weatherData} currentUnit={currentUnit} />
          <StatsGrid weatherData={weatherData} currentUnit={currentUnit} />
          <TabContainer weatherData={weatherData} currentUnit={currentUnit} />
        </>
      )}
    </div>
  );
}

export default App;