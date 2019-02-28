import Vue from "vue";
import Vuex from "vuex";
import { CHANGE_LOGININ_STATUS } from "@/constant";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    [CHANGE_LOGININ_STATUS](state) {
      state.isLogin = !state.isLogin;
    }
  },
  actions: {}
});
