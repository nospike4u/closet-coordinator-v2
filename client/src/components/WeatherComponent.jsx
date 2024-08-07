import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSun,
  FaCloud,
  FaCloudSun,
  FaCloudRain,
  FaSnowflake,
} from "react-icons/fa";
import { useUserContext } from "../contexts/userContext";
import { FaLocationDot } from "react-icons/fa6";
import "./WeatherComponent.css"; // Stile für die Komponente
const getWeather = async (latitude, longitude) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
const WeatherIcon = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <FaSun className="weather-icon sunny" />;
    case "cloudy":
      return <FaCloud className="weather-icon cloudy" />;
    case "partly cloudy":
      return <FaCloudSun className="weather-icon partly-cloudy" />;
    case "rainy":
      return <FaCloudRain className="weather-icon rainy" />;
    case "snowy":
      return <FaSnowflake className="weather-icon snowy" />;
    default:
      return <FaCloud className="weather-icon default" />;
  }
};
const WeatherComponent = () => {
  const { user } = useUserContext();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
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
    <div className="weather-container border-2 border-white mt-4">
      {error ? (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : weather ? (
        <div className="weather-info flex flex-row">
          <p className="hi-text pr-12">Hi, {user?.name}!</p>
          <WeatherIcon condition={weather.current.condition.text} />
          <p className="temperature">{weather.current.temp_c}°</p>
          <div className="loc-con">
            <div className="loc-icon ">
              <p className="location mr-1">{weather.location.name}</p>
              <FaLocationDot className="" />
            </div>
            <p className="condition lowercase">
              {weather.current.condition.text}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};
export default WeatherComponent;
