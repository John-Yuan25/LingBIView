<template>
  <div class="wrapper"   @click="changeStoreId">
      <div :style="(setStyle as any)">
      <div :style="(setSonStyle as any)"></div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import {useProgressStore,useCurrStore} from '@/stores';
import { toRef} from 'vue';

const props = defineProps([
  'id',
  'currStoreId'
])

let storeId= props.id


const currStore=useCurrStore(props.currStoreId)()

const progressStore=useProgressStore(storeId)()
let styleAttribute:any=toRef(progressStore,'attribute')

let data=toRef(progressStore,'data')


//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
parentNode.style.zIndex=styleAttribute.value[2].value; 

let setStyle=computed(()=>{
  return {
     [styleAttribute.value[0].key]:styleAttribute.value[0].value+'px',
     [styleAttribute.value[1].key]:styleAttribute.value[1].value+'px',
     [styleAttribute.value[2].key]:styleAttribute.value[2].value,
     [styleAttribute.value[3].key]:styleAttribute.value[3].value,
     [styleAttribute.value[4].key]:styleAttribute.value[4].value+'px',
  }
})
let setSonStyle=computed(()=>{
  return {
     width:'50%',
     [styleAttribute.value[1].key]:styleAttribute.value[1].value+'px',
     [styleAttribute.value[2].key]:styleAttribute.value[2].value,
     [styleAttribute.value[3].key]:styleAttribute.value[3].value,
     [styleAttribute.value[4].key]:styleAttribute.value[4].value+'px',
  }
})

function changeStoreId(){  
  currStore.$patch({
      currStoreId:storeId,
      type:'progressComp'
  })
}
</script>

<style lang="less" scoped>
.wrapper{
  position: relative;
}
</style>