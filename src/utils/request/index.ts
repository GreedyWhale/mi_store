import axios from "axios";

const Axios = axios.create({
  baseURL: "http://rap2api.taobao.org/app/mock/19157/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  responseType: "json",
  timeout: 10000,
  retry: 3,
  retryDelay: 1000
});

Axios.interceptors.response.use(
  response => {
    if(response.data.stat !== 1) {
      return Promise.reject(response)
    }
    return response
  },
  error => {
    const config = error.config;

    if (!config || !config.retry) return Promise.reject(error);

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
      return Promise.reject(error);
    }

    config.__retryCount += 1;

    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1);
    });

    return backoff.then(() => {
      return Axios(config);
    });
  }
);

export default {
  install: function(Vue: any, Option: any) {
    Object.defineProperty(Vue.prototype, "$ajax", { value: Axios });
  }
};
