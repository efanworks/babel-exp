const BASE_URL = "http://localhost:3010";

export type Task = {
  id: string;
  done: boolean;
  text: string;
};

// 获取所有任务
export const fetchTasks = delayRequest(async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
});

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

// 删除任务
export const deleteTask = delayRequest(async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/deleteTask/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
});

function delayRequest<Args extends unknown[], R>(
  request: (...args: Args) => Promise<R>,
) {
  return async function (...args: Args) {
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    return request(...args);
  };
}
