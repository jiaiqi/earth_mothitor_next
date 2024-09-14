<script lang="ts" setup>
const props = defineProps<{
  list?: any[]
}>()
const emit = defineEmits<{
  (e: 'clickItem', item: any): void
}>()
const mockData = [
  {
    title: '文物减隔震技术服务(减隔震装置与方率设计)',
    viewNum: 100,
    id: 1,
  },
  {
    title: '文物减隔震技术服务(减隔震装置与方率设计)',
    viewNum: 1458,
    id: 2,
  },
  {
    title: '文物减隔震技术服务(减隔震装置与方率设计)',
    viewNum: 562,
    id: 3,
  },
  {
    title: '文物减隔震技术服务(减隔震装置与方率设计)',
    viewNum: 9851,
    id: 4,
  },
]
const list = computed(() => {
  if (props.list) {
    return props.list
  }
  else {
    return mockData
  }
})

function handleClickItem(item: any) {
  emit('clickItem', item)
}
</script>

<template>
  <div class="grid w-full gap-y-30px pr-30px">
    <div v-for="item in list" :key="item.id" class="cursor-pointer pb-30px" border="1px dashed transparent b-#E2E8F2" @click="handleClickItem(item)">
      <div flex="~ items-start md:items-center gap-x-24px " class="w-full">
        <img src="/img/news_img.jpg" class="h-80px w-120px md:h-158px md:w-240px">
        <div class="flex-1 text-#424242">
          <div class="title" flex="col md:row ~ justify-between">
            <span class="line-clamp-2 text-size-18px text-#111 font-700 line-height-26px" :title="item.title">{{ item.title }}
            </span>
            <span class="flex items-center text-#AEAEB2">
              <i class="i-ri:eye-fill mr-10px" />
              {{ item.viewNum || '' }}次
            </span>
          </div>
          <div v-if="item.subList" class="mt-15px hidden md:flex" flex="col gap-10px">
            <div v-for="text in item.subList" :key="text">
              {{ text }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.subList" class="mt-15px flex text-#424242 md:hidden" flex="col gap-10px">
        <div v-for="text in item.subList" :key="text">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
