<script lang="ts" setup>
const props = defineProps<{
  newsList: any[]
}>()
</script>

<template>
  <ul class="">
    <li v-for="item in props.newsList" :key="item.title" flex="~ items-center justify-between " class="cursor-pointer py-8px font-600" hover="font-700">
      <span class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-20px text-18px text-#000">{{ item.title }}</span>
      <span class="text-#c7c7c7">[{{ $dayjs(item.date).format("MM-DD") }}]</span>
    </li>
  </ul>
</template>

<style>

</style>
