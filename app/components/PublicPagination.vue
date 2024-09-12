<script lang="ts" setup>

</script>

<template>
  <div class="m-y-40px">
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-pagination.is-background) {
  --el-disabled-bg-color: #fff;
  --el-pagination-button-bg-color: #fff;
  --color: #000;
  --el-color-primary: #0e77ea;
  button,
  .el-pager li {
    border: 1px solid #e8e8e8;
  }
}
</style>
