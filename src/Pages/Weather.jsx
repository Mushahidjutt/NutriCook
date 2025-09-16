import React, { useEffect, useState } from "react";

const API = "adcfc4f3bef00cf239d4dd18364a090d";
function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  const handleGetweather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
      );
      const data = await response.json();
      setWeather(data);
      console.log(weather);

      console.log(response);
    } catch (error) {
      console.error("Error fetching Weather:", error);
    }

    useEffect(() => {
      handleGetweather();
    }, [city]);
  };
  return (
    <div>
      <div className="max-h-screen bg-gray-50">
        <div className="flex flex-col ">
          <h1 className="text-3xl font-semibold my-6 text-center">Weather</h1>

          <div>
            <h2>Weather information is : {city} </h2>

            <input
              className="rounded-2xl outline-none p-2 bg-gray-300"
              type="text"
              placeholder="Search City "
              value={city}
            />
          </div>

          <button
            onChange={(e) => setCity(e.target.value)}
            className="p-2 bg-green-500 rounded-2xl w-30 text-center cursor-pointer "
          >
            Check weaher
          </button>
        </div>
      </div>
    </div>
  );
}

export default Weather;
