import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const iconBaseUrl = process.env.NEXT_PUBLIC_ICON_URL;

const HourlyForecast = () => {
  const { data, hourly, unit } = useSelector((state) => state.weather);
  return (
    <>
      <div className="bg-Dark rounded-xl p-4  flex flex-col min-w-0">
        <div className=" flex justify-between items-center mb-6 mt-2">
          <h3 className="text-lg font-semibold">Hourly forecast</h3>
          <span className="bg-lightGray text-xs px-3 py-1 rounded">
            {new Date(data.dt * 1000).toLocaleDateString(undefined, {
              weekday: "long",
            })}
          </span>
        </div>
        <ul className="flex-1 space-y-3 text-sm">
          {hourly.map((hour) => {
            const hourLabel = new Date(hour.time).toLocaleTimeString(
              undefined,
              {
                hour: "numeric",
                hour12: true,
              }
            );
            const iconUrl = `${iconBaseUrl}/img/wn/${hour.icon}@2x.png`;
            return (
              <li key={hour.time} className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <Image
                    src={iconUrl}
                    alt={hour.main}
                    width={30}
                    height={30}
                    className="inline-block"
                  />
                  <span>{hourLabel}</span>
                </span>
                <span className="font-semibold">
                  {Math.round(hour.temp)}°
                  {unit === "metric" ? "C" : unit === "imperial" ? "F" : "K"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default HourlyForecast;
