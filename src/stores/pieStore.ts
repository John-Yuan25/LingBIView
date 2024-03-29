//饼图配置项
import { defineStore } from "pinia";
import pieComp from "../components/pieComp.vue";
import * as echarts from 'echarts';

export const usePieStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      option: {
        dataset: {
          dimensions: ["product", "data1"],
          source: [
            { product: "Mon", data1: 300 },
            { product: "Tue", data1: 200 },
            { product: "Wed", data1: 150 },
            { product: "Thu", data1: 80 },
            { product: "Fri", data1: 70 },
            { product: "Sat", data1: 110 },
            { product: "Sun", data1: 130 },
          ],
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["50%", "80%"],
            center: ['50%', '56%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
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
      tag: pieComp,
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
export default usePieStore;
