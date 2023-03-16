//雷达图配置项
import { defineStore } from "pinia";
import radarComp from "../components/radarComp.vue";

export const useRadarStore = function (this: any, id: any) {
    return defineStore(id, {
        state: () => ({
            option: {
                title: {
                    text: 'Basic Radar Chart'
                },
                legend: {
                    data: ['Allocated Budget', 'Actual Spending']
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: 'Sales', max: 6500 },
                        { name: 'Administration', max: 16000 },
                        { name: 'Information Technology', max: 30000 },
                        { name: 'Customer Support', max: 38000 },
                        { name: 'Development', max: 52000 },
                        { name: 'Marketing', max: 25000 }
                    ]
                },
                series: [
                    {
                        name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                value: [4200, 3000, 20000, 35000, 50000, 18000],
                                name: 'Allocated Budget'
                            },
                            {
                                value: [5000, 14000, 28000, 26000, 42000, 21000],
                                name: 'Actual Spending'
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
            tag: radarComp,
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
export default useRadarStore;
