import { defineStore } from "pinia";
import categoryBarComp from "../components/categoryBarComp.vue";

export const useCategoryBarStore = function (this: any, id: any) {
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
        series: [{ type: "bar" }],
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
