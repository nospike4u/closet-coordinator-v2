import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PassThrough } from 'stream';
import ErrorResponse from './ErrorResponse.js';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

class StreamMock {
  constructor(words) {
    this.words = words;
    this.iterator = this[Symbol.asyncIterator];
    this.controller = new AbortController();
  }
  
  async *[Symbol.asyncIterator]() {
    for (let [i, v] of this.words.entries()) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (this.controller.signal.aborted) {
        break;
      }
      if (i === this.words.length - 1) {
        yield {
          id: 'chatcmpl-UNIQUEID',
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'gpt-3.5-mock',
          system_fingerprint: 'fp_c2295e73ad',
          choices: [
            { index: 0, delta: { content: `${v} ` }, logprobs: null, finish_reason: 'stop' }
          ]
        };
      } else {
        yield {
          id: 'chatcmpl-UNIQUEID',
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'gpt-3.5-mock',
          system_fingerprint: 'fp_c2295e73ad',
          choices: [{ index: 0, delta: { content: `${v} ` }, logprobs: null, finish_reason: null }]
        };
      }
    }
  }
}

class ChatMock {
  completions = {
    create({ messages, model, stream }) {
      if (!model) throw new ErrorResponse('400 you must provide a model parameter', 400);
      if (!messages) throw new ErrorResponse("400 Missing required parameter: 'messages'", 400);
      
      const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      if (stream) {
        return new StreamMock(text.split(' '));
      } else {
        return {
          id: 'chatcmpl-9GkKWpvJxL7CCdq3xulB1WIgH4oLT',
          object: 'chat.completion',
          created: 1713778368,
          model: 'gpt-4o-mini',
          choices: [
            {
              index: 0,
              message: {
                role: 'assistant',
                content: text
              },
              logprobs: null,
              finish_reason: 'stop'
            }
          ],
          usage: { prompt_tokens: 27, completion_tokens: 29, total_tokens: 56 },
          system_fingerprint: 'fp_c2295e73ad'
        };
      }
    }
  };
}

class ImageMock {
  async generate({ ...request }) {
    const { size, response_format, prompt, ...rest } = request;
    let width = 1024;
    let height = 1024;
    if (size) {
      const [w, h] = size.split('x');
      width = parseInt(w);
      height = parseInt(h);
    }
    const data = [
      {
        revised_prompt: prompt
      }
    ];
    const url = `https://placedog.net/${width}/${height}?r`;
    if (response_format === 'b64_json') {
      const res = await fetch(`https://placedog.net/${width}/${height}?r`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      data[0].b64_json = base64;
      return { data };
    }
    data[0].url = url;
    return { data };
  }
}

class AudioMock {
  speech = {
    async create() {
      const filePath = join(__dirname, '../rr.mp3');
      const rr = await readFile(filePath);
      const passThrough = new PassThrough();
      passThrough.write(rr);
      passThrough.end();
      return { body: passThrough };
    }
  };
}

const apiKey = process.env.WEATHER_API_KEY;

class WeatherMock {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.weatherapi.com/v1/current.json';
  }

  // Method to get weather data
  async generate({ location, response_format = 'json', ...rest }) {
    if (!location) {
      throw new Error('Location parameter is required');
    }

    try {
      // Fetch data from the Weather API
      const response = await axios.get(this.baseUrl, {
        params: {
          key: this.apiKey,
          q: location,
          ...rest,
        },
      });

      const weatherData = response.data;

      // Format the data as per the response format
      let data;
      if (response_format === 'json') {
        data = this.formatJsonResponse(weatherData);
      } else if (response_format === 'text') {
        data = this.formatTextResponse(weatherData);
      } else {
        throw new Error(`Unsupported response format: ${response_format}`);
      }

      return { data };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  // Helper method to format data in JSON format
  formatJsonResponse(weatherData) {
    return {
      location: {
        name: weatherData.location.name,
        region: weatherData.location.region,
        country: weatherData.location.country,
        lat: weatherData.location.lat,
        lon: weatherData.location.lon,
      },
      current: {
        temperature: weatherData.current.temp_c,
        condition: weatherData.current.condition.text,
        wind_speed: weatherData.current.wind_kph,
        humidity: weatherData.current.humidity,
        feels_like: weatherData.current.feelslike_c,
      },
    };
  }

  // Helper method to format data in text format
  formatTextResponse(weatherData) {
    return `The current weather in ${weatherData.location.name} is ${weatherData.current.condition.text} with a temperature of ${weatherData.current.temp_c}°C. The wind speed is ${weatherData.current.wind_kph} km/h and the humidity is ${weatherData.current.humidity}%.`;
  }
}

class OpenAIMock {
  constructor() {}

  chat = new ChatMock();
  images = new ImageMock();
  audio = new AudioMock();
  weather = new WeatherMock();
}

export default OpenAIMock;
