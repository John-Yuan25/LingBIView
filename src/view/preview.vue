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

const currStore = useCurrStore()
let components: Array<any> = currStore.Allcomponents
components.forEach(item => {
        mountedComponent(item)
})


</script>

<style scoped lang="less">
.container {
    background-color: #3d3b3b;
    width: 100%;
    height: 100%;
}

.wrapper {
    // border: 2px solid red;
    position: relative;
    // width: 100%;
    // height: 100%;
    width: 62.5%;
    height: calc(100vh - 60px);
    transform: translate(30%, 3%) scale(1.56, 1.03)
}
</style>