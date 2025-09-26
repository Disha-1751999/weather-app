import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const iconBaseUrl = process.env.NEXT_PUBLIC_ICON_URL;

const DailyForecast = () => {
  const { daily } = useSelector((state) => state.weather);
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-4">Daily forecast</h3>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4 min-w-0">
          {daily.map((day) => {
            const dayName = new Date(day.date * 1000).toLocaleDateString(
              undefined,
              {
                weekday: "short",
              }
            );

            const iconUrl = `${iconBaseUrl}/img/wn/${day.icon}@2x.png`;

            return (
              <div
                key={day.date}
                className="bg-Dark p-4 rounded-lg text-center flex flex-col items-center gap-1"
              >
                <p className="text-sm">{dayName}</p>
                <Image src={iconUrl} alt={day.main} width={50} height={50} />
                <p className="text-md font-semibold">{day.max}°</p>
                <p className="text-xs opacity-70">{day.min}°</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DailyForecast;
