import React, { useEffect, useState } from "react";
import { IconSearch, IconTemperature, IconDroplet, IconWind, IconClock } from "@tabler/icons-react";

const API = "adcfc4f3bef00cf239d4dd18364a090d";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (city) {
      handleGetweather();
    }
  }, [city]);

  const handleGetweather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching Weather:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🌤 Weather App</h1>

      {/* Search Input */}
      <div className="relative w-full max-w-md mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <IconSearch stroke={2} size={20} />
        </span>
        <input
          type="text"
          placeholder="Search City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 pr-3 py-3 border rounded-xl w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Weather Info Card */}
      {weather && weather.name ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            {weather.name}, {weather.sys?.country}
          </h2>

          <div className="grid grid-cols-2 gap-6 text-gray-700">
            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-xl shadow-sm">
              <IconTemperature size={30} className="text-blue-500 mb-2" />
              <p className="text-lg font-medium">
                {(weather.main.temp - 273.15).toFixed(1)}°C
              </p>
              <span className="text-sm text-gray-500">Temperature</span>
            </div>

            <div className="flex flex-col items-center bg-green-50 p-4 rounded-xl shadow-sm">
              <IconDroplet size={30} className="text-green-500 mb-2" />
              <p className="text-lg font-medium">{weather.main.humidity}%</p>
              <span className="text-sm text-gray-500">Humidity</span>
            </div>

            <div className="flex flex-col items-center bg-yellow-50 p-4 rounded-xl shadow-sm">
              <IconWind size={30} className="text-yellow-500 mb-2" />
              <p className="text-lg font-medium">
                {(weather.wind.speed * 3.6).toFixed(1)} km/h
              </p>
              <span className="text-sm text-gray-500">Wind Speed</span>
            </div>

            <div className="flex flex-col items-center bg-purple-50 p-4 rounded-xl shadow-sm">
              <IconClock size={30} className="text-purple-500 mb-2" />
              <p className="text-lg font-medium">
                UTC {weather.timezone / 3600 >= 0 ? "+" : ""}
                {weather.timezone / 3600}
              </p>
              <span className="text-sm text-gray-500">Timezone</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 mt-6">Search a city to see weather info 🌍</p>
      )}

      {/* Button */}
      <button
        onClick={handleGetweather}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
      >
        Check Weather
      </button>
    </div>
  );
}

export default Weather;
