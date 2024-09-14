<script lang="ts" setup>
import { useSorted } from '@vueuse/core'
import { decode } from '~/utils/base/dataEncry'
import { getList } from '~/api/notice'
// not need if you are using auto import
import { useNewsStore } from '~/composables/home'

const notices = ref<any[]>([])

getList().then((res) => {
  const data = decode(res)
  if (Array.isArray(data) && data.length > 0) {
    const dayjs = useDayjs()
    const dataSorted = useSorted(data, (a, b) => b.oTime - a.oTime)
    const endData = dataSorted.value.slice(0, 30)
    if (Array.isArray(endData)) {
      notices.value = endData.map((item) => {
        return {
          date: item.oTime,
          title: `${dayjs(item.oTime).format('M月D日H时m分')}${item.localName}发生${item.m}级地震`,
          id: item.id,
        }
      })
      const homeStore = useNewsStore()
      homeStore.setNewsList(notices.value)
    }
  }
}).catch((e) => {
  console.log('Failed to fetch error::', e)
  // Failed to fetch
})
const animationDuration = computed(() => `${notices.value.length * 10}s`)
</script>

<template>
  <div class="m-x-auto m-y-24px h-68px w-full flex overflow-hidden rounded-full px-24px py-16px container xl:max-w-1300px" style="border: 1px solid #BCD7FF;">
    <div class="inline-block w-113px rounded-full text-center text-16px lh-35px bg-gradient-blue">
      <i class="i-ri-volume-vibrate-fill text-20px" /> 通知公告
    </div>
    <div class="scroll-wrap flex-1 overflow-hidden rounded-full">
      <div class="scroll-content flex flex-1 whitespace-nowrap">
        <NuxtLink v-for="item in notices" :key="item.id" :to="`/earthquakeInfo/situation/${item.id}`" class="list-item rounded-full p-x-20px lh-34px">
          {{ item.title }}
        </NuxtLink>
        <NuxtLink v-for="item in notices" :key="item.id" :to="`/earthquakeInfo/situation/${item.id}`" class="list-item rounded-full p-x-20px lh-34px">
          {{ item.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  margin: 24px 0;
  height: 68px;
  width: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid #bcd7ff;
  border-radius: 50px;
  padding: 16px;
}

.scroll-wrap {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 16px;
}

.scroll-content {
  display: flex;
  align-items: center;
  animation: scrollLeft v-bind(animationDuration) linear infinite;
  &:hover {
    animation-play-state: paused;
  }
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% + -32px)); /* 32px 是两个 list-item 之间的间距 */
  }
}

.list-item {
  background-color: #f1f6ff;
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 16px;
  padding-left: 30px;
  &:hover {
    background-color: var(--color-primary);
    color: #fff;
  }
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    background-color: #2b94ed;
    border-radius: 2px;
    transform: rotate(45deg);
    transform-origin: center;
    margin-right: 8px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%) rotate(45deg);
  }
}
</style>
