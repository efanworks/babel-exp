import { createApp } from "vue";
import { createPinia } from "pinia";
import Tasks from "./Tasks/index.vue";

export const mount = (root: string) => {
  const pinia = createPinia();
  const app = createApp(Tasks);
  app.use(pinia);
  app.mount(root);
};
