<template>
  <div id='monthDatas' class="month-data"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'monthDatas',
  mounted() {},
  // 第二步
  methods: {
    init(data) {
      var chartDom = document.getElementById('monthDatas');
      const chartDomRect = chartDom.getBoundingClientRect()
      const wd = chartDomRect.width
      chartDom.setAttribute('style', 'height:' + wd * 0.25 + 'px')

      var myChart = echarts.init(chartDom);
      var option;

      const dateArr = data.map(item=> item.date.substring(5).replace('-', '/')).filter((item, index) => index%2!==0)
      const wenzhenArr = data.map(item => item.wenzhen_num).filter((item, index) => index%2!==0)
      // console.log(dateArr)

      // var json2 = {
      //   chart0: {
      //     xcategory: dateArr,
      //     low: wenzhenArr,
      //     lowLine: [],
      //   }
      // }
      // var zrUtil = echarts.util;
      // zrUtil.each(json2.chart0.xcategory, function(item, index) {
      //   json2.chart0.lowLine.push([{
      //       coord: [index, json2.chart0.low[index]]
      //   }, {
      //       coord: [index + 1, json2.chart0.low[index + 1]]
      //   }]);
      // });


      option = {
        color: ['#80FFA5'],
        grid: {
          left: '0',
          right: '0',
          top: '12',
          bottom: '0',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Line 1']
        },
        xAxis: {
          type: 'category',
          data: dateArr,
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
          max: 4000, //y轴最大值
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
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: '#005ffe'
                },
                {
                  offset: 0,
                  color: '#00efec'
                }
              ]),
              width: 5
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(5, 112, 233, 1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(5, 112, 233, 0.75)'
                },
                {
                  offset: 1,
                  color: 'transparent'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: wenzhenArr
          },
          // {
          //   name: '同比',
          //   type: 'lines',
          //   coordinateSystem: 'cartesian2d',
          //   zlevel: 1,
          //   smooth: true,
          //   symbol: 'circle',
          //   effect: {
          //       show: true,
          //       smooth: true,
          //       period: 2,
          //       symbolSize: 8
          //   },
          //   lineStyle: {
          //       normal: {
          //           color: '#15faff',
          //           width: 0,
          //           opacity: 0,
          //           curveness: 0,
          //       }
          //   },
          //   data: json2.chart0.lowLine
          // },
        ]
      };
      option && myChart.setOption(option);
    }
  }
}
</script>
