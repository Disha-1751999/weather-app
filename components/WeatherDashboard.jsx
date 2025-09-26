import React from "react";
import { useSelector } from "react-redux";
import searchIcon from "@/assets/Vector.png";
import Image from "next/image";
import { CircleX, Loader } from "lucide-react";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import CurrentWeather from "./CurrentWeather";
import StatsComponent from "./StatsComponent";

export default function WeatherDashboard() {
  const { data, status, error } = useSelector((state) => state.weather);
  if (status === "loading")
    return (
      <div className="pt-20 flex items-center justify-center flex-col gap-6">
        <Loader size={30} /> {" "} 
        <p className="text-center">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="pt-20 flex items-center justify-center flex-col gap-6">
        <CircleX size={30} className="text-red-400" />{" "}
        <p className="text-center text-red-400">{error}</p>
      </div>
    );
  if (!data)
    return (
      <div>
        <Image
          src={searchIcon}
          alt="Weather Illustration"
          width={50}
          height={50}
          className="mx-auto mt-20 mb-4 opacity-70"
        />
        <p className="text-center text-lighterGray">
          Search for a city to see weather information
        </p>
      </div>
    );

  return (
    <div className="w-full max-w-6xl mt-7 rounded-2xl  p-6 text-white mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-4">
        <div className="md:col-span-2 space-y-6 min-w-0">
          <CurrentWeather />
          <StatsComponent />
          <DailyForecast />
        </div>
        <HourlyForecast />
      </div>
    </div>
  );
}
