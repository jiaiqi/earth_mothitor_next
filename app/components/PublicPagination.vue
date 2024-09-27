<script lang="ts" setup>
const props = defineProps<{
  total?: number
  pageSize?: number
  pageNum?: number
}>()
const emit = defineEmits(['change'])
// const pageNum = computed(() => props.pageNum)
function onChange(currentPage: number, pageSize: number) {
  emit('change', {
    pageNum: currentPage,
    pageSize,
  })
}
</script>

<template>
  <div class="m-y-40px">
    <el-pagination
      background
      :hide-on-single-page="true"
      layout="prev, pager, next"
      :page-size="props.pageSize"
      :total="props.total" @change="onChange"
    />
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
