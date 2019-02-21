<template>
  <div class="input-wrap">
    <slot name="prefix" />
    <input :type="type" :placeholder="placeholder" class="custom-input" />
    <slot name="suffix" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "CustomInput"
})
export default class CustomInput extends Vue {
  @Prop({ default: "text" })
  private type!: string;
  @Prop()
  private placeholder!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";
.input-wrap {
  height: 108px;
  width: 100%;
  line-height: 108px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $gray-d3;
  > input {
    font-size: 36px;
    border: none;
    outline: none;
    flex: 1;
  }
}
</style>
