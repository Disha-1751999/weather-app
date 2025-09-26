"use client";

import { useState } from "react";
import { ChevronDown, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUnit, fetchWeather } from "@/features/weather/weatherSlice";

export default function UnitDropdown() {
  const dispatch = useDispatch();
  const { unit, city } = useSelector((state) => state.weather);
  const [open, setOpen] = useState(false);

  const units = [
    { label: "Standard (K)", value: "standard" },
    { label: "°C (Metric)", value: "metric" },
    { label: "°F (Imperial)", value: "imperial" },
  ];

  const currentLabel = units.find((u) => u.value === unit)?.label;

  const handleUnitChange = (newUnit) => {
    if (newUnit === unit) return;
    dispatch(setUnit(newUnit));
    setOpen(false);
    if (!city) return;
    dispatch(fetchWeather());
  };

  return (
    <div className="relative inline-block text-xs ">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 bg-[#1F293780]  px-3 py-2 rounded-lg text-white hover:bg-[#1F293780]"
      >
        <Settings size={16} />
        <span>{currentLabel}</span>
        <ChevronDown
          size={16}
          className={`${open ? "rotate-180" : "rotate-0"} transition-transform`}
        />
      </button>

      {open && (
        <div className="absolute mt-1 right-0 w-36 bg-white shadow-lg rounded-md z-10">
          {units.map((u) => (
            <button
              key={u.label}
              onClick={() => handleUnitChange(u.value)}
              className={`w-full text-left px-3 py-1 hover:bg-purple-100 ${
                unit === u.value ? "font-bold text-purple-700" : "text-gray-800"
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
