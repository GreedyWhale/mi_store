<template>
  <div class="wrap">
    <header class="header">
      <img src="../../assets/image/milogo@2x.png" alt="logo" />
      <h1>{{ languageConversion(currentLanguage, "title") }}</h1>
    </header>
    <div class="input-area">
      <CustomInput
        :placeholder="loginConfig.accountPlaceholder"
        :type="loginConfig.accountInputType"
        @focus="hideErrMsg"
        v-model="account"
      >
        <div slot="prefix" class="input-prefix">
          <transition name="right-slide">
            <div class="input-prefix__content" v-if="isSmSLogin">
              +86
              <svg class="icon-font" aria-hidden="true">
                <use xlink:href="#icon-right_arrow"></use>
              </svg>
            </div>
          </transition>
        </div>
      </CustomInput>
      <CustomInput
        :placeholder="loginConfig.passwordPlaceholder"
        :type="visiblePassword ? 'text' : loginConfig.passwordInputType"
        @focus="hideErrMsg"
        v-model="password"
      >
        <div slot="suffix" class="input-suffix">
          <template v-if="isSmSLogin">
            <p
              :class="[getCodeLock ? 'disable' : '', 'input-suffix__text']"
              @click="getVerificationCode"
            >
              {{ codeMsg }}
            </p>
          </template>
          <template v-else>
            <div
              :class="[
                'input-suffix__btn',
                visiblePassword ? 'input-suffix__btn-active' : ''
              ]"
              @click="toggelPasswordInputType"
            >
              <svg class="icon-font" aria-hidden="true">
                <use xlink:href="#icon-visible"></use>
              </svg>
            </div>
          </template>
        </div>
      </CustomInput>
    </div>
    <div class="error-msg" v-if="errMsg">
      <svg class="icon-font" aria-hidden="true">
        <use xlink:href="#icon-error_tip"></use>
      </svg>
      <p>{{ errMsg }}</p>
    </div>
    <div class="button-area">
      <button @click="login">{{ loginConfig.loginBtn }}</button>
      <button @click="toggleLoginType">{{ loginConfig.toggleBtn }}</button>
      <div class="account-service" v-if="!isSmSLogin">
        <a
          href="https://cn.account.xiaomi.com/pass/register?callback=https%3A%2F%2Fm.mi.com%2Fv1%2Fauthorize%2Fsso_callback%3Ffollowup%3Dhttps%253A%252F%252Fm.mi.com%252Fuser%26sign%3DZWJiMDc5YWVjOTNkNGE5YzM4Mjc2Y2I1MGYxMmE0YmY4MmRkMDY1Ng%2C%2C&sid=mi_eshopm_go&_bal=true&_loginSign=ticket&_loginType=ticket&_locale=zh_CN"
        >
          {{ languageConversion(currentLanguage, "registerTip") }}
        </a>
        <span>|</span>
        <a
          href="https://account.xiaomi.com/pass/forgetPassword?callback=https%3A%2F%2Fm.mi.com%2Fv1%2Fauthorize%2Fsso_callback%3Ffollowup%3Dhttps%253A%252F%252Fm.mi.com%252Fuser%26sign%3DZWJiMDc5YWVjOTNkNGE5YzM4Mjc2Y2I1MGYxMmE0YmY4MmRkMDY1Ng%2C%2C&sid=mi_eshopm_go&_bal=true&_loginSign=ticket&_loginType=ticket&_locale=zh_CN"
        >
          {{ languageConversion(currentLanguage, "forgotPassword") }}
        </a>
      </div>
    </div>
    <div class="other-login__type">
      <h5>{{ languageConversion(currentLanguage, "otherLoginType") }}</h5>
      <ul>
        <li>
          <a
            href="https://api.weibo.com/oauth2/authorize?response_type=code&client_id=2996826273&redirect_uri=https://account.xiaomi.com/pass/sns/login/load&state=7b22736964223a226d695f6573686f706d5f676f222c227469636b6574223a22343631303234222c226c6f63616c65223a227a685f434e222c2263616c6c6261636b223a2268747470732533412532462532466d2e6d692e636f6d2532467631253246617574686f72697a6525324673736f5f63616c6c6261636b253346666f6c6c6f77757025334468747470732532353341253235324625323532466d2e6d692e636f6d2532353246757365722532367369676e2533445a574a694d4463355957566a4f544e6b4e474535597a4d344d6a6332593249314d4759784d6d4530596d59344d6d526b4d4459314e67253243253243222c226170706964223a2232393936383236323733227d"
            target="_blank"
          >
            <svg class="icon-font" aria-hidden="true">
              <use xlink:href="#icon-weibo"></use>
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://auth.alipay.com/login/express.htm?goto=https%3A%2F%2Fmemberexprod.alipay.com%3A443%2Fauthorize%2FuserAuthQuickLoginAction.htm%3Fe_i_i_d%3D9aa20c0f49221216fd5d41bf31b2c1a4"
            target="_blank"
          >
            <svg class="icon-font" aria-hidden="true">
              <use xlink:href="#icon-zhifubao"></use>
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://open.weixin.qq.com/sns/explorer_broker?appid=wx62ba64796e13f092&redirect_uri=https%3A%2F%2Faccount.xiaomi.com%2Fpass%2Fsns%2Flogin%2Fload&response_type=code&scope=snsapi_userinfo&state=WEIXIN992251#wechat_redirect"
            target="_blank"
          >
            <svg class="icon-font" aria-hidden="true">
              <use xlink:href="#icon-weixin"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <footer class="footer">
      <ul>
        <li
          v-for="(nav, index) in footNav"
          :key="nav.text"
          @click="toggelFooterNav(index)"
        >
          <p :class="[index === footerNavActiveIndex ? 'active' : '']">
            {{ nav.text }}
          </p>
        </li>
        <li>
          <a :href="footNav[footerNavActiveIndex].FAQUrl" target="_blank">
            {{ languageConversion(currentLanguage, "FAQ") }}
          </a>
        </li>
        <li>
          <a :href="footNav[footerNavActiveIndex].privacyUrl" target="_blank">
            {{ languageConversion(currentLanguage, "privacyPolicy") }}
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomInput from "@/components/CustomInput.vue";
import md5 from "blueimp-md5";
import { CHANGE_LOGININ_STATUS } from "@/constant";
import { Mutation } from "vuex-class";
import pageContent from "./page_content";
import api from "@/api";

