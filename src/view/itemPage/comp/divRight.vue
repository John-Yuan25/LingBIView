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
            </div>
        </div>
        <!-- 数据 -->
        <div v-if="props.checkIndex === 1">
            <p>暂无数据</p>
        </div>
    </div>
    <button class="delectBtn" @click="delectCom"><i class="iconfont icon-shanchu"></i>删除组件</button>
</template>

<script setup lang="ts">
import { useDivStore, useCurrStore } from '@/stores'
import { toRef } from 'vue';
import { unMountedComponent } from '../../../utils/index'

const props = defineProps([
    'thiscurrComp',
    'checkIndex',
])
const emit = defineEmits([
    'lostComp',
])
const currStore = useCurrStore()
let divStore = useDivStore(currStore.currStoreId)()

//zindex属性在父组件上
const parentNode=document.getElementById(currStore.currStoreId) as HTMLElement;

//更新组件数据方法
function updateComp(e) {
    divStore = useDivStore(currStore.currStoreId)()
    divStore.$patch({
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
            },{
                name: '层级',
                type: 'number',
                key: 'z-index',
                value: props.thiscurrComp.attribute[2].value,
            },{
                name: '背景颜色',
                type: 'color',
                key: 'background-color',
                value: props.thiscurrComp.attribute[3].value,
            }

        ]
    })
    parentNode.style.zIndex=props.thiscurrComp.attribute[2].value
}
//删除组件
const delectCom = () => {
    if (confirm("确定要删除这个组件吗？")) {
        emit('lostComp', true)
        currStore.currCompShow = false
        //卸载组件
        unMountedComponent(props.thiscurrComp)
        //删除本地存储的当前组件数据
        localStorage.removeItem(currStore.currStoreId)
    }
}
</script>

<style scoped lang="less">
.wrapper {
    width: 300px;

    .styleItem {
        margin: 10px;
        display: flex;
        position: relative;
        .label {
            display: inline-block;
            width: 80px;
        }

        .inputStyle {
            flex: 1;
        }
    }

    .dataBox {
        min-height: 300px;
        margin: 15px;
        width: 90%;
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