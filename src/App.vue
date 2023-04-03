<template>
<div id="app">
  <ScaleBox :width="1920" :height="1080" bgc="transparent" :delay="100">
    <template>
      <div class="login-area" v-if="!hanLogin">
        <div class="login area">
          <h2>登录</h2>
          <div class="login-content">
            <div class="pwd-line">
              <span>密码：</span>
              <input v-model="password" type="text" @keyup.enter="submit" />
            </div>
            <p class="error-msg" v-if="errorMsg">{{ errorMsg }}</p>
            <button class="login-btn" @click="submit">登录</button>
          </div>
        </div>
      </div>
      <div class="page" v-else>
        <div class="header">
          <h1>名医在线数据大屏</h1>
          <p class="time">{{ time }}</p>
          <p class="header-bg"></p>
        </div>
        <div class="wrapper">
          <LeftSider ref="leftSiderRef" />
          <div class="content">
            <div class="total-content">
              <div class="patient total-area">
                <RollNumber ref="rollPatientRef" />
                <!-- <p class="number" ref="patientRef">{{ todayPatient }}</p> -->
                <p class="total-title">今日服务患者</p>
              </div>
              <div class="doctor total-area">
                <RollNumber ref="rollDoctorRef" />
                <p class="total-title">今日接诊医生</p>
              </div>
            </div>
            <MonthData ref="monthRef" />
            <div class="map-waper">
              <MapChina ref="mapRef" />
            </div>
          </div>
          <RightSider ref="rightSiderRef" />
        </div>
      </div>
    </template>
  </ScaleBox>
</div>
</template>

<script>
import ScaleBox from 'vue2-scale-box'
import MapChina from './components/MapChina.vue'
import MonthData from './components/MonthData.vue'
import LeftSider from './components/LeftSider.vue'
import RightSider from './components/RightSider.vue'
import RollNumber from './components/RollNumber.vue'
import {
  login,
  indexData,
  getDoctorDatas
} from './api/coin'
import {
  setToken,
  getToken
} from './utils/auth'
import {
  getAppToken
} from './utils/get-token'
import {
  queryParams
} from './utils/_util'
export default {
  name: 'App',
  components: {
    ScaleBox,
    MonthData,
    MapChina,
    LeftSider,
    RightSider,
    RollNumber
  },
  data() {
    return {
      hanLogin: false,
      todayPatient: 0,
      todayDoctor: 0,
      todayPatientOld: 0,
      todayDoctorOld: 0,
      time: '',
      token: '',
      doctorList: [],
      indexData: null,
      wenzhenNumber: 0,
      updateTime: 5 * 60 * 1000,
      password: '',
      errorMsg: '',
      timer: null
    }
  },
  mounted() {
    const source = queryParams('from')
    if (source === 'app') {
      getAppToken().then(res => {
        setToken(res)
        this.initDatas()
      }).catch(e => {
        console.log(e)
      })
    } else {
      const hasToken = getToken()
      if (hasToken) {
        this.initDatas()
      }
    }
    this.initBodySize()
  },
  watch: {
    password(val) {
      if (!val) {
        this.errorMsg = ''
      }
    }
  },
  methods: {
    submit() {
      login({
        pwd: this.password
      }).then(res => {
        if (res.message) {
          this.errorMsg = res.message
          return
        }
        if (res.code===200) {
          const token = res.data.token
          setToken(token)
          this.initDatas()
        }
      })
    },
    initDatas() {
      this.hanLogin = true
      this.getIndexDatas()
      this.initTime()
    },
    initTime() {
      this.creatTime()
      setInterval(() => {
        this.creatTime()
      }, 1000)
    },
    getIndexDatas() {
      indexData({}).then(res => {
        if (!res.code) {
          this.hanLogin = false
          return
        } else {
          this.hanLogin = true
          this.indexData = res.data
          this.$refs.rightSiderRef.initTarget(res.data.target_per)
          this.updateDatas()
        }
      })
    },
    updateDatas() {
      getDoctorDatas({}).then(data => {
        const res = data.data
        const result = res.wenzhenNum
        // 中间大数字
        this.todayPatientOld = this.todayPatient || result.today.pat_num
        this.todayPatient = result.today.pat_num
        const disPat = this.todayPatient - this.todayPatientOld
        console.log(this.todayPatientOld, disPat)
        this.$refs.rollPatientRef.initRoll(this.todayPatientOld, disPat)

        this.todayDoctorOld = this.todayDoctor || result.today.doc_num
        this.todayDoctor = result.today.doc_num
        const disDoc = this.todayDoctor - this.todayDoctorOld
        this.$refs.rollDoctorRef.initRoll(this.todayDoctorOld, disDoc)

        this.wenzhenNumber = result.today.wenzhen_num

        // 左侧数据计算
        this.resetLeftData()
        // 右侧医生列表
        this.$refs.rightSiderRef.initList(result.doctorList)
        // 初始化中间数据
        this.$refs.monthRef.init(this.indexData.history_num)
        this.$refs.mapRef.init(this.indexData.pharmacyorder30)
        
        this.timer = setTimeout(()=> {
          this.updateDatas()
        }, this.updateTime)
      })
    },
    resetLeftData() {
      const leftRef = this.$refs.leftSiderRef
      const wzNum = this.indexData.wenzhenNum
      const yearData = wzNum.year.wenzhen_num + this.wenzhenNumber
      const monthData = wzNum.month.wenzhen_num + this.wenzhenNumber
      const weekData = wzNum.week.wenzhen_num + this.wenzhenNumber
      leftRef.initWenZhen(yearData, monthData, weekData)

      leftRef.initManWoman(wzNum.year.man_per / 100, wzNum.year.woman_per / 100)

      leftRef.initSuggest(this.indexData.complain)
    },
    creatTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const dates = date.getDate();
      const day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
      const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      this.time = year + "年" + month + "月" + dates + "日 " + hour + ":" + minute + ":" + seconds + " " + day;
    },
    initBodySize() {
      var bodyStyle = document.createElement('style')
      bodyStyle.innerHTML = `body{width:1920px; height:1080px!important;}`
      document.documentElement.firstElementChild.appendChild(bodyStyle)

      function refreshScale() {
        let docWidth = document.documentElement.clientWidth;
        let docHeight = document.documentElement.clientHeight;
        var designWidth = 1920
        var designHeight = 1080
        var widthRatio = docWidth / designWidth
        var heightRatio = docHeight / designHeight; // 缩放比例
        document.body.style = `transform:scale(" + widthRatio + "," + heightRatio + ");transform-origin:left top;`;
        // 应对浏览器 全屏切换前后 窗口因短暂滚动条问题出现未占满情况
        setTimeout(function () {
          var lateWidth = document.documentElement.clientWidth,
            lateHeight = document.documentElement.clientHeight;
          if (lateWidth === docWidth) return;

          widthRatio = lateWidth / designWidth
          heightRatio = lateHeight / designHeight
          document.body.style = "transform:scale(" + widthRatio + "," + heightRatio + ");transform-origin:left top;"
        }, 0)
      }
      refreshScale()

      window.addEventListener("pageshow", function (e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
          refreshScale()
        }
      }, false);
      window.addEventListener("resize", refreshScale, false);
    }
  }
}
</script>

<style>
@import "./assets/css/page.css"
</style>
