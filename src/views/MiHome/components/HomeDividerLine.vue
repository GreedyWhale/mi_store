<template>
  <div :style="`background: ${bgColor}; height: ${height}`" class="dividerLine"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Content } from "./types/";

@Component
export default class HomeDividerLine extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  content!: Content;

  // computed
  get bgColor(): string {
    if (this.content.body) {
      return this.content.body.line_color;
    }
    return "";
  }
  get height(): string {
    if (this.content.body) {
      return ((parseInt(this.content.body.line_height) / 750) * 100) + 'vw';
    }
    return ''
  }
}
</script>

<style lang="scss" scoped>
// .dividerLine {
//   height: 16px;
// }
</style>
