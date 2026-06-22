import type { GraphNode } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { modelWithTools } from "../models/index.js";
import { MessagesState } from "../state/index.js";

export const llmCall: GraphNode<typeof MessagesState> = async (state) => {
  const resp = await modelWithTools.invoke([
    new SystemMessage(
      "You are a helpful assistant tasked with performing arithmetic on a set of inputs.",
    ),
    ...state.messages,
  ]);

  return {
    messages: [resp],
    llmCalls: 1,
  };
};
