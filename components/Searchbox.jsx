"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  fetchCitySuggestions,
  fetchWeather,
  setCity,
  clearSuggestions,
} from "@/features/weather/weatherSlice";

export default function SearchBox() {
  
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.weather);
  const [localCity, setLocalCity] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(localCity);
    }, 500);

    return () => clearTimeout(handler);
  }, [localCity]);

  useEffect(() => {
    if (debouncedValue.trim()) {
      dispatch(fetchCitySuggestions(debouncedValue));
    } else {
      dispatch(clearSuggestions());
    }
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch(clearSuggestions());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length > 100) return;
    setLocalCity(value);
  };

  const handleSelectCity = (cityObj) => {
    const fullName = `${cityObj.name}, ${cityObj.country}`;
    setLocalCity(fullName);
    dispatch(setCity(fullName));
    dispatch(clearSuggestions());
    setLocalCity("");
  };

  const handleSearch = () => {
    if (!localCity.trim()) return;

    dispatch(setCity(localCity));
    dispatch(fetchWeather());
    dispatch(clearSuggestions());
    setLocalCity("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-light">How's the sky looking today?</h2>

      <div
        ref={wrapperRef}
        className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 relative"
      >
        <div className="relative w-full max-w-md">
          <input
            value={localCity}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search for a place..."
            className="w-full px-12 py-2 rounded-lg bg-[#1F293780] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute mt-1 w-[80%] bg-gray-800 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
              {suggestions.map((city, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSelectCity(city)}
                >
                  {city.name}, {city.state ? city.state + ", " : ""}
                  {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
