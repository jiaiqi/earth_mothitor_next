<script
  lang="ts"
  setup
>
import { decode } from '~/utils/base/dataEncry'
import { ElNotification } from '#imports'
import { dictionaryList, getFileList, getLinkFile } from '~/api/service'

const route = useRoute()
const routePath = [{ name: '首页', path: '/' }, { name: '产品目录', path: '/productSummary' }, { name: '产品目录详情' }]
const form = decode(route.query.data)
form.directoryName = form.directoryName || form.description || form.nameProduct || form.classification
if (form.directoryName === '地下流体') {
  form.keyword = form.keyWord
  form.pTime = form.productTime
  form.originalDataSource = form.dataSource
  form.productIdea = form.idea
  form.productFormat = form.formate
  form.distributionMode = form.sendType
  form.linkMen = form.linkMan
  form.securityLevel = form.saftType
  form.performanceIndex = form.performance
  form.technicalIndex = form.jobIndex
  form.accountabilityUnit = form.propertyUnit
  form.dutyOfficer = form.propertyMan
}
if (form.directoryName === '断层形变') {
  form.keyword = form.keyWord
  form.pTime = form.productTime
  form.functionUse = form.functionUsr
  form.beginEndTime = form.timeRange
  form.accessory = form.addFile
  form.gisAccessory = form.gisAddFile
  form.email = form.eamil
  form.productIdea = form.generationMethod
  form.accountabilityUnit = form.dutyUnit
  form.dutyOfficer = form.dutyPerson
  form.originalDataSource = form.dataSource
  form.distributionMode = form.sendType
  form.linkMen = form.linkMan
  form.securityLevel = form.saftType
}
if (['地磁产品', '地电产品', '地倾斜', '地应变', '重力产品'].includes(form.directoryName)) {
  form.keyword = form.keyWord
  form.providerUnit = form.provide
  form.pTime = form.writeTime.slice(0, 8)
  form.networkCode = form.stationId
  form.stationCode = form.stationNum
  form.instrumentName = form.instrumentType
  form.measurementCode = form.testCode
  form.numberCode = form.componentCode
  form.beginEndTime = form.strEndTime
  form.productStandard = form.productSpecification
  form.functionUse = form.ufunction
  form.citationFormat = form.referenceFormat
  form.dutyOfficer = form.propertyOwner
  form.accountabilityUnit = form.propertyUnit
  form.securityLevel = form.safetyClassification
  form.address = form.contactAddress
  form.tel = form.contactNumber
  form.linkMen = form.contactPerson
  form.frequency = form.renewalFrequency
  form.sendUnit = form.distributionUnit
  form.dataSize = form.dataVolume
  form.accessory = form.addFile
  form.productIdea = form.generationMethod
  form.originalDataSource = form.dataSource
}
// getDictId()
if (form.classification === '地震监测') {
  getLinkFileList()
}
const loading = ref(false)
const topCardFields = [{
  label: '编号',
  value: form.id,
}, {
  label: '产品名称',
  value: form.name,
}, {
  label: '所属目录名称',
  value: form.description,
}, {
  label: '提供单位',
  value: form.institution,
}, {
  label: '关键词',
  value: form.keyword,
}]

const typeId = ref(-1)
const fileList = ref([])
function getLinkFileList() {
  getLinkFile(form.id).then((res) => {
    fileList.value = res
  })
}
// 获取字典id
function getDictId() {
  if (['定点形变产品', '重力产品', '地磁产品', '地电产品'].includes(form.directoryName)) {
    typeId.value = 3
    getAttach()
    return
  }
  dictionaryList({ productName: form.directoryName }).then((res) => {
    const data = res
    typeId.value = data[0].id
    getAttach()
  })
}
const url = ref('')
const showImg = ref(false)
function getAttach() {
  const par = {
    productId: form.id,
    typeId,
  }
  // const reg = /^([\s\S])+(jpg|jpeg|png|JPG|PNG|gif|GIF)$/
  const reg = /^.*\.(?:jpg|jpeg|png|JPG|PNG|gif|GIF)$/
  getFileList(par).then((res) => {
    res.forEach((item) => {
      if (reg.test(item.fileUrl)) {
        url.value = item.fileUrl
      }
      else {
        fileList.value.push(item)
      }
    })
    if (url.value === '') {
      showImg.value = false
    }
  })
}

