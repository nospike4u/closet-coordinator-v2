import asyncHandler from 'express-async-handler'; // Assuming you're using this for async error handling
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const weatherChat = asyncHandler(async (req, res) => {
  const {
    body: { location, stream, ...request },
    headers: { mode },
  } = req;

  let openai;

  mode === 'production'
    ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
    : (openai = new OpenAIMock());

  // Fetch weather data
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;
  console.log(url)

  try {
    const weatherResponse = await axios.get(url);
    const weatherData = weatherResponse.data;

    // Use weather data in your prompt
    const prompt = `
      The current weather in ${weatherData.location.name} is ${weatherData.current.condition.text} with a temperature of ${weatherData.current.temp_c}°C.
      Write a short story about a person experiencing this weather.
    `;

    const completion = await openai.weather.completions.create({
      stream,
      ...request,
      prompt, // Include the prompt with weather data
    });

    if (stream) {
      res.writeHead(200, {
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
      });
      for await (const chunk of completion) {
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      }
      res.end();
      res.on('close', () => res.end());
    } else {
      res.json(completion.choices[0]);
    }
  } catch (error) {
    console.error('Error fetching weather data or generating response:', error);

    res.status(500).json({
      error: 'Failed to process the request',
    });
  }
});
