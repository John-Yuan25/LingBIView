//饼图配置项
import { defineStore } from "pinia";
import scatterComp from "../components/scatterComp.vue";

export const useScatterStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      option: {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68],
            ],
            type: "scatter",
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
      tag: scatterComp,
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
        this.option.series[0].data = data;
      },
    },
    // persist: true,
    persist: {
      key: id,
      // storage: window.sessionStorage,////保存的位置,默认是localstorage
    },
  });
};
export default useScatterStore;
