"use client";

import React, { useEffect } from "react";
import UnitDropdown from "./UnitDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherIcon } from "@/utils/getWeatherIcon";
import Image from "next/image";
import { fetchWeather } from "@/features/weather/weatherSlice";

const NavBarComponent = () => {
  const dispatch = useDispatch();
  const { data, city, unit } = useSelector((state) => state.weather);

  useEffect(() => {
    if (city && city.trim() !== "") {
      dispatch(fetchWeather());
    }
  }, [dispatch, unit, city]);

  const mainStatus = data?.weather[0]?.main || "Clear";
  const iconUrl = `https://openweathermap.org/img/wn/${getWeatherIcon(
    mainStatus
  )}@2x.png`;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="flex items-center gap-2  font-semibold">
          {city?.length > 0 ? (
            <Image src={iconUrl} alt={mainStatus} width={50} height={50} />
          ) : (
            <span className="w-6 h-6 bg-yellow-400 rounded-full text-lg"></span>
          )}{" "}
          Weather Now
        </h1>

        <UnitDropdown />
      </div>
    </>
  );
};

export default NavBarComponent;
