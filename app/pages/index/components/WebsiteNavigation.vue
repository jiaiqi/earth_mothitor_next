<script lang="ts" setup>
import { sites } from '~~/public/data/siteList'
import { childSpotList } from '~/api/notice'

const activeTab = ref('省级地震局')
const list2 = ref<any[]>([])
childSpotList().then((res) => {
  if (res?.records) {
    list2.value = [...res.records]
  }
})
</script>

<template>
  <div class="m-x-auto m-y-46px rounded-20px container md:max-w-1300px" border="1px solid #E5E5EA">
    <div class="rounded-[20px_20px_0_0] bg-#F1F6FF px-40px" border="1px solid #BCD7FF">
      <ul class="tabs flex">
        <li
          v-for="tab in sites" :key="tab.name"
          class="mr-100px cursor-pointer b-b-5px b-b-transparent b-solid py-12px text-18px tab"
          :class="{ active: activeTab === tab.name }" hover="text-#2d8cf9"
          @click="activeTab = tab.name"
        >
          {{ tab.name }}
        </li>
      </ul>
    </div>
    <ul
      v-for="tab in sites" v-show="activeTab === tab.name" :key="tab.name"
      class="min-h-220px px-50px py-20px"
    >
      <li v-for="site in tab.children" :key="site.name" class="list-decorate mr-30px inline-block min-w-75px line-height-60px">
        <a :href="site.href" target="_blank">{{ site.name }}</a>
      </li>
      <template v-if="activeTab === '3' && list2.length">
        <li v-for="site in list2" :key="site.name" class="list-decorate mr-30px inline-block min-w-75px line-height-60px">
          <a :href="site.href" target="_blank">{{ site.name }}</a>
        </li>
      </template>
    </ul>
    <!--
      <ul v-if="isActive === '3'" style="color: rgb(51, 51, 51); display: block;">
        <li v-for="item in list2" :key="item.id">
          <div style="cursor:pointer" @click="toUrl(item)">
            {{ item.unit }}
          </div>
        </li>
      </ul> -->
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
