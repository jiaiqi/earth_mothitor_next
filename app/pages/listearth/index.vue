<script  lang="ts" setup>
import { getList } from '~/api/catalogue'
import { decode, encode } from '~/utils/base/dataEncry'
const prodList = ref<any[]>([])//表格数据
const dataType = ref('历史今天')
const month = ref(new Date().getMonth() + 1)
const day = ref(new Date().getDate())
const dayTime = ref(86400000)
const routePath = [{ name: '首页', path: '/' }, { name: '历史今天' }]
function getHistoryList() {
  const pageNum = 1
  const pageSize = 9999
  getList(pageNum, pageSize, month.value, day.value).then((res:any) => {
    prodList.value=res.records
  })
}
function sel(num) {
    if (num == 1) {   //下一天
        day.value = new Date(new Date().getTime() + dayTime.value).getDate()
        month.value = new Date(new Date().getTime() + dayTime.value).getMonth() + 1
        dayTime.value += 86400000
        this.getHistoryList()
    }
    if (num == -1) {   //上一天
        dayTime.value -= 86400000
        day.value = new Date(new Date().getTime() - 86400000 + dayTime.value).getDate()
        month.value = new Date(new Date().getTime() - 86400000 + dayTime.value).getMonth() + 1
        this.getHistoryList()
    }
}
function reSet() {
    month.value = new Date().getMonth() + 1
    day.value = new Date().getDate()
    dayTime.value = 86400000
}
const listData = computed(() => {
  return prodList.value
})
getHistoryList()
</script>
<template>
    <div>
        <CommonPageContainer :path="routePath" title="历史今天" desc="HISTORY TODAY">
            <div class="flex justify-center m-5">
                <div>
                    <span style="font-size: 15px;line-height: 33px;width: 120px;padding-left: 30px;">日期：</span>
                    <el-input v-model="month" size="default" maxlength="2" @input="getHistoryList"
                        style="width: 52px;"></el-input>&nbsp;&nbsp;月&nbsp;
                    <el-input v-model="day" size="default" maxlength="2" @input="getHistoryList"
                        style="width: 52px;"></el-input>&nbsp;&nbsp;日
                    <el-button-group size="small" style="margin-left: 10px">
                        <el-button size="default" @click="sel(-1)">上一天</el-button>
                        <el-button size="default" @click="sel(1)">下一天</el-button>
                    </el-button-group>
                    <el-button @click="reSet" size="default" type="primary" style="margin-left:20px">重置</el-button>
                </div>

            </div>
            <div class="content" flex="~ col xl:row">
                <div class="min-h-300px w-full" flex="1">
                    <div class="pos-relative items-start" flex="~ col md:row">

                        <div class="flex-1">
                            <PublicTable :list="listData" :dataType="dataType">
                            </PublicTable>
                        </div>
                    </div>
                </div>
            </div>
        </CommonPageContainer>
    </div>
</template>

<style></style>
