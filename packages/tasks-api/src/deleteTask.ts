import { delayRequest, BASE_URL } from "./base";

// 删除任务
export const deleteTask = delayRequest(async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/deleteTask/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
});
