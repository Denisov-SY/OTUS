/** @format */

import {createApp} from "vue";
import router from "./router";
import "./style.scss";

import App from "./App.vue";

localStorage.clear();

createApp(App).use(router).mount("#app");
