import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  done: boolean;
  text: string;
}

export type TasksAction =
  | { type: "add"; payload: { text: string } }
  | { type: "change"; payload: { id: string; done?: boolean; text?: string } }
  | { type: "delete"; payload: { id: string } };

export function taskReducer(tasks: Task[], action: TasksAction) {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      return [
        ...tasks,
        {
          id: uuidv4(),
          done: false,
          ...payload,
        },
      ];
    }
    case "change": {
      return tasks.map((t) => {
        if (t.id === payload.id) {
          return {
            ...t,
            ...payload,
          };
        }
        return t;
      });
    }
    case "delete": {
      return tasks.filter((t) => t.id !== payload.id);
    }
  }
}
