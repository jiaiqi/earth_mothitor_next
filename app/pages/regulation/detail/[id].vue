<script  lang="ts"
setup>
import { preView } from '~/api/service'
import { viewNumberAdd } from '~/api/earthquakePopularization'
import { downStandard } from '~/api/regulation'
import { decode ,encode} from '~/utils/base/dataEncry'
const urlType = ref('')
const pdfData = ref('')
const routePath = [{ name: '首页', path: '/' }, { name: '法规标准列表', path: '/regulation' }, { name: '法规标准详情' }]
const route = useRoute()
const fileData=decode(route.query.data)
getPdfUrl(fileData)
function getPdfUrl(row: any) {
  // const urlname = url.split('=')[1]
  console.log(row)
  downStandard(row.id).then((res: any) => {
    // let url = process.env.VUE_APP_CRIT_API + '/fileservice/ecdownload'
    let blob = new Blob([res], { type: 'application/pdf' })
    let blobURL = URL.createObjectURL(blob)
    pdfData.value = blobURL + '#toolbar=0'

  })
  // preView(urlname).then((res:any) => {
  //   let blob = new Blob([res], { type: 'application/pdf' })
  //   let blobURL = URL.createObjectURL(blob)
  //   pdfData.value = blobURL + '#toolbar=0'
  // })
}
//浏览数量+1
// function addView(){
//   console.log(fileData.fileId)
//   viewNumberAdd(encode({fileId: fileData.fileId})).then()
// }
// addView()
</script>

<template>
  <div>
    <CommonPageContainer title="法规标准详情" desc="EARTHQUAKE SCIENCE POPULARIZATION" :path="routePath">
      <div class="my-20px bg-#F6F7FA px-20px py-10px md:px-60px md:py-30px">
        <div class="hidden items-center justify-between md:flex">
          <div class="flex items-center justify-between line-height-30px">
            <span class="text-20px text-#1684FC font-700">
              法规标准详情
            </span>
            <span class="mx-10px text-#C7C7CC">|</span>
            <span class="text-14px text-#C7C7CC">
              EARTHQUAKE SCIENCE POPULARIZATION
            </span>
          </div>
          <!-- <span class="flex items-center text-#AEAEB2">
            <i class="i-ri:eye-fill mr-10px" />
            {{ detailData.viewNumber || '' }}次
          </span> -->
        </div>
        
          <iframe :src="pdfData" width="100%" height="800px"></iframe>
       
      
      </div>
    </CommonPageContainer>
  </div>
</template>

<style></style>
