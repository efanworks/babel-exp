import { ChatOpenAI } from "@langchain/openai";

export const model = new ChatOpenAI({
  model: "deepseek/deepseek-v4-flash",
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  apiKey: process.env.OPENROUTER_API_KEY,
});
