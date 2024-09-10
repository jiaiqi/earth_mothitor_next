<script lang="ts" setup>
const cateData = [{
  title: '按业务类型分类',
  list: [
    '地震监测',
    '震害防御',
    '科技创新',
  ],
}, {
  title: '按单位属性分类',
  list: [
    '业务中心',
    '省地震局',
    '研究所',
    '企业院校',
  ],
}, {
  title: '按涉密类型分类',
  list: [
    '涉密地震数据',
    '北涉密地震数据',
  ],
}]

const newsList = [{
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
}]
</script>

<template>
  <div flex="~ col md:row" class="m-x-auto container md:h-490px xl:max-w-1300px">
    <div class="mb-20px flex-1 rounded-22px bg-#F1F6FF px-20px py-14px md:m-r-20px md:mb-0">
      <PublicTitle title="数据目录" />
      <div flex="~">
        <div class="left">
          <div v-for="item in cateData" :key="item.title" class="content">
            <div class="sub-title mt-6px py-4px font-bold" text="#424242 18px ">
              {{ item.title }}
            </div>
            <ul class="flex flex-col">
              <li v-for="listItem in item.list" :key="listItem" class="list-decorate list-item lh-34px" hover="text-#3990F0 cursor-pointer">
                {{ listItem }}
              </li>
            </ul>
          </div>
        </div>
        <div class="ml-20px flex-1">
          <el-carousel motion-blur h-full height="100%" trigger="click" :autoplay="false">
            <el-carousel-item v-for="item in 4" :key="item">
              <div class="img-box">
                <el-image fit="fill" src="/img/img1.png" />
                <div class="bottom-text">
                  新疆乌什7.1级地震仪器地震烈度围
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
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
  left: unset;
  bottom: 55px;
  right: -30px;
  --el-carousel-indicator-width: 10px;
  --el-carousel-indicator-height: 5px;
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
