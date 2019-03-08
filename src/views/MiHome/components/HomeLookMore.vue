<template>
  <div class="look-more" v-if="content.body">
    <p v-for="item in content.body.items" :key="item.action_title">
      {{ item.action_title }} >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Content } from "./types/";

@Component
export default class HomeLookMore extends Vue {
  @Prop({ type: Object, default() { return {} } })
  content!: Content
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";
.look-more {
  height: 104px;
  line-height: 104px;
  text-align: center;
  font-size: 28px;
  color: $black-08a;
}
</style>
