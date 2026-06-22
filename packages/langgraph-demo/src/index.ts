import { HumanMessage } from "@langchain/core/messages";
import { START, END, StateGraph } from "@langchain/langgraph";
import { MessagesState } from "./state/index.js";
import { llmCall } from "./nodes/llmCall.js";
import { toolNode } from "./nodes/toolNode.js";
import { shouldContinue } from "./nodes/shouldContinue.js";

const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", toolNode)
  .addEdge(START, "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
  .addEdge("toolNode", "llmCall")
  .compile();

const result = await agent.invoke({
  messages: [new HumanMessage("Add 3 and 4.")],
});

for (const message of result.messages) {
  console.log(`[${message.type}]: ${message.text}`);
}
