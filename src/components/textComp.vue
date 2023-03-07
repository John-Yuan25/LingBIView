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
    'id',
    'currStoreId'
])

let storeId= props.id


const currStore=useCurrStore(props.currStoreId)()

const textStore=useTextStore(storeId)()
let styleAttribute:any=toRef(textStore,'attribute')

let data=toRef(textStore,'data')

//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
parentNode.style.zIndex=styleAttribute.value[4].value; 

let setStyle=computed(()=>{
    let fontWeight=''
    let textAlign=''
    let borderStyle=''
    if(styleAttribute.value[3].value=='居中') textAlign='center'
    else if(styleAttribute.value[3].value=='左对齐') textAlign='left'
    else if(styleAttribute.value[3].value=='右对齐') textAlign='right'

    if(styleAttribute.value[6].value=='常规') fontWeight='normal'
    else if(styleAttribute.value[6].value=='粗') fontWeight='bold'
    else if(styleAttribute.value[6].value=='细') fontWeight='lighter'

    if(styleAttribute.value[10].value=='实线') borderStyle='solid'
    else if(styleAttribute.value[10].value=='虚线') borderStyle='dashed'
    else if(styleAttribute.value[10].value=='双线') borderStyle='double'
    else if(styleAttribute.value[10].value=='点状') borderStyle='dotted'
    
    return {
       [styleAttribute.value[0].key]:styleAttribute.value[0].value+'px',
       [styleAttribute.value[1].key]:styleAttribute.value[1].value+'px',
       [styleAttribute.value[2].key]:styleAttribute.value[2].value+'px',
       [styleAttribute.value[3].key]:textAlign,   
       [styleAttribute.value[4].key]:styleAttribute.value[4].value,       
       [styleAttribute.value[5].key]:styleAttribute.value[5].value+'px',       
       [styleAttribute.value[6].key]:fontWeight,      
       [styleAttribute.value[7].key]:styleAttribute.value[7].value,
       [styleAttribute.value[8].key]:styleAttribute.value[8].value+'px',
       [styleAttribute.value[9].key]:styleAttribute.value[9].value,
       [styleAttribute.value[10].key]:borderStyle,
       [styleAttribute.value[11].key]:styleAttribute.value[11].value+'px',
       [styleAttribute.value[12].key]:styleAttribute.value[12].value,
    }
})

function changeStoreId(){  
    currStore.$patch({
        currStoreId:storeId,
        type:'textComp'
    })
}
</script>

<style lang="less" scoped>
.wrapper{
    position: relative;
}
</style>