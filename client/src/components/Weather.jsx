import { useState, useEffect } from "react";
import axios from "axios";

const getWeather = async (latitude, longitude) => {
  // const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const apiKey = "d1f4eb599154491d94e92554240508";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const WeatherComponent = ({ setWeather, weather, location, setLocation }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setError(error.message);
        }
      );
    } else {
      console.error("Geolocation not available");
      setError("Geolocation not available");
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getWeather(location.latitude, location.longitude).then((data) => {
        setWeather(data);
      });
    }
  }, [location]);

  const handleRetry = () => {
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        setError(error.message);
      }
    );
  };

  return (
    <div>
      <h1>Weather Information</h1>
      {error ? (
        <div>
          <p>Error: {error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : weather ? (
        <div>
          <p>Location: {weather.location.name}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
