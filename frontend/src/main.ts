import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./style.scss";

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
import "./api/api.ts";
import axios from "axios";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";

import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";

library.add(
  faArrowLeft,
  faMagnifyingGlass,
  faPencil,
  faTrash,
  faHeart,
  faUnliked
);

const app = createApp(App);

app.use(VueAxios, axios);
app.use(ElementPlus);
app.use(router);
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
