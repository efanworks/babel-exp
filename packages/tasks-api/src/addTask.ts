import { delayRequest, BASE_URL } from "./base";
import type { Task } from "@efanworks/tasks-types";

// 添加任务
export const addTask = delayRequest(async (text: string): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/addTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return response.json();
});
