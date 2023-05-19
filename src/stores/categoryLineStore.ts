import { defineStore } from "pinia";
import categoryLineComp from "../components/categoryLineComp.vue";
import * as echarts from 'echarts';

export const useCategoryLineStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      option: {
        grid:{ // 让图表占满容器
          top:"20px",
          left:"40px",
          right:"15px",
          bottom:"25px"
        },
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
        series: [{ type: "line" }],
        xAxis: { type: "category" },
        yAxis: { type: "value" },
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
      tag: categoryLineComp,
      sandShow: false,
      mqttShow: false,
      ajaxUrl: "",
      currDataSource: "静态数据",
      timeout: <unknown>undefined,
      ajaxMethod: "get",
      timer: <any>null,

      clientId:'emqx_cloud60c531',
      username:'admin',
      password:'123456',
      mqttUrl:'wss://c6482b84.ala.cn-hangzhou.emqxsl.cn:8084/mqtt',
      topic:'testtopic/1',
      
    }),
    getters: {

    },
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
export default useCategoryLineStore;
