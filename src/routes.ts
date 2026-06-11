import { createElement } from "react";
import { type RouteObject } from "react-router-dom";
import { Counter, Tasks as TasksZustand } from "@efanworks/tasks-with-zustand";

export const routes: RouteObject[] = [
  { path: "/tasks-zustand", element: createElement(TasksZustand) },
  { path: "/useSyncExternalTest", element: createElement(Counter) },
];
