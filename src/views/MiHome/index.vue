<template>
  <div class="container">
    <div class="mask" v-if="isUnfold"></div>
    <header class="header">
      <div class="search-bar">
        <img src="@/assets/image/home_mi_logo.png" alt="logo" />
        <router-link class="fake-input" to="/login">
          <svg class="icon-font" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
          </svg>
          搜索商品名称
        </router-link>
        <router-link class="user-icon" to="/login">
          <img src="@/assets/image/home_user.png" alt="user" />
        </router-link>
      </div>
      <div class="nav" v-if="navList[0]">
        <div class="swiper-container nav-wrapper">
          <div class="swiper-wrapper nav-list">
            <div
              class="swiper-slide nav-item"
              v-for="(nav, index) in navList"
              :key="nav.type"
              @click="changeNavTabIndex(index)"
            >
              <p :class="[navTabIndex === index ? 'nav-item__active' : '']">
                {{ nav.name }}
              </p>
            </div>
            <div class="swiper-slide nav-item nav-item-placehoder"></div>
          </div>
        </div>
        <transition name="unfold">
          <div class="nav-unfold-list" v-if="isUnfold">
            <h3>全部</h3>
            <ul>
              <li
                v-for="(nav, index) in navList"
                :key="`${nav.type}-${index}`"
                :class="[
                  navTabIndex === index ? 'nav-unfold__item-active' : ''
                ]"
                @click="changeNavTabIndex(index)"
              >
                {{ nav.name }}
              </li>
            </ul>
          </div>
        </transition>
        <div class="nav-unfold__btn" @click="isUnfold = !isUnfold">
          <svg
            :class="['icon-font', isUnfold ? 'upward' : '']"
            aria-hidden="true"
          >
            <use xlink:href="#icon-arrow-bold"></use>
          </svg>
        </div>
      </div>
    </header>
    <transition-group
      name="content-slide"
      tag="div"
      v-if="navList[0]"
      class="content"
    >
      <div
        v-for="(nav, index) in navList"
        :key="`content-${nav.type}-${index}`"
      >
        <template v-if="contentList[index]">
          <div
            v-for="(contentItem, contentIndex) in contentList[index]"
            :key="`${contentItem.view_type}-${contentIndex}`"
          >
            <HomeCarousel
              v-if="contentItem.view_type === 'gallery'"
              :content="contentItem"
            />
            <HomeContentGrid
              v-if="contentItem.view_type === 'cells_auto_fill'"
              :content="contentItem"
            />
            <HomeDividerLine
              v-if="contentItem.view_type === 'divider_line'"
              :content="contentItem"
            />
            <HomeOneColumLayout
              v-if="contentItem.view_type === 'list_one_type2' || contentItem.view_type === 'list_one_type3'"
              :content="contentItem"
            />
            <HomeTwoColumnLayout
              v-if="contentItem.view_type === 'list_two_type1'"
              :content="contentItem"
            />
            <HomeLookMore
              v-if="contentItem.view_type === 'list_action_title'"
              :content="contentItem"
            />
          </div>
        </template>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/api";
import Swiper from "swiper";
import { SwiperExample, NavTab } from "./types/";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import HomeCarousel from "./components/HomeCarousel.vue";
import HomeContentGrid from "./components/HomeContentGrid.vue";
import HomeDividerLine from "./components/HomeDividerLine.vue";
import HomeOneColumLayout from "./components/HomeOneColumLayout.vue";
import HomeTwoColumnLayout from "./components/HomeTwoColumnLayout.vue";
import HomeLookMore from "./components/HomeLookMore.vue";

NProgress.configure({ showSpinner: false });

@Component({
  components: {
    HomeCarousel,
    HomeContentGrid,
    HomeDividerLine,
    HomeOneColumLayout,
    HomeTwoColumnLayout,
    HomeLookMore
  }
})
export default class Home extends Vue {
  // data
  navList: any[] = [];
  isUnfold: boolean = false;
  navTabSwiper: SwiperExample = {};
  navTabIndex: number = 0;
  navTabslidesPerView: number = 6;
  contentList: Array<any> = [];

