<script lang="ts" setup>
interface PathItem {
  name: string
  path?: string
}

const props = defineProps<{ path: PathItem[] }>()
// 初始化默认值
const defaultPath = [
  {
    name: '首页',
    path: '/',
  },
]
// 创建一个新的变量来存储默认值或传入的值
const currentPath = props.path.length > 0 ? props.path : defaultPath
</script>

<template>
  <div class="flex justify-between">
    <div class="flex items-center">
      <div class="pos-relative z-2 h-42px w-42px text-center text-18px text-white line-height-38px">
        <img src="~/assets/images/icons/home.png" alt="" class="pos-absolute h-full w-full">
        <i class="i-ri:home-4-fill" />
      </div>
      <div class="left-text pos-relative left--10px min-w-300px flex pl-20px line-height-34px">
        <div v-for="(item, index) in currentPath" :key="index" :class="{ 'cursor-pointer hover:text-#3682DA': item.path }" class="flex items-center">
          <span v-if="!item.path">{{ item.name }}</span>
          <NuxtLink v-else :to="item.path">
            {{ item.name }}
          </NuxtLink>
          <img
            v-if="currentPath.length && currentPath.length - 1 > index "
            src="~/assets/images/icons/right-icon.png"
            class="mx-15px inline-block h-24px w-24px" alt=""
          >
        </div>
      </div>
    </div>
    <slot name="right" />
  </div>
</template>

<style scoped>
.left-text {
  background: linear-gradient(88.74deg, rgba(241, 246, 255, 1) 1.25%, rgba(241, 246, 246, 0) 90.23%);
}
</style>
