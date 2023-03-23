<template>
  <div class="right-sider">
    <div class="wenzhen area">
      <h2>全年战略目标</h2>
      <div class="year-target">
        <div class="water-wrap">
          <p class="target-text">已完成</p>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" style=" position: absolute; left: 0; top: 0" xml:space="preserve">
            <circle class="circle-ring" cx="500" cy="500" r="490"></circle>
          </svg>
          <div class="water-waves">
            <TargetWater ref="targetWaterRef"/>
          </div>
        </div>
      </div>
    </div>
    <div class="sexy area">
      <h2>名医榜</h2>
      <ul class="doctor-list" v-if="doctorList.length>0">
        <li classd="title">
          <span class="pos">
            <img :src="medalWhite">
          </span>
          <span class="name">姓名</span>
          <span class="job">职称</span>
          <span class="number">今日接诊</span>
        </li>
        <li v-for="(item, index) in doctorList" :key="'doctor-' + index">
          <span class="pos">
            <img v-if="index===0" :src="medal1" />
            <img v-if="index===1" :src="medal2" />
            <img v-if="index===2" :src="medal3" />
            <span v-if="index>2">{{ index+1 }}</span>
          </span>
          <span class="name"> {{ item.doctor_name }}</span>
          <span class="job">{{ item.doctor_title }}</span>
          <span class="number">{{ item.num }}</span>
        </li>
      </ul>
    </div>
    <div class="suggust area">
      <h2>名太医中医馆</h2>
      <div class="mty-content" ref="mtyScroll">
        <ul class="mty-list" ref="mtyScrollList">
          <li v-for="item in mingtaiyi" :key="item.name">
            <span class="province">{{ item.province }}</span>
            <span class="name">{{ item.name }}</span>
            <span class="stime">{{ item.time }}(开业)</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TargetWater from './TargetWater.vue'
const mingtaiyi = [
  {
    province: '重庆市',
    name: '名太医（重庆店）',
    time: '4月20日'
  },
  {
    province: '重庆市',
    name: '名太医（垫江店）',
    time: '4月20日'
  },
  {
    province: '云南省',
    name: '名太医（昆明店）',
    time: '4月25日'
  },
  {
    province: '北京市',
    name: '名太医（丰台店）',
    time: '5月1日'
  },
  {
    province: '天津市',
    name: '名太医（天津店）',
    time: '5月15日'
  },
  {
    province: '河南省',
    name: '名太医（郑州店）',
    time: '6月15日'
  },
  {
    province: '山东省',
    name: '名太医（济南店）',
    time: '6月15日'
  },
  {
    province: '四川省',
    name: '名太医（成都店）',
    time: '6月15日'
  }
]
export default {
  name: 'App',
  components: { TargetWater },
  data () {
    return {
      targetData: '37.28%',
      yearImg: require('../assets/cup.png'),
      medalWhite: require('../assets/medal-white.png'),
      medal1: require('../assets/medal-1.png'),
      medal2: require('../assets/medal-2.png'),
      medal3: require('../assets/medal-3.png'),
      doctorList: [],
      mingtaiyi,
      scrollArea: '',
      speed: 10,
      timer: null,
      delay: 4000,
      liHeight: '',
    }
  },
  created() {},
  mounted() {
    this.$nextTick(()=> {
      this.initScroll()
    })
  },
  methods: {
    initList(data) {
      this.doctorList = data
      this.doctorList.length = 5
    },
    initTarget(val) {
      this.targetData = val + '%'
      this.$refs.targetWaterRef.initWaves(val)
    },
    initScroll() {
      this.scrollArea = this.$refs.mtyScroll;
      let li = this.scrollArea.getElementsByTagName("li");
      this.liHeight = li[0].offsetHeight;
      this.scrollArea.scrollTop = 0;
      this.scrollArea.innerHTML += this.scrollArea.innerHTML;
      this.mingtaiyi.length > 1 && setTimeout(this.startScroll, this.delay);
    },
    startScroll(){
      this.timer = setInterval(this.scrollUp, this.speed);
      this.scrollArea.scrollTop++;
    },
    scrollUp(){
      if(this.scrollArea.scrollTop % this.liHeight == 0){
        clearInterval(this.timer);
        setTimeout(this.startScroll, this.delay);
      }else{
        this.scrollArea.scrollTop++;
        if(this.scrollArea.scrollTop >= this.scrollArea.scrollHeight / 2){
          this.scrollArea.scrollTop = 0;
        }
      }
    }
  }
}
</script>
