import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import scrollDirectives from './directives/scrollDirectives';
import { createToaster } from "@meforma/vue-toaster";
import i18n from "./i18n";
import vClickOutside from "click-outside-vue3"
import axios from "axios";

// axios.defaults.baseURL="http://localhost:3002/api/";
axios.defaults.baseURL="https://admin-keremet.devup.kz/api/";
axios.defaults.params={
 lang: store.getters.getLang
};

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3002/api/',
    baseURL: 'https://admin-keremet.devup.kz/api/',
    params: {
     lang: store.getters.getLang
    }
   })

const app = createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .use(vClickOutside)
    .directive('scroll', scrollDirectives)

app.config.globalProperties.$axios = { ...axiosInstance }
app.config.globalProperties.$toaster = createToaster({ position: "top-right" })
app.mount('#app')
