export function parseForecast(list) {
  if (!list) return { hourly: [], daily: [] };

  const hourly = list.slice(0, 8).map((item) => ({
    time: item.dt_txt,
    temp: Math.round(item.main.temp),
    main: item.weather[0].main,
    icon: item.weather[0].icon,
  }));

  const grouped = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) {
      grouped[date] = {
        date: item.dt,
        min: item.main.temp_min,
        max: item.main.temp_max,
        main: item.weather[0].main,
        icon: item.weather[0].icon,
      };
    } else {
      grouped[date].min = Math.min(grouped[date].min, item.main.temp_min);
      grouped[date].max = Math.max(grouped[date].max, item.main.temp_max);
    }
  });

  const daily = Object.values(grouped)
    .sort((a, b) => a.date - b.date)
    .slice(0, 7)
    .map((d) => ({
      date: d.date,
      min: Math.round(d.min),
      max: Math.round(d.max),
      main: d.main,
      icon: d.icon,
    }));

  return { hourly, daily };
}
