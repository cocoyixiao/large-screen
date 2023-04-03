<template>
  <div id='mapTest' class="china-map"></div>
</template>

<script>
import * as echarts from 'echarts';
import china from 'echarts/map/json/china.json'
import 'echarts/extension/bmap/bmap'
// const iconUrl = require('../assets/flag.png');
const yaofangData = [
  '河北省石家庄市',
  '江苏省徐州市',
  '四川省成都市',
  '河南省郑州市',
  '北京市通州区',
  '湖南省长沙市',
  '江苏省无锡市',
  '山西省太原市',
  '重庆市巴南区',
  '北京市平谷区',
  '北京市朝阳区',
  '河南省郑州市',
  '四川省成都市',
  '辽宁省沈阳市',
  '北京市丰台区',
  '广东省广州市',
  '北京市朝阳区',
  '广东省广州市',
  '河北省安国市',
  '上海市闵行区',
  '山东省济南市',
  '天津市武清区',
  '河南省郑州市',
  '四川省成都市',
  '北京市大兴区',
  '北京市平谷区'
]

const shuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
};

export default {
  name: 'mapTest',
  mounted() {},
  // 第二步
  methods: {
    init(data) {
      const allProvince = china.features.map(item => item.properties.name)
      const visualMap = {
        bottom: 20,
        left: 20,
        pieces: [
          {
            lte: 1,
            color: '#9ED7FF'
          },
          {
            gt: 1,
            lte: 3,
            color: '#2b90da'
          },
          {
            gt: 3,
            lte: 5,
            color: '#217bd8'
          },
          {
            gt: 5,
            lte: 7,
            color: '#0048c7'
          },
          {
            gt: 7,
            color: '#0d3bba'
          }
        ],
        outOfRange: {
          color: '#ffffff'
        },
        label: { // 基本的一些样式
          show: true,
          color: '#ffffff'
        }
      }

      // console.log(allProvince)
      
      data.forEach(item => {
        if (item.province.includes('省')){
          this.$set(item, 'name', item.province.replace('省', ''))
        } else if (item.province.includes('市')){
          this.$set(item, 'name', item.province.replace('市', ''))
        } else if (item.province.includes('新疆')) {
          this.$set(item, 'name', '新疆')
        } else if (item.province.includes('西藏')) {
          this.$set(item, 'name', '西藏')
        } else if (item.province.includes('内蒙古')) {
          this.$set(item, 'name', '内蒙古')
        } else if (item.province.includes('广西')) {
          this.$set(item, 'name', '广西')
        } else if (item.province.includes('宁夏')) {
          this.$set(item, 'name', '宁夏')
        } else if (item.province.includes('重庆')) {
          this.$set(item, 'name', '重庆')
        } else if (item.province.includes('香港')) {
          this.$set(item, 'name', '香港')
        } else if (item.province.includes('澳门')) {
          this.$set(item, 'name', '澳门')
        }
      })
    
      data = data.filter(item => !!item.name)
      data.forEach((item, index) => {
        if (!allProvince.includes(item.name)) {
          data.splice(index, 1)
        }
      })
      
      // return false
      let geoCoordMap = require('../assets/data-level.json')
      data.forEach(item => {
        this.$set(item, 'value', item.per)
        this.$set(item, 'count', 0)
        yaofangData.forEach(yf => {
          if (yf.includes(item.name)){
            const count = item.count ? (item.count + 1) : 1
            this.$set(item, 'count', count)
          }
        })

        const obj = geoCoordMap.filter(sub => sub.name === item.name)[0]
        if (obj && obj.local) {
          this.$set(item, 'local', obj.local)
          this.$set(item, 'weight', obj.weight)
        }
      })

      // 筛选有药房的省
      function filterYaofangCity() {
        const cityArr = JSON.parse(JSON.stringify(data))
        cityArr.forEach(item => {
          item.count = 0
          yaofangData.forEach(sub => {
            if (sub.includes(item.name)) {
              item.count = item.count ? (item.count + 1) : 1
            }
          })
        })
        return cityArr
      }
      //生成全国药房的数量
      const cityArr = filterYaofangCity()
      // 有药房省有药房的数量
      // const citys = cityArr.filter(item => item.count > 0)
      // console.log(citys)
      // 比较函数
      // function compare(a, b) {
      //   let comparison = 0;
      //   if (a.count < b.count) {
      //     comparison = 1;
      //   } else if (a.count > b.count) {
      //     comparison = -1;
      //   }
      //   return comparison;
      // }
      // 药房数量从小到大排列
      // const centerCitys = citys.sort(compare)

      // 按药房的数量生成全国各省市坐标
      function creatAllPositions() {
        let arr = []
        // console.log(data)
        data.forEach(item => {
          const obj = JSON.parse(JSON.stringify(item))
          if (!obj.local) {
            obj.local.push(1)
          }
          obj.value = obj.local
          obj.symbolSize = obj.count===0 ? 2 : obj.count * 1.2
          obj.itemStyle = {
            normal: {
              color: "#ffffff"
            }
          }
          delete obj.count
          arr.push(obj)
        })
        return arr
      }

      const allCitys = creatAllPositions()
      const fromAndTo = [
        {
          from: '北京',
          to: ['内蒙古',  '山西',  '天津']
        },
        {
          from: "河南",
          to: [ '山西', '陕西', '江苏', '湖北', '安徽']
        },
        {
          from: "四川",
          to: ['西藏', '青海', '云南', '贵州', '广西', '重庆', '陕西', '甘肃']
        },
        {
          from: "河北",
          to: ['河南',  '山西',  '宁夏']
        },
        {
          from: "江苏",
          to: ['河南',  '安徽', '浙江', '江西']
        },
        {
          from: "上海",
          to: ['浙江', '江苏', '福建']
        },
        {
          from: "广东",
          to: [ '湖北', '广西', '云南', '贵州', '福建', '香港', '澳门', '海南']
        },
        {
          from: "山西",
          to: [ '北京', '陕西', '青海', '内蒙古']
        },
        {
          from: "山东",
          to: ['江苏', '河北', '辽宁', '天津', '浙江']
        },
        {
          from: "辽宁",
          to: ['内蒙古', '吉林', '黑龙江', '天津', '北京']
        },
        {
          from: "天津",
          to: ['山东',  '河北', '内蒙古']
        },
        {
          from: "重庆",
          to: ['陕西', '湖北', '四川', '甘肃', '广西', '新疆']
        },
        {
          from: "湖南",
          to: [ '湖北', '江西', '广西', '福建', '江苏', '香港']
        }
      ]

      function creatLines() {
        let temp = []
        let secArr = []
        fromAndTo.forEach(item => {
          let subArr = []
          const fromName = item.from
          const fromObj = cityArr.filter(cen => cen.name === fromName)[0]
          
          const toList = item.to
          toList.forEach(to => {
            const toObj = cityArr.filter(cen => cen.name === to)[0]
            const temp = {}
            temp.fromName = fromObj.name
            temp.toName = toObj.name
            temp.coords = [
              fromObj.local, toObj.local
            ]
            subArr.push(temp)
          })
          shuffle(subArr)
          secArr.push(subArr)
        })
        temp = [].concat.apply([], secArr)
        return temp
      }

      // 生成从中心药房到各大城市的飞行线路
      // function creatMoveLines() {
      //   let temp = []
      //   let secArr = []
      //   centerCitys.forEach(city => {
      //     let subArr = []
      //     cityArr.forEach(sub => {
      //       if (city.name !== sub.name) {
      //         const obj = {}
      //         obj.fromName = city.name
      //         obj.toName = sub.name
      //         obj.coords = [
      //           city.local, sub.local
      //         ]
      //         subArr.push(obj)
      //       }
      //     })
      //     shuffle(subArr)
      //     secArr.push(subArr)
      //   })
      //   temp = [].concat.apply([], secArr)
      //   return temp
      // }
      const movePos = creatLines()
      // console.log(movePos)

      var allData = {
        "citys": allCitys,
        "moveLines": movePos
      }
      var mapDom = document.getElementById('mapTest');
      mapDom.setAttribute('style', 'height:630px')
      var myChart = echarts.init(mapDom, 'dark')
      var option;
      // 接上图第三步，在useEchart方法内
      echarts.registerMap('china', china);   // 定义这个地图数据为 ‘china’，后续会用
      myChart.setOption(option = {
        backgroundColor: 'transparent',
        title: {
          top: 60,
          text: '全国供应链分布',
        },
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          containLabel: true
        },
        visualMap: visualMap,
        geo: [{   // 绘制geo地图
          map: "china", // 定义的数据名称
          roam: false,
          aspectScale: 0.9,
          layoutCenter: ["50%", "50%"],
          layoutSize: 800,
          zoom: 1,
          itemStyle: {
            normal: {
              borderWidth: 1, //边际线大小
              borderColor: "#d0d0d0", //边界线颜色
            },
          },
          label: { // 基本的一些样式
            show: true,
            // 自定义label
            formatter: (params) => {
              const find = data.find(
                (item) => item.province ===params.name
              )
              if (find) {
                return `{name|${find.province}}`
              }
            },
            color: '#ffffff',

          },
          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                normal: {
                  opacity: 1,
                }
              }
            },
          ],
        }],
        series: [
          {
            name: '全国节点',
            type: 'map',
            roam: true,
            mapType: 'china', // 自定义扩展图表类型
            label: {
              show: true
            },
            itemStyle: {
              normal: {
                color: "#ffffff",
              }
            },
            geoIndex: '0', // 先不加这个属性
            data: data,
          },
          {
            name: '地点',
            // type: 'effectScatter', // 特效散点图
            // coordinateSystem: 'geo', // 'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
            // zlevel: 2, // 所有图形的 zlevel 值。
            // rippleEffect: { //涟漪特效相关配置。
            //   brushType: 'fill', //波纹的绘制方式，可选 'stroke' 和 'fill'。
            //   period: 4, // 动画的时间。
            //   scale: 2.5, // 动画中波纹的最大缩放比例。
            // },
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 4,
            symbolSize: 30,
            label: {
              normal: {
                show: false,
              }
            },
            itemStyle: {
              normal: {
                color: '#c9b972'
              }
            },
            rippleEffect: {
              scale: 10,
              brushType: 'stroke'
            },
            data: allData.citys
          },
          {
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 5, //箭头指向速度，值越小速度越快
                trailLength: 0.3, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 5, //图标大小
            },
            lineStyle: {
              normal: {
                color: '#FFCB26',
                width: 1, //线条宽度
                opacity: 0.1, //尾迹线条透明度
                curveness: .3 //尾迹线条曲直度
              }
            },
            data: allData.moveLines
          }
        ]
      })
      option && myChart.setOption(option);
    }
  }
}
</script>
