import { tool } from "langchain";
import path from "path";
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import z from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const writeCode = tool(
  async ({ fileName, content }: { fileName: string; content: string }) => {
    console.log("write_code 被调用...");
    const filePath = path.resolve(__dirname, fileName);
    await writeFile(filePath, content, "utf-8");
    return `已写入 ${Buffer.byteLength(content, "utf-8")} bytes 到 ${fileName}`;
  },
  {
    name: "write_code",
    description: "向本地文件写入内容",
    schema: z.object({
      fileName: z.string().describe("本地文件名"),
      content: z.string().describe("要写入的文件内容"),
    }),
  },
);
