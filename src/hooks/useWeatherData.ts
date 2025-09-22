import { useState } from 'react';
import axios from 'axios';
import { WeatherData } from '../types/weather';
import { API_KEY } from '../utils/constants';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (query: string) => {
    if (!API_KEY) {
      setError("Please set your WeatherAPI key in the environment variables");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=5&aqi=yes&alerts=yes`
      );
      setWeatherData(response.data);
    } catch (err: any) {
      let errorMsg = "Failed to fetch weather data";
      
      if (err.response) {
        if (err.response.status === 400) {
          errorMsg = "Invalid location. Please try another city name.";
        } else if (err.response.status === 401) {
          errorMsg = "Invalid API key. Please check your WeatherAPI key.";
        } else if (err.response.status === 403) {
          errorMsg = "API access denied. Please check your subscription.";
        } else if (err.response.status === 404) {
          errorMsg = "Weather data not available for this location.";
        } else {
          errorMsg = `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMsg = "Network error. Please check your internet connection.";
      } else {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, loading, error, fetchWeatherData };
};