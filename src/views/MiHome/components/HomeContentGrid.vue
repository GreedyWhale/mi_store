<template>
  <ul v-if="contentList[0]" class="grid" :data-length="contentList.length">
    <li v-for="(content, index) in contentList" :key="index" :data-length="content.length">
      <div v-for="subItem in content" :key="subItem.ad_position_id">
        <img :src="subItem.img_url" alt="内容" />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Content } from "./types/";

@Component
export default class HomeContentGrid extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  content!: Content;

  // computed
  get contentList(): any[] {
    let list: any[] = [];
    if (this.content.body && this.content.body.items) {
      const {
        body: { items }
      } = this.content;
      if (items.length === 3) {
        list[0] = items.slice(0, 1);
        list[1] = items.slice(1, 3);
      } else {
        list[0] = items.slice(0);
      }
    }
    return list;
  }
}
</script>

<style lang="scss" scoped>
@mixin flex-row-center {
  display: flex;
  align-items: center;
}
@mixin flex-column-center {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.grid {
  @include flex-row-center;
  &[data-length="1"] {
    > li {
      @include flex-row-center;
      > div {
        flex: 1 1 25%;
      }
      &[data-length='2'] {
        > div {
          &:first-child {
            margin-right: 5px;
          }
        }
      }
    }
  }
  &[data-length="2"] {
    justify-content: space-between;
    > li {
      @include flex-column-center;
      justify-content: space-between;
      min-height: 528px;
      flex: 0 1 49.5%;
    }
  }
}
img {
  display: block;
  width: 100%;
}
</style>
