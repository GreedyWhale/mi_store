import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "./assets/font/index.css";
import "./assets/font/index";
import "./assets/scss/reset.scss";
import Axios from "./utils/request/";
import { LoadingPlugIn } from "@/plugIn/";

Vue.use(Axios);
Vue.use(LoadingPlugIn);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
