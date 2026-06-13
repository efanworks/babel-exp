import { createApp } from "vue";
import { createPinia } from "pinia";
import { type MountedFn } from "@efanworks/tasks-types";
import Tasks from "./components/Tasks/index.vue";

export type RoutePath = "tasks";

const routes = {
  tasks: Tasks,
};

export const mount: MountedFn<RoutePath> = (root, path = "tasks") => {
  if (!root) {
    throw new Error("Can not find mounted element");
  }
  const pinia = createPinia();
  const app = createApp(routes[path]);
  app.use(pinia);
  app.mount(root);
};
