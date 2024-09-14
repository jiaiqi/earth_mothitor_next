<script lang="ts" setup>
const { id } = useRoute().params
const routePath = [{ name: '最新地震信息', path: `/earthquakeInfo/${id}` }, { name: '信息播报', path: '/earthquakeInfo/situation' }]
const detailData = {}
const detailHtml = ref('')
const loading = ref(false)
</script>

<template>
  <div>
    <CommonPageContainer

      title="信息播报"
      desc="Information broadcasting"
      :path="routePath"
    >
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
        />
      </div>
    </CommonPageContainer>
  </div>
</template>

<style>

</style>
