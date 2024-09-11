<script lang="ts" setup>
import bg1 from 'public/img/bg1.jpg'
import SortList from './SortList.vue'
import NewsListContent from '~/components/NewsListContent.vue'
import PublicTitle from '~/components/PublicTitle.vue'

const currentTab = ref('first')
const newsList = [{
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}, {
  title: '地震动态',
  date: '2023-03-01',
}]

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
              <NewsListContent :news-list="newsList" />
            </el-tab-pane>
            <el-tab-pane label="历史上的今天" name="second">
              <NewsListContent :news-list="newsList" />
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="relative flex-1 rounded-20px bg-white px-16px py-10px">
          <div class="absolute right-20px top-18px z-1 flex cursor-pointer items-center font-500">
            更多 <i class="i-ri:arrow-right-double-fill" />
          </div>
          <el-tabs v-model="currentTab" class="custom-tabs" @tab-click="switchTab">
            <el-tab-pane label="点击排行" name="first">
              <SortList />
            </el-tab-pane>
            <el-tab-pane label="最新推荐" name="second">
              <NewsListContent :news-list="newsList" />
            </el-tab-pane>
            <el-tab-pane label="推荐数据" name="third">
              <NewsListContent :news-list="newsList" />
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
