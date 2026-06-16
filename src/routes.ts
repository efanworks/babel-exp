import { createElement } from "react";
import { type RouteObject } from "react-router-dom";
import { Tasks as TasksZustand } from "@efanworks/tasks-with-zustand";
import { Tasks as TasksRedux } from "@efanworks/tasks-with-redux";
import { Tasks as TasksMobx } from "@efanworks/tasks-with-mobx";
import { Mounter } from "./components/Mounter";

export const routes: RouteObject[] = [
  { path: "/tasks-zustand", element: createElement(TasksZustand) },
  { path: "/tasks-with-redux", element: createElement(TasksRedux) },
  { path: "/tasks-with-pinia", element: createElement(() => Mounter("tasks")) },
  { path: "/tasks-with-mobx", element: createElement(TasksMobx) },
];
