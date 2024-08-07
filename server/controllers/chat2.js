import Clothes from '../models/Clothes.js'

import OpenAI from "openai";
import OpenAIMock from "../utils/OpenAIMock.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createChat2 = asyncHandler(async (req, res) => {
  const {
    body: { stream, ...request },
    headers: { mode },
  } = req;

  const dataClothes = await Clothes.find();
  if (!dataClothes) {
      return next(new ErrorResponse(`Server error`, 500));
    }
    
  
    let collectMessage=
    `"I have a list of shirts stored in this database ${dataClothes}. Please randomly select a shirt from the list and provide me with the thumbnail of the selected shirt."  as an answer where you use this API to retrieve data about the weather to help me make decisions on what to wear ${request}`
    
    
    let message={
        "model": "gpt-4o-mini",
        "messages": [
              {
                    "role": "system",
                    "content": `You are a helpful assistant who provides only ONE image (img) from this database ${dataClothes} as an answer where you use this API to retrieve data about the weather to help me make decisions on what to wear ${request?.messages?.location?.region} give me one <a></a> tags links for one image of the clothes from the database in every sugestion`
          
                },
      {
          "role": "user",
          "content": collectMessage
      },  {
        "role": "assistant",
        "content": " `You are a helpful assistant who provides only ONE image (img) from this database ${dataClothes} as an answer where you use this API to retrieve data about the weather to help me make decisions on what to wear ${request?.messages?.location?.region}`"
    },
    {
        "role": "user",
        "content": "WHat should I wear today?"
    }
  ],
  "stream": false
}

let openai;

  mode === "developement"
    ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
    : (openai = new OpenAIMock());
    
    const completion = await openai.chat.completions.create({
      stream,
      ...message,
    });
    
    if (stream) {
      res.writeHead(200, {
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
    });
    for await (const chunk of completion) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.end();
    res.on("close", () => res.end());
  } else {
    console.log(completion.choices[0])
    res.json(completion.choices[0]);
  }
});
