<script lang="ts" setup>
interface PathItem {
  name: string
  path?: string
  type?: string
}

const props = defineProps<{ path?: PathItem[] }>()
// 初始化默认值
const defaultPath: PathItem[] = [
  {
    name: '首页',
    path: '/',
  },
]
// 创建一个新的变量来存储默认值或传入的值
const currentPath = computed<PathItem[]>(() => props?.path && props.path.length > 0 ? props.path : defaultPath)
const router = useRouter()
function goBack() {
  router.back()
}
function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex justify-between">
    <div class="flex items-center">
      <div class="pos-relative z-2 h-42px w-42px text-center text-18px text-white line-height-38px">
        <img src="~/assets/images/icons/home.png" alt="" class="pos-absolute h-full w-full">
        <i class="i-ri:home-4-fill" />
      </div>
      <div class="left-text pos-relative left--10px min-w-200px flex pl-20px line-height-34px">
        <div v-for="(item, index) in currentPath" :key="index" :class="{ 'cursor-pointer hover:text-#3682DA': item.path || item.type }" class="flex items-center">
          <NuxtLink v-if="item.type && item.type === 'back'" :to="item.path" @click.prevent="goBack">
            {{ item.name }}
          </NuxtLink>
          <NuxtLink v-if="item.type && item.type === 'home'" :to="item.path || '/'" @click.prevent="goHome">
            {{ item.name }}
          </NuxtLink>
          <NuxtLink v-else-if="item.path" :to="item.path">
            {{ item.name }}
          </NuxtLink>
          <span v-else>{{ item.name }}</span>
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
