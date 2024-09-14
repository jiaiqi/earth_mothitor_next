<script lang="ts" setup>
// import { NCarousel } from 'naive-ui'
import { getNewsList } from '~/api/news'
import bg1 from '~/assets/images/bg1.png'
import bg2 from '~/assets/images/bg2.png'
import bg3 from '~/assets/images/bg3.png'

const cateData = [{
  title: '按业务类型分类',
  list: [
    {
      title: '地震监测',
      subList: [
        '测震数据(321851)',
        '强震动观测数据',
        '定点形变(1296)',
        '地下流体',
        '电磁(781)',
        '重力(129)',
        'GNSS',
        '科学台阵',
      ],
    },
    {
      title: '震害防御',
      subList: ['地震测深数据(25)', '活断层探测数据(3300)'],
    },
    {
      title: '科技创新',
      subList: ['科学台阵(69236)', '强震动观测数据(32000)'],
    },
  ],
}, {
  title: '按单位属性分类',
  list: [
    {
      title: '业务中心',
      subList: [
        '中国地震台网中心;/service/seismometry',
        '中国地震灾害防御中心;/service/catalogue?type=1',
        '发展研究中心;/service/seismometry',
        '地球物理勘探中心;/service/catalogue?type=1',
        '第一监测中心;/service/catalogue?type=1',
        '第二监测中心;/service/seismometry',
      ],

    },
    {
      title: '省地震局',
      subList: [],

    },
    {
      title: '研究所',
      subList: ['地球物理研究所;/precursor/fluid', '地质研究所;/precursor/fluid', '地震预测研究所;/precursor/fluid', '工程力学研究所;/precursor/fluid'],

    },
    {
      title: '企业院校',
      subList: ['防灾科技学院;https://www.cidp.edu.cn/', '深圳防灾减灾技术研究院;https://www.szadpr.cn/'],

    },
  ],
}, {
  title: '按涉密类型分类',
  list: [
    {
      title: '涉密地震数据',
      subList: [
        '电磁',
        '重力',
      ],
    },
    { title: '北涉密地震数据', subList: [
      '测震数据',
      '强震动观测数据',
      '定点形变',
      '流体',
      'GNSS',
      '科学台阵',
      '地震测深数据',
      '活断层探测数据',
    ] },
  ],
}]

const currentCate = ref(-1)
const currentSubCate = ref('')
const currentSubCateList = computed(() => {
  if (currentCate.value !== -1) {
    const cate = cateData[currentCate.value] || { list: [] }
    return cate.list.find(item => item.title === currentSubCate.value)
  }
  return null
})

const newsList = ref<any[]>([])

const par = 'pageNum=1&pageSize=10'
const loading = ref(true)
getNewsList(par).then((res) => {
  loading.value = false
  newsList.value = [...res.records].map((item) => {
    if (item.uploadTime) {
      item.date = item.uploadTime
    }
    return item
  })
}).catch((error) => {
  console.error('获取数据失败:', error)
  loading.value = false
})

const imgs = [
  {
    title: '5月12日全国防灾减灾日',
    url: bg1,
  },
  {
    title: '“地震科普 携手同行”主题活动',
    url: bg2,
  },
  {
    title: '新疆乌什7.1级地震仪器地震烈度图',
    url: bg3,
  },
]
</script>

<template>
  <div flex="~ col xl:row" class="m-x-auto my-40px container xl:h-490px xl:max-w-1300px">
    <div class="mb-20px flex-1 rounded-22px bg-#F1F6FF px-20px py-14px xl:m-r-20px xl:mb-0" @mouseleave="currentCate = -1">
      <PublicTitle title="数据目录" />
      <div flex="~ col xl:row">
        <div class="left" flex="~ row xl:col wrap gap-x-20px">
          <div
            v-for="(item, index) in cateData"
            :key="item.title"
            class="content"
            :class="{ active: currentCate === index }"
            @mouseover="currentCate = index"
          >
            <div
              class="sub-title mt-6px py-4px font-bold"
              text="#424242 18px "
            >
              {{ item.title }}
            </div>
            <ul class="flex flex-col">
              <li
                v-for="listItem in item.list" :key="listItem.title"
                class="list-decorate list-item lh-34px"
                hover="text-#3990F0 cursor-pointer"
                @mouseenter="currentSubCate = listItem.title"
              >
                {{ listItem.title }}
              </li>
            </ul>
          </div>
        </div>
        <div class="pos-relative h-430px min-h-300px flex-1 xl:ml-20px xl:min-w-500px">
          <div
            v-if="currentSubCateList && currentSubCateList.title"
            class="pos-absolute z-2 h-full w-full flex flex-col rounded-6px bg-#D7E6FAcc p-15px xl:w-70%"
            @mouseleave="currentCate = -1"
            @mousemove="currentSubCate = currentSubCateList.title"
          >
            <div class="h-full w-full rounded-20px p-15px" border="1px solid #fff">
              <div class="list-decorate mb-10px text-18px font-700">
                {{ currentSubCateList.title }}
              </div>
              <div class="item-box" grid="~ cols-2 gap-10px">
                <div
                  v-for="subItem in currentSubCateList.subList" :key="subItem"
                  class="rounded-20px bg-white text-center text-14px line-height-34px"
                  hover="bg-#D7E6FA cursor-pointer"
                >
                  <span v-if="subItem && subItem.includes(';')">{{ subItem.split(';')[0] }}</span>
                  <span v-else>
                    {{ subItem }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <el-carousel motion-blur h-full height="100%" trigger="click" :autoplay="false">
            <el-carousel-item v-for="item in imgs" :key="item.title">
              <div class="img-box min-h-220px overflow-hidden rounded-6px xl:h-430px">
                <img :src="item.url" class="h-full w-full" draggable="false">
                <div class="bottom-text">
                  {{ item.title }}
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <NewsList :news-list="newsList" :show-date="true">
      <template #title>
        <PublicTitle title="新闻动态" />
      </template>
      <template #loader>
        <div v-if="loading" class="text-center line-height-400px">
          <LoaderL4 />
        </div>
      </template>
    </NewsList>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-weight: 600;
  position: relative;
  .title-icon {
    overflow: hidden;
    margin-right: 12px;
    &::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      background: linear-gradient(139.61deg, rgba(47, 119, 201, 1) 4.16%, rgba(62, 143, 236, 1) 122.08%);
      transform: skewY(-45deg) rotate(-45deg) scaleY(1.4);
      border-radius: 2px;
      margin-right: 2px;
    }
    &::after {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      background: #439aff;
      transform: skewY(-45deg) rotate(-45deg) scaleY(0.8);
      border-radius: 3px;
    }
  }
}

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

:deep(.el-carousel__indicators--horizontal) {
  --el-carousel-indicator-width: 10px;
  --el-carousel-indicator-height: 5px;
  right: 10px;
  bottom: 50px;
  left: unset;
  .el-carousel__button {
    opacity: 0.6;
    border-radius: 5px;
  }
  .is-active {
    --el-carousel-indicator-width: 30px;
    .el-carousel__button {
      opacity: 1;
      background-color: #3990f0;
    }
  }
}

.img-box {
  position: relative;
  .bottom-text {
    position: absolute;
    height: 40px;
    bottom: 16px;
    left: 15px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    width: calc(100% - 30px);
    font-size: 18px;
    color: #fff;
    line-height: 40px;
    text-indent: 20px;
  }
}
</style>
