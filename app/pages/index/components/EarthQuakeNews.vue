<script lang="ts" setup>
import bg1 from 'public/img/bg1.jpg'
import SortList from './SortList.vue'
import NewsListContent from '~/components/NewsListContent.vue'
import PublicTitle from '~/components/PublicTitle.vue'
import type { NewsItem } from '~/composables/home'
import { getList } from '~/api/catalogue'
import { getFlagList } from '~/api/count'

const currentTab = ref('first')
const currentRightTab = ref('first')

// 最新地震动态
const newsList = ref<NewsItem[]>([])
const homeStore = useNewsStore()
if (homeStore.getNewsList) {
  newsList.value = homeStore.getNewsList().slice(0, 10)
}
else {
  newsList.value = [{
    id: 1,
    title: '地震动态',
    date: '2023-03-01',
  }]
}
const text = ref('')
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
function filterLevel(list: any[]) {
  const arr: any[] = []
  list.forEach((item) => {
    if (item.placeName.substr(0, 3) === '内蒙古' || item.placeName.substr(0, 3) === '黑龙江') {
      if (item.m >= 6) {
        arr.push(item)
      }
    }
    else {
      province.includes(item.placeName.substr(0, 2)) ? item.m >= 6 ? arr.push(item) : '' : item.m >= 7 ? arr.push(item) : ''
    }
  })
  return arr
}
const list3 = ref<any[]>([])
const list4 = ref<any[]>([])
const list5 = ref<any[]>([])
list3.value = [
  {
    SName: '地震震级的规定',
    cUnit: '国家标准全文公开系统',
    url: '/knowledge/statute',
    img: '~/assets/images/news/news_10.png',
  },
  {
    SName: '鄂尔多斯地块及周缘GNSS水平运动速度场图像',
    cUnit: '中国地震局第二监测中心',
    url: '/monitor/productlist',
    img: '~/assets/images/news/news_11.jpg',
  },
  {
    SName: '历史测震模拟资料',
    cUnit: '中国地震局第二监测中心',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=ff80808272f672190172f67219750000',
    img: '~/assets/images/news/news_4.png',
  },
  {
    SName: '大地天文测量',
    cUnit: '中国地震局第二监测中心',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=40280d0453e5add30153e602bee1002f',
    img: '~/assets/images/news/news_2.jpg',
  },
  {
    SName: '地震区划与安全性评价（一代区划图）',
    cUnit: '中国地震台网中心',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=8a85efd754e1c4280154e1e589850005',
    img: '~/assets/images/news/news_3.png',
  },
  {
    SName: '“谛听”人工智能地震学训练数据集',
    cUnit: '北京白家疃地球科学国家野外科学观测研究站',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=ff8080827e3317f4017e331e7ce00002',
    img: '~/assets/images/news/news_1.png',
  },
]
list3.value = list3.value.map((item) => {
  item.subTitle = item.cUnit
  item.amount = (Number(Math.random().toFixed(3)) * 1000)
  return item
})
list4.value = [
  {
    SName: '文物减隔震技术服务（减隔震装置与方案设计）',
    cUnit: '中国地震局工程力学研究所',
    url: '/monitor/productlist',
    img: '~/assets/images/news/news_14.png',
  },
  {
    SName: '小小传感器问电磁波：你是说，地震要来了吗？！',
    cUnit: '中国科学院遥感与数字地球研究所',
    url: '/knowledge/science',
    img: '~/assets/images/news/news_15.png',
  },
  {
    SName: '人工地震探测解释成果数据',
    cUnit: '中国地震局地球物理勘探中心',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=40280d0453e5add30153e5f7567f0026',
    img: '~/assets/images/news/news_7.jpg',
  },
  {
    SName: '人工地震探测剖面点位信息',
    cUnit: '中国地震局地球物理勘探中心',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=40280d0453e5add30153e5f414e50024',
    img: '~/assets/images/news/news_8.png',
  },
  {
    SName: '重点地区断裂数据',
    cUnit: '中国地震局地震预测研究所',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=ff8080826e16801d016eb1acef6e000f',
    img: '~/assets/images/news/news_8.png',
  },
]
list4.value = list4.value.map((item) => {
  item.subTitle = item.cUnit
  item.amount = (Number(Math.random().toFixed(3)) * 1000)
  return item
})

list5.value = [
  {
    SName: '历史上的今天',
    cUnit: '公服平台',
    url: '/shikuang/shikuangHistory',
    img: '~/assets/images/news/news_12.png',
  },
  {
    SName: '全球7级以上地震目录',
    cUnit: '中国地震台网',
    url: '/monitor/prodAchevList',
    img: '~/assets/images/news/news_13.png',
  },
  {
    SName: '工程震害数据',
    cUnit: '强震动数据中心',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=40280d0453e5add30153e5e9f72b001d',
    img: '~/assets/images/news/news_5.jpg',
  },
  {
    SName: '跨断层场地测距',
    cUnit: '中国地震局第二监测中心',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=4028ab1a53e6ed190153e701819f0004',
    img: '~/assets/images/news/news_6.png',
  },
  {
    SName: '中国历史地震目录',
    cUnit: '中国地震台网中心',
    url: 'https://data.earthquake.cn/datashare/report.shtml?PAGEID=datasourcelist&dt=8a85efd754e7d6910154e7d691810000',
    img: '~/assets/images/news/news_7.jpg',
  },
]
list5.value = list5.value.map((item) => {
  item.subTitle = item.cUnit
  item.amount = (Number(Math.random().toFixed(3)) * 1000)
  return item
})

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

function switchTab(tab: any) {
  console.log(tab.paneName)
}
</script>

<template>
  <div class="earthquake-news m-y-30px pb-30px" :style="{ backgroundImage: `url(${bg1})` }">
    <div class="m-x-auto container xl:max-w-1300px">
      <div class="py-30px text-center">
        <PublicTitle title="地震动态" :show-right="true" title-style="style2" />
      </div>
      <div flex="~ col xl:row gap-30px">
        <div class="relative w-full rounded-20px bg-white px-16px py-10px xl:w-38%">
          <div class="absolute right-20px top-18px z-1 flex cursor-pointer items-center font-500">
            更多 <i class="i-ri:arrow-right-double-fill" />
          </div>
          <el-tabs v-model="currentTab" class="custom-tabs" @tab-click="switchTab">
            <el-tab-pane label="最新地震动态" name="first">
              <NewsListContent :news-list="newsList" :show-date="false" />
            </el-tab-pane>
            <el-tab-pane label="历史上的今天" name="second">
              <NewsListContent :news-list="todayList" :show-date="false" />
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="relative flex-1 rounded-20px bg-white px-16px py-10px">
          <div class="absolute right-20px top-18px z-1 flex cursor-pointer items-center font-500">
            更多 <i class="i-ri:arrow-right-double-fill" />
          </div>
          <el-tabs v-model="currentRightTab" class="custom-tabs" @tab-click="switchTab">
            <el-tab-pane label="点击排行" name="first">
              <SortList :list="list3" />
            </el-tab-pane>
            <el-tab-pane label="最新推荐" name="second">
              <!-- <NewsListContent :news-list="list4" /> -->
              <SortList :list="list4" />
            </el-tab-pane>
            <el-tab-pane label="推荐数据" name="third">
              <!-- <NewsListContent :news-list="list5" /> -->
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
