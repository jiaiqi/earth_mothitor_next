<script  lang="ts" setup>
import { getNewsList } from '~/api/news'
import { decode, encode } from '~/utils/base/dataEncry'
const urlType = ref('')
const pdfData = ref('')
const routePath = [{ name: '首页', path: '/' }, { name: '新闻动态' }]
const route = useRoute()
//获取新闻动态更多的数据
const newsList = ref<any[]>([])
const par = 'pageNum=1&pageSize=9999'
getNewsList(par).then((res) => {
    newsList.value = res.records
})
</script>
<template>
    <div>
        <CommonPageContainer title="新闻动态" desc="NEWS INFORMATION" :path="routePath">
            <div class="my-20px  px-20px py-10px md:px-60px md:py-30px">
                    <PublicTable :list="newsList" dataType="新闻动态">
                    </PublicTable>
            </div>
        </CommonPageContainer>
    </div>
</template>

<style></style>
