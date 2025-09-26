export function getWeatherIcon(main) {
  const weatherIconMap = {
    Clear: "01d",
    Clouds: "02d",       
    Rain: "10d",
    Drizzle: "09d",
    Thunderstorm: "11d",
    Snow: "13d",
    Mist: "50d",
    Smoke: "50d",
    Haze: "50d",
    Dust: "50d",
    Fog: "50d",
    Sand: "50d",
    Ash: "50d",
    Squall: "50d",
    Tornado: "50d",
  };

  return weatherIconMap[main] || "01d"; 
}
