<template>
    <ul class="layout" v-if="content.body">
      <li v-for="item in content.body.items" :key="item.product_id" :data-reverse="isReverse">
        <img :src="item.img_url" alt="产品图片">
        <div class="product-info">
          <h5>{{ item.product_name }}</h5>
          <p class="product-info_brief">{{ item.product_brief }}</p>
          <p class="product-info_price">￥{{ item.product_price }}</p>
        </div>
      </li>
    </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Content } from "./types/";

@Component
export default class HomeOneColumLayout extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  content!: Content;

  // computed
  get isReverse(): boolean {
    if(this.content) {
      return this.content.view_type === 'list_one_type3'
    }
    return false;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";
.layout {
  > li {
    display: flex;
    align-items: center;
    height: 375px;
    > img {
      width: 375px;
      display: block;
    }
    .product-info {
      box-sizing: border-box;
      padding: 66px 12px 0 32px;
      height: 100%;
      flex: 1;
      > h5 {
        font-weight: normal;
        font-size: 28px;
        color: $black-0de;
        margin-bottom: 6px;
      }
      &_brief {
        font-size: 24px;
        color: $black-08a;
      }
      &_price {
        margin-top: 20px;
        color: $red-ea;
        font-size: 28px;
      }
    }
    &[data-reverse="true"] {
      > img {
        order: 1;
      }
    }
  }
}
</style>

