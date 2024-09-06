<script
  lang="ts"
  setup
>
const activeNav = ref('/')
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
    <nav class="m-x-a max-w-1300px w-full flex items-center justify-between p-x-10px 2xl:w-1300px">
      <NuxtLink
        v-for="nav in navList" :key="nav.name" :to="nav.path"
        :class="{ 'b-#2F77C9 text-#2F77C9': activeNav && activeNav === nav.path, 'b-transparent': !activeNav || activeNav !== nav.path }"
        class="box-border cursor-pointer b-b-2px b-solid font-bold line-height-58px hover:b-#2F77C9 hover:text-#2F77C9"
      >
        {{ nav.name }}
      </NuxtLink>
    </nav>
  </div>
</template>

<style></style>
