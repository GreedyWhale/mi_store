<template>
  <div>
    <div class="swiper-container carousel-container">
      <ul class="swiper-wrapper carousel-wrapper" v-if="content.body">
        <li
          class="swiper-slide"
          v-for="item in content.body.items"
          :key="item.ad_position_id"
        >
          <img :src="item.img_url" alt="轮播图片" />
        </li>
      </ul>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

@Component
export default class HomeCarousel extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  content!: {};

  // data
  swiper: Object = {};
  mounted(): void {
    this.swiper = new Swiper(".carousel-container", {
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";

.swiper-container {
  background: $gray-cc;
  .carousel-wrapper {
    > li {
      height: 360px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

<style lang="scss">
.swiper-pagination-bullet {
  display: inline-block !important;
  width: 16px !important;
  height: 16px !important;
  margin: 0 5px !important;
  opacity: 0.4 !important;
  border-radius: 50% !important;
  background: #fff !important;
  &-active {
    opacity: 1 !important;
  }
}
</style>
