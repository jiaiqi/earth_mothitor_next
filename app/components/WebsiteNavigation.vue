<script lang="ts" setup>
const activeTab = ref('省级地震局')
const list2 = ref([])
const tabs = [
  {
    name: '省级地震局',
    children: [
      {
        name: '北京',
        href: 'https://www.bjdzj.gov.cn/',
      },
      {
        name: '天津',
        href: 'http://www.tjdzj.gov.cn/',
      },
      {
        name: '河北',
        href: 'http://www.hbdzj.gov.cn',
      },
      {
        name: '山西',
        href: 'http://www.shxdzj.gov.cn/index.html',
      },
      {
        name: '内蒙古',
        href: 'http://www.nmgdzj.gov.cn',
      },
      {
        name: '辽宁',
        href: 'http://www.lndzj.gov.cn',
      },
      {
        name: '吉林',
        href: 'http://dzj.jl.gov.cn/',
      },
      {
        name: '黑龙江',
        href: 'http://www.hea.gov.cn/',
      },
      {
        name: '上海',
        href: 'https://www.shdzj.gov.cn',
      },
      {
        name: '江苏',
        href: 'http://www.jsdzj.gov.cn/',
      },
      {
        name: '浙江',
        href: 'http://www.zjdz.gov.cn',
      },
      {
        name: '安徽',
        href: 'http://www.ahdzj.gov.cn/',
      },
      {
        name: '福建',
        href: 'http://www.fjdzj.gov.cn',
      },
      {
        name: '江西',
        href: 'http://www.jxsdzj.gov.cn/',
      },
      {
        name: '山东',
        href: 'http://www.sddzj.gov.cn/',
      },
      {
        name: '河南',
        href: 'http://www.hendzj.gov.cn/',
      },
      {
        name: '湖北',
        href: 'http://www.eqhb.gov.cn',
      },
      {
        name: '湖南',
        href: 'http://www.hundzj.gov.cn/',
      },
      {
        name: '广东',
        href: 'http://www.gddzj.gov.cn',
      },
      {
        name: '广西',
        href: 'http://www.gxdzj.gov.cn/',
      },
      {
        name: '海南',
        href: 'https://www.haindzj.gov.cn',
      },
      {
        name: '重庆',
        href: 'http://www.cqdzj.gov.cn/',
      },
      {
        name: '四川',
        href: 'http://www.scdzj.gov.cn',
      },
      {
        name: '贵州',
        href: 'https://www.gzsdzj.gov.cn/',
      },
      {
        name: '云南',
        href: 'http://yndzj.gov.cn',
      },
      {
        name: '西藏',
        href: 'http://www.xizdzj.gov.cn',
      },
      {
        name: '陕西',
        href: 'http://www.sxdzj.gov.cn/',
      },
      {
        name: '甘肃',
        href: 'https://www.gsdzj.gov.cn/',
      },
      {
        name: '青海',
        href: 'https://www.qhdzj.gov.cn',
      },
      {
        name: '宁夏',
        href: 'http://www.nxdzj.gov.cn/',
      },
      {
        name: '新疆',
        href: 'http://www.xjdzj.gov.cn/',
      },
    ],
  },
  {
    name: '直属单位',
    children: [],
  },
  {
    name: '主要地震网站',
    children: [],

  },
  {
    name: '子站',
    children: [],

  },
]
</script>

