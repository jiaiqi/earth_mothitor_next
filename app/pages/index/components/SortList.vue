<script lang="ts" setup>
// const props = defineProps<{
//   sortList: any[]
// }>()
const list = [
  {
    title: '强震动数据-数据集',
    subTitle: '提供单位：中国地震局第二监测中心',
    amount: '5412',
  },
  {
    title: '强震动数据-数据集',
    subTitle: '提供单位：中国地震局第二监测中心',
    amount: '5412',
  },
  {
    title: '强震动数据-数据集',
    subTitle: '提供单位：中国地震局第二监测中心',
    amount: '5412',
  },
  {
    title: '强震动数据-数据集',
    subTitle: '提供单位：中国地震局第二监测中心',
    amount: '5412',
  },
  {
    title: '强震动数据-数据集',
    subTitle: '提供单位：中国地震局第二监测中心',
    amount: '5412',
  },
  {
    title: '强震动数据-数据集',
    subTitle: '提供单位：中国地震局第二监测中心',
    amount: '5412',
  },
]
</script>

<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <div class="sort-list-item flex items-center justify-between px-10px py-8px">
        <div
          class="h-55px w-55px bg-cover bg-no-repeat text-center text-28px font-700 line-height-55px" :style="{
            backgroundImage: index === 0 ? 'url(/img/1.png)' : index === 1 ? 'url(/img/2.png)' : index === 2 ? 'url(/img/3.png)' : 'url(/img/n.png)',
          }"
        >
          <template v-if="index > 2">
            {{ index + 1 }}
          </template>
        </div>
        <div class="flex-1 px-18px">
          <div class="m-b-6px font-bold line-height-25px">
            {{ item.title }}
          </div>
          <div class="text-#AEAEB2 line-height-23px">
            {{ item.subTitle }}
          </div>
        </div>
        <div class="h-56px w-114px rounded-6px bg-#ECF3FC" flex="~ col justify-center items-center">
          <span>浏览量</span>
          <span class="text-20px text-#0D73CF font-800">{{ item.amount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
