<script>
export default {
  props: ['markeArr', 'title', 'dataLength', 'stationName', 'beginTime', 'days', 'unit'],
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
    <div class="header1">
      <span>观测数据-{{ title }}</span>
      <i style="cursor: pointer" class="el-icon-close" @click="changShow" />
    </div>

    <div v-if="title === 'GNSS台站信息'">
      <div class="nav">
        <div class="title">
          台站名称
        </div>
        <div class="navTil">
          {{ markeArr.roll }}
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <div class="txt">
            <span>台站代码: {{ markeArr.dit }}</span>
            <span>台站名称: {{ markeArr.sta_name }}</span>
          </div>
          <div class="txt">
            <div>建站时间：{{ new Date(markeArr.cTime).toLocaleDateString() }}</div>
          </div>
        </div>
        <div class="txtmain">
          <div class="txt">
            <span>纬度: {{ markeArr.latitude.toFixed(2) }}</span>
            <span>经度: {{ markeArr.longitude.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === 'GNSS连续观测站点信息'">
      <div class="nav">
        <div class="navTil">
          {{ markeArr.pointDescribe }}
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <div class="txt">
            <span>站点代码: {{ markeArr.pointCode }}</span>
            <span>站点名称: {{ markeArr.pointName }}</span>
          </div>
          <div class="txt">
            <div>建站时间：{{ markeArr.cTime }}</div>
          </div>
        </div>
        <div class="txtmain">
          <div class="txt">
            <span>纬度: {{ markeArr.lat }}</span>
            <span>经度: {{ markeArr.lon }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === 'GNSS台站数据信息'">
      <div class="nav">
        <div class="title">
          描述：{{ markeArr.descriptions }}
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <div class="txt">
            <span>数据目录名称: {{ markeArr.directoryName }}</span>
          </div>
          <div class="txt">
            <span>分发方式: {{ markeArr.distributionMode }}</span>
          </div>
          <div class="txt">
            <span>完整率：{{ markeArr.dataState }}</span>
          </div>
          <div class="txt">
            <span>更新频率：{{ markeArr.frequency }}</span>
            <span>处理方式：{{ markeArr.processes }}</span>
          </div>
        </div>
        <div class="txtmain">
          <hr size="2" width="100%" color="black">
          <div class="txt">
            <span>分发单位：{{ markeArr.sendUnit }}</span>
          </div>
          <div class="txt">
            <div>联系人：{{ markeArr.linkMan }}</div>
          </div>
          <div class="txt">
            <div>联系方式：{{ markeArr.tel }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '重力'">
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.sta_name }}台站
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span
              >摘要描述：{{ this.markeArr.sta_name }}({{
                this.markeArr.sta_code
              }})重力数据</span
            >
          </div> -->
          <div class="txt">
            <span>台站代码: {{ markeArr.sta_code }}</span>
            <span>建站时间：{{ markeArr.cTime }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="txt">
            <!-- <span>纬度: {{ this.markeArr.sta_lat.toFixed(2) }}</span>
            <span>经度: {{ this.markeArr.sta_lon.toFixed(2) }}</span> -->
            <!-- <span>纬度: {{ this.markeArr.lat.toFixed(2) }}</span> -->
            <!-- <span>经度: {{ this.markeArr.lon.toFixed(2) }}</span> -->
          </div>
        </div>
        <div class="txtmain">
          <hr size="2" width="100%" color="black">
          <div class="txt">
            <span>分发单位：中国地震局物理研究所</span>
          </div>
          <div class="txt">
            <div>联系人：无</div>
            <span style="padding-left:80px">数据量：{{ dataLength }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '流体'">
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.testName }}
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <div class="header">
            <span>
              台站名称: {{ markeArr.stationName }}
            </span>
          </div>
          <div class="txt">
            <span>台站代码: {{ markeArr.stationCode }}</span>
          </div>
          <div class="txt">
            <span>建站时间：{{ new Date(markeArr.buildTime).toLocaleDateString() }}</span>
          </div>
          <div class="txt">
            <span>台网代码: {{ markeArr.networkCode }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="txt">
            <span>纬度: {{ markeArr.latitude.toFixed(2) }}</span>
            <span>经度: {{ markeArr.longitude.toFixed(2) }}</span>
          </div>
          <div class="txt">
            <span>开始结束时间：{{ markeArr.beginEndTime }}</span>
          </div>
          <div class="txt">
            <span>仪器名称：{{ markeArr.apparatusName }}</span>
          </div>
          <div class="txt">
            <span>场地类型：{{ markeArr.landType }}</span>
          </div>
          <div class="txt">
            <span>采样率：{{ markeArr.samplingRate }}</span>
          </div>
          <div v-if="markeArr.sendUnit" class="txtmain">
            <hr size="2" width="100%" color="black">
            <div class="txt">
              <span>分发单位：{{ markeArr.sendUnit }}</span>
            </div>
            <div class="txt">
              <div>联系人/联系方式：{{ markeArr.linkMan }} / {{ markeArr.tel }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '电磁'">
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.sta_name }}台站
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span
              >摘要描述：{{ this.markeArr.sta_name }}({{
                this.markeArr.sta_code
              }})电磁数据</span
            >
          </div> -->
          <div class="txt">
            <span>台站代码: {{ markeArr.sta_code }}</span>
            <span>建站时间：{{ markeArr.cTime }}</span>
          </div>
        </div>
        <!-- <div class="txtmain">
          <div class="txt">
            <span>纬度: {{this.markeArr.staLon}}</span>
            <span>经度: {{this.markeArr.staLat}}</span>
          </div>
        </div> -->
        <div class="txtmain">
          <hr size="2" width="100%" color="black">
          <div class="txt">
            <span>数据量：{{ dataLength }}</span>
          </div>
          <div class="txt">
            <span>分发单位：{{ stationName }}地震局</span>
          </div>
          <div class="txt">
            <div>联系人：无</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '定点形变'">
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.sta_name }}台站
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span
              >摘要描述：{{ this.markeArr.sta_name }}({{
                this.markeArr.sta_code
              }})电磁数据</span
            >
          </div> -->
          <div class="txt">
            <span>台站代码: {{ markeArr.sta_code }}</span>
            <span>建站时间：{{ markeArr.cTime }}</span>
          </div>
        </div>
        <!-- <div class="txtmain">
          <div class="txt">
            <span>纬度: {{ this.markeArr.sta_lat.toFixed(2) }}</span>
            <span>经度: {{ this.markeArr.sta_lon.toFixed(2) }}</span>
          </div>
        </div> -->
        <div class="txtmain">
          <hr size="2" width="100%" color="black">
          <div class="txt">
            <span>分发单位：{{ stationName }}地震局</span>
          </div>
          <div class="txt">
            <div>联系人：无</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '流动形变'">
      <!-- <textarea :value="JSON.stringify(this.markeArr)"></textarea> -->
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.lineName }}
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span>摘要描述：{{ this.markeArr.lineName }}测线</span>
          </div> -->
          <div class="txt">
            <span>开始时间: {{ markeArr.time.slice(0, 4) }}</span>
            <span>测站数量: {{ markeArr.latAndLon.length }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="header">
            <span>建站时间：{{ markeArr.time }}</span>
          </div>
          <!-- <div class="txt">
            <span>纬度: {{ this.markeArr.latAndLon[0][0].toFixed(2) }} ~ {{ this.markeArr.latAndLon[this.markeArr.latAndLon.length - 1][0].toFixed(2) }}</span>
            <span>经度: {{ this.markeArr.latAndLon[0][1].toFixed(2) }} ~ {{ this.markeArr.latAndLon[this.markeArr.latAndLon.length - 1][1].toFixed(2) }}</span>
          </div> -->
        </div>
        <div class="txtmain">
          <hr size="2" width="100%" color="black">
          <div class="txt">
            <span>分发单位：{{ unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '地震地质数据'">
      <!-- <textarea :value="JSON.stringify(this.markeArr)"></textarea> -->
      <div class="nav">
        <div class="title">
          目录名称
        </div>
        <div class="navTil">
          {{ markeArr.dataCatalog }}
        </div>
      </div>

      <div class="main">
        <div class="txtmain">
          <div class="header">
            <span>摘要描述：{{ markeArr.descriptions }}</span>
          </div>
          <div class="txt">
            <span>提供单位: {{ markeArr.provider }}</span>
            <span>调查点名称: {{ markeArr.surveySiteName }}</span>
          </div>
          <div class="txt">
            <span>处理过程: {{ markeArr.processingProcess }}</span>
            <span>调查点内容: {{ markeArr.surveyContent }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="txt">
            <span>所属项目名称: {{ markeArr.projectName }}</span>
          </div>
          <div class="txt">
            <span>纬度: {{ markeArr.latitude }}</span>
            <span>经度: {{ markeArr.longitude }}</span>
          </div>
        </div>
        <div class="txtmain">
          <hr size="2" width="100%" color="black">
          <div class="txt">
            <span>镜像: {{ markeArr.mirrorImage }}</span>
            <span>调查日期：{{ markeArr.surveyDate }}</span>
          </div>
          <div class="txt">
            <span>分发方式：{{ markeArr.distributionMode }}</span>
          </div>
          <div class="txt">
            <span>分发单位：{{ markeArr.distributionDepartment }}</span>
            <span>联系人：{{ markeArr.personToContact }}</span>
          </div>
          <div class="txt">
            <span>联系电话：{{ markeArr.phoneNum }}</span>
          </div>
          <div class="txt">
            <span>电子邮件：{{ markeArr.email }}</span>
          </div>
          <div class="txt">
            <span>维护和更新频率：{{ markeArr.updateFrequency }}</span>
          </div>
          <div class="txt">
            <span>质量标准：{{ markeArr.qualityStandard }}</span>
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
    font-size: 17px;
    i {
      display: inline-block;
      background-color: #fff;
      color: #000;
      padding: 2px;
    }
  }
  .nav {
    font-size: 15px;
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
      font-size: 15px;
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
        font-size: 13px;
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