function toMap() {
  if (form.map === 1 && form.mapUrl) {
    navigateTo({
      path: form.mapUrl,
    })
  }
}

const isLogin = ref(false)
// 申请数据
function applyData() {
  // 判断用户是否登录
  if (isLogin.value) {
    // const info = [{
    //   classesStandby: `分发单位：${form.sendUnit}；联系人：${form.linkMen}；电话：${form.tel}；邮件：${form.email}`,
    //   orderClasses: `${form.directoryName}_${form.productName}；编号：${form.id}`,
    //   sentDept: form.sendUnit,
    //   subjectId: 99,
    // }]
    // sessionStorage.setItem('orderList', JSON.stringify(info))
    // gotoCheck('orderInfo')
  }
  else {
    ElNotification.error({
      title: '用户未登录，请登录后再试',
    })
  }
}
</script>

<template>
  <CommonPageContainer :path="routePath" title="产品目录" desc="PRODUCT CATALOG">
    <div class="my-20px bg-#F6F7FA pt-10px md:pt-30px">
      <div class="mx-20px hidden items-center justify-between md:mx-60px md:flex">
        <div class="flex items-center justify-between line-height-30px">
          <span class="text-20px text-#1684FC font-700">
            产品目录
          </span>
          <span class="mx-10px text-#C7C7CC">|</span>
          <span class="text-14px text-#C7C7CC uppercase">
            product catalogue
          </span>
        </div>
        <!-- <span class="flex items-center text-#AEAEB2">
        <i class="i-ri:eye-fill mr-10px" />
        {{ detailData.recom || '' }}次
      </span> -->
      </div>
      <div class="mx-20px my-20px rounded-6px bg-white px-25px py-20px md:mx-60px">
        <div class="text-24px font-700 line-height-30px" md=" text-28px line-height-56px">
          {{ form.name }}
        </div>
        <div class="my-10px flex flex-col gap-35px" flex="lg:row">
          <img src="/img/productcatalog.jpg" alt="" class="h-200px w-360px rounded-6px xl:h-220px xl:w-420px">
          <div class="flex flex-col gap-10px">
            <div v-for="item in topCardFields" :key="item.label" flex="~">
              <span class="min-w-120px text-#424242">{{ item.label }}</span>
              <span class="flex-1">
                <span
                  v-if="item.label === '关键词'"
                  class="inline-block rounded-6px bg-#007aff1a px-10px text-#007AFF line-height-25px"
                >{{ item.value
                }}</span>
                <span v-else class="text-#101010 font-600">{{ item.value }}</span>
              </span>
            </div>
            <div>
              <button v-if="form.classification !== '地震监测'" class="rounded-6px bg-#217EE6 btn" @click="applyData">
                申请数据
              </button>
              <button v-if="form.mapUrl" class="ml-20px rounded-6px bg-#217EE6 btn" @click="toMap">
                地图模式
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="form.classification !== '地震监测'" class="mx-20px my-20px rounded-6px bg-white px-25px py-20px md:mx-60px">
        <!-- <div class="text-20px font-700 line-height-28px" md="line-height-36px">
          产品信息
        </div> -->
        <el-descriptions title="产品信息" :column="1" size="default" border>
          <el-descriptions-item v-if="form.directoryName === 'GNSS产品'" label="产品描述" min-width="150">
            {{ form.description }}
          </el-descriptions-item>
          <el-descriptions-item label="编制时间">
            {{ $dayjs(form.pTime).format('YYYY-MM-DD HH:mm:ss') }}
          </el-descriptions-item>
          <el-descriptions-item label="产品内容">
            {{ form.productContent }}
          </el-descriptions-item>
          <el-descriptions-item label="功能用途">
            {{ form.functionUse }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['地下流体', '地磁产品', '重力产品', '地电产品', '地倾斜', '地应变'].includes(form.directoryName)"
            label="台网代码"
          >
            {{ form.networkCode }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['地下流体', '地磁产品', '重力产品', '地电产品', '地倾斜', '地应变'].includes(form.directoryName)"
            label="台站代码"
          >
            {{ form.stationCode }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['地下流体', '地磁产品', '重力产品', '地电产品', '地倾斜', '地应变'].includes(form.directoryName)"
            label="台站名称"
          >
            {{ form.stationName }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['地下流体', '地磁产品', '重力产品', '地电产品', '地倾斜', '地应变'].includes(form.directoryName)"
            label="测点代码"
          >
            {{ form.testCode }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['地下流体', '地磁产品', '重力产品', '地电产品', '地倾斜', '地应变'].includes(form.directoryName)"
            label="仪器名称型号"
          >
            {{ form.instrumentName }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['地下流体', '地磁产品', '重力产品', '地电产品', '地倾斜', '地应变'].includes(form.directoryName)"
            label="测项代码"
          >
            {{ form.measurementCode }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['地下流体', '地磁产品', '重力产品', '地电产品', '地倾斜', '地应变'].includes(form.directoryName)"
            label="分量代码"
          >
            {{ form.numberCode }}
          </el-descriptions-item>
          <el-descriptions-item v-if="['地下流体', 'GNSS产品'].includes(form.directoryName)" label="场地类型">
            {{ form.landType }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['地下流体', '地磁产品', '重力产品', '地电产品', '地倾斜', '地应变'].includes(form.directoryName)"
            label="采样率"
          >
            {{ form.samplingRate }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="['GNSS产品', '断层形变', '地磁产品', '地电产品', '重力产品', '地倾斜', '地应变'].includes(form.directoryName)" label="时间范围"
          >
            {{ form.beginEndTime }}
          </el-descriptions-item>
          <el-descriptions-item v-if="['断层形变'].includes(form.directoryName)" label="场地经度">
            {{ form.longitude }}
          </el-descriptions-item>
          <el-descriptions-item v-if="['断层形变'].includes(form.directoryName)" label="场地纬度">
            {{ form.latitude }}
          </el-descriptions-item>
          <el-descriptions-item v-if="['GNSS产品'].includes(form.directoryName)" label="空间基准及精度">
            {{ form.spatialGranularity }}
          </el-descriptions-item>
          <el-descriptions-item label="原始数据来源">
            {{ form.originalDataSource }}
          </el-descriptions-item>
          <el-descriptions-item label="产品形式">
            {{ form.productForm }}
          </el-descriptions-item>
          <el-descriptions-item label="产品规格">
            {{ form.productStandard }}
          </el-descriptions-item>
          <el-descriptions-item label="产品生成方法">
            {{ form.productIdea }}
          </el-descriptions-item>
          <el-descriptions-item v-if="['断层形变', 'GNSS产品'].includes(form.directoryName)" label="是否包含GIS数据">
            {{ form.containGis }}
          </el-descriptions-item>
          <el-descriptions-item v-if="['断层形变', 'GNSS产品'].includes(form.directoryName)" label="附件（除GIS数据外）">
            {{ form.accessory }}
          </el-descriptions-item>
          <el-descriptions-item v-if="['断层形变', 'GNSS产品'].includes(form.directoryName)" label="附件（GIS数据）">
            {{ form.gisAccessory }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="form.classification !== '地震监测'" class="mx-20px my-20px rounded-6px bg-white px-25px py-20px md:mx-60px">
        <el-descriptions title="分发信息" :column="2" size="default" border class="hidden md:block">
          <el-descriptions-item label="产品格式">
            {{ form.productFormat }}
          </el-descriptions-item>
          <el-descriptions-item label="数据量">
            {{ form.dataSize }}
          </el-descriptions-item>
          <el-descriptions-item label="分发方式">
            {{ form.distributionMode }}
          </el-descriptions-item>
          <el-descriptions-item label="在线链接">
            {{ form.onlineLink }}
          </el-descriptions-item>
          <el-descriptions-item label="分发单位">
            {{ form.sendUnit }}
          </el-descriptions-item>
          <el-descriptions-item label="维护和更新频率">
            {{ form.frequency }}
          </el-descriptions-item>
          <el-descriptions-item label="联系人">
            {{ form.linkMen }}
          </el-descriptions-item>
          <el-descriptions-item label="联系电话">
            {{ form.tel }}
          </el-descriptions-item>
          <el-descriptions-item label="电子邮件">
            {{ form.email }}
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">
            {{ form.address }}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="分发信息" :column="1" size="default" border class="md:hidden">
          <el-descriptions-item label="产品格式">
            {{ form.productFormat }}
          </el-descriptions-item>
          <el-descriptions-item label="数据量">
            {{ form.dataSize }}
          </el-descriptions-item>
          <el-descriptions-item label="分发方式">
            {{ form.distributionMode }}
          </el-descriptions-item>
          <el-descriptions-item label="在线链接">
            {{ form.onlineLink }}
          </el-descriptions-item>
          <el-descriptions-item label="分发单位">
            {{ form.sendUnit }}
          </el-descriptions-item>
          <el-descriptions-item label="维护和更新频率">
            {{ form.frequency }}
          </el-descriptions-item>
          <el-descriptions-item label="联系人">
            {{ form.linkMen }}
          </el-descriptions-item>
          <el-descriptions-item label="联系电话">
            {{ form.tel }}
          </el-descriptions-item>
          <el-descriptions-item label="电子邮件">
            {{ form.email }}
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">
            {{ form.address }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="form.classification !== '地震监测'" class="mx-20px my-20px rounded-6px bg-white px-25px py-20px md:mx-60px">
        <el-descriptions title="限制信息" :column="1" size="default" border>
          <el-descriptions-item label="安全限制分级">
            {{ form.securityLevel }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="form.classification !== '地震监测'" class="mx-20px my-20px rounded-6px bg-white px-25px py-20px md:mx-60px">
        <el-descriptions title="质量信息" :column="1" size="default" border>
          <el-descriptions-item label="性能指标">
            {{ form.performanceIndex }}
          </el-descriptions-item>
          <el-descriptions-item label="质量指标">
            {{ form.qualityIndex }}
          </el-descriptions-item>
          <el-descriptions-item label="技术指标">
            {{ form.technicalIndex }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="form.classification !== '地震监测'" class="mx-20px my-20px rounded-6px bg-white px-25px py-20px md:mx-60px">
        <el-descriptions title="产权信息" :column="1" size="default" border>
          <el-descriptions-item label="责任单位">
            {{ form.accountabilityUnit }}
          </el-descriptions-item>
          <el-descriptions-item label="责任人">
            {{ form.dutyOfficer }}
          </el-descriptions-item>
          <el-descriptions-item label="引用格式">
            {{ form.citationFormat }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="min-h-80px bg-#DEE6F2 px-20px md:px-60px">
        <template v-if="fileList && fileList.length">
          <div v-for="(item, index) in fileList" :key="index" class="flex items-center justify-between py-10px">
            <img src="/img/icon/file-icon.png" alt="">
            <div class="flex-1 px-24px">
              {{ item.fileName || item.name || '' }}
            </div>
            <div>
              <button class="btn">
                <a :href="item.fileUrl || item.url || ''">下载附件</a>
              </button>
            </div>
          </div>
        </template>
        <div v-else class="h-80px flex items-center">
          暂无相关附件
        </div>
      </div>
    </div>
  </CommonPageContainer>
</template>

<style scoped>
:deep(.el-descriptions__label) {
  --el-descriptions-item-bordered-label-background: #f1f6ff;
  width: 130px;
}
</style>
