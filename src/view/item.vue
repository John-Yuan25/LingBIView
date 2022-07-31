<template>
    <div>
        <item-top></item-top>
        <div class="contentBox">
            <item-left></item-left>
            <item-center @currComp="currComp"></item-center>
            <item-right :mycurrComp="mycurrComp"></item-right>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import itemTop from './itemTop.vue';
import itemCenter from './itemCenter.vue';
import itemLeft from './itemLeft.vue';
import itemRight from './itemRight.vue';

let mycurrComp= ref<null>(null)
function currComp(comp){
    mycurrComp.value=comp
}
</script>

<style scoped lang="less">
.contentBox {
    display: flex;
    height: calc(100vh - 60px);
}
</style>