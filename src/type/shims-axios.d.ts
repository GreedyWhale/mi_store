import Vue from "vue";
import { AxiosInstance, AxiosRequestConfig } from "axios";
declare module "vue/types/vue" {
  interface Vue {
    $ajax: AxiosInstance;
  }
}

declare module "axios/" {
  interface AxiosRequestConfig {
    retry?: number;
    retryDelay?: number;
    __retryCount?: number;
    showLoading?: boolean;
  }
}
