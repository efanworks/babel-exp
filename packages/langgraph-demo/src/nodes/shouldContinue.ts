import { END, type ConditionalEdgeRouter } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import type { MessagesState } from "../state/index.js";

export const shouldContinue: ConditionalEdgeRouter<
  typeof MessagesState,
  Record<string, unknown>,
  "toolNode"
> = async (state) => {
  const lastMessage = state.messages.at(-1);

  if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
    return END;
  }

  if (lastMessage.tool_calls?.length) {
    return "toolNode";
  }

  return END;
};
