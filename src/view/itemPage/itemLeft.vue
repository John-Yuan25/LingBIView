<template>
    <div class="wrapper">
        <div 
        class="menuItem" 
        draggable="true" 
        :data-type="item.type"
        :data-name="item.name"
        @dragstart="dragStart"
        v-for="(item,index) in menus" 
        :key="index">{{item.name}}</div>
    </div>
</template>

<script setup lang="ts">
import menus from './menuList';

//将组件信息保存到拖拽时的元素
function dragStart(e){
    let info = { 
        name: e.target.getAttribute("data-name"), 
        type: e.target.getAttribute("data-type"),
    };
    e.dataTransfer.setData("info", JSON.stringify(info)); 
}

</script>

<style scoped lang="less">
.wrapper{
    width: 243px;
    padding:8px;
    .menuItem{
        background-color: #252527;
        border-radius: 5px;
        width:100px;
        height:100px;
        float:left;
        margin:10px;
        text-align: center;
        line-height: 100px;
        cursor:pointer;
        color: #fff;
    }
    .menuItem:hover{
        background-color: rgb(61, 59, 59);
        color: #69dcb5;
    }
}
</style>