import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/main.scss";
import { makeServer } from "./server";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const app = createApp(App);

app.use(router);

app.mount("#app");
