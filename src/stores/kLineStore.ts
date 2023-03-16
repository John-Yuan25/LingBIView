//k线图配置项
import { defineStore } from "pinia";
import kLineComp from "../components/kLineComp.vue";

export const useKLineStore = function (this: any, id: any) {
    return defineStore(id, {
        state: () => ({
            option: {
                xAxis: {
                    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
                },
                yAxis: {},
                series: [
                    {
                        type: 'candlestick',
                        data: [
                            [20, 34, 10, 38],
                            [40, 35, 30, 50],
                            [31, 38, 33, 44],
                            [38, 15, 5, 42]
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
            tag: kLineComp,
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
export default useKLineStore;
