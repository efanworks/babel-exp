import { type Task, type TasksAction } from "./taskReducer";
import { createContext } from "react";

export const TasksContext = createContext<Task[]>([]);
export const TasksDispatchContext = createContext<React.Dispatch<TasksAction>>(
  () => {},
);
