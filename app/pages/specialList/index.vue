<script lang="ts" setup>
import { industry } from '~/api/notice'
import { decode ,encode} from '~/utils/base/dataEncry'
const prodList = ref<any[]>([])
const routePath = [{ name: '首页', path: '/' }, { name: '专业网站列表' }]
const listData = computed(() => {
  return prodList.value
})
function getListData(){
    industry(encode({ pageNum: 1, pageSize: 9999 })).then((res) => {
        prodList.value = decode(res)
        console.log(prodList)
})
}
getListData()
function toDetail(item){
    window.open(item.url)
}
</script>

<template>
    <div>
        <CommonPageContainer title="专业服务" desc="PROFESSIONAL WEBSITETECHNICAL SERVICE" :path="routePath">
            <div class="my-20px bg-#F6F7FA px-20px py-10px md:px-60px md:py-30px">
                <div class="hidden items-center justify-between md:flex mb-5">
                    <div class="flex items-center justify-between line-height-30px">
                        <span class="text-20px text-#1684FC font-700">
                            专业服务
                        </span>
                        <span class="mx-10px text-#C7C7CC">|</span>
                        <span class="text-14px text-#C7C7CC">
                            PROFESSIONAL WEBSITETECHNICAL SERVICE
                        </span>
                    </div>
                </div>
                <PublicList :list="listData" type="专业服务" @click-item="toDetail">
                </PublicList>
            </div>

        </CommonPageContainer>
    </div>
</template>

<style></style>
