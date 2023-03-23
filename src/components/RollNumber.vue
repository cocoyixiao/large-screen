<template>
  <div class="chart-num">
    <ul class="box-item">
      <li :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
        v-for="(item,index) in orderNum"
        :key="index">
        <span v-if="!isNaN(item)">
          <i ref="numberItem">0123456789</i>
        </span>
        <span class="comma" v-else>{{item}}</span>
      </li>
    </ul>
  </div>
 </template>
 <script>
  export default {
   data() {
    return {
      timer: null,
      oldNumber: 0,
      newNumber: 0,
      orderNum: [], // 默认订单总数
    }
   },
   methods: {
    initRoll(num, dis) {
      clearTimeout(this.timer)
      this.oldNumber = num
      const arr = this.oldNumber.toString().split('')
      this.orderNum = arr
      this.$nextTick(()=> {
        this.setNumberTransform()
        this.increaseNumber(dis);
      })
    },
    // 定时增长数字
    increaseNumber(dis) {
      console.log(dis)
      const time = 5
      if (!dis) {
        return
      } else {
        const rollTime = parseInt((time * 60) / dis)
        this.startTimeout(rollTime, dis)
      }
    },
    startTimeout(rollTime, max) {
      this.timer = setTimeout(()=> {
        this.oldNumber++
        if (this.oldNumber < (this.oldNumber + max )) {
          this.startTimeout(rollTime, max)
        } else {
          clearTimeout(this.timer)
        }
        const arr = this.oldNumber.toString().split('')
        this.orderNum = arr
        this.$nextTick(()=> {
          this.setNumberTransform()
        })
      }, rollTime * 1000)
    },
     // 设置文字滚动
    setNumberTransform() {
     const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量
     const numberArr = this.orderNum.filter(item => !isNaN(item))
     // 结合CSS 对数字字符进行滚动,显示订单数量
     for (let index = 0; index < numberItems.length; index++) {
     const elem = numberItems[index]
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
     }
    }
   }
  }
 </script>
 <style scoped>
  .chart-num{
    text-align: center;
  }
   /*具体值value总量滚动数字设置*/
  .box-item {
    position: relative;
    height: 110px;
    font-size: 105px;
    font-weight: bold;
    text-align: center;
    list-style: none;
    color: #FFCB26;
    writing-mode: vertical-lr;
    text-orientation: upright;
    margin: -15px auto 25px;
    padding: 0;
    overflow: hidden;
  }
  /*滚动数字设置*/
  .number-item {
    width: 60px;
    height: 110px;
    line-height: 105px;
    list-style: none;
    float: left;
  }
  .number-item span{
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    overflow: hidden;
  }
  .number-item span i{
    font-style: normal;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,0);
    transition: transform 0.2s ease-in-out;
    line-height: 105px;
  }
  .number-item:last-child {
    margin-right: 0;
  }
 </style>