import { ChatOpenAI } from "@langchain/openai";
import { tools } from "../tools/index.js";

const model = new ChatOpenAI({
  model: "deepseek/deepseek-v4-flash",
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const modelWithTools = model.bindTools(tools);
