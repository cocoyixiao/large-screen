<template>
  <div id='mapTest' class="china-map">
    <button id="pause-resume">点我</button>
  </div>
</template>

<script>
import * as echarts from 'echarts';
// import china from 'echarts/map/json/china.json'
import 'echarts/extension/bmap/bmap'


export default {
  name: 'mapTest',
  mounted() {},
  // 第二步
  methods: {
    init() {
      var geoCoordMap = {
        '宁津县': [116.79372,37.649619],
        '陵城区': [116.574929,37.332848],
        '乐陵市': [117.216657,37.729115],
        '庆云县': [117.390507,37.777724],
        '德城区': [116.307076,37.453923],
        '上海': [121.4648,31.2891],
        '中山': [113.4229,22.478],
        '丹东': [124.541,40.4242],
        '乌鲁木齐': [87.9236,43.5883],
        '佛山': [112.8955,23.1097],
        '兰州': [103.5901,36.3043],
        '包头': [110.3467,41.4899],
        '北京': [116.4551,40.2539],
        '北海': [109.314,21.6211],
        '南京': [118.8062,31.9208],
        '南宁': [108.479,23.1152],
        '南昌': [116.0046,28.6633],
        '厦门': [118.1689,24.6478],
        '合肥': [117.29,32.0581],
        '呼和浩特': [111.4124,40.4901],
        '哈尔滨': [127.9688,45.368],
        '大连': [122.2229,39.4409],
        '天津': [117.4219,39.4189],
        '太原': [112.3352,37.9413],
        '威海': [121.9482,37.1393],
        '宁波': [121.5967,29.6466],
        '常州': [119.4543,31.5582],
        '广州': [113.5107,23.2196],
        '成都': [103.9526,30.7617],
        '拉萨': [91.1865,30.1465],
        '昆明': [102.9199,25.4663],
        '杭州': [119.5313,29.8773],
        '武汉': [114.3896,30.6628],
        '沈阳': [123.1238,42.1216],
        '济南': [117.1582,36.8701],
        '海口': [110.3893,19.8516],
        '深圳': [114.5435,22.5439],
        '珠海': [113.7305,22.1155],
        '石家庄': [114.4995,38.1006],
        '福州': [119.4543,25.9222],
        '苏州': [120.6519,31.3989],
        '西安': [109.1162,34.2004],
        '贵阳': [106.6992,26.7682],
        '郑州': [113.4668,34.6234],
        '鄂尔多斯': [108.9734,39.2487],
        '重庆': [107.7539,30.1904],
        '长春': [125.8154,44.2584],
        '长沙': [113.0823,28.2568],
      };

      var BJData = [
        [{name:'北京'}, {name:'宁津县',value:15},{name:'time',value:405},{name:'distance',value:701},{name:'cost',value:303}],
        [{name:'北京'}, {name:'陵城区',value:25},{name:'time',value:416},{name:'distance',value:704},{name:'cost',value:304}],
        [{name:'北京'}, {name:'乐陵市',value:35},{name:'time',value:389},{name:'distance',value:667},{name:'cost',value:291}],
        [{name:'北京'}, {name:'庆云县',value:45},{name:'time',value:402},{name:'distance',value:697},{name:'cost',value:301}],
        [{name:'北京'}, {name:'德城区',value:55},{name:'time',value:404},{name:'distance',value:686},{name:'cost',value:297}],
      ];

      var SHData = [
        [{name:'北京'}, {name:'宁津县',value:15},{name:'time',value:405},{name:'distance',value:701},{name:'cost',value:303}],
        [{name:'北京'}, {name:'陵城区',value:25},{name:'time',value:416},{name:'distance',value:704},{name:'cost',value:304}],
        [{name:'北京'}, {name:'乐陵市',value:35},{name:'time',value:389},{name:'distance',value:667},{name:'cost',value:291}],
        [{name:'北京'}, {name:'庆云县',value:45},{name:'time',value:402},{name:'distance',value:697},{name:'cost',value:301}],
        [{name:'北京'}, {name:'德城区',value:55},{name:'time',value:404},{name:'distance',value:686},{name:'cost',value:297}],
      ];
      var GZData = [
        [{name:'北京'}, {name:'宁津县',value:15},{name:'time',value:405},{name:'distance',value:701},{name:'cost',value:303}],
        [{name:'北京'}, {name:'陵城区',value:25},{name:'time',value:416},{name:'distance',value:704},{name:'cost',value:304}],
        [{name:'北京'}, {name:'乐陵市',value:35},{name:'time',value:389},{name:'distance',value:667},{name:'cost',value:291}],
        [{name:'北京'}, {name:'庆云县',value:45},{name:'time',value:402},{name:'distance',value:697},{name:'cost',value:301}],
        [{name:'北京'}, {name:'德城区',value:55},{name:'time',value:404},{name:'distance',value:686},{name:'cost',value:297}],
      ];

      var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

      var myChart = echarts.init(document.getElementById('main'));
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
          
            if (fromCoord && toCoord) {
                // console.log(dataItem[2]);
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value,
                    time: dataItem[2].value,
                    distance: dataItem[3].value,
                    cost: dataItem[4].value
                });
            }
        }
        return res;
      };

      var color = ['#a6c84c', '#ffa022', '#46bee9'];
      var series = [];
      [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach(function (item, i) {
        series.push({
          name: item[0] + ' Top101',
          type: 'lines',
          coordinateSystem: 'bmap',
          zlevel: 2,
          effect: {
              show: false,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 20,
              // loop: false
          },
          lineStyle: {
              normal: {
                  color: color[i],
                  width: 1,
                  opacity: 0.4,
                  curveness: 0.2
              }
          },
          data: convertData(item[1])
        },
        {
          name: item[0] + ' Top101',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          geoIndex: 0,
          polyline:true,
          silent:true,
          lineStyle:{
            normal: {
              opacity: 0.2,
              width: 1
            }
          },
          progressiveThreshold: 500,
          progressive: 200,
          zlevel: 2,
          rippleEffect: {
              brushType: 'stroke'
          },
          label: {
              normal: {
                  show: true,
                  position: 'right',
                  formatter: '{b}'
              }
          },
          symbolSize: function (val) {
              return val[2] / 8;
          },
          itemStyle: {
              normal: {
                  color: color[i]
              }
          },
          data: item[1].map(function (dataItem) {
              return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
              };
          })
        });
      });

      myChart.setOption({
        animation: false,
        title: {
          text: '德州市辖区至北京首都机场',
          subtext: 'data from ',
          sublink: '',
          left: 'center',
          textStyle: {
              color: '#fff'
          }
        },
        tooltip : {
          trigger: 'item',
          formatter:function(params){
            if(params.seriesType=="effectScatter") {
                return "线路："+params.data.name+""+params.data.value[2];
            }else if(params.seriesType=="lines"){
                return params.data.toName+">"+params.data.fromName+"<br />"+"time: "+params.data.time+" distance: "+params.data.distance+" cost: "+params.data.cost;
            }else{
                return params.name;
            }
          }
        },
        legend: {
          orient: 'vertical',
          top: 'bottom',
          left: 'right',
          data:['北京 Top101', '上海 Top101', '广州 Top101'],
          textStyle: {
              color: '#fff'
          },
          selectedMode: 'single'
        },
        bmap: {
          center: [116.46, 39.92],
          zoom: 10,
          roam: true,
          selectedMode: 'single',
          itemStyle: {
              normal: {
                  areaColor: '#323c48',
                  borderColor: '#404a59',
                  borderWidth:10
              },
              emphasis: {
                  areaColor: '#2a333d'
              }
          },
          mapStyle: {
            'styleJson': [
              {
                'featureType': 'highway',
                'elementType': 'geometry',
                'stylers': {
                  'visibility': 'off',
                  'color': '#123456'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#000000'
                }
              },
            ]
          }
        },
        geo: {
          map: 'china',
          label: {
              normal: {
                  show: true,
                  formatter: '{a}',
                  // position: 'inside',
                  backgroundColor: '#fff',
                  padding: [3, 5],
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.5)',
                  color: '#777'
              },
              emphasis: {
                  areaColor: '#2a333d'
              }
          },
          selectedMode: 'single',
          roam: true,
          itemStyle: {
              normal: {
                  areaColor: '#323c48',
                  borderColor: '#404a59'
              },
              emphasis: {
                  areaColor: '#2a333d'
              }
          }
        },
        series: series
      });

      myChart.on('geoselectchanged', function (param) {
          var selected = [];
          echarts.util.each(param.selected, function (v, key) {
              v && selected.push(key);
          });
          document.getElementById('info').innerHTML = 'SELECTED: ' + selected.join(', ');
      });

        var isPaused = false;
      document.getElementById('pause-resume').onclick = function () {
        myChart.getZr().animation[isPaused ? 'resume' : 'pause']();
        isPaused = !isPaused;
      }
    }
  }
}
</script>