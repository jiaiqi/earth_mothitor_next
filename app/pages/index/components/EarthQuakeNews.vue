<script lang="ts" setup>
import bg1 from 'public/img/bg1.jpg'
import SortList from './SortList.vue'
import NewsListContent from '~/components/NewsListContent.vue'
import PublicTitle from '~/components/PublicTitle.vue'
import { getList } from '~/api/catalogue'
import { getFlagList } from '~/api/count'

const currentTab = ref('first')
const currentRightTab = ref('first')

// 最新地震动态
const homeStore = useNewsStore()
const newsList = computed(() => homeStore?.getNewsList?.()?.slice(0, 10) || [])
const text = ref('')
const loading = ref(false)
const todayList = ref<any[]>([])
const province = [
  '新疆',
  '四川',
  '青海',
  '西藏',
  '台湾',
  '河北',
  '云南',
  '甘肃',
  '内蒙古',
  '江苏',
  '山西',
  '宁夏',
  '广东',
  '河南',
  '重庆',
  '广西',
  '北京',
  '天津',
  '吉林',
  '福建',
  '山东',
  '贵州',
  '辽宁',
  '湖北',
  '浙江',
  '安徽',
  '黑龙江',
  '上海',
  '江西',
  '海南',
  '湖南',
  '陕西',
  '香港',
  '澳门',
]
// 历史上的今天
const loading3 = ref(false)
const list3 = ref<any[]>([])
const loading4 = ref(false)
const list4 = ref<any[]>([])
const loading5 = ref(false)
const list5 = ref<any[]>([])
function getMore() {
  if (currentTab.value === 'first') {
    navigateTo({
      path: `/earthlist`,
    })
  }
  else {
    navigateTo({
      path: `/listearth`,
    })
  }
}
function getHotMore() {
  navigateTo({
    path: `/hotMore`,
    query: {
      data: currentRightTab.value,
    },
  })
}
function getTodayHistory() {
  const date = new Date()
  const pageNum = 1
  const pageSize = 20
  const dayjs = useDayjs()
  const month = dayjs().format('MM')
  loading.value = true
  getList(pageNum, pageSize, month, date.getDate())
    .then((res: any) => {
      loading.value = false
      const data = res.records || []
      todayList.value = data.slice(0, 10).map((item: any) => {
        return {
          ...item,
          title: `${item.year}年${item.month}月${item.day}日 ${item.placeName}发生${item.m}级地震`,
          subTitle: dayjs(item.createTime).format('YYYY-MM-DD HH:mm'),
        }
      })
      // todayList.value = filterLevel(list)
    })
    .catch(() => {
      text.value = '今日无历史地震'
    })
  loading3.value = true
  getFlagList('pageNum=1&pageSize=10').then((res: any) => {
    const data = res.records || []
    loading3.value = false
    list3.value = data.map((item: any) => {
      return {
        ...item,
        title: item.keyName,
        amount: item.hotNum,
        subTitle: dayjs(item.createTime).format('YYYY-MM-DD HH:mm'),
      }
    })
  })
  getFlagList('pageNum=1&pageSize=10&key=d').then((res: any) => {
    const data = res.records || []
    list5.value = data.map((item: any) => {
      return {
        ...item,
        title: item.keyName,
        amount: item.hotNum,
        subTitle: dayjs(item.createTime).format('YYYY-MM-DD HH:mm'),
      }
    })
  })
  getFlagList('pageNum=1&pageSize=10&key=date').then((res: any) => {
    const data = res.records || []
    list4.value = data.map((item: any) => {
      return {
        ...item,
        title: item.keyName,
        amount: item.hotNum,
        subTitle: dayjs(item.createTime).format('YYYY-MM-DD HH:mm'),
      }
    })
  })
}
getTodayHistory()
</script>

<template>
  <div class="earthquake-news m-y-30px pb-30px" :style="{ backgroundImage: `url(${bg1})` }">
    <div class="m-x-auto container xl:max-w-1300px">
      <div class="py-30px text-center">
        <PublicTitle title="地震动态" :show-right="true" title-style="style2" />
      </div>
      <div flex="~ col xl:row gap-30px">
        <div class="relative w-full rounded-20px bg-white px-16px py-10px xl:w-38%">
          <div class="absolute right-20px top-18px z-1 flex cursor-pointer items-center font-500" @click="getMore()">
            更多 <i class="i-ri:arrow-right-double-fill" />
          </div>
          <el-tabs v-model="currentTab" class="custom-tabs">
            <el-tab-pane label="最新地震动态" name="first">
              <NewsListContent :news-list="newsList" :show-date="false" type="最新地震动态" />
            </el-tab-pane>
            <el-tab-pane v-loading="loading" label="历史上的今天" name="second">
              <NewsListContent :news-list="todayList" :show-date="false" type="历史上的今天" />
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-loading="loading3" class="relative flex-1 rounded-20px bg-white px-16px py-10px">
          <div class="absolute right-20px top-18px z-1 flex cursor-pointer items-center font-500" @click="getHotMore()">
            更多 <i class="i-ri:arrow-right-double-fill" />
          </div>
          <el-tabs v-model="currentRightTab" class="custom-tabs">
            <el-tab-pane label="点击排行" name="first">
              <SortList :list="list3" />
            </el-tab-pane>
            <el-tab-pane label="最新推荐" name="second">
              <SortList :list="list4" />
            </el-tab-pane>
            <el-tab-pane label="推荐数据" name="third">
              <SortList :list="list5" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.earthquake-news {
  :deep(.el-tabs) {
    --el-color-primary: #3990f0;

    .el-tabs__item.is-active {
      font-weight: 700;
      font-size: 18px;
    }

    .el-tabs__nav-wrap:after {
      height: 1px;
    }

    .el-tabs__active-bar {
      height: 4px;
    }
  }
}

.title {
  font-weight: 600;
  position: relative;

  .title-icon {
    overflow: hidden;
    margin-right: 12px;

    @mixin before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      background: linear-gradient(139.61deg, rgba(47, 119, 201, 1) 4.16%, rgba(62, 143, 236, 1) 122.08%);
      transform: skewY(-45deg) rotate(-45deg) scaleY(1.4);
      border-radius: 2px;
      margin-right: 2px;
    }

    @mixin after {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      background: #439aff;
      transform: skewY(-45deg) rotate(-45deg) scaleY(0.8);
      border-radius: 3px;
    }

    &::before {
      @include before;
    }

    &::after {
      @include after;
    }

    &.reverse {
      margin-left: 12px;

      &::before {
        @include after;
      }

      &::after {
        @include before;
      }
    }
  }
}
</style>
