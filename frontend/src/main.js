import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './style.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft, faMagnifyingGlass)

import router from './router';
import store from './store';

import VueAxios from 'vue-axios';
import axios from "axios";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(ElementPlus);
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
