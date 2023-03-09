<template>
    <div>
        <item-top :storeId="route.params.storeId" :itemName="route.params.itemName"></item-top>
        <div class="contentBox">
            <div class="leftBox">
                <item-left></item-left>
            </div>
            <div class="centerBox">
                <item-center @currComp="currComp" :storeId="route.params.storeId"></item-center>
                <div class="editorBox" v-if="currStore.editorShow">
                    <editor-comp></editor-comp>
                </div>
            </div>
            <div class="rightBox">
                <item-right :mycurrComp="mycurrComp" :storeId="route.params.storeId"></item-right>
            </div>
        </div>
        <!-- 编辑器遮罩层 -->
        <div class="back" v-if="currStore.editorShow"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import itemTop from './itemTop.vue';
import itemCenter from './itemCenter.vue';
import itemLeft from './itemLeft.vue';
import itemRight from './itemRight.vue';
import { useRoute } from 'vue-router'
import editorComp from '../../components/editorComp.vue';
import { useCurrStore } from '@/stores'


const route = useRoute()
let mycurrComp = ref<null>(null)
function currComp(comp) {
    mycurrComp.value = comp
}

const currStore = useCurrStore(route.query.storeId)()
currStore.editorShow = false;

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

        .editorBox {
            width: 50vw;
            height: 80vh;
            background-color: #0e0e11;
            border-radius: 10px;
            opacity: 0.9;
            position: fixed;
            margin-top: -60vh;
            margin-left: 11vw;
            z-index: 999;
        }
    }

    .rightBox {
        background-color: #3d3b3b;
        color: #eeeaea;
        height: 100%;
        width: 16vw;
        display: inline-block;
        overflow: hidden;
    }
}

.back {
    width: 100vw;
    height: 100vh;
    background-color: #0e0e11;
    border-radius: 10px;
    opacity: 0.4;
    position: fixed;
    margin-top: -100vh;
    z-index: 888;
}
</style>