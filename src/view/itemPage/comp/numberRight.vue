<template>
    <div class="wrapper">
        <!-- 样式 -->
        <div v-show="props.checkIndex === 0">
            <div class="styleItem" v-for="(item, index) in thiscurrComp.attribute" :key="index">
                <span class="label">{{ item.name }}:</span>
                <input class="inputStyle" v-if="item.type === 'number'" type="number" v-model="item.value"
                    @change="updateComp">
                <input class="inputStyle" v-if="item.type === 'color'" type="color" v-model="item.value"
                    @change="updateComp">
                <select-option v-if="item.type === 'select'" :selectOption="item.selections" :currSelect="item.value"
                    @selectData="numberStore.setSelect">
                </select-option>
            </div>
        </div>
        <!-- 数据 -->
        <div v-show="props.checkIndex === 1" class="dataBox">
            <div class="styleItem">
                <span class="label">数据源</span>
                <select-option :selectOption="selectDataSource" :currSelect="currDataSource"
                    @selectData="getDataSource"></select-option>
            </div>
            <div class="sandOptionBox" v-if="sandShow">
                <div class="styleItem">
                    <span class="label">请求地址:</span>
                    <input class="inputStyle" type="text" v-model="ajaxUrl">
                </div>
                <div class="styleItem">
                    <span class="label">请求方法：</span>
                    <select-option :selectOption="selectMethods" :currSelect="ajaxMethod" @selectData="getMethods">
                    </select-option>
                </div>
                <div class="styleItem">
                    <span class="label">请求间隔:</span>
                    <input class="inputStyle" type="number" v-model="timeout">/s
                </div>

                <div class="sandBox">
                    <button class="sandBtn" id="sandAjaxBtn" @click="sandAjax">发送请求</button>
                </div>
                <div class="sandBox">
                    <button class="sandBtn" id="stopAjaxBtn" @click="stopAjax">停止轮询</button>
                </div>
            </div>
            <div class="dataItem">
                <span class="label">前缀:</span>
                <input class="inputStyle" v-model="before" @change="updateComp">
            </div>
            <div class="dataItem" v-if="!sandShow">
                <span class="label">数值:</span>
                <input class="inputStyle" type="number" v-model="dataStr" @change="updateComp">
            </div>
            <div class="dataItem">
                <span class="label">后缀:</span>
                <input class="inputStyle" v-model="after" @change="updateComp">
            </div>


        </div>
        <!-- 编辑事件 -->
        <div v-show="props.checkIndex === 2">
            <div class="editorBtn" @click="openEditor">编辑点击事件</div>
            <div class="showCode"></div>
        </div>
    </div>
    <button class="delectBtn" @click="delectCom"><i class="iconfont icon-shanchu"></i>删除组件</button>
</template>

<script setup lang="ts">
import { useNumberStore, useCurrStore } from '@/stores'
import { toRef, nextTick, watch, ref, toRefs,ButtonHTMLAttributes } from 'vue';
import { unMountedComponent } from '../../../utils/index'
import selectOption from './selectOption.vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';//编辑器js语法高亮
import { getJson } from '../../../server'

const props = defineProps([
    'thiscurrComp',
    'checkIndex',
    'storeId'
])
const emit = defineEmits([
    'lostComp',
])
const currStore = useCurrStore(props.storeId)()
let numberStore = useNumberStore(currStore.currStoreId)()
let dataStr = toRef(numberStore, 'data')
let before = toRef(numberStore, 'before')
let after = toRef(numberStore, 'after')
let selectDataSource = ['静态数据', '动态请求']
let selectMethods = ['get', 'post']
let { currDataSource } = toRefs(numberStore)
let { sandShow } = toRefs(numberStore)
let { ajaxUrl } = toRefs(numberStore)
let { timeout } = toRefs(numberStore)
let { ajaxMethod } = toRefs(numberStore)
let { timer } = toRefs(numberStore)
//zindex属性在父组件上
const parentNode = document.getElementById(currStore.currStoreId) as HTMLElement;

