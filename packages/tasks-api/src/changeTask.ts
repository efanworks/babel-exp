import { delayRequest, BASE_URL } from "./base";
import type { Task } from "@efanworks/tasks-types";

// 修改任务
export const changeTask = delayRequest(
  async (
    id: string,
    updates: { text?: string; done?: boolean },
  ): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/changeTask/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to change task");
    }
    return response.json();
  },
);
