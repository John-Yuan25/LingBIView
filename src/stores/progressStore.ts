import { defineStore } from 'pinia'
import progressComp from '../components/progressComp.vue'

export const useProgressStore = function (this: any, id: any) {
    return defineStore(id, {
        state: () => ({
            attribute: [
                {
                    name: "宽度",
                    type: 'number',
                    key: 'width',
                    value: 100,
                }, {
                    name: '高度',
                    type: 'number',
                    key: 'height',
                    value: 30,
                },{
                    name: "层级",
                    type: 'number',
                    key: 'z-index',
                    value: 1,
                },{
                    name:'背景颜色',
                    type:'color',
                    key:'background-color',
                    value:'#fff',
                },{
                    name:"圆角",
                    type:'number',
                    key:'borderRadius',
                    value:0,
                },

            ],
            tag: progressComp,
            data: 50,
            total:100,
            code: '//code here',
            sandShow: false,
            ajaxUrl: "",
            currDataSource: "静态数据",
            timeout: <unknown>undefined,
            ajaxMethod: "get",
            timer: <any>null,
        }),
        getters: {

        },
        actions: {
            importOption(data) {
                this.data = data;
            },
        },
        // persist: true,
        persist: {
            key: id,
            // storage: window.sessionStorage,////保存的位置,默认是localstorage
        },
    })
}


export default useProgressStore