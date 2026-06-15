import { createContext, useContext } from "react";
import { type Task } from "@efanworks/tasks-types";
import { makeAutoObservable } from "mobx";
import {
  fetchTasks as fetchTasksAPI,
  addTask as addTaskAPI,
  changeTask as changeTaskAPI,
  deleteTask as deleteTaskAPI,
} from "@efanworks/tasks-api";

export class TasksStore {
  tasks = [] as Task[];

  constructor() {
    makeAutoObservable(this);
  }
  fetchTasks = async () => {
    const tasks = await fetchTasksAPI();
    this.tasks = tasks;
  };
  addTask = async (text: Task["text"]) => {
    const task = await addTaskAPI(text);
    this.tasks = [...this.tasks, { ...task }];
  };
  changeTask = async (
    id: Task["id"],
    text?: Task["text"],
    done?: Task["done"],
  ) => {
    const updates = Object.assign(
      {},
      text ? { text } : {},
      done ? { done } : {},
    );
    const task = await changeTaskAPI(id, updates);
    this.tasks = this.tasks.map((t) => {
      if (t.id === id) {
        return { ...task };
      }
      return t;
    });
  };
  deleteTask = async (id: Task["id"]) => {
    await deleteTaskAPI(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
  };
}

export type TasksConstructor = typeof TasksStore;

export const store = new TasksStore();
export const TasksContext = createContext(store);

export const useTasks = () => {
  const { tasks, fetchTasks, addTask, changeTask, deleteTask } =
    useContext(TasksContext);

  return {
    tasks,
    fetchTasks,
    addTask,
    changeTask,
    deleteTask,
  };
};
