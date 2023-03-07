<template>
    <div class="wrapper">
        <!-- 样式 -->
        <div v-if="props.checkIndex === 0">
            <div class="styleItem" v-for="(item, index) in thiscurrComp.attribute" :key="index">
                <span class="label">{{ item.name }}:</span>
                <input class="inputStyle" v-if="item.type === 'number'" type="number" v-model="item.value"
                    @change="updateComp">
                <input class="inputStyle" v-if="item.type === 'color'" type="color" v-model="item.value"
                    @change="updateComp">
                <select-option v-if="item.type==='select'" :selectOption="item.selections" :currSelect="item.value" @selectData="textStore.setSelect">
                </select-option>
            </div>
        </div>
        <!-- 数据 -->
        <div v-if="props.checkIndex === 1" class="dataBox">
            <textarea class="dataText" v-model="dataStr" @change="updateComp"></textarea>
        </div>
    </div>
    <button class="delectBtn" @click="delectCom"><i class="iconfont icon-shanchu"></i>删除组件</button>
</template>

<script setup lang="ts">
import { useTextStore, useCurrStore } from '@/stores'
import { toRef,ref } from 'vue';
import { unMountedComponent } from '../../../utils/index'
import selectOption from './selectOption.vue';
const props = defineProps([
    'thiscurrComp',
    'checkIndex',
    'storeId'
])
const emit = defineEmits([
    'lostComp',
])
const currStore = useCurrStore(props.storeId)()
let textStore = useTextStore(currStore.currStoreId)()
let dataStr = toRef(textStore, 'data')

//zindex属性在父组件上
const parentNode=document.getElementById(currStore.currStoreId) as HTMLElement;

//更新组件数据方法
function updateComp(e) {
    textStore = useTextStore(currStore.currStoreId)()
    textStore.$patch({
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
                name:"水平对齐",
                type:'select',
                key:'textAlign',
                value: props.thiscurrComp.attribute[3].value,
                selections:['居中','左对齐','右对齐'],
            },{
                name: '层级',
                type: 'number',
                key: 'z-index',
                value: props.thiscurrComp.attribute[4].value,
            },{
                name:"行高",
                type:'number',
                key:'line-height',
                value: props.thiscurrComp.attribute[5].value,
            },{
                name:"字体粗细",
                type:'select',
                key:'fontWeight',
                value: props.thiscurrComp.attribute[6].value,
                selections:['常规','粗','细'],
            },{
                name: '字体颜色',
                type: 'color',
                key: 'color',
                value: props.thiscurrComp.attribute[7].value,
            },{
                name:"边框宽度",
                type:'number',
                key:'borderWidth',
                value:props.thiscurrComp.attribute[8].value,
            },{
                name:"边框颜色",
                type:'color',
                key:'borderColor',
                value:props.thiscurrComp.attribute[9].value,
            },{
                name:"边框样式",
                type:'select',
                key:'borderStyle',
                value:props.thiscurrComp.attribute[10].value,
                selections:['实线','虚线','双线','点状'],
            },{
                name:"圆角",
                type:'number',
                key:'borderRadius',
                value:props.thiscurrComp.attribute[11].value,
            },{
                name:"背景颜色",
                type:'color',
                key:'background-color',
                value:props.thiscurrComp.attribute[12].value,
            }
        ]
    })
    parentNode.style.zIndex=props.thiscurrComp.attribute[4].value
}
//删除组件
const delectCom = () => {
    if (confirm("确定要删除这个组件吗？")) {
        emit('lostComp', true)
        currStore.currCompShow = false
        //卸载组件
        unMountedComponent(props.thiscurrComp,props.storeId)
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
            outline-style: none ;
        }
        .inputStyle:hover{
            border: 1px solid #69dcb5;
        }
        .inputStyle:focus{
            border: 1px solid #69dcb5;
            background-color: rgb(61, 59, 59);
        }
    }
    .dataBox{
        display: flex;
        min-height: 200px;
        margin-left: 1vw;
        margin-top: 10px;
        width: 13vw;
    }
    .dataText {
        min-height: 200px;
        flex: 1;
        color: #bb7b68;
        background-color: #18181c;
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
}
</style>