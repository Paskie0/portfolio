import {CITY} from "@/data/data";

export async function GET() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${CITY}&aqi=no`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const weatherData = await response.json();
    const temperature = weatherData.current.temp_c;

    return Response.json(temperature);
  } catch (error) {
    console.error("Weather API error:", error);
    return Response.json({error: "Failed to fetch weather data"}, {status: 500});
  }
}
