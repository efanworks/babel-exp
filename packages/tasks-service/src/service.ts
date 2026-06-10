import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { type Task } from "@efanworks/tasks-types";

export type TasksState = {
  tasks: Task[];
};

// 内存存储
const tasksState: TasksState = {
  tasks: [],
};

const app = express();
app.use(cors());
app.use(express.json());

// 获取所有任务
app.get("/tasks", (_req, res) => {
  res.json(tasksState.tasks);
});

// 添加任务
app.post("/addTask", (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "text is required" });
    return;
  }

  const newTask: Task = {
    id: uuidv4(),
    done: false,
    text,
  };
  tasksState.tasks.push(newTask);
  res.status(201).json(newTask);
});

// 修改任务
app.patch("/changeTask/:id", (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;

  const task = tasksState.tasks.find((t) => t.id === id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  if (text !== undefined) task.text = text;
  if (done !== undefined) task.done = done;

  res.json(task);
});

// 删除任务
app.delete("/deleteTask/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = tasksState.tasks.length;
  tasksState.tasks = tasksState.tasks.filter((t) => t.id !== id);

  if (tasksState.tasks.length === initialLength) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(204).send();
});

// 启动服务器
export function startServer(port = 3010): void {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// 导出用于测试的请求处理函数
export { app, tasksState };

// 直接运行时启动服务器
startServer();
