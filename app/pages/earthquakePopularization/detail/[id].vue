<script  lang="ts"
setup>
import { preView } from '~/api/service'
import { viewNumberAdd } from '~/api/earthquakePopularization'
import { decode ,encode} from '~/utils/base/dataEncry'
const urlType = ref('')
const pdfData = ref('')
const routePath = [{ name: '首页', path: '/' }, { name: '地震科普', path: '/earthquakePopularization' }, { name: '地震科普详情' }]
const route = useRoute()
const fileData=decode(route.query.data)
const detailData = computed(() => {
  const encodeData = decode(route.query.data)
  const fileType = encodeData.url.substring(encodeData.url.length - 4)
  if (fileType == '.jpg' || fileType == '.png') {
    urlType.value = '图片'
  } else if (fileType == '.pdf') {
    urlType.value = 'pdf'
    getPdfUrl(encodeData.url)
  }else if (fileType == '.mp4') {
    urlType.value = 'mp4'
  }
  return encodeData
})
function getPdfUrl(url: any) {
  const urlname = url.split('=')[1]
  preView(urlname).then((res:any) => {
    let blob = new Blob([res], { type: 'application/pdf' })
    let blobURL = URL.createObjectURL(blob)
    pdfData.value = blobURL + '#toolbar=0'
  })
}
//浏览数量+1
function addView(){
  console.log(fileData.fileId)
  viewNumberAdd(encode({fileId: fileData.fileId})).then()
}
addView()
</script>

<template>
  <div>
    <CommonPageContainer title="地震科普" desc="EARTHQUAKE SCIENCE POPULARIZATION" :path="routePath">
      <div class="my-20px bg-#F6F7FA px-20px py-10px md:px-60px md:py-30px">
        <div class="hidden items-center justify-between md:flex">
          <div class="flex items-center justify-between line-height-30px">
            <span class="text-20px text-#1684FC font-700">
              地震科普
            </span>
            <span class="mx-10px text-#C7C7CC">|</span>
            <span class="text-14px text-#C7C7CC">
              EARTHQUAKE SCIENCE POPULARIZATION
            </span>
          </div>
          <span class="flex items-center text-#AEAEB2">
            <i class="i-ri:eye-fill mr-10px" />
            {{ detailData.viewNumber || '' }}次
          </span>
        </div>
        <div class="demo-image__lazy" v-if="urlType == '图片'">
          <el-image :src="detailData.url" lazy />
        </div>
        <div v-if="urlType == 'pdf'">
          <iframe :src="pdfData" width="100%" height="800px"></iframe>
        </div>
        <div v-if="urlType == 'mp4'">
          <video :src="detailData.url" autoplay loop controls style="width: 100%;" type="video/mp4"></video>
        </div>
        <!-- <div class="text-center text-24px font-700 line-height-30px" md="my-30px text-36px line-height-56px">
          {{ detailData.sname || '' }}
        </div>
        <div flex="~ col md:row justify-between" class="my-30px text-#424242 line-height-24px">
          <div>联系单位：{{ detailData.cunit }}</div>
          <div>发布时间：{{ $dayjs(detailData.cdate).format('YYYY年M月D日') }}</div>
          <div>服务分类：{{ detailData.sclassification }}</div>
        </div>
        <div v-if="loading" class="h-500px text-center line-height-500px">
          <LoaderL1 />
        </div>
        <div
          v-html="detailHtml"
        /> -->
      </div>
    </CommonPageContainer>
  </div>
</template>

<style></style>
