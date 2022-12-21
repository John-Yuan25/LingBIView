<template>
    <div class="wrapper">
        <div class="menuList" @click="changeBasicShow">
            <span>基础组件</span>
            <span class="icon"><i :class="BasicCurrentIcon"></i></span>
            
        </div>

        <div class="menuItem" draggable="true" :data-type="item.type" :data-name="item.name" @dragstart="dragStart"
            v-for="(item, index) in menus.BasicMenus" :key="index" v-show="BasicShow">{{ item.name }}
        </div>

        <div class="menuList" @click="changeChartsShow">
            <span>图表组件</span>
            <span class="icon "><i :class="ChartsCurrentIcon"></i></span>
        </div>
        <div class="menuItem" draggable="true" :data-type="item.type" :data-name="item.name" @dragstart="dragStart"
            v-for="(item, index) in menus.ChartsMenus" :key="index" v-show="ChartsShow">{{ item.name }}
        </div>

    </div>
</template>

<script setup lang="ts">
import * as menus from './menuList';
import { ref } from 'vue';

//将组件信息保存到拖拽时的元素
function dragStart(e) {
    let info = {
        name: e.target.getAttribute("data-name"),
        type: e.target.getAttribute("data-type"),
    };
    e.dataTransfer.setData("info", JSON.stringify(info));
}
let BasicShow = ref<boolean>(true);
let ChartsShow = ref<boolean>(true);
let zuoIcon='iconfont icon-xiangzuo_o';
let xiaIcon='iconfont icon-xiangxia';
let BasicCurrentIcon=ref<string>(xiaIcon);
let ChartsCurrentIcon=ref<string>(xiaIcon);
const changeBasicShow = function changeBasicShow() {
    BasicShow.value = !BasicShow.value;
    if(BasicShow.value){ 
        BasicCurrentIcon.value=xiaIcon;
    }else{
        BasicCurrentIcon.value=zuoIcon;
    }
}
const changeChartsShow = function changeBasicShow() {
    ChartsShow.value = !ChartsShow.value;
    if(ChartsShow.value){
        ChartsCurrentIcon.value=xiaIcon;
    }else{
        ChartsCurrentIcon.value=zuoIcon;
    }
}


</script>

<style scoped lang="less">
.wrapper {
    width: 243px;
    height: 88vh;
    padding: 8px;
    overflow-y: auto !important;

    .menuItem {
        background-color: #252527;
        border-radius: 5px;
        width: 100px;
        height: 100px;
        float: left;
        margin: 5px;
        text-align: center;
        line-height: 100px;
        cursor: pointer;
        color: #fff;
    }

    .menuItem:hover {
        background-color: rgb(61, 59, 59);
        color: #69dcb5;
    }

    .menuList {
        height: 25px;
        line-height: 25px;
        padding-left: 10px;
        float: left;
        width: 90%;
        margin-bottom: 5px;
        border: 1px solid rgb(61, 59, 59);
        cursor: default;
        .icon{
            float: right;
            margin-right: 10px;
        }
    }
    .menuList:hover{
        background-color: rgb(224, 223, 223);
    }
}
</style>