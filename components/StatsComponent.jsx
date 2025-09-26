import React from "react";
import { useSelector } from "react-redux";

const StatsComponent = () => {
  const { data, unit } = useSelector((state) => state.weather);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
        <div className="bg-Dark p-4 rounded-xl text-center">
          <p className="text-sm opacity-70">Feels Like</p>
          <p className="text-xl font-semibold">
            {Math.round(data.main.feels_like)}°
            {unit === "metric" ? "C" : unit === "imperial" ? "F" : "K"}
          </p>
        </div>
        <div className="bg-Dark p-4 rounded-xl text-center">
          <p className="text-sm opacity-70">Humidity</p>
          <p className="text-xl font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="bg-Dark p-4 rounded-xl text-center">
          <p className="text-sm opacity-70">Wind</p>
          <p className="text-xl font-semibold">
            {data.wind.speed}{" "}
            {unit === "metric" ? "km/h" : unit === "imperial" ? "mph" : "m/s"}
          </p>
        </div>
        <div className="bg-Dark p-4 rounded-xl text-center">
          <p className="text-sm opacity-70">Precipitation</p>
          <p className="text-xl font-semibold">
            {data.rain ? data.rain["1h"] : 0} mm
          </p>
        </div>
      </div>
    </>
  );
};

export default StatsComponent;
