<script lang="ts" setup>
// import { NCarousel, NImage } from 'naive-ui'
</script>

<template>
  <div class="h-310px">
    <!-- <NCarousel show-arrow>
      <NImage v-for="item in 2" :key="item" src="/img/banner1.png" />
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
    <el-carousel motion-blur h-full height="100%" trigger="click" :autoplay="false">
      <el-carousel-item v-for="item in 2" :key="item">
        <el-image class="h-full w-full" src="/img/banner1.png" fit="fill" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-carousel__indicators--horizontal) {
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
//   bottom: 20px;
//   right: 50%;
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
</style>
