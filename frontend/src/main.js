import { createApp } from 'vue'
import App from './App.vue'
import './style.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import store from './store';
import VueAxios from 'vue-axios';
import axios from "axios";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');