<template>
  <div class="container layout-flex-column" v-if="visibleLoading">
    <div class="loading-wrap layout-flex-column">
      <svg class="icon-font loading-icon" aria-hidden="true">
        <use xlink:href="#icon-loading"></use>
      </svg>
      <p>拼命加载中...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import eventBus from "@/eventBus";
import { GLOBAL_EVENT_LOADING } from "@/constant";

@Component
export default class Loading extends Vue {
  // data
  visibleLoading: boolean = false;

  created(): void {
    eventBus.$on(GLOBAL_EVENT_LOADING, (loadingStatus: boolean) => {
      this.visibleLoading = loadingStatus;
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0);
  .loading-wrap {
    width: 200px;
    height: 200px;
    padding: 10px;
    border-radius: 16px;
    background: $black-099;
    font-size: 32px;
    color: $white;
    .loading-icon {
      width: 2em;
      height: 2em;
      margin-bottom: 20px;
      animation: rotate 2s linear infinite;
    }
  }
}
.layout-flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
