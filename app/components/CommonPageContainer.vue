<script lang="ts" setup>
const props = defineProps<{
  title: string
  desc: string
  path: any[]
}>()
</script>

<template>
  <div class="pos-relative bg-#F7F9FD pb-90px min-h-screen-260">
    <div class="top-bg bg-url(~'/images/top-bg.png) pos-absolute left-0 top-0 z-0 h-310px w-full" />
    <div class="m-auto min-h-220px container xl:max-w-1300px">
      <div class="page-title pos-relative z-2 pt-35px text-size-28px text-white font-700 line-height-40px">
        <div class="pos-relative mb-5px">
          {{ props.title || '--' }}
          <div class="text-bottom-decorate-blue pos-absolute bottom-0 z--1 h-10px w-200px rounded-20px" />
        </div>
        <div class="text-18px line-height-25px">
          {{ props.desc || '--' }}
        </div>
      </div>
      <div class="page-content pos-relative z-2 mt-33px min-h-screen bg-white px-30px py-20px drop-shadow-sm">
        <PublicBreadcrumbNavigation :path="props.path" />
        <PublicFilter />
        <div class="my-24px">
          找到<span class="px-10px text-#1684FC font-700">5612</span>条记录
        </div>
        <div
          class="content"
          flex="~ col xl:row"
        >
          <div class="min-h-300px w-full" flex="1">
            <PublicList />
            <PublicPagination />
            <slot />
          </div>
          <div class="w-full xl:w-300px">
            <PublicHotNews />
            <slot name="right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-bg {
  background-image: url('~/assets/images/top-bg.jpg');
}
.line-bg {
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
</style>
