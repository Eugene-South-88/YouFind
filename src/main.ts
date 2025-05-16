import { createApp } from 'vue'
import './assets/styles/style.scss'
import App from './App.vue'

import {createPinia} from "pinia";
import router from '../src/router/index.ts'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
