<script lang="ts" setup>
</script>

<template>
  <div class="h-310px">
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
</style>
