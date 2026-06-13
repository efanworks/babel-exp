import { createApp } from "vue";
import { createPinia } from "pinia";
import Tasks from "./components/Tasks/index.vue";

export type RoutePath = "tasks";

const routes = {
  tasks: Tasks,
};

export const mount = (root: string, path: RoutePath = "tasks") => {
  const pinia = createPinia();
  const app = createApp(routes[path]);
  app.use(pinia);
  app.mount(root);
};
