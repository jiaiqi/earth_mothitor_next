<script lang="ts" setup>
import { decode, encode } from '~/utils/base/dataEncry'
const props = defineProps<{
  newsList: any[]
  showDate?: boolean
  type?: string
}>()
function openNewsDetail(row: any) {
  if (props.type == '新闻动态') {
    if (row.url == '') {
      navigateTo({
        path: `/newsMore/detail/${row.id}`,
        query: {
          data: encode(row),
        },
      })
    } else {
      window.open(row.url)
    }
  }

}
</script>

<template>
  <ul class="">
    <li v-for="item in props.newsList" :key="item.title" flex="~ items-center justify-between "
      class="cursor-pointer py-8px font-600" hover="font-700" @click="openNewsDetail(item)">
      <el-tooltip v-if="item.title" class="box-item" effect="dark" :content="item.title" placement="top-start">
        <span class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-20px text-#000">{{ item.title }}</span>
      </el-tooltip>

      <el-tooltip v-if="showDate !== false && item.date" class="box-item" effect="dark"
        :content="$dayjs(item.date).format('YYYY-MM-DD')" placement="top-start">
        <span class="text-#c7c7c7">[{{ $dayjs(item.date).format("MM-DD") }}]</span>
      </el-tooltip>
    </li>
  </ul>
</template>

<style></style>
