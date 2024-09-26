<script lang="ts" setup>
import { getNoticeList } from '~/api/notice'
import { decode, encode } from '~/utils/base/dataEncry'

const id = ref()
const route = useRoute()
const routePath = [{ name: '最新地震信息', path: `/earthquakeInfo/${id.value}` }, { name: '信息播报', path: '/earthquakeInfo/situation' }]
const fileData = decode(route.query.data)
const dayjs = useDayjs()
id.value = fileData.id
// function getData(){
//   getNoticeList(id.value).then(res=>{
//     fileData=res.records[0]
//   }).catch()
// }
// getData()
function toThreeFloat(num: any) {
  let number = null
  if (num.toString().split('.').length !== 1 && num.toString().split('.')[1].length < 3) {
    number = Number.parseFloat(num).toFixed(3)
  }
  else if (num.toString().split('.').length === 1) {
    number = `${num.toString()}.000`
  }
  else {
    number = num.toString().substr(0, Number.parseInt(num.toString().indexOf('.')) + 4)
  }
  return number
}
</script>

<template>
  <div>
    <CommonPageContainer title="信息播报" desc="Information broadcasting" :path="routePath">
      <div class="my-20px bg-#F6F7FA px-20px py-10px md:px-60px md:py-30px">
        <div class="hidden items-center justify-between md:flex">
          <div class="flex items-center justify-between line-height-30px">
            <span class="text-20px text-#1684FC font-700">
              信息播报
            </span>
            <span class="mx-10px text-#C7C7CC">|</span>
            <span class="text-14px text-#C7C7CC uppercase">
              Information broadcasting
            </span>
          </div>
        </div>
        <div class="text-center text-24px font-700 line-height-30px" md="my-30px text-36px line-height-56px">
          {{ fileData.localName }}发生{{ fileData.m }}级地震
        </div>
        <div flex="~ col md:row justify-center" class="my-30px text-#424242 line-height-24px">
          <div>发布时间：{{ $dayjs(fileData.otime).format('YYYY年M月D日') }}</div>
        </div>
        <div class="content" flex="~ col md:row justify-center">
          <p class="w-200 indent-10">
            据中国地震台网测定，北京时间{{ $dayjs(fileData.otime).format("YYYY年M月D日hh时mm分ss秒") }}{{ fileData.localName }}
            <span v-if="parseInt(fileData.lat) == 0">（纬度</span>
            <span v-else>{{ parseInt(fileData.lat) > 0 ? '（北纬' : '（南纬' }}</span>
            {{
              toThreeFloat(Math.abs(fileData.lat))
            }}度，
            <span v-if="parseInt(fileData.lon) == 0">经度</span>
            <span v-else>{{ parseInt(fileData.lon) > 0 ? '东经' : '西经' }}</span>
            {{ toThreeFloat(Math.abs(fileData.lon)) }}度）发生{{ fileData.m }}级地震，震源深度{{
              fileData.depth
            }}KM。
          </p>
        </div>
      </div>
    </CommonPageContainer>
  </div>
</template>

<style></style>
