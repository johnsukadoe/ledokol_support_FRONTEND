import router from "@/router/index.js";
import store from "@/store/index.js";
import "./api/api.ts";
import "./style.scss";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

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
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import { createApp } from "vue";
import VueAxios from "vue-axios";
import App from "./App.vue";

library.add(
  faArrowLeft,
  faMagnifyingGlass,
  faPencil,
  faTrash,
  faHeart,
  faUnliked
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

app.use(VueAxios, axios);
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
app.use(router);
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
