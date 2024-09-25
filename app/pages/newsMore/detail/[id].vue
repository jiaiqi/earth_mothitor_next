<script  lang="ts"
setup>
import { decode, encode } from '~/utils/base/dataEncry'
const newsDetail = ref('')
const routePath = [{ name: '首页', path: '/' }, { name: '新闻动态', path: '/newsMore' }, { name: '新闻动态详情' }]
const route = useRoute()
const fileData = decode(route.query.data)
newsDetail.value = fileData.newsText
const detailData = computed(() => {
  const encodeData = decode(route.query.data)
  return encodeData
})
</script>
<template>
  <div>
    <CommonPageContainer title="新闻动态" desc="NEWS INFORMATION" :path="routePath">
      <div class="my-20px  px-20px py-10px md:px-60px md:py-30px">
        <div v-html="newsDetail" />
      </div>
    </CommonPageContainer>
  </div>
</template>

<style></style>
