<script lang="ts" setup>
import { decode, encode } from '~/utils/base/dataEncry'
import { getFlagList } from '~/api/count'
const route = useRoute()
const fileData = route.query.data
const prodList = ref<any[]>(

)
const title = ref('点击排行榜')
const params = ref()
const routePath = [{ name: '首页', path: '/' }, { name: title }]
function toDetail(item) {
    // window.open(item.url)
    // console.log(item)
    if (item.url.indexOf('http://') != -1 || item.url.indexOf('https://') != -1) {
        window.open(item.url)
    } else {
        // this.$router.push(item.url)
        //修改文件名字 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        navigateTo({
            path: item.url,
        })
        if (item.url == '/knowledge/science') {
            navigateTo({
                path: `/earthquakePopularization`,
            })
        } else if (item.url == '/knowledge/statute') {
            navigateTo({
                path: `/regulation`,
            })
        }  else if (item.url == '/monitor/refuge') {
            navigateTo({
                path: `/technicalService`,
            })
        }else if (item.url.includes('/monitor/productInfo')  ) {
            navigateTo({
                path: `/productSummary`,
            })
        }
    }
    // navigateTo({
    //     path: item.url,
    // })
    // if (item.url == '/knowledge/science') {
    //     const keyName1 = 'gif-'
    //     const keyName2 = 'video-'
    //     if (item.postUrl.includes(keyName1)) {
    //         item.url = item.postUrl.split(keyName1)[1]
    //     } else if (item.postUrl.includes(keyName2)) {
    //         item.url = item.postUrl.split(keyName2)[1]
    //     }
    //     // 
    //     navigateTo({
    //         path: `/earthquakePopularization/detail/${item.id}`,
    //         query: {
    //             data: encode(item),
    //         },
    //     })
    // } else if (item.url == '/knowledge/statute') {
    //     item.filename=item.keyName
    //     navigateTo({
    //         path: `/regulation/detail/${item.id}`,
    //         query: {
    //             data: encode(item),
    //         },
    //     })
    // }

}
// key: d
// key: date
function getDataList() {
    console.log(fileData)
    if (fileData == 'first') {
        title.value = '点击排行榜'
        params.value = 'pageNum=1&pageSize=999'
    } else if (fileData == 'second') {
        title.value = '最新推荐'
        params.value = 'pageNum=1&pageSize=999&key=d'
    } else {
        title.value = '推荐数据'
        params.value = 'pageNum=1&pageSize=999&key=date'
    }
    getFlagList(params.value).then(res => {
        prodList.value = res.records
    })
}
getDataList()
</script>

<template>
    <div>
        <CommonPageContainer :title="title" desc="THE CHARTS" :path="routePath">
            <div class="my-20px bg-#F6F7FA px-20px py-10px md:px-60px md:py-30px">
                <div class="hidden items-center justify-between md:flex mb-5">
                    <div class="flex items-center justify-between line-height-30px">
                        <span class="text-20px text-#1684FC font-700">
                            {{ title }}
                        </span>
                        <!-- <span class="mx-10px text-#C7C7CC">|</span>
                        <span class="text-14px text-#C7C7CC">
                            THE CHARTS
                        </span> -->
                    </div>
                </div>
                <div class="bg-#fff rounded-lg p-5">
                    <el-image class="h-full w-full" src="/img/rating.png" fit="fill" />
                    <PublicTable :list="prodList" dataType="点击排行榜" @click-item="toDetail">
                    </PublicTable>
                </div>

            </div>

        </CommonPageContainer>
    </div>
</template>

<style></style>
