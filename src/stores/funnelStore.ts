//漏斗图配置项
import { defineStore } from "pinia";
import funnelComp from "../components/funnelComp.vue";
import * as echarts from 'echarts';

export const useFunnelStore = function (this: any, id: any) {
    return defineStore(id, {
        state: () => ({
            option: {
                title: {
                    text: 'Funnel'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}%'
                },
                toolbox: {
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
                },
                series: [
                    {
                        name: 'Funnel',
                        type: 'funnel',
                        left: '10%',
                        top: 60,
                        bottom: 10,
                        width: '80%',
                        min: 0,
                        max: 100,
                        minSize: '0%',
                        maxSize: '100%',
                        sort: 'descending',
                        gap: 2,
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        labelLine: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        },
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        emphasis: {
                            label: {
                                fontSize: 20
                            }
                        },
                        data: [
                            { value: 60, name: 'Visit' },
                            { value: 40, name: 'Inquiry' },
                            { value: 20, name: 'Order' },
                            { value: 80, name: 'Click' },
                            { value: 100, name: 'Show' }
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
            tag: funnelComp,
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
export default useFunnelStore;
