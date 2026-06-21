import { createAgent } from "langchain";
import { model } from "../models/index.js";
import { SYSTEM_PROMPT } from "../prompts/literary_assistant.js";
import { checkpointer } from "../memories/index.js";
import { readCode } from "../tools/readCode.js";
import { writeCode } from "../tools/writeCode.js";

const agent = createAgent({
  model,
  tools: [readCode, writeCode],
  systemPrompt: SYSTEM_PROMPT,
  checkpointer,
});

async function main() {
  const content = `
    1. 从本地文件读取内容
      fileName: \`sum.js\`
    2. 分析代码功能, 为其中的函数生成jsdoc注释
    3. 将注释写入本地文件中
      fileName: \`sum_written.js\`
  `;

  const agentResult = await agent.invoke(
    { messages: [{ role: "user", content }] },
    { configurable: { thread_id: "great-gatsby-lc" } },
  );

  const agentMessages = agentResult.messages;
  console.log(agentMessages[agentMessages.length - 1]!.contentBlocks);
}

main()
  .then(() => {
    console.log("调用完毕");
  })
  .catch((err) => {
    console.error(err);
  });
