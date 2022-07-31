<template>
    <div class="wrapper">
        <div class="tabItem" @click="checkTab(index)" :class="{ 'active': checkTabIndex === index }"
            v-for="(item, index) in tabList" :key="index">{{ item }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props=defineProps([
   'checkIndex'
])
const emit=defineEmits(['checkTabChange'])
 
let tabList = ['样式', '数据']
let checkTabIndex = ref<number>(props.checkIndex)

function checkTab(index){
    checkTabIndex.value =index;
    emit('checkTabChange',checkTabIndex.value)
}
</script>

<style scoped lang="less">
.wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #eee;

    .tabItem {
        padding: 15px;
        cursor: pointer;
    }

    .active {
        border-bottom: 2px solid #5794f5;
    }
}
</style>