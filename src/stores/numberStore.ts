import { defineStore } from 'pinia'
import numberComp from '../components/numberComp.vue'

export const useNumberStore = function (this: any, id: any) {
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
                }, {
                    name: '字体大小',
                    type: 'number',
                    key: 'fontSize',
                    value: 15,
                }, {
                    name: "水平对齐",
                    type: 'select',
                    key: 'textAlign',
                    value: '居中',
                    selections: ['居中', '左对齐', '右对齐'],
                }, {
                    name: "层级",
                    type: 'number',
                    key: 'z-index',
                    value: 1,
                }, {
                    name: "行高",
                    type: 'number',
                    key: 'lineHeight',
                    value: 30,
                }, {
                    name: "字体粗细",
                    type: 'select',
                    key: 'fontWeight',
                    value: '常规',
                    selections: ['常规', '粗', '细'],
                }, {
                    name: '字体颜色',
                    type: 'color',
                    key: 'color',
                    value: '#00FFFF',
                }, {
                    name: "边框宽度",
                    type: 'number',
                    key: 'borderWidth',
                    value: 0,
                }, {
                    name: "边框颜色",
                    type: 'color',
                    key: 'borderColor',
                    value: '#00FFFF',
                }, {
                    name: "边框样式",
                    type: 'select',
                    key: 'borderStyle',
                    value: '实线',
                    selections: ['实线', '虚线', '双线', '点状'],
                }, {
                    name: "圆角",
                    type: 'number',
                    key: 'borderRadius',
                    value: 0,
                }, {
                    name: "背景颜色",
                    type: 'color',
                    key: 'background-color',
                    value: '#00000000',
                },

            ],
            tag: numberComp,
            data: '10000',
            code: '//code here',
            before: '￥',
            after: '元',
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
            setSelect(data) {
                if (data == '常规') {
                    this.attribute[6].value = '常规'
                } else if (data == '粗') {
                    this.attribute[6].value = '粗'
                } else if (data == '细') {
                    this.attribute[6].value = '细'
                } else if (data == '居中') {
                    this.attribute[3].value = '居中'
                } else if (data == '左对齐') {
                    this.attribute[3].value = '左对齐'
                } else if (data == '右对齐') {
                    this.attribute[3].value = '右对齐'
                } else if (data == '实线') {
                    this.attribute[10].value = '实线'
                } else if (data == '虚线') {
                    this.attribute[10].value = '虚线'
                } else if (data == '双线') {
                    this.attribute[10].value = '双线'
                } else if (data == '点状') {
                    this.attribute[10].value = '点状'
                }

            },
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


export default useNumberStore