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
</script>

<template>
  <div class="w-full bg-#FAFAFC">
    <nav container xl:max-w-1300px class="m-x-a max-w-1300px w-full flex items-center justify-between p-x-10px 2xl:w-1300px">
      <NuxtLink
        v-for="nav in navList" :key="nav.name" :to="nav.path"
        class="nav-item"
        :class="{ active: activeNav === nav.path }"
      >
        {{ nav.name }}
      </NuxtLink>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.nav-item {
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-weight: 700;
  line-height: 58px;
  &:hover {
    border-bottom-color: var(--color-primary);
    color: var(--color-primary);
  }
  &.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
  }
}
</style>
