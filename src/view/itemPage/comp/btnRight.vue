<template>
    <div class="wrapper">
        <!-- 样式 -->
        <div v-show="props.checkIndex === 0">
            <div class="styleItem" v-for="(item, index) in thiscurrComp.attribute" :key="index">
                <span class="label">{{ item.name }}:</span>
                <input class="inputStyle" v-if="item.type === 'number'" type="number" v-model="item.value"
                    @change="updateComp">
            </div>
            <div class="styleItem">
                <span class="label">开关颜色:</span>
                <input class="inputStyle"  type="color" v-model="btnStore.switchBackgroundColor">
            </div>
            <div class="styleItem">
                <span class="label">开关状态:</span>
                <span class="switchBox"> 
                <switchComp v-model="value1" :activeColor="btnStore.switchBackgroundColor"></switchComp>
                </span>
            </div>
        </div>
        <!-- 数据 -->
        <div v-show="props.checkIndex === 1" class="dataBox">
            暂无数据
        </div>
        <!-- 事件 -->
        <div v-show="props.checkIndex === 2">
            <div class="editorBtn" @click="openEditor">编辑点击事件</div>
            <div class="showCode"></div>
        </div>
    </div>
    <button class="delectBtn" @click="delectCom"><i class="iconfont icon-shanchu"></i>删除组件</button>
</template>

<script setup lang="ts">
import { useBtnStore, useCurrStore } from '@/stores'
import { ref, toRef, nextTick, watch } from 'vue';
import { unMountedComponent } from '../../../utils/index'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';//编辑器js语法高亮
import switchComp from '@/components/switchComp.vue';

const props = defineProps([
    'thiscurrComp',
    'checkIndex',
    'storeId'
])
const emit = defineEmits([
    'lostComp',
])

const currStore = useCurrStore(props.storeId)()
let btnStore = useBtnStore(currStore.currStoreId)()
//zindex属性在父组件上
const parentNode = document.getElementById(currStore.currStoreId) as HTMLElement;
console.log('parentNode', parentNode.style.zIndex);

//更新组件数据方法
function updateComp(e) {
    btnStore = useBtnStore(currStore.currStoreId)()
    btnStore.$patch({
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
                name: '层级',
                type: 'number',
                key: 'zIndex',
                value: props.thiscurrComp.attribute[2].value,
            }
        ]
    })
    parentNode.style.zIndex = props.thiscurrComp.attribute[2].value
}
let value1 = toRef(btnStore, 'isOn')
//创建编辑器实例(只读)
let monacoInstance;
nextTick(() => {
    let editorDom = document.querySelector('.showCode') as HTMLElement;
    monacoInstance = monaco.editor.create(editorDom, {
        value: btnStore.code,
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
    () => btnStore.code,
    (newValue, oldValue) => {
        monacoInstance.setValue(newValue)
    }
)
//点击打开编辑器
const openEditor = function () {
    currStore.editorCode = btnStore.code;
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

        .label {
            display: inline-block;
            width: 80px;
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

        .inputStyle:hover {
            border: 1px solid #69dcb5;
        }

        .inputStyle:focus {
            border: 1px solid #69dcb5;
            background-color: rgb(61, 59, 59);
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
    .switchBox{
        width: 20%;
        display: inline-block;
        height: 6%;
    }
}</style>