//k线图配置项
import { defineStore } from "pinia";
import gaugeComp from "../components/gaugeComp.vue";

export const useGaugeStore = function (this: any, id: any) {
    return defineStore(id, {
        state: () => ({
            option: {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                  },
                  series: [
                    {
                      name: 'Pressure',
                      type: 'gauge',
                      detail: {
                        formatter: '{value}'
                      },
                      data: [
                        {
                          value: 50,
                          name: 'SCORE'
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
