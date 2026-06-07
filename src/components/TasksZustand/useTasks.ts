import { create } from "zustand";
import {
  addTask as addTaskAPI,
  changeTask as changeTaskAPI,
  deleteTask as deleteTaskAPI,
  fetchTasks as fetchTasksAPI,
} from "./api";

export type Task = {
  id: string;
  done: boolean;
  text: string;
};

type State = {
  tasks: Task[];
  status: "idle" | "pending" | "fulfilled" | "failed";
};

type Action = {
  fetchTasks: () => void;
  addTask: (text: Task["text"]) => void;
  changeTask: (task: { id: string; done?: boolean; text?: string }) => void;
  deleteTask: (id: Task["id"]) => void;
};

export const useTasks = create<State & Action>((set) => ({
  tasks: [],
  status: "idle",
  fetchTasks: async () => {
    set({ status: "pending" });
    const tasks = await fetchTasksAPI();
    set({ tasks, status: "fulfilled" });
  },
  addTask: async (text: string) => {
    set({ status: "pending" });
    const task = await addTaskAPI(text);
    set((state) => ({
      tasks: [...state.tasks, task],
      status: "fulfilled",
    }));
  },
  changeTask: async ({ id, done, text }) => {
    const updates = Object.assign(
      {},
      done ? { done } : {},
      text ? { text } : {},
    );
    set({ status: "pending" });
    const task = await changeTaskAPI(id, updates);
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...task,
          };
        }
        return t;
      }),
      status: "fulfilled",
    }));
  },
  deleteTask: async (id) => {
    set({ status: "pending" });
    await deleteTaskAPI(id);
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
      status: "fulfilled",
    }));
  },
}));
