<template>
  <div class="left-sider">
    <div class="wenzhe area">
      <h2>问诊情况</h2>
      <ul class="wenzhen-datas">
        <li>
          <p class="number"> {{ yearData }}</p>
          <p class="desc">本年问诊量</p>
          <img :src="iconYear" />
        </li>
        <li>
          <p class="number"> {{ monthData }}</p>
          <p class="desc">本月问诊量</p>
          <img :src="iconMonth" />
        </li>
        <li>
          <p class="number"> {{ weekData }}</p>
          <p class="desc">本周问诊量</p>
          <img :src="iconWeek" />
        </li>
      </ul>
    </div>
    <div class="sexy area">
      <h2>患者性别分布</h2>
      <div class="sexy-content">
        <div class="sexy-item">
          <div class="sexy-area">
            <img :src="imgMan" />
            <div class="sexy-man">
              <CircleRing
                :rate="manData"
                bg-ring-color="#13387e"
                ring-color="#00BFF3"
                :stroke-width="32"
                :part="1"
                :part-gap="0"
              >
                <span>
                  <span>{{ `${(manData * 100).toFixed(0)}%` }}</span>
                </span>
              </CircleRing>
            </div>
          </div>
          <p class="sexy-name">男</p>
        </div>
        <div class="sexy-item">
          <div class="sexy-area">
            <img :src="imgWoman" />
            <div class="sexy-man">
              <CircleRing
                :rate="womanData"
                bg-ring-color="#13387e"
                ring-color="#EE4FA7"
                :stroke-width="32"
                :part="1"
                :part-gap="0"
              >
                <span>
                  <span>{{ `${(womanData * 100).toFixed(0)}%` }}</span>
                </span>
              </CircleRing>
            </div>
          </div>
          <p class="sexy-name">女</p>
        </div>
      </div>
    </div>
    <div class="suggust area">
      <h2>投诉意见</h2>
      <div id='SuggestCharts' class="suggest-charts"></div>
    </div>
  </div>
</template>

<script>
import CircleRing from './CircleRing.vue'
import * as echarts from 'echarts';
export default {
  name: 'LeftSider',
  components: {
    CircleRing
  },
  data() {
    return {
      iconYear: require('../assets/img-year.png'),
      iconMonth: require('../assets/img-month.png'),
      iconWeek: require('../assets/img-week.png'),
      imgMan: require('../assets/man.png'),
      imgWoman: require('../assets/woman.png'),
      yearData: 0,
      monthData: 0,
      weekData: 0,
      manData: 0,
      womanData: 0
    }
  },
  mounted() {},
  methods: {
    initWenZhen(y,m,w) {
      this.yearData = y;
      this.monthData = m;
      this.weekData = w
    },
    initManWoman(a, b) {
      this.manData = a
      this.womanData = b
    },
    initSuggest(data) {
      const monthNames = data.map(item => item.month.split('-')[1]).reverse()
      const monthData =  data.map(item => item.num).reverse()
      var chartDom = document.getElementById('SuggestCharts');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        darkMode: true,
        color: ['#5470c6'],
        barWidth: 12,
        grid: {
          left: '0',
          right: '0',
          top: '12',
          bottom: '0',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: monthNames,
          axisLabel: {
            interval: 0,
            textStyle: {
              //文字样式
              color: 'rgba(255, 255, 255, 0.6)',
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(255, 255, 255, 0.6)',
              width: '1'
            }
          },
          axisTick: false
        },
        yAxis: {
          min: 0, //y轴的最小值
          max: 10, //y轴最大值
          type: 'value',
          axisLabel: {
            interval: 0,
            textStyle: {
              //文字样式
              color: 'rgba(255, 255, 255, 0.6)',
            }
          },
          splitLine: {
            // 去除网格线
            show: false,
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(255, 255, 255, 0.6)',
              width: '1'
            }
          }
        },
        series: [
          {
            data: monthData,
            type: 'bar',
            showBackground: true,
            backgroundStyle: { //背景颜色，加透明度
              color: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 12,
              borderType: 'solid',
              borderRadius: 6
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: [6, 6, 6, 6]
              },
              normal: {
                barBorderRadius: [6, 6, 6, 6],
                color: function() {
                  return new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: '#00A2FF' // 0% 处的颜色
                  },
                    {
                      offset: 1,
                      color: '#00CCD2' // 100% 处的颜色
                    }
                  ], false)
                }
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    }
  }
}
</script>
