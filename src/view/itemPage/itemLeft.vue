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
let zuoIcon = 'iconfont icon-xiangzuo_o';
let xiaIcon = 'iconfont icon-xiangxia';
let BasicCurrentIcon = ref<string>(xiaIcon);
let ChartsCurrentIcon = ref<string>(xiaIcon);
const changeBasicShow = function changeBasicShow() {
    BasicShow.value = !BasicShow.value;
    if (BasicShow.value) {
        BasicCurrentIcon.value = xiaIcon;
    } else {
        BasicCurrentIcon.value = zuoIcon;
    }
}
const changeChartsShow = function changeBasicShow() {
    ChartsShow.value = !ChartsShow.value;
    if (ChartsShow.value) {
        ChartsCurrentIcon.value = xiaIcon;
    } else {
        ChartsCurrentIcon.value = zuoIcon;
    }
}


</script>

<style scoped lang="less">
.wrapper {
    width: 100%;
    height: 100%;
    padding-top: 8px;
    padding-left: 3%;
    padding-right: 3%;
    overflow-y: auto !important;
    overflow-x: hidden !important;

    .menuItem {
        background-color: #252527;
        border-radius: 5px;
        width: 80%;
        min-width: 80px;
        height: 50px;
        float: left;
        margin-left: 50%;
        margin-bottom: 15px;
        transform: translate(-50%,0);
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        color: #fff;
    }

    .menuItem:hover {
        background-color: #2b4642;
        color: #69dcb5;
    }

    .menuList {
        height: 25px;
        line-height: 25px;
        padding-left: 10px;
        float: left;
        width: 90%;
        min-width: 80px;
        margin-bottom: 5px;
        background-color: #fff;
        border: 1px solid rgb(61, 59, 59);
        cursor: default;

        .icon {
            float: right;
            margin-right: 10px;
        }
    }

    .menuList:hover {
        background-color: rgb(224, 223, 223);
    }
}

// 修改滚动条样式
.wrapper::-webkit-scrollbar {
    width: 2px;
    /* 对垂直滚动条有效 */
    // height: 10px;  /* 对水平滚动条有效 */
}

/* 定义滚动条的轨道颜色、内阴影及圆角 */
.wrapper::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #ececec;
    border-radius: 5px;
}

/* 定义滑块颜色、内阴影及圆角 */
.wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0,0,0,0.2);
}


/* 光标移到滚动滑块上样式颜色变深 */
.wrapper::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, .2);
}
.wrapper::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}

/* 定义两端按钮的样式 */
.wrapper::-webkit-scrollbar-button {
    background-color: rgb(255, 255, 255);
}

/* 定义右下角汇合处的样式 */
.wrapper::-webkit-scrollbar-corner {
    background: khaki;
}
</style>