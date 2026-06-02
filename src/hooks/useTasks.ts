import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Task = {
  id: string;
  done: boolean;
  text: string;
};

type State = {
  tasks: Task[];
};

type Action = {
  addTask: (text: Task["text"]) => void;
  changeTask: (task: { id: string; done?: boolean; text?: string }) => void;
  deleteTask: (id: Task["id"]) => void;
};

export const useTasks = create<State & Action>((set) => ({
  tasks: [],
  addTask: (text) =>
    set((state) => {
      return {
        tasks: [
          ...state.tasks,
          {
            id: uuidv4(),
            done: false,
            text,
          },
        ],
      };
    }),
  changeTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...t,
            ...task,
          };
        }
        return t;
      }),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));
