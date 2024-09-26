<script setup lang="ts">
const props = defineProps({
  data: Object as PropType<any>,
  title: String,
})
const emit = defineEmits(['close'])
function changeShow() {
  emit('close')
}
</script>

<template>
  <div class="markees">
    <div v-if="props.title === '活动断层'">
      <div class="header1">
        <span>活动断层{{ props.title }}</span>
        <i style="cursor: pointer" class="el-icon-close" @click="changeShow" />
      </div>
      <div>
        <div class="nav">
          <div class="title">
            断层名称
          </div>
          <div class="navTil">
            {{ data.FaultName === " " ? data['断层名称'] : data.FaultName }}
          </div>
        </div>

        <div class="main">
          <div class="txtmain">
            <div class="header">
              <span>断层性质：{{ data['断层性质'] }}</span>
            </div>
            <div class="txt">
              <span>活动时代: {{ data['活动时代'] }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-bottom: 1px solid #000; margin-bottom: 3px"
          >
            <div class="header">
              <span>断层倾向: {{ data['断层倾向'] }}</span>
            </div>
            <div class="txt">
              <span>断层倾角：{{ data['断层倾角'] }}</span>
              <span>断层走向：{{ data['断层走向'] }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-top: 1px solid #000"
          >
            <div class="header">
              <span>分发单位: </span>
            </div>
            <div class="txt">
              <span>联系人：王帅军</span>
              <span>联系方式：18337118971</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="props.title === '钻孔联合剖面'">
      <div class="header1">
        <span>{{ props.title }}</span>
        <i style="cursor: pointer" class="el-icon-close" @click="changeShow" />
      </div>
      <div>
        <div class="nav">
          <div class="title">
            摘要描述
          </div>
          <div class="navTil">
            {{ data.descriptions }}
          </div>
        </div>

        <div class="main">
          <div class="txtmain">
            <div class="header">
              <span>所属数据目录名称：{{ data.directoryName }}</span>
            </div>
            <div class="txt">
              <span>数据目录提供单位: {{ data.provider }}</span>
            </div>
            <div class="txt">
              <span>处理过程: {{ data.processingProcess }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-bottom: 1px solid #000; margin-bottom: 3px"
          >
            <div class="header">
              <span>所属项目名称: {{ data.projectName }}</span>
            </div>
            <div class="txt">
              <span>剖面名称：{{ data.lineName }}</span>
            </div>
            <div class="txt">
              <span>开工日期：{{ new Date(data.dateOfCommence).toLocaleDateString() }}</span>
            </div>
            <div class="txt">
              <span>竣工日期：{{ new Date(data.completionDate).toLocaleDateString() }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-top: 1px solid #000"
          >
            <div class="header">
              <span>分发方式: {{ data.distributionMode }}</span>
            </div>
            <div class="txt">
              <span>联系人：{{ data.personToContact }}</span>
            </div>
            <div class="txt">
              <span>联系方式：{{ data.phoneNum }}</span>
            </div>
            <div class="txt">
              <span>分发单位：{{ data.distributionDepartment }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="props.title === '人工地震勘探'">
      <div class="header1">
        <span>{{ props.title }}</span>
        <i style="cursor: pointer" class="el-icon-close" @click="changeShow" />
      </div>
      <div>
        <div class="nav">
          <div class="title">
            摘要描述
          </div>
          <div class="navTil">
            {{ data.descriptions }}
          </div>
        </div>

        <div class="main">
          <div class="txtmain">
            <div class="header">
              <span>所属数据目录名称：{{ data.directoryName }}</span>
            </div>
            <div class="txt">
              <span>数据目录提供单位: {{ data.providerUnit }}</span>
            </div>
            <div class="txt">
              <span>处理过程: {{ data.treatingProcesses }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-bottom: 1px solid #000; margin-bottom: 3px"
          >
            <div class="header">
              <span>所属项目名称: {{ data.projectName }}</span>
            </div>
            <div class="txt">
              <span>测线名称：{{ data.profileName }}</span>
            </div>
            <div class="txt">
              <span>起点桩号：{{ data.startNumber }}</span>
              <span>终点桩号：{{ data.endNumber }}</span>
            </div>
            <div class="txt">
              <span>道间距（m）：{{ data.trackPitch }}</span>
            </div>
            <div class="txt">
              <span>测线长度（km）：{{ data.lineNumber }}</span>
            </div>
            <div class="txt">
              <span>开工日期：{{ data.dateOfCommence }}</span>
            </div>
            <div class="txt">
              <span>竣工日期：{{ data.completionDate }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-top: 1px solid #000"
          >
            <div class="header">
              <span>分发方式: {{ data.distributionMode }}</span>
            </div>
            <div class="txt">
              <span>联系人：{{ data.personToContact }}</span>
            </div>
            <div class="txt">
              <span>联系方式：{{ data.phoneNum }}</span>
            </div>
            <div class="txt">
              <span>分发单位：{{ data.distributionDepartment }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="props.title === '地震测深'">
      <div class="header1">
        <span>地震测深</span>
        <i style="cursor: pointer" class="el-icon-close" @click="changeShow" />
      </div>
      <div>
        <div class="nav">
          <div class="title">
            线名称：{{ data.lineName }}
          </div>
        </div>

        <div class="main">
          <div class="txtmain">
            <div class="header">
              <span>目录名称：{{ data.directoryName }}</span>
            </div>
            <div class="txt">
              <span>处理方式: {{ data.processes }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-bottom: 1px solid #000; margin-bottom: 3px"
          >
            <div class="header">
              <span>地域: {{ data.region }}</span>
            </div>
            <div class="txt">
              <span>项目名称：{{ data.projectName }}</span>
            </div>
            <div class="txt">
              <span>观测日期：{{ data.viewDate }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-top: 1px solid #000"
          >
            <div class="header">
              <span>分发单位: {{ data.providerUnit }}</span>
            </div>
            <div class="txt">
              <span>联系人：{{ data.linkMan }}</span>
            </div>
            <div class="txt">
              <span>联系方式：{{ data.tel }}</span>
            </div>
            <div class="txt">
              <span>邮箱：{{ data.email }}</span>
            </div>
            <div class="txt">
              <span>分发方式：{{ data.sendType }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.markees {
  padding: 10px;
  .header1 {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    background-color: #529dde;
    color: #fff;
    font-size: 14px;
    i {
      display: inline-block;
      background-color: #fff;
      color: #000;
      padding: 2px;
    }
  }
  .nav {
    font-size: 12px;
    border-bottom: 2px solid #000;
    .props.title {
      margin: 5px 0;
      padding: 3px 5px;
      background-color: #529dde;
      color: #fff;
    }
    .navTil {
      background: #f0f0f0;
      padding: 5px 7px;
    }
  }
  .main {
    .txtmain {
      font-size: 13px;
      .header {
        display: flex;
        justify-content: space-between;
        padding: 3px;
        background-color: #cccccc;
        color: #000;
        span {
          flex: 1;
        }
      }

      .txt {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding: 3px;
        background-color: #fff;

        span {
          flex: 1;
          margin-right: 20px;
        }
      }
    }
  }

  .el-button {
    margin-left: 70px;
    margin-bottom: 10px;
  }
}
</style>
