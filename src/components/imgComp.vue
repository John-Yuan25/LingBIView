<template>
    <div @click="changeStoreId" class="imgBox">
        <img class="wrapper" :style="(setStyle as any)" :src="(picUrl as string)">
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useImgStore, useCurrStore } from '@/stores';
import { toRef } from 'vue';

const props = defineProps([
    'id'
])
let storeId= props.id
const currStore = useCurrStore()
const imgStore = useImgStore(storeId)()
let styleAttribute: any = toRef(imgStore, 'attribute')
//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
// console.log('parentNode',parentNode.style.zIndex);
parentNode.style.zIndex=styleAttribute.value[2].value; 

let setStyle = computed(() => {
    return {
        [styleAttribute.value[0].key]: styleAttribute.value[0].value + 'px',
        [styleAttribute.value[1].key]: styleAttribute.value[1].value + 'px',
        [styleAttribute.value[2].key]: styleAttribute.value[2].value,

    }
})
let picUrl = computed(() => {
    let url = imgStore.imgUrl
    return url
})
function changeStoreId() {
    currStore.$patch({
        currStoreId: storeId,
        type: 'imgComp'
    })
}
</script>

<style scoped>
.imgBox{
    position: relative;
}
</style>