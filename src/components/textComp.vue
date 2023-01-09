<template>
    <div class="wrapper" :style="(setStyle as any)" @click="changeStoreId">
        <span>{{data}}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import {useTextStore,useCurrStore} from '@/stores';
import { toRef} from 'vue';

const props = defineProps([
    'id'
])

let storeId= props.id


const currStore=useCurrStore()

const textStore=useTextStore(storeId)()
let styleAttribute:any=toRef(textStore,'attribute')
let data=toRef(textStore,'data')

//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
console.log('parentNode',typeof parentNode.style.zIndex);
parentNode.style.zIndex=styleAttribute.value[4].value; 

let setStyle=computed(()=>{
    return {
       [styleAttribute.value[0].key]:styleAttribute.value[0].value+'px',
       [styleAttribute.value[1].key]:styleAttribute.value[1].value+'px',
       [styleAttribute.value[2].key]:styleAttribute.value[2].value+'px',
       [styleAttribute.value[3].key]:styleAttribute.value[3].value,
       [styleAttribute.value[4].key]:styleAttribute.value[4].value       
    }
})

function changeStoreId(){  
    currStore.$patch({
        currStoreId:storeId,
        type:'textComp'
    })
}
</script>

<style scoped>
.wrapper{
    text-align: center;
    position: relative;
}
</style>