  mounted(): void {
    this.getNavList().then(() => {
      this.getPageContent();
    });
  }
  // methods
  getNavList(): Promise<any> {
    return new Promise(resolve => {
      this.$ajax.get(api.homeNavList).then(res => {
        const {
          data: {
            result: { tabs }
          }
        } = res;
        this.navList = tabs;
        this.$nextTick(() => {
          this.navTabSwiper = new Swiper(".nav-wrapper", {
            slidesPerView: this.navTabslidesPerView,
            freeMode: true
          });
          resolve();
        });
      });
    });
  }
  changeNavTabIndex(index: number): void {
    this.navTabIndex = index;
    let toIndex = 0;
    if (index > this.navTabslidesPerView / 2) {
      toIndex = index - this.navTabslidesPerView / 2;
    }
    this.navTabSwiper.slideTo(toIndex);
  }
  getPageContent(): void {
    NProgress.start();
    const currentTab: NavTab = this.navList[this.navTabIndex];
    this.$ajax.get(`${api.pageContent}?type=${currentTab.type}`).then(res => {
      this.$set(
        this.navList,
        this.navTabIndex,
        Object.assign({}, { hasData: true }, currentTab)
      );
      this.$set(this.contentList, this.navTabIndex, res.data.result.sections);
      NProgress.done();
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color_variable.scss";
.mask {
  background: $black;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
.header {
  background: $white-f2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  .search-bar {
    display: flex;
    align-items: center;
    height: 84px;
    > img {
      width: 50px;
      margin: 0 20px;
    }
    .fake-input {
      flex: 1;
      padding-left: 10px;
      font-size: 30px;
      color: $black-04d;
      background: $white;
      height: 60px;
      line-height: 60px;
    }
    .user-icon {
      width: 95px;
      margin: 0 10px;
      > img {
        display: block;
        margin: 0 auto;
        width: 40px;
      }
    }
  }
  .nav {
    position: relative;
    .nav-list {
      display: flex;
      align-items: center;
      .nav-item {
        flex: none;
        width: auto !important;
        font-size: 26px;
        color: $gray-74;
        padding: 0 30px;
        line-height: 60px;
        &-placehoder {
          padding-right: 68px;
          border: none;
        }
        > p {
          border-bottom: 4px solid $white-f2;
          &.nav-item__active {
            border-color: $orange-ed !important;
          }
        }
      }
    }
    .nav-unfold-list {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: $white-f2;
      color: $gray-74;
      overflow: hidden;
      padding: 0 26px;
      z-index: 1;
      > h3 {
        padding-top: 26px;
        font-size: 28px;
        font-weight: normal;
      }
      > ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 34px;
        > li {
          font-size: 26px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          margin-bottom: 22px;
          width: 155px;
          border: 1px solid $gray-e5;
          background: $white;
          border-radius: 8px;
          &:not(:nth-child(4n)) {
            margin-right: 20px;
          }
          &.nav-unfold__item-active {
            background: $orange-fd;
            border-color: $orange-ff;
            color: $orange-ff;
          }
        }
      }
    }
    .nav-unfold__btn {
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      height: 100%;
      width: 68px;
      background: $white-f2;
      box-shadow: -15px 0 15px 0 $white-f2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      > svg {
        color: $gray-b0;
        transition: all 0.2s;
        &.upward {
          transform: rotate(180deg);
        }
      }
    }
  }
  .unfold-enter {
    max-height: 0;
  }
  .unfold-enter-active {
    transition: max-height 0.3s ease-in-out;
  }
  .unfold-enter-to {
    max-height: 500px;
  }
  .nav-item__active,
  .nav-unfold__item-active {
    color: $orange-ed !important;
  }
}
.content {
  padding-top: 148px;
}
</style>

<style lang="scss">
#nprogress {
  position: relative;
  z-index: 12;
  .bar {
    background: rgb(255, 202, 43);
  }
  .peg {
    box-shadow: 0 0 10px rgba(237, 91, 0, 0.5), 0 0 5px rgba(237, 91, 0, 0.5);
  }
}
</style>
