import '@mdi/font/css/materialdesignicons.css';


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './libs/axios';
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

createApp(App)
  .use(store)
  .use(Toast, {
    position: "top-right",
    pauseOnFocusLoss: false,
    closeOnClick: true,
    maxToasts: 3,
    newestOnTop: true,
    transition: "Vue-Toastification__fade",
    filterBeforeCreate: (toast, toasts) => {
      if (toasts.filter(
        t => t.type === toast.type
      ).length !== 0) {
        return false;
      }
      return toast;
    }
  })
  .use(router)
  .use(vuetify)
  .mount('#app');