let countdownTimer: any;
@Component({
  components: {
    CustomInput
  }
})
export default class MiLogin extends Vue {
  // data
  pageText = pageContent;
  isSmSLogin: boolean = true;
  footNav: any[] = [
    {
      text: "简体",
      language: "zh_CN",
      privacyUrl: "https://www.mi.com/about/privacy/",
      FAQUrl: "https://static.account.xiaomi.com/html/faq/zh_CN/faqList.html"
    },
    {
      text: "繁体",
      language: "zh_TW",
      privacyUrl: "https://www.mi.com/tw/about/privacy/",
      FAQUrl: "https://static.account.xiaomi.com/html/faq/zh_TW/faqList.html"
    },
    {
      text: "English",
      language: "en_US",
      privacyUrl: "https://www.mi.com/global/about/privacy/",
      FAQUrl: "https://static.account.xiaomi.com/html/faq/en_US/faqList.html"
    }
  ];
  footerNavActiveIndex: number = 0;
  getCodeLock: boolean = false;
  codeMsg: string = "短信验证码";
  verificationCodeTimes: number = 1;
  account: any = null;
  password: any = null;
  verificationCode: any = null;
  errMsg: string = "";
  visiblePassword: boolean = false;
  // mutations
  @Mutation(CHANGE_LOGININ_STATUS) changeLoginStatus!: () => void;