//更新组件数据方法
function updateComp(e) {
    numberStore = useNumberStore(currStore.currStoreId)()
    numberStore.$patch({
        data: dataStr.value,
        attribute: [
            {
                name: "宽度",
                type: 'number',
                key: 'width',
                value: props.thiscurrComp.attribute[0].value,
            }, {
                name: '高度',
                type: 'number',
                key: 'height',
                value: props.thiscurrComp.attribute[1].value,
            }, {
                name: '字体大小',
                type: 'number',
                key: 'fontSize',
                value: props.thiscurrComp.attribute[2].value,
            }, {
                name: "水平对齐",
                type: 'select',
                key: 'textAlign',
                value: props.thiscurrComp.attribute[3].value,
                selections: ['居中', '左对齐', '右对齐'],
            }, {
                name: '层级',
                type: 'number',
                key: 'z-index',
                value: props.thiscurrComp.attribute[4].value,
            }, {
                name: "行高",
                type: 'number',
                key: 'line-height',
                value: props.thiscurrComp.attribute[5].value,
            }, {
                name: "字体粗细",
                type: 'select',
                key: 'fontWeight',
                value: props.thiscurrComp.attribute[6].value,
                selections: ['常规', '粗', '细'],
            }, {
                name: '字体颜色',
                type: 'color',
                key: 'color',
                value: props.thiscurrComp.attribute[7].value,
            }, {
                name: "边框宽度",
                type: 'number',
                key: 'borderWidth',
                value: props.thiscurrComp.attribute[8].value,
            }, {
                name: "边框颜色",
                type: 'color',
                key: 'borderColor',
                value: props.thiscurrComp.attribute[9].value,
            }, {
                name: "边框样式",
                type: 'select',
                key: 'borderStyle',
                value: props.thiscurrComp.attribute[10].value,
                selections: ['实线', '虚线', '双线', '点状'],
            }, {
                name: "圆角",
                type: 'number',
                key: 'borderRadius',
                value: props.thiscurrComp.attribute[11].value,
            }, {
                name: "背景颜色",
                type: 'color',
                key: 'background-color',
                value: props.thiscurrComp.attribute[12].value,
            }
        ]
    })
    parentNode.style.zIndex = props.thiscurrComp.attribute[4].value
}

const getDataSource = (data) => {
    if (data === '静态数据') {
        sandShow.value = false
        currDataSource.value = '静态数据'
    }
    else if (data === '动态请求') {
        sandShow.value = true
        currDataSource.value = '动态请求'
    }
}
const getMethods = (data) => {
    ajaxMethod.value = data
}

const sandAjax = async () => {
    numberStore = useNumberStore(currStore.currStoreId)()
    let sandAjaxBtn = document.querySelector('#sandAjaxBtn') as ButtonHTMLAttributes
    //点击一次之后禁用发送按钮
    sandAjaxBtn.disabled = true
    //开启停止轮询按钮
    sandAjaxBtn.innerHTML = '<i class="iconfont icon-round-loading"></i>'
    if (ajaxUrl.value == '') {
        alert('请输入请求地址')
        sandAjaxBtn.disabled = false
        sandAjaxBtn.innerHTML = '发送请求'
    }
    if (timeout.value == undefined) {
        alert('请输入请求间隔时间')
        sandAjaxBtn.disabled = false
        sandAjaxBtn.innerHTML = '发送请求'
    } else {
        let jsonData: any
        const promise = new Promise(async (resolve, reject) => {
            resolve(getJson(ajaxUrl.value, ajaxMethod.value))
        }).then(value => {
            jsonData = value
            sandAjaxBtn.disabled = false
            sandAjaxBtn.innerHTML = '发送请求'
            if (timer.value !== null) {
                clearInterval(timer.value)
                timer.value = null
            }
            timer.value = setInterval(async () => {
                jsonData = await getJson(ajaxUrl.value, ajaxMethod.value)
                numberStore.importOption(jsonData)
            }, timeout.value as number * 1000)
        }, err => {
            if (timer.value !== null) {
                clearInterval(timer.value)
                timer.value = null
            }
            alert(err)
            sandAjaxBtn.disabled = false
            sandAjaxBtn.innerHTML = '发送请求'
        })
    }
}
//停止轮询
const stopAjax = () => {
    //清除定时器
    if (timer.value !== null) {
        //设置加载状态，提升交互体验
        let stopAjaxBtn = document.querySelector('#stopAjaxBtn') as ButtonHTMLAttributes
        stopAjaxBtn.innerHTML = '<i class="iconfont icon-round-loading"></i>'
        setTimeout(() => {
            clearInterval(timer.value)
            timer.value = null
            stopAjaxBtn.innerHTML = '停止轮询'
        }, 1000)

    }
}
//创建编辑器实例(只读)
let monacoInstance;
nextTick(() => {
    let editorDom = document.querySelector('.showCode') as HTMLElement;
    monacoInstance = monaco.editor.create(editorDom, {
        value: numberStore.code,
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
        foldingStrategy: 'indentation', // 代码可分小段折叠
        readOnly: true,//是否只读
        minimap: { enabled: false }, // 是否启用预览图
    })
})
//监听代码变化更新编辑器显示的代码
watch(
    () => numberStore.code,
    (newValue, oldValue) => {
        monacoInstance.setValue(newValue)
    }
)
//点击打开编辑器
const openEditor = function () {
    currStore.editorCode = numberStore.code;
    currStore.editorShow = !currStore.editorShow;
}
//删除组件
const delectCom = () => {
    if (confirm("确定要删除这个组件吗？")) {
        emit('lostComp', true)
        currStore.currCompShow = false
        //卸载组件
        unMountedComponent(props.thiscurrComp, props.storeId)
        //删除本地存储的当前组件数据
        localStorage.removeItem(currStore.currStoreId)
    }
}
</script>

