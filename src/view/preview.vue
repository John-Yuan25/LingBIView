<template>
    <!-- 预览页面 -->
    <div class="container">
        <div class="wrapper">
            <div :id="item.info.id" v-for="(item, index) in components" :key="index"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCurrStore } from '@/stores';
import { mountedComponent } from '../utils/index'
import { useRoute } from 'vue-router'
const route = useRoute()
const currStore = useCurrStore(route.query.currStoreId)()
let components: Array<any> = currStore.Allcomponents
components.forEach(item => {
    mountedComponent(item)
})


</script>

<style scoped lang="less">
.container {
    // background-color: #3d3b3b;
    width: 100%;
    height: 100%;
    position: relative;
}

.wrapper {
    // border: 2px solid red;
    position: absolute;
    background-color: #3d3b3b;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.52, 1.52);
    // width: 100%;
    // height: 100%;
    // width: 62.5%;
    // height: calc(100vh - 60px);
    width: 66vw;
    height: 66vh;
}
</style>