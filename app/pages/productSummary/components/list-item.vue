<script setup lang="ts">
import { encode } from '~/utils/base/dataEncry'

const props = defineProps({
  data: Object as PropType<any>,
})
const item = computed(() => props.data || {})
function toTwoFloat(num) { // 保留三位小数
  let number = null
  if (num.toString().split('.').length !== 1 && num.toString().split('.')[1].length < 2) {
    number = Number.parseFloat(num).toFixed(2)
  }
  else if (num.toString().split('.').length === 1) {
    number = `${num.toString()}.00`
  }
  else {
    number = num.toString().substr(0, Number.parseInt(num.toString().indexOf('.')) + 4)
  }
  return number
}
</script>

<template>
  <div
    class="mx-18px mb-12px cursor-pointer rounded-md bg-#F6F7FA p-16px line-height-24px"
    border="1px dashed #F6F7FA"
    hover="bg-gray-100 border-#3580D6"
  >
    <div>
      <span
        class="inline-block w-44px rounded text-center text-14px text-white line-height-22px"
        :class="{ 'bg-#FF0000': item.m >= 3, 'bg-#f3e11f': item.m < 3 }"
      >
        M{{ item.m }}
      </span>
      <span class="ml-12px font-bold">{{ item.localname || item.localName || item.placeName }}</span>
    </div>
    <div v-if="item.oTime" class="">
      震发时间：{{ $dayjs(item.oTime).format("YYYY/MM/DD HH:mm:ss") }}
    </div>
    <div class="list-decorate flex items-center justify-between">
      <span> 纬度{{ toTwoFloat(item.lat) }}° </span>
      <span>经度{{ toTwoFloat(item.lon) }}°</span>
      <span v-if="item.depth">深度{{ Math.floor(item.depth) }}KM</span>
      <NuxtLink class="text-#2b94ed" :to="{ path: `/earthquakeInfo/situation/${item.id}`, query: { data: encode(item) } }">
        详情
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-decorate {
  position: relative;
  padding-left: 24px;
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
    left: 0;
    transform: translateY(-50%) rotate(45deg);
  }
}
</style>
