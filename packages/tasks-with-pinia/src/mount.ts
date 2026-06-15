import { createApp } from "vue";
import { createPinia } from "pinia";
import { type MountedFn } from "@efanworks/tasks-types";
import Tasks from "./components/Tasks/index.vue";

const routes = {
  tasks: Tasks,
};

type RoutePath = keyof typeof routes;

export const mount: MountedFn = (root, path = "tasks") => {
  if (!root) {
    throw new Error("Can not find mounted element");
  }
  const pinia = createPinia();
  const app = createApp(routes[path as RoutePath]);
  app.use(pinia);
  app.mount(root);
};
