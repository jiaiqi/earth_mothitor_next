<!-- 热门推荐 -->
<script lang="ts" setup>
import { decode, encode } from '~/utils/base/dataEncry'

const props = defineProps<{
  list: any[]
  type?: any[]
}>()
const list = ref([
  {
    title: '自治区活动断层分布图',
    id: 1,
  },
  {
    title: '地震地质调查与填图服务',
    id: 2,
  },
  {
    title: '浅层与深部地震勘探',
    id: 3,
  },
  {
    title: '地震地质样品测试',
    id: 4,
  },
  {
    title: '地震灾害风险调查服务',
    id: 5,
  },
  {
    title: '重大工程地震安全性评价服务',
    id: 6,
  },
])
const listData = computed(() => {
  if (props.list && props.list.length) {
    return props.list
  }
  else {
    return list
  }
})
// 查看详情
function goInfo(item) {
  if (props.type == '地震科普') {
    console.log(item)
    navigateTo({
      path: `/earthquakePopularization/detail/${item.fileId}`,
      query: {
        data: encode(item),
      },
    })
  }
  else {
    sessionStorage.setItem('hotInfo', JSON.stringify(item))
    if (item.linkUnit) {
      sessionStorage.setItem('tips', item.linkUnit)
    }
    if (item.url.includes('http://') || item.url.includes('https://')) {
      window.open(item.url)
    }
    else {
      let url = item.url
      if (url?.includes('/monitor/productInfo')) {
        url = url.replace('/monitor/productInfo?id=', '/productSummary/productInfo/')
        navigateTo({
          path: url,
          query: {
            data: encode(item),
          },
        })
      }
      else {
        navigateTo(url)
      }
    }
  }
}
</script>

<template>
  <div class="min-h-300px rounded-6px bg-#F1F6FF p20px">
    <div flex="~ items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-10px" viewBox="0 0 32 32" width="20" height="20">
        <defs>
          <linearGradient id="UMWUvl3aUMblH20J4eZMCL1" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stop-color="#fea373" stop-opacity="1" offset="0" />
            <stop stop-color="#ff6767" stop-opacity="1" offset="1" />
          </linearGradient>
        </defs>
        <g fill="url('#UMWUvl3aUMblH20J4eZMCL1')">
          <path
            d="M14.222 1.778s9.495 2.952 7.394 12.075c0 0 1.050-0.805 2.101-2.415 0 0 4.727 3.757 4.727 9.124 0 3.757-3.152 6.977-9.455 9.66h-0.765c2.101-3.041 2.189-5.546 0.263-7.514-4.202-4.025-2.364-6.709-2.364-6.709s-4.448 2.159-5.312 6.18c-0.464 2.159 0.105 4.855 2.949 8.042h-0.426c-5.333-1.778-9.778-5.3-9.778-10.667 0-10.029 9.942-8.354 10.667-17.778z"
          />
        </g>
      </svg>
      <!-- <i class="i-twemoji:fire mr-10px" /> -->
      <span class="text-20px font-600 line-height-26px">
        热门推荐
      </span>
    </div>
    <div class="mb-20px">
      <div
        v-for="(item, index) in listData" :key="item.id" class="mt-20px flex cursor-pointer items-center"
        @click="goInfo(item)"
      >
        <div
          :class="[{ 'list-decorate': index > 2, 'bg-#1684FC w-18px line-height-18px text-center text-12px  text-white': index < 3 }]"
        >
          <span v-if="index < 3">{{ index + 1 }}</span>
        </div>
        <div class="ml-10px truncate" :title="item.title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-decorate {
  position: relative;
  padding-left: 20px;

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
    left: 25%;
    transform: translateY(-50%) rotate(45deg);
  }
}
</style>