<template>
  <div class="m-x-auto m-y-30px overflow-hidden rounded-20px container md:max-w-1300px" border="1px solid #E5E5EA">
    <div class="bg-#F1F6FF px-40px">
      <ul class="tabs flex">
        <li v-for="tab in tabs" :key="tab.name" class="mr-100px b-b-5px b-b-transparent b-solid py-12px text-18px tab" :class="{ active: activeTab === tab.name }" @mouseenter="activeTab = tab.name">
          {{ tab.name }}
        </li>
      </ul>
    </div>
    <div>
      <ul v-for="tab in tabs" v-show="activeTab === tab.name" :key="tab.name" class="px-100px py-20px" grid="~  cols-[repeat(auto-fit,_minmax(100px,_1fr))] ">
        <li v-for="site in tab.children" :key="site.name" class="list-decorate line-height-60px">
          <a :href="site.href" target="_blank">{{ site.name }}</a>
        </li>
      </ul>
      <!-- <ul v-if="isActive === '1'" style="color: rgb(51, 51, 51); display: block;">
        <li><a href="http://www.cea-igp.ac.cn" target="_blank" style="color: rgb(51, 51, 51);">地球物理研究所</a></li>
        <li><a href="http://www.Eq-igl.ac.cn" target="_blank" style="color: rgb(51, 51, 51);">地质研究所</a></li>
        <li><a href="https://www.ief.ac.cn" target="_blank" style="color: rgb(51, 51, 51);">地震预测研究所</a></li>
        <li><a href="http://www.iem.ac.cn" target="_blank" style="color: rgb(51, 51, 51);">工程力学研究所</a></li>
        <li><a href="http://www.cenc.ac.cn/" target="_blank" style="color: rgb(51, 51, 51);">中国地震台网中心</a></li>
        <li><a href="http://www.eq-cedpc.cn" target="_blank" style="color: rgb(51, 51, 51);">中国地震灾害防御中心</a></li>
        <li><a href="https://www.ceadrc.cn" target="_blank" style="color: rgb(51, 51, 51);">发展研究中心</a></li>
        <li><a href="http://www.gec.ac.cn/" target="_blank" style="color: rgb(51, 51, 51);">地球物理勘探中心</a></li>
        <li><a href="http://www.fmac.ac.cn/" target="_blank" style="color: rgb(51, 51, 51);">第一监测中心</a></li>
        <li><a href="http://www.smac.ac.cn/" target="_blank" style="color: rgb(51, 51, 51);">第二监测中心</a></li>
        <li><a href="https://www.cidp.edu.cn/" target="_blank" style="color: rgb(51, 51, 51);">防灾科技学院</a></li>
      </ul>
      <ul v-if="isActive === '2'" style="color: rgb(51, 51, 51);display: block;">
        <li><a href="http://www.isc.ac.uk/" target="_blank" style="color: rgb(51, 51, 51);">国际地震中心（ISC）</a></li>
        <li><a href="http://www.iaspei.org/" target="_blank" style="color: rgb(51, 51, 51);">国际地震学与地球内部物理学联合会（IASPEI）</a></li>
        <li><a href="http://www.iris.edu/about/GSN/index.htm" target="_blank" style="color: rgb(51, 51, 51);">全球地震台网(GSN)</a></li>
        <li><a href="http://www.emsc-csem.org/" target="_blank" style="color: rgb(51, 51, 51);">欧洲地中海地震中心</a></li>
        <li><a href="http://www.seismo.ethz.ch/" target="_blank" style="color: rgb(51, 51, 51);">瑞士地震服务中心</a></li>
        <li><a href="http://www.iris.edu/" target="_blank" style="color: rgb(51, 51, 51);">美国地震学联合研究会</a></li>
        <li><a href="http://www.usgs.gov/" target="_blank" style="color: rgb(51, 51, 51);">美国地质调查局</a></li>
        <li><a href="http://earthquake.usgs.gov/contactus/golden/neic.php" target="_blank" style="color: rgb(51, 51, 51);">&nbsp;美国地震信息中心</a></li>
        <li><a href="http://www.fdsn.org" target="_blank" style="color: rgb(51, 51, 51);">美国数字宽频带地震台网联合会(FDSN)</a></li>
        <li><a href="http://www.iugg.org" target="_blank" style="color: rgb(51, 51, 51);">国际大地测量学与地球物理学联合会</a></li>
      </ul>
      <ul v-if="isActive === '3'" style="color: rgb(51, 51, 51); display: block;">
        <li v-for="item in list2" :key="item.id">
          <div style="cursor:pointer" @click="toUrl(item)">
            {{ item.unit }}
          </div>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  &.active {
    color: #2d8cf9;
    border-bottom-color: #2d8cf9;
  }
}

.list-decorate {
  position: relative;
  padding-left: 24px;
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    background-color: #2b94ed;
    border-radius: 2px;
    transform: rotate(45deg);
    transform-origin: center;
    margin-right: 8px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(45deg);
  }
}
</style>
