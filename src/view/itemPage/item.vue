<template>
    <div>
        <item-top :storeId="route.params.storeId" :itemName="route.params.itemName"></item-top>
        <div class="contentBox">
            <div class="leftBox">
                <item-left></item-left>
            </div>
            <div class="centerBox">
                <item-center @currComp="currComp" :storeId="route.params.storeId"></item-center>
            </div>
            <div class="rightBox">
                <item-right :mycurrComp="mycurrComp" :storeId="route.params.storeId"></item-right>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import itemTop from './itemTop.vue';
import itemCenter from './itemCenter.vue';
import itemLeft from './itemLeft.vue';
import itemRight from './itemRight.vue';
import { useRoute } from 'vue-router'

const route = useRoute()
let mycurrComp = ref<null>(null)
function currComp(comp) {
    mycurrComp.value = comp
}
</script>

<style scoped lang="less">
.contentBox {
    height: calc(100vh - 60px);

    // background-color: rgb(2, 67, 245);
    .leftBox {
        background-color: #3f3f41;
        height: 100%;
        width: 12vw;
        display: inline-block;
        overflow: hidden;
    }

    .centerBox {
        background-color: #28282e;
        position: relative;
        height: 100%;
        width: 72vw;
        display: inline-block;
        overflow: hidden;
    }

    .rightBox {
        background-color: #3d3b3b;
        color: #eeeaea;
        height: 100%;
        width: 16vw;
        display: inline-block;
        overflow: hidden;
    }
}</style>