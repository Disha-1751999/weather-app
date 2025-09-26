import React from "react";
import { useSelector } from "react-redux";
import icon from "@/assets/icon.png";
import { getWeatherIcon } from "@/utils/getWeatherIcon";
import Image from "next/image";

const iconBaseUrl = process.env.NEXT_PUBLIC_ICON_URL;

const CurrentWeather = () => {
  const { data, unit } = useSelector((state) => state.weather);

  const mainStatus = data.weather[0].main;
  const iconUrl = `${iconBaseUrl}/img/wn/${getWeatherIcon(
    mainStatus
  )}@2x.png`;

  return (
    <>
      <div className="bg-gradient-to-tl from-CustomPurple to-CustomeBlue rounded-2xl p-6 flex flex-col justify-between min-w-0">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold truncate">
              {" "}
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-sm opacity-80">
              {new Date(data.dt * 1000).toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <Image src={iconUrl} alt={mainStatus} width={50} height={50} />
          </div>

          <div>
            <Image src={icon} alt="icon" width={10} height={10} />
          </div>
        </div>
        <div className="flex justify-end items-center ">
          <span className="text-3xl font-light">
            {Math.round(data.main.temp)}°
            {unit === "metric" ? "C" : unit === "imperial" ? "F" : "K"}
          </span>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
