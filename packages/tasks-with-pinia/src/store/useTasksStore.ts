import { defineStore } from "pinia";
import {
  fetchTasks as fetchTasksAPI,
  addTask as addTaskAPI,
  changeTask as changeTaskAPI,
  deleteTask as deleteTaskAPI,
} from "@efanworks/tasks-api";
import { type Task } from "@efanworks/tasks-types";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    fetchTasks: async function () {
      const tasks = await fetchTasksAPI();
      this.tasks = tasks;
    },
    addTask: async function (text: string) {
      const task = await addTaskAPI(text);
      this.tasks = [...this.tasks, task];
    },
    changeTask: async function (id: string, text?: string, done?: boolean) {
      const updates = Object.assign(
        {},
        text ? { text } : {},
        done ? { done } : {},
      );
      const task = await changeTaskAPI(id, updates);
      this.tasks = this.tasks.map((t) => {
        if (t.id === task.id) {
          return { ...task };
        }
        return t;
      });
    },
    deleteTask: async function (id: string) {
      await deleteTaskAPI(id);
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
  },
});
