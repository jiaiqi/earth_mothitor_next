<script lang="ts" setup>
const props = defineProps<{
  newsList: any[]
  showDate?: boolean
}>()
</script>

<template>
  <div class="px-20px py-14px xl:w-415px" border="1px solid #F1F6FF rounded-22px">
    <div class="flex justify-between">
      <slot name="title" />
      <div class="flex cursor-pointer items-center font-500">
        更多 <i class="i-ri:arrow-right-double-fill" />
      </div>
    </div>
    <slot name="loader" />
    <NewsListContent class="py-20px" :news-list="props.newsList" :show-date="showDate" />
  </div>
</template>

<style lang="scss" scoped>
</style>