<style scoped lang="less">
.wrapper {
    width: 100%;

    .styleItem {
        margin: 10px;
        display: flex;
        position: relative;
    }

    .inputStyle {
        width: 60%;
        padding-left: 3px;
        color: #ffffff;
        background-color: #252527;
        border-radius: 5px;
        border: 1px solid #252527;
        outline-style: none;
    }

    .label {
        display: inline-block;
        width: 80px;
    }



    .inputStyle:hover {
        border: 1px solid #69dcb5;
    }

    .inputStyle:focus {
        border: 1px solid #69dcb5;
        background-color: rgb(61, 59, 59);
    }

    .dataBox {
        display: flex;
        flex-direction: column;
        min-height: 200px;
        margin-left: 0.5vw;
        width: 14.5vw;

        .dataItem {
            margin-top: 10px;
        }
    }

    .editorBtn {
        border: 2px solid #929296;
        color: #d5d5d6;
        padding: 3px;
        height: 30px;
        position: absolute;
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        margin-top: 15px;
        margin-left: 15px;
        cursor: pointer;
    }

    .editorBtn:hover {
        border: 2px solid #5fbf9f;
        color: #5fbf9f;
        cursor: pointer;
    }

    .showCode {
        position: absolute;
        padding: 10px;
        min-height: 200px;
        max-height: 70vh;
        margin-left: 15px;
        margin-top: 60px;
        width: 13vw;
        color: #bb7b68;
        background-color: #18181c;
        overflow-y: scroll;
    }

    .sandOptionBox {
        border: 2px solid #5fbf9f;
        height: 100%;
        padding-top: 1px;
        width: 100%;

        .sandBox {
            margin: 10px;

            .sandBtn {
                width: 100%;
                padding: 5px;
                border: 2px solid #4c4c4f;
                background-color: #ffffff;
                border-radius: 5px;
            }

            .sandBtn:hover {
                border: 2px solid #5fbf9f;
                color: #5fbf9f;
                cursor: pointer;
            }
        }
    }

    .delectBtn {
        background-color: rgb(233, 17, 17);
        color: #ffffff;
        width: 80px;
        height: 30px;
        position: absolute;
        border: 0px;
        bottom: 30px;
        right: 10px;
    }

    .showCode::-webkit-scrollbar {
        width: 2px;
        /* 对垂直滚动条有效 */
        // height: 10px;  /* 对水平滚动条有效 */
    }

    /* 定义滚动条的轨道颜色、内阴影及圆角 */
    .showCode::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #ececec;
        border-radius: 5px;
    }

    /* 定义滑块颜色、内阴影及圆角 */
    .showCode::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.2);
    }


    /* 光标移到滚动滑块上样式颜色变深 */
    .showCode::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, .2);
    }

    .showCode::-webkit-scrollbar-track {
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }

    /* 定义右下角汇合处的样式 */
    .showCode::-webkit-scrollbar-corner {
        background: khaki;
    }
}
</style>