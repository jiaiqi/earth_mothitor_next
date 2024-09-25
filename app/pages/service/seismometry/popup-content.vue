<script>
export default {
  props: ['markeArr', 'title', 'dataLength', 'stationName', 'datasize'],
  data() {
    return {
      // markeArr: this.marke
    }
  },
  created() {
    // console.log(this.markeArr)
    // console.log(this.markeArr.noiseLevel)
  },
  methods: {
    changShow() {
      this.$emit('markees', 'false')
    },
    selectShow(title) {
      if (title === '强震动数据' || title === '地震周边台站') {
        return false
      }
      else {
        return true
      }
    },
  },
}
</script>

<template>
  <div class="markees">
    <div class="header1">
      <span v-if="title != '强震动地震数据信息'">观测数据-{{ title }}</span>
      <span v-else>{{ title }}</span>
      <i
        v-if="selectShow(title)"
        style="cursor: pointer"
        class="el-icon-close"
        @click="changShow"
      />
    </div>
    <div v-if="title === '测震数据' && markeArr.noiseLevel">
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.staName }}({{ markeArr.staCode }})观测数据
        </div>
      </div>
      <div class="main">
        <div class="txtmain">
          <div class="txt">
            <span>测站代码: {{ markeArr.staCode }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="header">
            <span> 站网名称： {{ markeArr.netName }} </span>
            <span> 台站级别： {{ markeArr.staLevel }} </span>
          </div>
          <!-- <div class="txt">
            <span>起始时间: 2007/5/1</span>
            <span>终止时间: ---</span>
          </div> -->
        </div>
        <div
          class="txtmain"
          style="border-bottom: 1px solid #000; margin-bottom: 3px"
        >
          <div class="header">
            <span>观测环境：{{ markeArr.staArchitecture }}</span>
            <span> 建站时间： {{ new Date(markeArr.cTime).toLocaleDateString() }}</span>
          </div>
          <div class="txt">
            <span>井深：{{ markeArr.depth }}</span>
            <span>台基类型：{{ markeArr.staType }}</span>
          </div>
        </div>
        <div class="txtmain" style="border-top: 1px solid #000">
          <div class="txt">
            <span>数据格式: SEED</span>
            <!-- <span>数据量: {{dataLength}}</span> -->
          </div>
          <div v-if="markeArr.distributeUnit" class="txt">
            <span>联系单位：{{ markeArr.distributeUnit }}</span>
          </div>
          <div v-if="markeArr.distributeUnit" class="txt">
            <span>联系人：{{ markeArr.linkman }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系方式：{{ markeArr.phone }}</span>
          </div>
          <div v-if="markeArr.distributeUnit" class="txt">
            <span>邮箱：{{ markeArr.email }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '测震数据' && !markeArr.noiseLevel">
      <div class="nav">
        <!--          <div class="title">数据名称</div> -->
        <div class="navTil">
          {{ markeArr.staName }}({{ markeArr.staCode }})观测数据
        </div>
      </div>
      <div class="main">
        <div class="txtmain">
          <div class="txt">
            <!-- <span>测站名称: {{ this.markeArr.staName }}</span> -->
            <span>测站代码: {{ markeArr.staCode }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="header">
            <!--              <span> 站网名称： {{ this.stationName != '黑龙江省' ? this.stationName.slice(0,2):'黑龙江' }} </span> -->
            <span>站网名称：国家站网</span>
            <span> 建站时间： {{ markeArr.cTime === undefined ? "暂无数据" : new Date(markeArr.cTime).toLocaleDateString() }}</span>
          </div>
          <div class="txt">
            <span>起始时间: ---</span>
            <span>终止时间: ---</span>
          </div>
        </div>
        <div
          class="txtmain"
          style="border-bottom: 1px solid #000; margin-bottom: 3px"
        >
          <div class="header">
            <span>仪器类型：{{ JSON.parse(markeArr.staDescribe).yqlx }}</span>
          </div>
          <div class="txt">
            <span>采样率：100Hz</span>
            <span>数据格式: SEED</span>
          </div>
        </div>
        <div class="txtmain" style="border-top: 1px solid #000">
          <div class="txt">
            <span>数据量: {{ dataLength }}</span>
          </div>
          <div class="txt">
            <!--              <span>分发单位：{{ this.stationName }}地震局</span> -->
            <span>分发单位：中国地震台网中心</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '强震动数据'">
      <div class="nav">
        <div class="navTil">
          {{ markeArr.shockAddr }}{{ markeArr.shockLevel }}级地震信息
        </div>
      </div>
      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span>摘要描述：{{ this.markeArr.shockAddr }}地震数据</span>
          </div> -->
          <div class="txt">
            <span>震级: {{ markeArr.shockLevel }}级</span>
            <span>地震深度: {{ markeArr.depth }}KM</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="header">
            <span>发震日期: {{ markeArr.shockDate }}
              {{ markeArr.shockTime }}</span>
          </div>
          <!-- <div class="txt">
            <span>纬度: {{ this.markeArr.staLat }}</span>
            <span>经度: {{ this.markeArr.staLon }}</span>
          </div> -->
          <div class="txt">
            <span>数据量: {{ dataLength }}</span>
          </div>
          <div class="txtmain">
            <hr size="2" width="100%" color="black">
            <div class="header">
              <span>分发单位：中国地震局工程力学研究所</span>
            </div>
            <div class="txt">
              <span>分发联系人: 娄良琼</span>
            </div>
          </div>
          <div class="txt">
            <span>联系方式：csmnc@iem.ac.cn</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '强震动地震数据信息'">
      <div class="nav">
        <div class="navTil">
          {{ markeArr.shockAddr }}{{ markeArr.shockLevel }}级地震信息
        </div>
      </div>
      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span>摘要描述：{{ this.markeArr.shockAddr }}地震数据</span>
          </div> -->
          <div class="txt">
            <span>震级: {{ markeArr.shockLevel }}级</span>
            <span>地震深度: {{ markeArr.depth }}KM</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="header">
            <span>发震日期: {{ markeArr.shockDate }}
              {{ markeArr.shockTime }}</span>
          </div>
          <!-- <div class="txt">
            <span>纬度: {{ this.markeArr.staLat }}</span>
            <span>经度: {{ this.markeArr.staLon }}</span>
          </div> -->
          <div class="txt">
            <span>数据条数: {{ dataLength }}</span>
            <span>数据量: {{ datasize }}</span>
          </div>
          <div class="txtmain">
            <hr size="2" width="100%" color="black">
            <div class="header">
              <span>分发单位：中国地震局工程力学研究所</span>
            </div>
            <div class="txt">
              <span>分发联系人: 娄良琼</span>
            </div>
          </div>
          <div class="txt">
            <span>联系方式：csmnc@iem.ac.cn</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '强震动地震台站数据信息'">
      <div class="nav">
        <div class="navTil">
          {{ markeArr.staName }}信息
        </div>
      </div>
      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span>摘要描述：{{ this.markeArr.shockAddr }}地震数据</span>
          </div> -->
          <div class="txt">
            <span>台网名称:国家站网</span>
            <span>台站级别: {{ markeArr.staLevel }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="header">
            <span> 建站时间： {{ markeArr.cTime === undefined ? "暂无数据" : new Date(markeArr.cTime).toLocaleDateString() }}</span>
          </div>
          <div class="txt">
            <span>纬度: {{ markeArr.lat }}</span>
            <span>经度: {{ markeArr.lon }}</span>
          </div>
          <div class="txt">
            <span>台站类型: {{ markeArr.staType }}</span>
            <span>台站编码：{{ markeArr.staCode }}</span>
          </div>

          <div class="txtmain">
            <hr size="2" width="100%" color="black">
            <!--            <div class="header">
              <span>分发单位：{{ this.markeArr.offerunit }}</span>
            </div>
            <div class="txt">
              <span>分发联系人: {{ this.markeArr.linkman }}</span>
            </div> -->
          </div>
          <!--          <div class="txt">
            <span>联系方式：{{ this.markeArr.phone }}</span>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="title === '地震周边台站'">
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.sta_name }}{{ markeArr.sta_level }}台站
        </div>
      </div>
      <div class="main">
        <div class="txtmain">
          <div class="header">
            <span>
              {{ markeArr.sta_name
              }}{{ markeArr.sta_level }}台站</span>
          </div>
          <div class="txt">
            <span>台基类型: {{ markeArr.sta_type }}</span>
            <span>采样率: {{ markeArr.sampling_rate }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="header">
            <span>仪器名称: {{ markeArr.instrument }}</span>
          </div>
          <div class="txt">
            <span>记录器型号: {{ markeArr.recorder_model }}</span>
            <span>传感器型号: {{ markeArr.sensor_model }}</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="header">
            <span>数采类型:{{ markeArr.data_mining }} </span>
          </div>
          <span>分发单位：中国地震局物理研究所</span>
          <!-- <div class="txt">
            <span>经度: {{ this.markeArr.lon }}</span>
            <span>纬度: {{ this.markeArr.lat }}</span>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="title === '科学台阵'">
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.staName }}科学台阵数据
          <span style="padding-left: 100px;">数据量: {{ dataLength }}</span>
        </div>
      </div>
      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span
              >摘要描述：{{ this.markeArr.staName }}({{
                this.markeArr.staCode
              }})科学台阵数据</span
            >
          </div> -->
          <div class="txt">
            <!-- <span>测站名称: {{ this.markeArr.staName }}</span> -->
            <span>测站代码: {{ markeArr.staCode }}</span>
            <span>仪器名称：--</span>
          </div>
        </div>
        <div class="txtmain">
          <!-- <div class="txt">
            <span>纬度: {{ this.markeArr.staLat }}</span>
            <span>经度: {{ this.markeArr.staLon }}</span>
          </div> -->
        </div>
        <div class="txtmain">
          <hr size="2" width="100%" color="black">
          <div class="header">
            <span>分发单位：中国地震局物理研究所</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="txt">
            <span>分发联系人: 姚志祥</span>
          </div>
          <div class="txt">
            <span>联系方式: esdc@cea-igp.ac.cn</span>
          </div>
          <div class="txt">
            <span>申请获取：<a href="http://www.esdc.ac.cn/" target="_blank">http://www.esdc.ac.cn</a></span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="title === '模拟资料'">
      <div class="nav">
        <div class="title">
          数据名称
        </div>
        <div class="navTil">
          {{ markeArr.staName }}模拟资料数据
          <span style="padding-left: 70px;">数据量: {{ dataLength }}</span>
        </div>
      </div>
      <div class="main">
        <div class="txtmain">
          <!-- <div class="header">
            <span
              >摘要描述：{{ this.markeArr.staName }}({{
                this.markeArr.staCode
              }})科学台阵数据</span
            >
          </div> -->
          <div class="txt">
            <span>测站名称: {{ markeArr.staName }}</span>
            <span>测站代码: {{ markeArr.staCode }}</span>
          </div>
        </div>
        <!-- <div class="txtmain">
          <div class="txt">
            <span>纬度: {{ this.markeArr.lat }}</span>
            <span>经度: {{ this.markeArr.lon }}</span>
          </div>
        </div> -->
        <div class="txtmain">
          <hr size="2" width="100%" color="black">
          <div class="header">
            <span>分发单位：中国地震局第二监测中心</span>
          </div>
        </div>
        <div class="txtmain">
          <div class="txt">
            <span>分发联系人: 王文青</span>
          </div>
          <div class="txt">
            <span>联系方式: 13110466060</span>
          </div>
          <div class="txt">
            <span>申请获取：<a href="http://10.7.207.86:8078/#/homePage/" target="_blank">http://10.7.207.86:8078/#/homePage</a></span>
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
          a {
            color: #529dde;
          }
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
