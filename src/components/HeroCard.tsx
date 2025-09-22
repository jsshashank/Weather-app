import React, { useCallback, useEffect, useRef } from "react";
import { WeatherData } from "../types/weather";
import { getWeatherIcon } from "../utils/weatherIcons";

interface HeroCardProps {
  weatherData: WeatherData;
  currentUnit: "c" | "f";
  onUnitToggle: (unit: "c" | "f") => void;
}

const HeroCard: React.FC<HeroCardProps> = ({
  weatherData,
  currentUnit,
  onUnitToggle,
}) => {
  const forecastRef = useRef<HTMLDivElement | null>(null);

  // Get 12-hour forecast starting from current hour
  const getNextHours = useCallback(() => {
    const hours = weatherData.forecast.forecastday[0].hour;
    const now = new Date();
    const currentHour = now.getHours();
    return Array.from({ length: 12 }, (_, i) => {
      const hourIndex = (currentHour + i) % 24;
      return hours[hourIndex];
    }).filter(Boolean);
  }, [weatherData]);

  const hourlyList = getNextHours();

  // Enable mouse/trackpad scroll
  useEffect(() => {
    const el = forecastRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const formatHour = (isoTime: string) => {
    const time = new Date(isoTime);
    return time.toLocaleTimeString([], { hour: "2-digit" });
  };

  return (
    <div className="hero-card  p-6 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-300 text-white shadow-lg">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hourly-item { min-width: 80px; flex: 0 0 auto; }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-1">
        {/* LEFT: Location + temp + condition */}
        <div className="flex flex-col justify-center">
          <div className="location text-2xl font-semibold mb-2">
            {weatherData.location.name}
          </div>
          <div className="temperature text-6xl font-bold">
            {Math.round(
              currentUnit === "c"
                ? weatherData.current.temp_c
                : weatherData.current.temp_f
            )}
            °
          </div>
          <div className="condition text-lg mt-2 flex items-center gap-2">
            <i
              className={getWeatherIcon(
                weatherData.current.condition.code,
                weatherData.current.is_day
              )}
            />
            <span>{weatherData.current.condition.text}</span>
          </div>
        </div>

        {/* MIDDLE: Hourly forecast */}
        <div className="md:col-span-2">
          <div
            ref={forecastRef}
            className="flex overflow-x-auto gap-4 no-scrollbar py-2"
          >
            {hourlyList.map((hour, i) => {
              const temp =
                currentUnit === "c" ? hour.temp_c : hour.temp_f;
              const iconClass = getWeatherIcon(
                hour.condition.code,
                hour.is_day
              );
              return (
                <div
                  key={i}
                  className="hourly-item bg-white/10 rounded-xl p-3 flex flex-col items-center backdrop-blur"
                >
                  <div className="text-sm font-semibold mb-1">
                    {formatHour(hour.time)}
                  </div>
                  <div className="text-2xl my-1">
                    <i className={iconClass} />
                  </div>
                  <div className="font-semibold text-lg">
                    {Math.round(temp)}°
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alerts (if any) */}
      {weatherData.alerts &&
        weatherData.alerts.alert &&
        weatherData.alerts.alert.length > 0 && (
          <div className="mt-4 bg-white/10 p-3 rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <i className="fas fa-exclamation-triangle" />
              <span>{weatherData.alerts.alert[0].headline}</span>
            </div>
            <div className="text-sm">
              {weatherData.alerts.alert[0].desc}
            </div>
          </div>
        )}
    </div>
  );
};

export default HeroCard;
