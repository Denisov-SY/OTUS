import { createApp } from "vue";
import { createPinia } from 'pinia';
import { Quasar, Notify, Loading, Dialog, AppVisibility } from "quasar";
import quasarLang from "quasar/lang/ru";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";
import router from "./router";

import "quasar/src/css/index.sass";
import "./assets/main.css";

import access from "./components/access";
access
  .create()
  .then(() => {
    console.log(`main.js> access.isReady() = ${access.isReady()}`);

    // const app = createApp(App).use(createPinia());
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(Quasar, {
      plugins: {
        Notify,
        Loading,
        Dialog,
        AppVisibility,
      }, // import Quasar plugins and add here
      lang: quasarLang,
      config: {
        notify: {
          /* look at QuasarConfOptions from the API card */
        },
        loading: {},
        config: {
          dark: true /* look at QuasarConfOptions from the API card */,
        },
      },
    });

    app.mount("#app");
  })
  .catch((err) => {
    console.error(
      `main.js> ERROR!!! access.isReady() = ${access.isReady()}`,
      err,
    );
  });
