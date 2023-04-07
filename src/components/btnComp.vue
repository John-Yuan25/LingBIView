<template>
  <div @click="changeStoreId" class="btnBox">
    <div class="wrapper" :style="(setStyle as any)">
      <switchComp v-model="value1" :activeColor="btnStore.switchBackgroundColor" ></switchComp>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useBtnStore, useCurrStore } from '@/stores';
import { toRef,ref } from 'vue';
import switchComp from './switchComp.vue';

const props = defineProps([
  'id',
  'currStoreId'
])
let storeId = props.id
const currStore = useCurrStore(props.currStoreId)()
const btnStore = useBtnStore(storeId)()
let styleAttribute: any = toRef(btnStore, 'attribute')
//zindex属性在父节点
const parentNode = document.getElementById(storeId) as HTMLElement;
// console.log('parentNode',parentNode.style.zIndex);
parentNode.style.zIndex = styleAttribute.value[2].value;

let setStyle = computed(() => {
  return {
    [styleAttribute.value[0].key]: styleAttribute.value[0].value + 'px',
    [styleAttribute.value[1].key]: styleAttribute.value[1].value + 'px',
    [styleAttribute.value[2].key]: styleAttribute.value[2].value,
  }
})
let value1 = toRef(btnStore, 'isOn')


function changeStoreId() {
  currStore.$patch({
    currStoreId: storeId,
    type: 'btnComp'
  })
}
</script>

<style lang="less" scoped>
.btnBox {
  position: relative;
}
</style>