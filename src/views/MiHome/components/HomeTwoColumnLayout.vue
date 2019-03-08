<template>
  <ul class="layout">
    <li v-for="content in contentList" :key="content.product_id">
      <img :src="content.img_url" alt="商品图">
      <div class="product-info">
        <h5>{{ content.product_name  }}</h5>
        <p>{{ content.product_brief }}</p>
        <div class="product-price">
          <p>{{ content.product_price }}起</p>
          <p>{{ content.product_org_price }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Content } from "./types/";

@Component
export default class HomeTwoColumnLayout extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  content!: Content;

  // computed
  get contentList(): any[] {
    if (this.content && this.content.body) {
      return this.content.body.items;
    }
    return [];
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";
@mixin ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  > li {
    width: 49.5%;
    flex: none;
    > img {
      display: block;
      width: 100%;
      height: 375px;
    }
  }
  .product-info {
    padding: 20px 28px;
    box-sizing: border-box;
    > h5 {
      font-size: 28px;
      font-weight: normal;
      @include ellipsis;
    }
    > p {
      font-size: 24px;
      color: $black-08a;
      margin-top: 6px;
      font-weight: 200;
      @include ellipsis;
    }
    .product-price {
      display: flex;
      align-items: center;
      font-size: 28px;
      line-height: 45px;
      > p {
        font-weight: 200;
        &:first-child {
          color: $red-ea;
        }
        &:last-child {
          color: $black-08a;
          font-size: 24px;
          margin: 0 10px;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>

