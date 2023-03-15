//地图配置项
import { defineStore } from "pinia";
import mapComp from "../components/mapComp.vue";

export const useMapStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      option: {
        tooltip: {
          show: true,
          enterable: true,
          alwaysShowContent: true,
          renderMode: "html",
          triggerOn: "mousemove",
          textStyle: {
            color: "rgba(8,14,26, .65)",
            fontFamily: "PingFangSC-Regular",
          },
          className: "china-map-tooltip-container",
        },
        geo: [
          {
            map: "china",
            itemStyle: {
              areaColor: "transparent",
            },
          },
          {
            show: false,
            type: "map",
            map: "china",
            zlevel: -2,
            zoom: 0.9,
            layoutCenter: ["50%", "50.5%"],
            layoutSize: "100%",
            roam: false,
            silent: true,
            selectedMode: false,
            itemStyle: {
              normal: {
                show: false,
                borderColor: "rgba(35, 161, 184,0.5)",
                shadowColor: "rgba(35, 161, 184,0.8)",
                shadowOffsetY: 5,
                shadowBlur: 15,
                areaColor: "#257AB2",
              },
            },
          },
          {
            show: false,
            type: "map",
            map: "china",
            zlevel: -3,
            zoom: 0.9,
            selectedMode: false,
            layoutCenter: ["50%", "51%"],
            layoutSize: "100%",
            roam: false,
            silent: true,
            itemStyle: {
              normal: {
                show: false,
                borderColor: "rgba(7, 65, 117,0.5)",
                shadowColor: "rgba(7, 65, 117,0.8)",
                shadowOffsetY: 15,
                shadowBlur: 8,
                areaColor: "#0A2763",
              },
            },
          },
        ],
        graphic: {
          elements: [
            {
              type: "image",
              left: 0,
              top: 0,
              transition: "all",
              z: -10,
              bounding: "raw",
              style: {
                image:
                  "/static/img/china-map-echarts-new.42c04a0ae92a0b3d489e.png",
                width: 890,
                height: 990,
              },
            },
          ],
        },
        series: [
          {
            zoom: 1,
            roam: false,
            name: "china",
            type: "map",
            map: "china",
            markPoint: {
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "rgba(72,150,128,1)",
                },
              },
              data: [],
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  color: "#fff",
                },
                color: "#fff",
                borderColor: "#32CBE0",
                borderWidth: 1.5,
                areaColor: {
                  type: "linear-gradient",
                  x: 0,
                  y: 1000,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0.5,
                      color: "#0D59C1", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#53C9C7", // 100% 处的颜色
                    },
                  ],
                  global: true, // 缺省为 false
                },
              },
              emphasis: {
                label: {
                  color: "#fff",
                },
                borderWidth: 3,
                borderColor: "rgba(255, 230, 175,0.8)",
                shadowColor: "rgba(255, 230, 175,0.5)",
                shadowBlur: 30,
                textStyle: {
                  color: "#fff",
                  fontSize: 12,
                  backgroundColor: "transparent",
                },
                // areaColor: new echarts.graphic.LinearGradient(
                //   0,
                //   0,
                //   0,
                //   1,
                //   [
                //     {
                //       offset: 0,
                //       color: "#1cfbfe",
                //     },
                //     {
                //       offset: 1,
                //       color: "#3348e7",
                //     },
                //   ],
                //   false
                // ),
              },
            },
            scaleLimit: {
              min: 0.7,
              max: 1.2,
            },
            label: {
              show: true,
              color: "tranparent",
            },
            emphasis: {
              label: {
                color: "transparent",
              },
            },
            select: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: "transparent",
              },
            },
            //  "itemStyle": {
            //      "areaColor": "transparent",
            //      "borderColor": "#366EF4",
            //      "borderType": "solid",
            //      "borderWidth": 1,
            //      "emphasis": {
            //          "areaColor": "rgba(0,43,255, .2)",
            //          "borderWidth": 1,
            //          "borderColor": "rgba(255,255,255,0.80)",
            //          "borderType": "solid",
            //          "shadowColor": "rgba(44,54,141,0.80)",
            //          "shadowBlur": 10
            //      }
            //  },
            tooltip: {
              show: false,
            },
            selectedMode: false,
            data: [
              {
                name: "贵州",
                axis: [106.649489, 26.648344],
                id: 1,
                provinceName: "贵州",
                cityName: "贵阳市",
                longitude: "106.649489",
                latitude: "26.648344",
              },
              {
                name: "重庆",
                axis: [106.559515, 29.562189],
                id: 2,
                provinceName: "重庆",
                cityName: "重庆",
                longitude: "106.559515",
                latitude: "29.562189",
              },
              {
                name: "山西",
                axis: [112.554428, 37.876185],
                id: 5,
                provinceName: "山西",
                cityName: "",
                longitude: "112.554428,",
                latitude: "37.876185",
              },
              {
                name: "辽宁",
                axis: [123.47282, 41.682537],
                id: 6,
                provinceName: "辽宁",
                cityName: "沈阳市",
                longitude: "123.47282",
                latitude: "41.682537",
              },
              {
                name: "广东",
                axis: [113.26683, 23.135336],
                id: 7,
                provinceName: "广东",
                cityName: "广州市",
                longitude: "113.26683",
                latitude: "23.135336",
              },
              {
                name: "山东",
                axis: [121.451542, 37.469582],
                id: 8,
                provinceName: "山东",
                cityName: "烟台市",
                longitude: "121.451542",
                latitude: "37.469582",
              },
              {
                name: "北京",
                axis: [116.415112, 39.910481],
                id: 11,
                provinceName: "北京",
                cityName: "北京",
                longitude: "116.415112",
                latitude: "39.910481",
              },
              {
                name: "山东",
                axis: [118.811791, 36.881091],
                id: 12,
                provinceName: "山东",
                cityName: "寿光市",
                longitude: "118.811791",
                latitude: "36.881091",
              },
              {
                name: "江西",
                axis: [115.862285, 28.689709],
                id: 13,
                provinceName: "江西",
                cityName: "南昌市",
                longitude: "115.862285",
                latitude: "28.689709",
              },
              {
                name: "云南",
                axis: [102.835993, 24.884436],
                id: 14,
                cityName: "昆明市",
                longitude: "102.835993",
                latitude: "24.884436",
              },
              {
                name: "云南",
                axis: [100.229013, 26.862462],
                id: 15,
                provinceName: "云南",
                cityName: "丽江市",
                longitude: "100.229013",
                latitude: "26.862462",
              },
              {
                name: "山东",
                axis: [117.024967, 36.682785],
                id: 16,
                provinceName: "山东",
                cityName: "济南市",
                longitude: "117.024967",
                latitude: "36.682785",
              },
              {
                name: "江苏",
                axis: [120.438335, 32.2],
                id: 17,
                provinceName: "江苏",
                cityName: "常熟市",
                longitude: "120.438335",
                latitude: "32.2",
              },
              {
                name: "浙江",
                axis: [119.4, 30.4],
                id: 18,
                cityName: "桐乡市",
                longitude: "119.4",
                latitude: "30.4",
              },
              {
                name: "上海",
                axis: [122.5, 30.888601],
                id: 19,
                cityName: "上海",
                longitude: "122.5",
                latitude: "30.888601",
              },
              {
                name: "浙江",
                axis: [121.824231, 29.166189],
                id: 20,
                provinceName: "浙江",
                cityName: "宁波市",
                longitude: "121.824231",
                latitude: "29.166189",
              },
            ],
            // markPoint: {
            //   data: [
            //     {
            //       type: "icon",
            //       coord: [106.649489, 26.648344],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/贵阳@3x.png",
            //       symbolSize: 50,
            //       name: "贵州",
            //       axis: [106.649489, 26.648344],
            //       id: 1,
            //       provinceName: "贵州",
            //       cityName: "贵阳市",
            //       longitude: "106.649489",
            //       latitude: "26.648344",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/贵阳@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [106.559515, 29.562189],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/重庆@3x.png",
            //       symbolSize: 50,
            //       name: "重庆",
            //       axis: [106.559515, 29.562189],
            //       id: 2,
            //       provinceName: "重庆",
            //       cityName: "重庆",
            //       longitude: "106.559515",
            //       latitude: "29.562189",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/重庆@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [112.554428, 37.876185],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/山西@3x.png",
            //       symbolSize: 50,
            //       name: "山西",
            //       axis: [112.554428, 37.876185],
            //       id: 5,
            //       provinceName: "山西",
            //       cityName: "",
            //       longitude: "112.554428,",
            //       latitude: "37.876185",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/山西@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [123.47282, 41.682537],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/沈阳@3x.png",
            //       symbolSize: 50,
            //       name: "辽宁",
            //       axis: [123.47282, 41.682537],
            //       id: 6,
            //       provinceName: "辽宁",
            //       cityName: "沈阳市",
            //       longitude: "123.47282",
            //       latitude: "41.682537",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/沈阳@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [113.26683, 23.135336],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/广州@3x.png",
            //       symbolSize: 50,
            //       name: "广东",
            //       axis: [113.26683, 23.135336],
            //       id: 7,
            //       provinceName: "广东",
            //       cityName: "广州市",
            //       longitude: "113.26683",
            //       latitude: "23.135336",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/广州@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [121.451542, 37.469582],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/烟台@3x.png",
            //       symbolSize: 50,
            //       name: "山东",
            //       axis: [121.451542, 37.469582],
            //       id: 8,
            //       provinceName: "山东",
            //       cityName: "烟台市",
            //       longitude: "121.451542",
            //       latitude: "37.469582",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/烟台@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [116.415112, 39.910481],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/北京@3x.png",
            //       symbolSize: 50,
            //       name: "北京",
            //       axis: [116.415112, 39.910481],
            //       id: 11,
            //       provinceName: "北京",
            //       cityName: "北京",
            //       longitude: "116.415112",
            //       latitude: "39.910481",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/北京@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [118.811791, 36.881091],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/潍坊@3x.png",
            //       symbolSize: 50,
            //       name: "山东",
            //       axis: [118.811791, 36.881091],
            //       id: 12,
            //       provinceName: "山东",
            //       cityName: "寿光市",
            //       longitude: "118.811791",
            //       latitude: "36.881091",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/潍坊@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [115.862285, 28.689709],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/南昌@3x.png",
            //       symbolSize: 50,
            //       name: "江西",
            //       axis: [115.862285, 28.689709],
            //       id: 13,
            //       provinceName: "江西",
            //       cityName: "南昌市",
            //       longitude: "115.862285",
            //       latitude: "28.689709",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/南昌@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [102.835993, 24.884436],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/昆明@3x.png",
            //       symbolSize: 50,
            //       name: "云南",
            //       axis: [102.835993, 24.884436],
            //       id: 14,
            //       provinceName: "云南",
            //       cityName: "昆明市",
            //       longitude: "102.835993",
            //       latitude: "24.884436",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/昆明@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [100.229013, 26.862462],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/丽江@3x.png",
            //       symbolSize: 50,
            //       name: "云南",
            //       axis: [100.229013, 26.862462],
            //       id: 15,
            //       provinceName: "云南",
            //       cityName: "丽江市",
            //       longitude: "100.229013",
            //       latitude: "26.862462",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/丽江@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [117.024967, 36.682785],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/济南@3x.png",
            //       symbolSize: 50,
            //       name: "山东",
            //       axis: [117.024967, 36.682785],
            //       id: 16,
            //       provinceName: "山东",
            //       cityName: "济南市",
            //       longitude: "117.024967",
            //       latitude: "36.682785",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/济南@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [120.438335, 32.2],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/苏州@3x.png",
            //       symbolSize: 50,
            //       name: "江苏",
            //       axis: [120.438335, 32.2],
            //       id: 17,
            //       provinceName: "江苏",
            //       cityName: "常熟市",
            //       longitude: "120.438335",
            //       latitude: "32.2",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/苏州@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [119.4, 30.4],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/桐乡@3x.png",
            //       symbolSize: 50,
            //       name: "浙江",
            //       axis: [119.4, 30.4],
            //       id: 18,
            //       provinceName: "浙江",
            //       cityName: "桐乡市",
            //       longitude: "119.4",
            //       latitude: "30.4",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/桐乡@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [122.5, 30.888601],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/上海@3x.png",
            //       symbolSize: 50,
            //       name: "上海",
            //       axis: [122.5, 30.888601],
            //       id: 19,
            //       provinceName: "上海",
            //       cityName: "上海",
            //       longitude: "122.5",
            //       latitude: "30.888601",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/上海@3x.png",
            //     },
            //     {
            //       type: "icon",
            //       coord: [121.824231, 29.166189],
            //       symbolOffset: [0, -16],
            //       symbol:
            //         "image://https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/宁波@3x.png",
            //       symbolSize: 50,
            //       name: "浙江",
            //       axis: [121.824231, 29.166189],
            //       id: 20,
            //       provinceName: "浙江",
            //       cityName: "宁波市",
            //       longitude: "121.824231",
            //       latitude: "29.166189",
            //       iconUrl:
            //         "https://bj.bcebos.com/v1/iip-sk-dashboard-fe-resource-int-prod/大屏/宁波@3x.png",
            //     },
            //   ],
            // },
          },
          {
            name: "省份客户数",
            type: "effectScatter",
            coordinateSystem: "geo",
            hoverAnimation: true,
            animation: true,
            showEffectOn: "render",
            rippleEffect: {
              period: 2,
              scale: 3,
              brushType: "fill",
              number: 1,
            },
            tooltip: {
              show: false,
            },
            data: [],
          },
        ],
      },
      attribute: [
        {
          name: "宽度",
          type: "number",
          key: "width",
          value: 500,
          placeholder: "请输入宽度",
        },
        {
          name: "高度",
          type: "number",
          key: "height",
          value: 300,
          placeholder: "请输入高度",
        },
        {
          name: "层级",
          type: "number",
          key: "z-index",
          value: 1,
        },
      ],
      tag: mapComp,
      sandShow: false,
      ajaxUrl: "",
      currDataSource: "静态数据",
      timeout: <unknown>undefined,
      ajaxMethod: "get",
      timer: <any>null,
    }),
    getters: {},
    actions: {
      importOption(data) {
        this.option = data;
      },
    },
    // persist: true,
    persist: {
      key: id,
      // storage: window.sessionStorage,////保存的位置,默认是localstorage
    },
  });
};
export default useMapStore;
