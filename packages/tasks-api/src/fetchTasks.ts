import { delayRequest, BASE_URL } from "./base";
import type { Task } from "@efanworks/tasks-types";

// 获取所有任务
export const fetchTasks = delayRequest(async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
});
