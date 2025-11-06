export const getTemperature = async () => {
  const response = await fetch("/api/weather");

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const temperature = await response.json();
  return temperature;
};
