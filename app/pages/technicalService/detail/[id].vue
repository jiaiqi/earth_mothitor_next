<script lang="ts" setup>
import { getHtml } from '~/api/service'
import { decode } from '~/utils/base/dataEncry'

const store = useServiceStore()
const route = useRoute()
const detailData = computed(() => {
  const encodeData = decode(route.query.data)
  const data = store.getValue() || encodeData || { id: '', sname: '', stype: '', cunit: '', sclassification: '', stext: '', cdate: '', recom: '' }
  if (data.sclassification && typeof data.sclassification === 'string' && data.sclassification?.includes('/')) {
    data.sclassification = data.sclassification.split('/')[1]
  }
  return data
})
const routePath = ['首页', '技术服务', '技术服务详情']
function onNavigate(index: number) {
  if (index === 1) {
    // 回退到技术服务列表
    const router = useRouter()
    router.replace('/technicalService')
  }
}
const detailHtml = ref<string>('')
const loading = ref(true)
function getDetailHtml() {
  const route = useRoute()
  const id = route.params.id
  getHtml(id).then((res) => {
    loading.value = false
    // 赋值给 detailHtml.value
    if (typeof res === 'string') {
      detailHtml.value = res
    }
    else {
      console.error('Invalid type for res')
    }

    // 判断是否包含图片
    if (detailHtml.value.includes('<img')) {
      // 图片添加样式
      detailHtml.value = detailHtml.value.replace(/<img/g, '<img style="object-fit: contain; padding: 8px 0px;display:inline;" ')
    }
  })
    .catch((error) => {
      loading.value = false
      console.error('获取 HTML 数据失败:', error)
      // 可以在这里设置默认值或者提示用户
      detailHtml.value = '加载失败，请稍后再试'
    })
}
getDetailHtml()
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
</script>

<template>
  <div>
    <CommonPageContainer

      title="技术服务"
      desc="TECHNICAL SERVICE"
      :path="routePath"
      @navigate="onNavigate"
    >
      <div class="my-20px bg-#F6F7FA px-20px py-10px md:px-60px md:py-30px">
        <div class="hidden items-center justify-between md:flex">
          <div class="flex items-center justify-between line-height-30px">
            <span class="text-20px text-#1684FC font-700">
              技术服务
            </span>
            <span class="mx-10px text-#C7C7CC">|</span>
            <span class="text-14px text-#C7C7CC">
              TECHNICAL SERVICE
            </span>
          </div>
          <span class="flex items-center text-#AEAEB2">
            <i class="i-ri:eye-fill mr-10px" />
            {{ detailData.recom || '' }}次
          </span>
        </div>
        <div class="text-center text-24px font-700 line-height-30px" md="my-30px text-36px line-height-56px">
          {{ detailData.sname || '' }}
        </div>
        <div flex="~ col md:row justify-between" class="my-30px text-#424242 line-height-24px">
          <div>联系单位：{{ detailData.cunit }}</div>
          <div>发布时间：{{ $dayjs(detailData.cdate).format('YYYY年M月D日') }}</div>
          <div>服务分类：{{ detailData.sclassification }}</div>
        </div>
        <div
          v-loading="loading" element-loading-text="加载中..."
          :element-loading-spinner="svg"
          element-loading-background="rgba(122, 122, 122, 0.8)"
          min-h-220px
        >
          <div
            v-html="detailHtml"
          />
        </div>
      </div>
    </CommonPageContainer>
  </div>
</template>

<style>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
