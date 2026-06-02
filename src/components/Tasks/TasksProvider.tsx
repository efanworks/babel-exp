import React from "react";
import { TasksContext, TasksDispatchContext } from "./tasksContext";
import { useReducer } from "react";
import { taskReducer } from "./taskReducer";

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>{children}</TasksDispatchContext>
    </TasksContext>
  );
}
