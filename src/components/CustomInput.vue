<template>
  <div class="input-wrap">
    <slot name="prefix" />
    <input
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
      @focus="$emit('focus', $event)"
      :value="value"
      class="custom-input"
    />
    <slot name="suffix" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from "vue-property-decorator";
@Component({
  name: "CustomInput"
})
export default class CustomInput extends Vue {
  @Prop({ default: "text" })
  private type!: string;
  @Prop()
  private placeholder!: string;
  // 原因查看：https://developer.mozilla.org/zh-CN/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
  @Prop({ default: "nope" })
  private autocomplete!: string;

  @Model("input", { type: [String, Number] }) value:
    | string
    | number
    | null
    | undefined;
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
