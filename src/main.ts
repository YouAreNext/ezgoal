import { createApp } from "vue";
import ElementPlus from "element-plus";
import { svgSpritePlugin } from "vue-svg-sprite";
import { registerLayouts } from "@/layouts/index.ts";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "./plugins/apollo";
import "./layouts/index";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import "element-plus/lib/theme-chalk/index.css";
import "@/assets/styles/index.scss";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(svgSpritePlugin);

// Registering global components from external files
registerLayouts(app);

app.mount("#app");
