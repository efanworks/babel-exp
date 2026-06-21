import fs from "fs";
import { pipeline, Transform } from "stream";

export const upperCaseStream = (fileRead: string, fileOut: string) => {
  const readStream = fs.createReadStream(fileRead, {
    encoding: "utf-8",
    highWaterMark: 32 * 1024,
  });

  const upperCaseStream = new Transform({
    transform(chunk, encoding, callback) {
      try {
        const s = chunk.toString("utf-8").toUpperCase();
        this.push(s);
        callback();
      } catch (err) {
        callback(err instanceof Error ? err : new Error(String(err)));
      }
    },
  });

  const writeStream = fs.createWriteStream(fileOut, {
    encoding: "utf-8",
  });

  pipeline(readStream, upperCaseStream, writeStream, (error) => {
    if (error) {
      console.error("Pipeline 出错", error.message);
    } else {
      console.log("Pipeline 顺利完成");
    }
  });
};
