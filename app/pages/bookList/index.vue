<script lang="ts" setup>
import { decode ,encode} from '~/utils/base/dataEncry'
const prodList = ref<any[]>(
    [
        {
          name: '地震工程与工程振动',
          url: 'https://www.springer.com/journal/11803/'
        },
        {
          name: '山西地震',
          url: 'https://shxdzj.gov.cn/qkzz/'
        },
        {
          name: '地震学报',
          url: 'http://dzxbzz.juqk.net/'
        },
        {
          name: '地震地质',
          url: 'https://www.dzdz.ac.cn/CN/0253-4967/home.shtml'
        },
        {
          name: '世界地震工程',
          url: '无'
        },
        {
          name: '防灾减灾工程学报',
          url: 'http://fzjzgcxb.ijournals.cn/fzjzgcxb/home'
        },
        {
          name: '中国地震',
          url: 'http://zgdz.eq-j.cn/zgdz/ch/index.aspx'
        },
        {
          name: '地震',
          url: 'http://dizhen.ief.ac.cn/CN/1000-3274/home.shtml'
        },
        {
          name: '地震研究',
          url: 'http://dzyj.soripan.net/'
        },
        {
          name: '地震地磁观测与研究',
          url: 'http://www.dzdczz.com/'
        },
        {
          name: '地震工程学报',
          url: 'http://dzgcxb.ijournals.cn/xbdz/home'
        },
        {
          name: '华南地震',
          url: 'http://www.hndzzz.cn/'
        },
        {
          name: '华北地震科学',
          url: 'http://www.nceqsci.com/'
        },
        {
          name: '震灾防御技术',
          url: 'https://www.eq-cedpc.cn/special/40'
        },
        {
          name: '内陆地震',
          url: 'https://lldz.nxhh.net/'
        },
        {
          name: '地震工程与工程振动：英文版',
          url: 'http://www.cquc.net:8088/C/PeriodicalProfile-dzgcygczd-e.aspx#introduction'
        },
        {
          name: '高原地震',
          url: 'http://gydz.mlunwen.com/'
        },
        {
          name: '城市与减灾',
          url: 'http://csjz.cbpt.cnki.net/WKD/WebPublication/index.aspx?mid=csjz'
        },
        {
          name: '大地测量与地球动力学',
          url: 'http://www.jgg09.com/CN/volumn/current.shtml'
        },
        {
          name: '大地测量与地球动力学：英文版',
          url: 'https://www.sciencedirect.com/journal/geodesy-and-geodynamics'
        },
        {
          name: '地球与行星物理论评（中英文）',
          url: 'https://www.sjdz.org.cn/'
        },
        {
          name: '地震动态与参考',
          url: '无'
        },
        {
          name: '地震译文集',
          url: '无'
        },
        {
          name: '地震研究进展（英文）',
          url: 'https://www.editorialmanager.com/eqrea/default2.aspx'
        },
        {
          name: '地震研究（英文）',
          url: '无'
        },
        {
          name: '地震科学进展',
          url: 'https://www.gjdzdt.cn/'
        },
        {
          name: '地震地质译丛',
          url: 'http://dzdzyc.400qikan.com/'
        },
        {
          name: '福建地震(现已停刊)',
          url: 'https://fujdz.xueshu.com.cn/'
        },
        {
          name: '防灾博览',
          url: 'https://fzbl.nxhh.net/'
        },
        {
          name: '防灾减灾学报',
          url: 'http://ddyj.cbpt.cnki.net/'
        },
        {
          name: '国际地震动态',
          url: 'https://www.gjdzdt.org.cn/'
        },
        {
          name: '地震学报：英文版',
          url: 'https://www.dzxb.org/indexen.htm'
        },
        {
          name: '四川地震',
          url: 'http://www.scdzj.gov.cn/dzpd/scdz/'
        },
        {
          name: '自然灾害学报',
          url: 'http://zrzhxb.mlunwen.com/'
        }
      ]
)
const routePath = [{ name: '首页', path: '/' }, { name: '图书报刊' }]
function toDetail(item){
        window.open(item.url)
}

</script>

<template>
    <div>
        <CommonPageContainer title="图书报刊" desc="PROFESSIONAL WEBSITE" :path="routePath">
            <div class="my-20px bg-#F6F7FA px-20px py-10px md:px-60px md:py-30px">
                <div class="hidden items-center justify-between md:flex mb-5">
                    <div class="flex items-center justify-between line-height-30px">
                        <span class="text-20px text-#1684FC font-700">
                            图书报刊
                        </span>
                        <span class="mx-10px text-#C7C7CC">|</span>
                        <span class="text-14px text-#C7C7CC">
                            PROFESSIONAL WEBSITE
                        </span>
                    </div>
                </div>
                <PublicList :list="prodList" type="图书报刊" @click-item="toDetail">
                </PublicList>
            </div>

        </CommonPageContainer>
    </div>
</template>

<style></style>
