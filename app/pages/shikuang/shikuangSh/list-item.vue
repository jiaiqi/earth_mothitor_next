<script setup lang="ts">
const props = defineProps({
  data: Object as PropType<any>,
})
const item = computed(() => props.data || {})
function toThreeFloat(num) { // 保留三位小数
  let number = null
  if (num.toString().split('.').length !== 1 && num.toString().split('.')[1].length < 3) {
    number = Number.parseFloat(num).toFixed(3)
  }
  else if (num.toString().split('.').length === 1) {
    number = `${num.toString()}.000`
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
      <span class="ml-12px font-bold">{{ item.localName }}</span>
    </div>
    <div class="">
      震发时间：{{ $dayjs(item.oTime).format("YYYY/MM/DD HH:mm:ss") }}
    </div>
    <div class="list-decorate flex items-center justify-between">
      <span> 纬度{{ toThreeFloat(item.lat) }} </span>
      <span>经度{{ toThreeFloat(item.lon) }}</span>
      <span>深度{{ Math.floor(item.depth) }}KM</span>
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