  // methods
  toggelFooterNav(index: number): void {
    clearTimeout(countdownTimer);
    this.account = null;
    this.password = null;
    this.errMsg = "";
    this.footerNavActiveIndex = index;
    this.initVerificationcCode();
  }
  initVerificationcCode() {
    this.codeMsg = this.languageConversion(this.currentLanguage, "codeMsg");
    this.getCodeLock = false;
    this.verificationCode = null;
    this.verificationCodeTimes = 1;
  }
  toggleLoginType(): void {
    this.password = null;
    this.errMsg = "";
    this.isSmSLogin = !this.isSmSLogin;
  }
  toggelPasswordInputType(): void {
    this.visiblePassword = !this.visiblePassword;
  }
  countdown(time: number): void {
    if (!time) {
      this.codeMsg = this.languageConversion(
        this.currentLanguage,
        "codeMsgRetry"
      );
      this.getCodeLock = false;
      return;
    }
    time--;
    this.codeMsg = `${this.languageConversion(
      this.currentLanguage,
      "codeMsgRetry"
    )}(${time})`;
    countdownTimer = setTimeout(() => {
      this.countdown(time);
    }, 1000);
  }
  startCountdown(): void {
    let time: number = 60 * this.verificationCodeTimes;
    this.verificationCodeTimes += 1;
    countdownTimer = setTimeout(() => {
      this.countdown(time);
    }, 1000);
  }
  verifyPhoneNumber(): boolean {
    const phoneReg = /^((1[3-8][0-9])+\d{8})$/;
    return phoneReg.test(this.account);
  }
  checkVerificationCode(): boolean {
    if (!this.password) {
      this.errMsg = this.languageConversion(
        this.currentLanguage,
        "errMsgEmptyVerificationCode"
      );
      return false;
    }
    if (this.verificationCode !== parseInt(this.password)) {
      this.errMsg = this.languageConversion(
        this.currentLanguage,
        "errMsgInvalidVerificationCode"
      );
      return false;
    }
    return true;
  }
  checkPhoneNumber(): boolean {
    if (!this.account) {
      this.errMsg = this.languageConversion(
        this.currentLanguage,
        "errMsgEmptyPhoneNumber"
      );
      return false;
    }
    if (!this.verifyPhoneNumber()) {
      this.errMsg = this.languageConversion(
        this.currentLanguage,
        "errMsgInvalidPhoneNumber"
      );
      return false;
    }
    return true;
  }
  checkAccount(): boolean {
    if (!this.account) {
      this.errMsg = this.languageConversion(
        this.currentLanguage,
        "errMsgEmptyAccount"
      );
      return false;
    }
    if (!this.password) {
      this.errMsg = this.languageConversion(
        this.currentLanguage,
        "errMsgEmptyPassword"
      );
      return false;
    }
    return true;
  }
  getVerificationCode(): void {
    if (!this.getCodeLock && this.checkPhoneNumber()) {
      this.getCodeLock = true;
      this.$ajax
        .post(api.getCode, {
          phone: this.account
        })
        .then(res => {
          const {
            data: {
              result: { code }
            }
          } = res;
          this.verificationCode = code;
        });
      this.startCountdown();
    }
  }
  hideErrMsg(event: Object): void {
    this.errMsg = "";
  }
  canLogin(): boolean {
    if (
      this.isSmSLogin &&
      this.checkPhoneNumber() &&
      this.checkVerificationCode()
    ) {
      return true;
    }
    if (!this.isSmSLogin && this.checkAccount()) {
      return true;
    }
    return false;
  }
  login(): void {
    if (this.canLogin()) {
      this.$ajax
        .post(api.login, {
          account: this.account,
          password: md5(this.password)
        })
        .then(() => {
          // todo 跳转
          this.changeLoginStatus();
        })
        .catch(error => {
          const {
            data: { msg }
          } = error;
          this.errMsg = msg;
        });
    }
  }
  languageConversion(languageType: string, textKey: string): string {
    return this.pageText[languageType][textKey];
  }
  // computed
  get loginConfig(): Object {
    let loginConfigObj: Object = {};
    if (this.isSmSLogin) {
      loginConfigObj = {
        loginBtn: this.languageConversion(this.currentLanguage, "loginBtnSMS"),
        toggleBtn: this.languageConversion(
          this.currentLanguage,
          "toggleBtnSMS"
        ),
        accountPlaceholder: this.languageConversion(
          this.currentLanguage,
          "accountPlaceholderSMS"
        ),
        accountInputType: "tel",
        passwordPlaceholder: this.languageConversion(
          this.currentLanguage,
          "passwordPlaceholderSMS"
        ),
        passwordInputType: "number"
      };
    } else {
      loginConfigObj = {
        loginBtn: this.languageConversion(this.currentLanguage, "loginBtn"),
        toggleBtn: this.languageConversion(this.currentLanguage, "toggleBtn"),
        accountPlaceholder: this.languageConversion(
          this.currentLanguage,
          "accountPlaceholder"
        ),
        accountInputType: "text",
        passwordPlaceholder: this.languageConversion(
          this.currentLanguage,
          "passwordPlaceholder"
        ),
        passwordInputType: "password"
      };
    }
    return loginConfigObj;
  }
  get currentLanguage(): string {
    return this.footNav[this.footerNavActiveIndex].language;
  }
  destroyed(): void {
    clearTimeout(countdownTimer);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";
$login-type-icon: "../assets/image/login_type.png";
$login-type-bg: ($red-ed, $blue-6b, $green-00);

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
    .input-suffix {
      flex: none;
      &__text {
        font-size: 28px;
        color: $blur-2e;
        cursor: pointer;
        padding-right: 40px;
      }
      &__btn {
        font-size: 40px;
        color: $gray-4d;
        padding-left: 40px;
        &-active {
          color: $orange-ff;
        }
      }
    }
  }
  .error-msg {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: $red-ff;
    margin: 28px 0 10px;
    > p {
      margin-left: 10px;
    }
  }
  .button-area {
    margin-top: 48px;
    margin-bottom: 108px;
    > button {
      display: block;
      border-radius: 12px;
      width: 100%;
      font-size: 36px;
      padding: 25px 0;
      outline: none;
      &:active {
        opacity: 0.6;
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
    .account-service {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: $gray-9b;
      padding-top: 30px;
      > a {
        padding: 0 18px;
      }
      > span {
        color: $black;
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
        content: "";
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
        svg {
          width: 50px;
          height: 50px;
          color: $white;
        }
        @for $i from 1 through 3 {
          &:nth-child(#{$i}) {
            background: nth($login-type-bg, $i);
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
        color: $gray-9b;
        > p {
          flex: none;
          &.active {
            color: $gray-4a;
          }
        }
        &:not(:last-child)::after {
          content: "|";
          padding: 0 20px;
        }
      }
    }
  }
  .disable {
    color: $gray-99 !important;
    pointer-events: none !important;
  }
  // 左滑动画
  .right-slide-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  .right-slide-enter-active {
    transition: all 0.5s ease-out;
  }
  .right-fade-enter {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
