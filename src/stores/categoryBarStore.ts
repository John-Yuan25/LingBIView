import { defineStore } from "pinia";
import categoryBarComp from "../components/categoryBarComp.vue";
import * as echarts from 'echarts';

export const useCategoryBarStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid:{ // 让图表占满容器
          top:"20px",
          left:"40px",
          right:"15px",
          bottom:"25px"
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: [ '2018', '2019', '2020', '2021', '2022']
        },
        series: [
          {
              label: {
              show: true,
              position: 'inside'
            },
            type: 'bar',
            data: [1100, 1200, 688, 888, 666]
          },
       
        ]
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
      tag: categoryBarComp,
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
export default useCategoryBarStore;
