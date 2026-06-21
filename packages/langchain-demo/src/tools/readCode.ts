import { tool } from "langchain";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readCode = tool(
  async ({ fileName }: { fileName: string }) => {
    const filePath = path.resolve(__dirname, fileName);
    console.log("read_code 被调用...", `file path: ${filePath}`);

    return new Promise<string>((resolve, reject) => {
      const readStream = fs.createReadStream(filePath, {
        encoding: "utf-8",
      });
      let fullCode = "";
      readStream.on("data", (chunk) => {
        console.log("读取中...");
        fullCode += chunk.toString();
      });
      readStream.on("end", () => {
        console.log("读取文件完毕...");
        resolve(fullCode);
      });
      readStream.on("error", (err) => reject(err));
    });
  },
  {
    name: "read_code",
    description: "从本地文件读取内容",
    schema: z.object({
      fileName: z.string().describe("本地文件名"),
    }),
  },
);
