<template>
  <div class="wrap">
    <header class="header">
      <img src="../assets/image/milogo@2x.png" alt="logo" />
      <h1>小米帐号登录</h1>
    </header>
    <div class="input-area">
      <CustomInput :placeholder="'手机号码'">
        <div slot="prefix" class="input-prefix">
          <transition name="right-slide">
            <div class="input-prefix__content" v-if="lock">
              +86
              <svg class="icon-font" aria-hidden="true">
                <use xlink:href="#icon-right_arrow"></use>
              </svg>
            </div>
          </transition>
        </div>
      </CustomInput>
      <CustomInput :placeholder="'短信验证码'">
        <div slot="suffix" class="input-suffix">
          <template>
            <p class="input-suffix__text">获取验证码</p>
          </template>
        </div>
      </CustomInput>
    </div>
    <div class="button-area">
      <button>登录</button>
      <button @click="toggle">用户名密码登录</button>
    </div>
    <div class="other-login__type">
      <h5>其他登录方式</h5>
      <ul>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
      </ul>
    </div>
    <footer class="footer">
      <ul>
        <li
          v-for="(nav, index) in footNav"
          :key="nav.text" @click="toggelFooterNav(index)">
            <a :href="nav.url" :class="[nav.isActive ? 'active' : '']">{{ nav.text }}</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomInput from "@/components/CustomInput.vue";
@Component({
  components: {
    CustomInput
  }
})
export default class MiLogin extends Vue {
  public lock: boolean = true
  public footNav: Array<object> = [
    {
      text: '简体',
      url: '',
      isActive: true
    },
    {
      text: '繁体',
      url: '',
      isActive: false
    },
    {
      text: 'English',
      url: '',
      isActive: false
    },
    {
      text: '常见问题',
      url: '',
      isActive: false
    },
    {
      text: '隐私政策',
      url: '',
      isActive: false
    }
  ]
  toggle():void {
    this.lock = !this.lock
  }
  empty():void {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";
$login-type-icon: '../assets/image/login_type.png';
$login-type-style: (
  (bg-color: $red-ed, width: 36px, bg-position-x: -76px),
  (bg-color: $blue-6b, width: 52px, bg-position-x: -114px),
  (bg-color: $green-00, width: 46px, bg-position-x: -168px)
);

@mixin setLoginTypeStyle($style) {
  background-color: map-get($style, bg-color);
  > a {
    width: map-get($style, width);
    background-position: map-get($style, bg-position-x) 0;
  }
}
.wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 40px;
  min-height: 100vh;
  .header {
    text-align: center;
    padding: 60px 0 20px;
    > img {
      width: 100px;
      height: 100px;
      display: block;
      margin: 0 auto 30px;
    }
    > h1 {
      font-size: 36px;
      font-weight: normal;
    }
  }
  .input-area {
    margin-bottom: 48px;
    .input-prefix {
      color: $gray-4a;
      font-size: 36px;
      .input-prefix__content {
        color: $gray-9b;
      }
      &__content {
        padding-right: 20px;
      }
    }
    .input-suffix__text {
      padding: 0 40px;
      font-size: 28px;
      color: $blur-2e;
      cursor: pointer;
    }
  }
  .button-area {
    margin-bottom: 108px;
    > button {
      display: block;
      border-radius: 12px;
      width: 100%;
      font-size: 36px;
      padding: 25px 0;
      outline: none;
      &:active {
        opacity: .6;
      }
      &:nth-child(1) {
        background: $orange-ff;
        color: $white;
        border: none;
        margin-bottom: 48px;
      }
      &:nth-child(2) {
        background: $white;
        color: $black;
        border: 1px solid $gray-d3;
      }
    }
  }
  .other-login__type {
    font-size: 24px;
    color: $gray-b0;
    > h5 {
      display: flex;
      align-items: center;
      flex: 2;
      font-weight: normal;
      margin-bottom: 20px;
      &::after,
      &::before {
        content: '';
        background: $white-f2;
        height: 1px;
        flex: 1;
      }
      &::before {
        margin-right: 5px;
      }
      &::after {
        margin-left: 5px;
      }
    }
    > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      > li {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        > a {
          background: url($login-type-icon) no-repeat;
          height: 36px;
        }
        @for $i from 1 through 3 {
          &:nth-child(#{$i}) {
            @include setLoginTypeStyle(nth($login-type-style, $i))
          }
        }
      }
    }
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 140px;
    width: 100%;
    > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      > li {
        display: flex;
        align-items: center;
        font-size: 28px;
        > a {
          text-decoration: none;
          color: $gray-9b;
          flex: none;
          &:active {
            color: inherit;
          }
          &.active {
            color: $gray-4a;
          }
        }
        &:not(:last-child)::after { 
          content: '|';
          color: $gray-9b;
          padding: 0 20px;
        }
      }
    }
  }
  // 左滑动画
  .right-slide-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  .right-slide-enter-active {
    transition: all .5s ease-out;
  }
  .right-fade-enter {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
