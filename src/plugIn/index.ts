import Loading from "@/plugIn/Loading/index.vue";

const LoadingPlugIn = {
  install: function(Vue: any, Option: any) {
    Vue.component("Loading", Loading);
  }
};

export { LoadingPlugIn };
