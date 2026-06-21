import { createAgent } from "langchain";
import { getWeather } from "../tools/getWeather.js";
import { model } from "../models/index.js";

const agent = createAgent({
  model: model,
  tools: [getWeather],
});

console.log(
  await agent.invoke({
    messages: [
      { role: "user", content: "What's the weather in San Francisco?" },
    ],
  }),
);
