"use client";

import NavBarComponent from "@/components/NavBarComponent";
import SearchBox from "@/components/Searchbox";
import WeatherDashboard from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-bgTheme1 via-bgTheme2 to-bgTheme3 min-h-screen w-full overflow-x-hidden text-white">
      <div className="px-6 py-20 md:px-16 md:py-24 lg:px-36 lg:py-24 ">
        <NavBarComponent />
        <SearchBox />
        <WeatherDashboard />
      </div>
    </div>
  );
}
