import axios from "axios";
import eventBus from "@/eventBus";
import { GLOBAL_EVENT_LOADING } from "@/constant";
import mock from "@/mock";
import qs from "qs";

function getApiFromUrl(url: string): string {
  const urlList: string[] = url.split("/");
  return urlList[urlList.length - 1];
}

const Axios = axios.create({
  baseURL: "http://yapi.demo.qunar.com/mock/54066/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  responseType: "json",
  timeout: 10000,
  retry: 3,
  retryDelay: 1000,
  showLoading: true
});

Axios.interceptors.request.use(
  config => {
    if (config.showLoading) {
      eventBus.$emit(GLOBAL_EVENT_LOADING, true);
    }
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    eventBus.$emit(GLOBAL_EVENT_LOADING, false);
  }
);
Axios.interceptors.response.use(
  response => {
    const api = getApiFromUrl(<string>response.config.url);
    eventBus.$emit(GLOBAL_EVENT_LOADING, false);
    if (response.data.stat !== 1) {
      return Promise.resolve(mock[<string>api]);
    }
    return response;
  },
  error => {
    const config = error.config;
    const api = getApiFromUrl(<string>error.config.url);
    if (!config || !config.retry) return Promise.resolve(mock[<string>api]);

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
      eventBus.$emit(GLOBAL_EVENT_LOADING, false);
      return Promise.resolve(mock[<string>api]);
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
