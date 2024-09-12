<script lang="ts" setup>
const props = defineProps<{
  title: string
  desc: string
  path: any[]
}>()
</script>

<template>
  <div class="pos-relative bg-#F7F9FD pb-90px min-h-screen-260">
    <div class="top-bg pos-absolute left-0 top-0 z-0 h-310px w-full" />
    <div class="m-auto min-h-220px container xl:max-w-1300px">
      <div class="page-title pos-relative z-2 pt-35px text-size-28px text-white font-700 line-height-40px">
        <div class="pos-relative mb-5px">
          {{ props.title || '--' }}
          <div class="line-bg pos-relative h-10px w-200px rounded-20px" />
        </div>
        <div class="text-18px line-height-25px">
          {{ props.desc || '--' }}
        </div>
      </div>
      <div class="page-content pos-relative z-2 mt-33px min-h-screen bg-white px-30px py-20px">
        <div class="top flex justify-between">
          <div class="left flex items-center">
            <div class="icon pos-relative z-2 h-42px w-42px text-center text-18px text-white line-height-38px">
              <img src="~/assets/images/icons/home.png" alt="" class="pos-absolute h-full w-full">
              <i class="i-ri:home-4-fill" />
            </div>
            <div class="left-text pos-relative left--10px min-w-375px flex pl-20px line-height-34px">
              <div v-for="(item, index) in props.path" :key="item" class="flex items-center">
                <span>{{ item }}</span>
                <img v-if="props.path.length && props.path.length - 1 > index " src="~/assets/images/icons/right-icon.png" class="mx-15px inline-block h-24px w-24px" alt="">
              </div>
            </div>
          </div>
          <div class="right w-40% flex py-5px" border="1px solid #E5E5EA">
            <div class="px-16px text-center">
              <i class="i-ri:search-2-line text-20px text-black" />
            </div>
            <input
              placeholder="请输入搜索信息" class="flex-1 indent-16px outline-none"
            >
            <el-button type="primary" class="mx-10px w-96px">
              搜索
            </el-button>
          </div>
        </div>
        <PublicFilter />
        <div class="my-24px">
          找到<span class="px-10px text-#1684FC font-700">5612</span>条记录
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-bg {
  background-image: url('~/assets/images/top-bg.jpg');
}
.line-bg {
  position: absolute;
  z-index: -1;
  bottom: 0;
  background-image: linear-gradient(
    126.83deg,
    rgba(22, 132, 252, 1) 6.77%,
    rgba(255, 255, 255, 0) 85.31%,
    rgba(255, 255, 255, 0) 85.31%
  );
}
.top .left .left-text {
  background-image: linear-gradient(88.74deg, rgba(241, 246, 255, 1) 1.25%, rgba(241, 246, 246, 0) 90.23%);
}

:deep(.custom-style) {
  .el-segmented {
    --el-segmented-item-selected-color: #fff;
    --el-segmented-item-selected-bg-color: #1684fc;
    --el-border-radius-base: 6px;
    .el-segmented__item {
      padding: 0 22px;
    }
  }
}
</style>
