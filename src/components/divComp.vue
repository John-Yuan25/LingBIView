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
    'id'
])
let storeId= props.id
const currStore = useCurrStore()
const divStore = useDivStore(storeId)()
let styleAttribute: any = toRef(divStore, 'attribute')
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