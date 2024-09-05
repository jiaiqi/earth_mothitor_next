<script
  lang="ts"
  setup
>
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
  <header class="header h-100px w-full flex items-center justify-between text-18px text-white">
    <div />
    <div class="max-w-1300px w-1300px flex">
      <img src="/public/icon/logo.png" class="h-46px w-46px" alt="" srcset="">
      <img src="/public/icon/logo2.png" class="h-54.55px w-120px" alt="" srcset="">
    </div>
    <div class="w-250px">
      <button
        v-for="btn in headerButtons" :key="btn.name"
        class="w-120px flex items-center justify-center rounded bg-white text-14px text-black"
      >
        <img :src="btn.icon">{{ btn.name }}
      </button>
      <button>企业用户</button>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  background: linear-gradient(139.61deg, rgba(47, 119, 201, 1) 4.16%, rgba(62, 143, 236, 1) 122.08%);
}
</style>
