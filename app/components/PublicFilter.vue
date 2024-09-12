<script lang="ts" setup>
const serviceTypeList = ['非天然地震监测服务', '地震预警技术与信息服务', '重大工程健康监测与诊断', '地震安全性评价', '地震活动断层探查', '地震灾害风险调查与评估', '地震地质灾害调查', '地震信息技术服务', '地震仪器计量检定服务']

const YearList: any[] = []
for (let i = 2008; i <= new Date().getFullYear(); i++) {
  YearList.unshift(+i)
}

const companyList = ['中国地震局工程力学研究所', '新疆维吾尔自治区地震局']
</script>

<template>
  <div class="filter-box m-y-20px">
    <PublicFilterItem :list="serviceTypeList" title="服务分类" />
    <PublicFilterItem :list="YearList" title="发布时间" />
    <PublicFilterItem :list="companyList" title="联系单位" />
  </div>
</template>

<style>

</style>
