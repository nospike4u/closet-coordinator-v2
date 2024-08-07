import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/authContext";

const WeatherChatComponent = () => {
  const [location, setLocation] = useState("Berlin");
  const [response, setResponse] = useState("");
  const { url } = useAuthContext();

  const fetchWeatherChat = async () => {
    try {
      const result = await axios.post(`${url}/api/v1/weather/completions`, {
        location,
        stream: false, // Set to true if you want to handle streaming
      });

      setResponse(result.data.content);
    } catch (error) {
      console.error("Error fetching weather chat:", error);
    }
  };

  return (
    <div>
      <h1>Weather Chat</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={fetchWeatherChat}>Get Weather Chat</button>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default WeatherChatComponent;
