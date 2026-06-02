import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  done: boolean;
  text: string;
}

type AddTaskPayload = {
  text: string;
};

type ChangeTaskPayload = {
  id: string;
  done?: boolean;
  text?: string;
};

type DeleteTaskPayload = {
  id: string;
};

export type TasksAction =
  | { type: "add"; payload: AddTaskPayload }
  | { type: "change"; payload: ChangeTaskPayload }
  | { type: "delete"; payload: DeleteTaskPayload };

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
