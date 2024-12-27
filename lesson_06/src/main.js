/** @format */

import {createApp, ref} from "vue";
import router from "./router";
import "./style.scss";

import App from "./App.vue";

localStorage.clear();
localStorage.setItem("productList", "");
localStorage.setItem("cart", JSON.stringify([]));
window.globalReadStorage = ref(0);

createApp(App).use(router).mount("#app");
