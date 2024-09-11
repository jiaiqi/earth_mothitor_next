<script lang="ts" setup>
import { useSorted } from '@vueuse/core'
import { decode } from '~/utils/base/dataEncry'
import { getList } from '~/api/notice'
import { useDayjs } from '#dayjs'
// not need if you are using auto import
import type { NewsItem } from '~/composables/home'
import { useNewsStore } from '~/composables/home'

const notices = ref<NewsItem[]>([])
// 模拟数据
notices.value = [
  { id: 1, message: '7月24日11时31分新疆克孜勒苏州阿图什市发生4.3级地震', date: 1726029616901 },
  { id: 2, message: '7月25日10时45分四川绵阳市发生3.8级地震' },
  { id: 3, message: '7月26日13时20分云南昆明市发生4.1级地震' },
  { id: 4, message: '7月27日15时10分广西南宁市发生3.9级地震' },
  { id: 5, message: '7月24日11时31分新疆克孜勒苏州阿图什市发生4.3级地震', date: 1726029616901 },
  { id: 6, message: '7月25日10时45分四川绵阳市发生3.8级地震' },
  { id: 7, message: '7月26日13时20分云南昆明市发生4.1级地震' },
  { id: 8, message: '7月27日15时10分广西南宁市发生3.9级地震' },
  { id: 9, message: '7月24日11时31分新疆克孜勒苏州阿图什市发生4.3级地震', date: 1726029616901 },
  { id: 10, message: '7月25日10时45分四川绵阳市发生3.8级地震' },
  { id: 11, message: '7月26日13时20分云南昆明市发生4.1级地震' },
  { id: 12, message: '7月27日15时10分广西南宁市发生3.9级地震' },
]
const homeStore = useNewsStore()
homeStore.setNewsList(notices.value)

getList().then((res) => {
  const data = decode(res)
  if (Array.isArray(data) && data.length > 0) {
    const dayjs = useDayjs()
    const dataSorted = useSorted(data, (a, b) => b.oTime - a.oTime)
    notices.value = dataSorted.value.slice(0, 30).map((item) => {
      return {
        date: item.oTime,
        message: `${dayjs(item.oTime).format('MM月DD日HH时mm分')}${item.localName}发生${item.m}级地震`,
        title: `${dayjs(item.oTime).format('MM月DD日HH时mm分')}${item.localName}发生${item.m}级地震`,
        id: item.id,
      }
    })
    const homeStore = useNewsStore()
    homeStore.setNewsList(notices.value)
  }
}).catch((e) => {
  console.log('error::', e)
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
        <NuxtLink v-for="item in notices" :key="item.id" :to="`/earthquakeInfo/${item.id}`" class="list-item rounded-full p-x-20px lh-34px">
          {{ item.message }}
        </NuxtLink>
        <NuxtLink v-for="item in notices" :key="item.id" :to="`/earthquakeInfo/${item.id}`" class="list-item rounded-full p-x-20px lh-34px">
          {{ item.message }}
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
