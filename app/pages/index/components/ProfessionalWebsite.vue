<script lang="ts" setup>

</script>

<template>
  <div class="m-x-auto m-y-30px bg-white container md:max-w-1300px">
    <div class="mb-30px flex justify-between">
      <PublicTitle title="专业服务" />
      <div class="flex cursor-pointer items-center font-500">
        更多 <i class="i-ri:arrow-right-double-fill" />
      </div>
    </div>
    <div class="grid gap-30px md:grid-cols-2 xl:grid-cols-3">
      <div v-for="item in 6" class="overflow-hidden rounded-20px" border="#E5E5EA 1px solid">
        <div class="h-96px rounded-20px bg-#F1F6FF px-16px py-11px" flex="~ justify-center items-center">
          <img src="/img/website.png" alt="" class="h-75px w-100px">
          <span class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-20px font-700">全国测震站网数据共享服务站</span>
        </div>
        <div class="flex justify-between px-19px py-9px text-#424242">
          <span>https://www.qq.com/</span>
          <div class="flex cursor-pointer items-center font-500">
            详情 <i class="i-ri:arrow-right-double-fill" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
