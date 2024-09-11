<script lang="ts" setup>
// import { NCarousel } from 'naive-ui'
import { getNewsList } from '~/api/news'

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

const newsList = ref([{
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}, {
  title: '来学习！不能打破的交互设计规则',
  date: '2023-03-01',
}])
// const homeStore = useNewsStore()
// const dayjs = useDayjs()

// newsList.value = homeStore.getNewsList().map(item={
//   const obj = {
//     title: item.message,
//     date: dayjs(item.date).format('MM-DD')
//   }
//   return obj
// })
const par = 'pageNum=1&pageSize=10'
getNewsList(par).then((res) => {
  newsList.value = [...res.records]
})

const imgs = [{
  url: '/img/img1.png',
  title: '新疆乌什7.1级地震仪器地震烈度围',
}, {
  url: '/img/img1.png',
  title: '新疆乌什7.1级地震仪器地震烈度围',
}, {
  url: '/img/img1.png',
  title: '新疆乌什7.1级地震仪器地震烈度围',
}]
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
            class="pos-absolute z-2 h-full w-full flex flex-col rounded-6px bg-#D7E6FA p-15px opacity-75 xl:w-70%"
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
              <div class="img-box min-h-220px xl:h-430px">
                <img :src="item.url" class="w-full" draggable="false">
                <div class="bottom-text">
                  {{ item.title }}
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <!-- <NCarousel show-arrow>
            <div v-for="item in imgs" :key="item.title" class="img-box min-h-220px xl:h-430px">
              <img :src="item.url" class="w-full" draggable="false">
              <div class="bottom-text">
                {{ item.title }}
              </div>
            </div>
            <template #arrow="{ prev, next }">
              <div class="custom-arrow">
                <button type="button" class="custom-arrow--left" @click="prev">
                  <i class="i-carbon:chevron-left" />
                </button>
                <button type="button" class="custom-arrow--right" @click="next">
                  <i class="i-carbon:chevron-right" />
                </button>
              </div>
            </template>
            <template #dots="{ total, currentIndex, to }">
              <ul class="custom-dots">
                <li
                  v-for="index of total"
                  :key="index"
                  :class="{ ['is-active']: currentIndex === index - 1 }"
                  @click="to(index - 1)"
                />
              </ul>
            </template>
          </NCarousel> -->
        </div>
      </div>
    </div>
    <NewsList :news-list="newsList">
      <template #title>
        <PublicTitle title="新闻动态" />
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

// .custom-arrow {
//   display: flex;
//   position: absolute;
//   right: 10px;
//   left: 10px;
//   top: calc(50% - 10px);
//   justify-content: space-between;
// }

// .custom-arrow button {
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   width: 28px;
//   height: 28px;
//   margin-right: 12px;
//   color: #fff;
//   background-color: rgba(255, 255, 255, 0.1);
//   border-width: 0;
//   border-radius: 8px;
//   transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   cursor: pointer;
// }

// .custom-arrow button:hover {
//   background-color: rgba(255, 255, 255, 0.2);
// }

// .custom-arrow button:active {
//   transform: scale(0.95);
//   transform-origin: center;
// }

// .custom-dots {
//   display: flex;
//   margin: 0;
//   padding: 0;
//   position: absolute;
//   bottom: 80px;
//   right: 30px;
// }

// .custom-dots li {
//   display: inline-block;
//   width: 12px;
//   height: 4px;
//   margin: 0 3px;
//   border-radius: 4px;
//   background-color: rgba(255, 255, 255, 0.4);
//   transition:
//     width 0.3s,
//     background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   cursor: pointer;
// }

// .custom-dots li.is-active {
//   width: 40px;
//   background: #fff;
// }

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
