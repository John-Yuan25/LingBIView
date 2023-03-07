<template>
    <div @click="changeStoreId" class="divBox">
        <div class="wrapper" :style="(setStyle as any)" >
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useDivStore, useCurrStore } from '@/stores';
import { toRef } from 'vue';

const props = defineProps([
    'id',
    'currStoreId'
])
let storeId= props.id
const currStore = useCurrStore(props.currStoreId)()
const divStore = useDivStore(storeId)()
let styleAttribute: any = toRef(divStore, 'attribute')
//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
// console.log('parentNode',parentNode.style.zIndex);
parentNode.style.zIndex=styleAttribute.value[2].value; 

let setStyle = computed(() => {
    let borderStyle=''

    if(styleAttribute.value[6].value=='实线') borderStyle='solid'
    else if(styleAttribute.value[6].value=='虚线') borderStyle='dashed'
    else if(styleAttribute.value[6].value=='双线') borderStyle='double'
    else if(styleAttribute.value[6].value=='点状') borderStyle='dotted'

    return {
        [styleAttribute.value[0].key]: styleAttribute.value[0].value + 'px',
        [styleAttribute.value[1].key]: styleAttribute.value[1].value + 'px',
        [styleAttribute.value[2].key]: styleAttribute.value[2].value,
        [styleAttribute.value[3].key]: styleAttribute.value[3].value,
        [styleAttribute.value[4].key]: styleAttribute.value[4].value + 'px',
        [styleAttribute.value[5].key]: styleAttribute.value[5].value,
        [styleAttribute.value[6].key]: borderStyle,
        [styleAttribute.value[7].key]: styleAttribute.value[7].value + 'px',
    }
})
function changeStoreId() {
    currStore.$patch({
        currStoreId: storeId,
        type: 'divComp'
    })
}
</script>

<style scoped>
.divBox{
    position: relative;
}
</style>