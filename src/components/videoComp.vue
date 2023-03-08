<template>
    <div @click="changeStoreId" class="videoBox">
        <video :src="(videoUrl as string)" preload="auto" loop autoplay :style="(setStyle as any)" controls  class="wrapper"></video>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useVideoStore, useCurrStore } from '@/stores';
import { toRef } from 'vue';

const props = defineProps([
    'id',
    'currStoreId'
])
let storeId= props.id
const currStore = useCurrStore(props.currStoreId)()
const videoStore = useVideoStore(storeId)()
let styleAttribute: any = toRef(videoStore, 'attribute')
//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
// console.log('parentNode',parentNode.style.zIndex);
parentNode.style.zIndex=styleAttribute.value[2].value; 

let setStyle = computed(() => {
    return {
        [styleAttribute.value[0].key]: styleAttribute.value[0].value + 'px',
        [styleAttribute.value[1].key]: styleAttribute.value[1].value + 'px',
        [styleAttribute.value[2].key]: styleAttribute.value[2].value,
        [styleAttribute.value[3].key]: styleAttribute.value[3].value,
    }
})
let videoUrl = computed(() => {
    let url = videoStore.videoUrl
    return url
})
function changeStoreId() {
    currStore.$patch({
        currStoreId: storeId,
        type: 'imgComp'
    })
}
</script>

<style lang="less" scoped>
.videoBox{
    position: relative;
}
</style>