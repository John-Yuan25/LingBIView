//k线图配置项
import { defineStore } from "pinia";
import gaugeComp from "../components/gaugeComp.vue";
import * as echarts from 'echarts';


export const useGaugeStore = function (this: any, id: any) {
    return defineStore(id, {
        state: () => ({
          option :{
            series: [
              {
                min: 0,
                max: 1400,
                type: 'gauge',
                radius: "110%",
                center: ['50%', '60%'],
                axisLine: {
                  lineStyle: {
                    width: 30,
                    color: [
                      [0.3, '#67e0e3'],
                      [0.7, '#37a2da'],
                      [1, '#fd666d']
                    ]
                  }
                },
                pointer: {
                  itemStyle: {
                    color: 'inherit'
                  }
                },
                axisTick: {
                  distance: -30,
                  length: 8,
                  lineStyle: {
                    color: '#fff',
                    width: 2
                  }
                },
                splitLine: {
                  distance: -30,
                  length: 30,
                  lineStyle: {
                    color: '#fff',
                    width: 4
                  }
                },
                axisLabel: {
                  color: 'inherit',
                  distance: 30,
                  fontSize: 10
                },
                detail: {
                  valueAnimation: true,
                  formatter: '{value}',
                  color: 'inherit'
                },
                data: [
                  {
                    value: 577
                  }
                ]
              }
            ]
          },
            attribute: [
                {
                    name: "宽度",
                    type: "number",
                    key: "width",
                    value: 400,
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
            tag: gaugeComp,
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
export default useGaugeStore;
