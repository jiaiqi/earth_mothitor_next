<script lang="ts" setup>
import bg2 from 'public/img/img2.png'
import bg3 from 'public/img/img3.png'
import bg4 from 'public/img/img4.png'
</script>

<template>
  <div class="bg-#F1F6FF p-y-38px">
    <div class="m-x-auto m-y-30px container md:max-w-1300px" grid="~ sm:cols-2 lg:cols-3 gap-30px">
      <div class="h-230px overflow-hidden rounded-20px bg-cover" :style="{ backgroundImage: `url(${bg2})` }">
        <div class="h-full w-full bg-#101010 bg-op-17 px-40px" flex="~ items-center justify-center">
          <i class="i-ri:gps-line h-100px w-100px rounded-full text-60px text-white" border="1px solid #fff" />
          <div class="ml-40px flex-1 text-white">
            <div class="text-size-28px line-height-52px">
              大震专题
            </div>
            <div class="text-size-20px">
              立即了解  <i class="i-fa-solid:chevron-circle-right ml-20px" />
            </div>
          </div>
        </div>
      </div>
      <div class="h-230px overflow-hidden rounded-20px bg-cover" :style="{ backgroundImage: `url(${bg3})` }">
        <div class="h-full w-full bg-#101010 bg-op-17 px-40px" flex="~ items-center justify-center">
          <i class="i-ri:gps-line h-100px w-100px rounded-full text-60px text-white" border="1px solid #fff" />
          <div class="ml-40px flex-1 text-white">
            <div class="text-size-28px line-height-52px">
              技术服务
            </div>
            <div class="text-size-20px">
              立即了解  <i class="i-fa-solid:chevron-circle-right ml-20px" />
            </div>
          </div>
        </div>
      </div>
      <div class="h-230px overflow-hidden rounded-20px bg-cover" :style="{ backgroundImage: `url(${bg4})` }">
        <div class="h-full w-full bg-#101010 bg-op-17 px-40px" flex="~ items-center justify-center">
          <i class="i-ri:gps-line h-100px w-100px rounded-full text-60px text-white" border="1px solid #fff" />
          <div class="ml-40px flex-1 text-white">
            <div class="text-size-28px line-height-52px">
              图书期刊
            </div>
            <div class="text-size-20px">
              立即了解  <i class="i-fa-solid:chevron-circle-right ml-20px" />
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<style>

</style>
