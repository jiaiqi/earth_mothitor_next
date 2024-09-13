<script lang="ts" setup>
const headerButtons = ref([
  {
    icon: '/img/icon/person.png',
    name: '个人用户',
    path: '/user',
  },
  {
    icon: '/img/icon/company.png',
    name: '企业用户',
    path: '/company',
  },
])
</script>

<template>
  <header
    class="pos-relative z-1000 h-100px w-full flex items-center justify-between text-18px text-white bg-gradient-blue"
  >
    <div class="hidden flex-1 md:flex" />
    <div container xl:max-w-1300px class="m-x-10px w-full flex flex-col items-center justify-between md:flex-row">
      <div class="flex items-center">
        <img src="/img/icon/logo.png" class="hidden h-46px w-46px md:flex" alt="" srcset="">
        <img src="/img/icon/logo2.png" class="hidden h-54.55px w-120px md:flex" alt="" srcset="">
        <div class="ml-12px text-24px font-bold">
          <h3 class="text-18px md:text-24px">
            国家防震减灾公共服务平台
          </h3>
          <p class="hidden text-10px md:flex">
            National public service platform for earthquake prevention and
            disaster reduction
          </p>
        </div>
      </div>
      <div class="h-34px w-full flex overflow-hidden b-1px b-white rounded-full b-solid bg-transparent md:w-380px">
        <input
          type="text" placeholder="请输入搜索内容"
          class="flex-1 bg-transparent indent text-14px outline-none placeholder-white"
        >
        <button class="w-62px cursor-pointer rounded-full bg-white text-center text-blue active:bg-gray-200 hover:bg-gray-100">
          <i class="i-carbon-search" />
        </button>
      </div>
    </div>
    <div class="hidden w-250px flex-1 justify-end md:flex">
      <button
        v-for="btn in headerButtons" :key="btn.name"
        class="m-r-10px h-32px w-120px flex items-center justify-center rounded-full bg-white text-14px text-black active:bg-gray-200 hover:bg-gray-100"
      >
        <img :src="btn.icon" class="m-r-6px">{{ btn.name }}
      </button>
    </div>
  </header>
</template>

<style lang="scss"></style>
