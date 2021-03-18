import { App } from "vue";

import Default from "@/layouts/Default.vue";
import Auth from "@/layouts/Auth.vue";

export const registerLayouts = (app: App): void => {
  app.component("default-layout", Default);
  app.component("auth-layout", Auth);
};
