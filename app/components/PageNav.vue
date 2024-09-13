<script lang="ts" setup>
const route = useRoute()
const activeNav = computed(() => route.path || '/')
const navList = [
  {
    name: '首页',
    path: '/',
  },
  {
    name: '数据目录',
    path: '/dataSummary',
  },
  {
    name: '产品目录',
    path: '/productSummary',
  },
  {
    name: '技术服务',
    path: '/technicalService',
  },
  {
    name: '法规标准',
    path: '/regulation',
  },
  {
    name: '地震科普',
    path: '/earthquakePopularization',
  },
  {
    name: '地震信息',
    path: '/earthquakeInfo',
  },
]

const menuHamburgerActive = ref(false)
</script>

<template>
  <div class="pos-sticky top-0 z-999 w-full bg-#FAFAFC shadow-md">
    <div class="pos-relative m-x-a max-w-1300px w-full flex items-center justify-between container 2xl:w-1300px xl:max-w-1300px">
      <button
        class="reset-btn menu-hamburger m-15px w-20px cursor-pointer md:hidden" flex="~ col justify-center"
        aria-label="移动端导航"
        aria-expanded="false"
        aria-controls="full-screen"
        :class="{ active: menuHamburgerActive }"
        @click="menuHamburgerActive = !menuHamburgerActive"
      >
        <span class="hamburger-1" />
        <span class="hamburger-2" />
        <span class="hamburger-3" />
      </button>
      <nav :class="{ active: menuHamburgerActive }" class="menu-box h0 w-full items-center justify-between overflow-hidden bg-white/95 p-x-10px md:h-unset md:flex">
        <NuxtLink
          v-for="nav in navList" :key="nav.name" :to="nav.path"
          class="nav-item mx-10px px-10px"
          :class="{ active: activeNav === nav.path }"
        >
          {{ nav.name }}
        </NuxtLink>
      </nav>
      <!-- <div class="h-34px w-full flex overflow-hidden b-1px b-blue rounded-full b-solid bg-transparent md:w-380px">
        <input
          type="text" placeholder="请输入搜索内容"
          class="flex-1 bg-transparent indent text-14px outline-none placeholder-gray"
        >
        <button class="w-62px cursor-pointer rounded-full bg-blue text-center text-white active:bg-blue-600 hover:bg-blue-500">
          <i class="i-carbon-search" />
        </button>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-box {
  transition: all 0.3s ease;
  transform: translateY(0);

  .nav-item {
    cursor: pointer;
    border-bottom: 4px solid transparent;
    font-weight: 700;
    line-height: 56px;
    &:hover {
      // border-bottom-color: var(--color-primary);
      color: var(--color-primary);
    }
    &.active {
      color: var(--color-primary);
      border-bottom-color: var(--color-primary);
    }
  }
  @media (max-width: 768px) {
    .md\:flex,
    [md\:flex=''] {
      display: flex;
    }
    &.active {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      transform: translateY(calc(100% - 0px));
      height: unset;
      .nav-item {
        border: none;
        line-height: 40px;
      }
    }
  }
}
button.reset-btn {
  background: none;
  border: none;
  padding: 0;
  touch-action: manipulation;
  z-index: 1;
}
.menu-hamburger {
  --text-color: #303133;
  --transition-all: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  span {
    background-color: var(--text-color);
    border-radius: 10px;
    height: 2px;
    margin: 2px 0;
    transition: var(--transition-all);
    width: 100%;
  }
  .hamburger-1 {
    width: 50%;
  }
  .hamburger-3 {
    width: 75%;
  }
  &.active {
    .hamburger-3 {
      transform-origin: bottom;
      width: 50%;
      transform: translate(2px, -10px) rotate(45deg);
    }
    .hamburger-2 {
      transform-origin: top;
      transform: rotate(-45deg);
    }
    .hamburger-1 {
      transform-origin: bottom;
      transform: rotate(45deg) translate(13px);
    }
  }
}
</style>
