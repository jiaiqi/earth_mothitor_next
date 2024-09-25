<script>
export default {
  props: ['markeArr', 'title'],
  data() {
    return {
      // markeArr: this.marke
    }
  },
  created() {
    // console.log(this.markeArr)
  },
  methods: {
    changShow() {
      this.$emit('markees', 'false')
    },
  },
}
</script>

<template>
  <div class="markees">
    <div v-if="title === '活动断层'">
      <div class="header1">
        <span>活动断层{{ title }}</span>
        <i style="cursor: pointer" class="el-icon-close" @click="changShow" />
      </div>
      <div>
        <div class="nav">
          <div class="title">
            断层名称
          </div>
          <div class="navTil">
            {{ markeArr.FaultName == " " ? markeArr['断层名称'] : markeArr.FaultName }}
          </div>
        </div>

        <div class="main">
          <div class="txtmain">
            <div class="header">
              <span>断层性质：{{ markeArr['断层性质'] }}</span>
            </div>
            <div class="txt">
              <span>活动时代: {{ markeArr['活动时代'] }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-bottom: 1px solid #000; margin-bottom: 3px"
          >
            <div class="header">
              <span>断层倾向: {{ markeArr['断层倾向'] }}</span>
            </div>
            <div class="txt">
              <span>断层倾角：{{ markeArr['断层倾角'] }}</span>
              <span>断层走向：{{ markeArr['断层走向'] }}</span>
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

    <div v-if="title === '钻孔联合剖面'">
      <div class="header1">
        <span>{{ title }}</span>
        <i style="cursor: pointer" class="el-icon-close" @click="changShow" />
      </div>
      <div>
        <div class="nav">
          <div class="title">
            摘要描述
          </div>
          <div class="navTil">
            {{ markeArr.descriptions }}
          </div>
        </div>

        <div class="main">
          <div class="txtmain">
            <div class="header">
              <span>所属数据目录名称：{{ markeArr.directoryName }}</span>
            </div>
            <div class="txt">
              <span>数据目录提供单位: {{ markeArr.provider }}</span>
            </div>
            <div class="txt">
              <span>处理过程: {{ markeArr.processingProcess }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-bottom: 1px solid #000; margin-bottom: 3px"
          >
            <div class="header">
              <span>所属项目名称: {{ markeArr.projectName }}</span>
            </div>
            <div class="txt">
              <span>剖面名称：{{ markeArr.lineName }}</span>
            </div>
            <div class="txt">
              <span>开工日期：{{ new Date(markeArr.dateOfCommence).toLocaleDateString() }}</span>
            </div>
            <div class="txt">
              <span>竣工日期：{{ new Date(markeArr.completionDate).toLocaleDateString() }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-top: 1px solid #000"
          >
            <div class="header">
              <span>分发方式: {{ markeArr.distributionMode }}</span>
            </div>
            <div class="txt">
              <span>联系人：{{ markeArr.personToContact }}</span>
            </div>
            <div class="txt">
              <span>联系方式：{{ markeArr.phoneNum }}</span>
            </div>
            <div class="txt">
              <span>分发单位：{{ markeArr.distributionDepartment }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="title === '人工地震勘探'">
      <div class="header1">
        <span>{{ title }}</span>
        <i style="cursor: pointer" class="el-icon-close" @click="changShow" />
      </div>
      <div>
        <div class="nav">
          <div class="title">
            摘要描述
          </div>
          <div class="navTil">
            {{ markeArr.descriptions }}
          </div>
        </div>

        <div class="main">
          <div class="txtmain">
            <div class="header">
              <span>所属数据目录名称：{{ markeArr.directoryName }}</span>
            </div>
            <div class="txt">
              <span>数据目录提供单位: {{ markeArr.providerUnit }}</span>
            </div>
            <div class="txt">
              <span>处理过程: {{ markeArr.treatingProcesses }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-bottom: 1px solid #000; margin-bottom: 3px"
          >
            <div class="header">
              <span>所属项目名称: {{ markeArr.projectName }}</span>
            </div>
            <div class="txt">
              <span>测线名称：{{ markeArr.profileName }}</span>
            </div>
            <div class="txt">
              <span>起点桩号：{{ markeArr.startNumber }}</span>
              <span>终点桩号：{{ markeArr.endNumber }}</span>
            </div>
            <div class="txt">
              <span>道间距（m）：{{ markeArr.trackPitch }}</span>
            </div>
            <div class="txt">
              <span>测线长度（km）：{{ markeArr.lineNumber }}</span>
            </div>
            <div class="txt">
              <span>开工日期：{{ markeArr.dateOfCommence }}</span>
            </div>
            <div class="txt">
              <span>竣工日期：{{ markeArr.completionDate }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-top: 1px solid #000"
          >
            <div class="header">
              <span>分发方式: {{ markeArr.distributionMode }}</span>
            </div>
            <div class="txt">
              <span>联系人：{{ markeArr.personToContact }}</span>
            </div>
            <div class="txt">
              <span>联系方式：{{ markeArr.phoneNum }}</span>
            </div>
            <div class="txt">
              <span>分发单位：{{ markeArr.distributionDepartment }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="title === '地震测深'">
      <div class="header1">
        <span>地震测深</span>
        <i style="cursor: pointer" class="el-icon-close" @click="changShow" />
      </div>
      <div>
        <div class="nav">
          <div class="title">
            线名称：{{ markeArr.lineName }}
          </div>
        </div>

        <div class="main">
          <div class="txtmain">
            <div class="header">
              <span>目录名称：{{ markeArr.directoryName }}</span>
            </div>
            <div class="txt">
              <span>处理方式: {{ markeArr.processes }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-bottom: 1px solid #000; margin-bottom: 3px"
          >
            <div class="header">
              <span>地域: {{ markeArr.region }}</span>
            </div>
            <div class="txt">
              <span>项目名称：{{ markeArr.projectName }}</span>
            </div>
            <div class="txt">
              <span>观测日期：{{ markeArr.viewDate }}</span>
            </div>
          </div>
          <div
            class="txtmain"
            style="border-top: 1px solid #000"
          >
            <div class="header">
              <span>分发单位: {{ markeArr.providerUnit }}</span>
            </div>
            <div class="txt">
              <span>联系人：{{ markeArr.linkMan }}</span>
            </div>
            <div class="txt">
              <span>联系方式：{{ markeArr.tel }}</span>
            </div>
            <div class="txt">
              <span>邮箱：{{ markeArr.email }}</span>
            </div>
            <div class="txt">
              <span>分发方式：{{ markeArr.sendType }}</span>
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
    .title {
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
