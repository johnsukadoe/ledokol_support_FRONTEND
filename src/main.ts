import { profile } from "@/api/apiAuth.ts";
import privateRoute from "@/router/private/homepage-router.ts";
import publicRoute from "@/router/public/public-page-router.ts";
import apiClientPlugin from "@/services/apiClientPlugin.ts";
import "@/api/api.ts";
import "@/style.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart as faUnliked } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faHeart,
  faMagnifyingGlass,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

import axios from "axios";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";
import VueAxios from "vue-axios";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

library.add(
  faArrowLeft,
  faMagnifyingGlass,
  faPencil,
  faTrash,
  faHeart,
  faUnliked,
);

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{zinc.50}",
      100: "{zinc.100}",
      200: "{zinc.200}",
      300: "{zinc.300}",
      400: "{zinc.400}",
      500: "{zinc.500}",
      600: "{zinc.600}",
      700: "{zinc.700}",
      800: "{zinc.800}",
      900: "{zinc.900}",
      950: "{zinc.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{zinc.950}",
          inverseColor: "#ffffff",
          hoverColor: "{zinc.900}",
          activeColor: "{zinc.800}",
        },
        highlight: {
          background: "{zinc.950}",
          focusBackground: "{zinc.700}",
          color: "#ffffff",
          focusColor: "#ffffff",
        },
      },
      dark: {
        primary: {
          color: "{zinc.50}",
          inverseColor: "{zinc.950}",
          hoverColor: "{zinc.100}",
          activeColor: "{zinc.200}",
        },
        highlight: {
          background: "rgba(250, 250, 250, .16)",
          focusBackground: "rgba(250, 250, 250, .24)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
      },
    },
  },
});

const app = createApp(App);
const pinia = createPinia();
app.use(VueAxios, axios);
app.use(apiClientPlugin);
// app.use(ElementPlus);
app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

app.use(ToastService);

app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);

const isLogged = await profile();
const routes = isLogged ? privateRoute : publicRoute;
console.log(routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.mount("#app");
