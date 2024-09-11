<script setup lang="ts">
import { getList } from '~/api/catalogue'
import { getFlagList } from '~/api/count'
import NewsListContent from '~/components/NewsListContent.vue'
import PublicTitle from '~/components/PublicTitle.vue'

const currentTab = ref('first')
const text = ref('')
function getTodayHistory() {
  const date = new Date()
  const pageNum = 1
  const pageSize = 20
  const dayjs = useDayjs()
  const month = dayjs().format('MM')
  getList(pageNum, pageSize, month, date.getDate())
    .then((res) => {
      const list = res.records
      todayList.value = filterLevel(list)
    })
    .catch(() => {
      text.value = '今日无历史地震'
    })
  getFlagList('pageNum=1&pageSize=10').then((res) => {
    const data = res.records
    list3.value = data
  })
  getFlagList('pageNum=1&pageSize=10&key=d').then((res) => {
    const data = res.records
    list5.value = data
  })
  getFlagList('pageNum=1&pageSize=10&key=date').then((res) => {
    const data = res.records
    list4.value = data
  })
}

onMounted(() => {
  getTodayHistory()
})
</script>

<template>
  <div class="relative w-full rounded-20px bg-white px-16px py-10px xl:w-38%">
    <div class="absolute right-20px top-18px z-1 flex cursor-pointer items-center font-500">
      更多 <i class="i-ri:arrow-right-double-fill" />
    </div>
    <el-tabs v-model="currentTab" class="custom-tabs" @tab-click="switchTab">
      <el-tab-pane label="最新地震动态" name="first">
        <NewsListContent :news-list="newsList" :show-date="false" />
      </el-tab-pane>
      <el-tab-pane label="历史上的今天" name="second">
        <NewsListContent :news-list="newsList" :show-date="false" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>

</style>
