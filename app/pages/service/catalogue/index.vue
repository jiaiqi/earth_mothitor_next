<!-- 强震动 -->
<script lang="ts" setup>
definePageMeta({
  layout: 'map-page',
})
const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: '测震', path: '' }]
</script>

<template>
  <div>
    <DataCatalogueMap page-name="强震动" :route-path="routePath" />
  </div>
</template>

<style>

</style>
