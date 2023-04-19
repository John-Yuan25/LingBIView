<template>
  <div @click="changeStoreId" class="divBox">
    <span :style="(setStyle as any)">{{ nowTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useTimeStore, useCurrStore } from '@/stores';
import { toRef, ref } from 'vue';

const props = defineProps([
  'id',
  'currStoreId'
])
let storeId = props.id
const currStore = useCurrStore(props.currStoreId)()
const timeStore = useTimeStore(storeId)()
let styleAttribute: any = toRef(timeStore, 'attribute')
//zindex属性在父节点
const parentNode = document.getElementById(storeId) as HTMLElement;
parentNode.style.zIndex = styleAttribute.value[2].value;
let nowTime = ref<string>('')
let date = new Date();
let dateYear;
let dateMonth;
let dateDate;
let dateHours;
let dateMinutes;
let dateSeconds;
let func = function () {
  date = new Date();
  dateYear = date.getFullYear();//获取年 
  dateMonth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);//获取月  
  dateDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();//获取当日
  dateHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();//获取小时
  dateMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();//获取分钟
  dateSeconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();//获取秒
  nowTime.value = dateYear + '-' + dateMonth + '-' + dateDate + ' ' + dateHours + ':' + dateMinutes + ':' + dateSeconds
  return func;
}
timeStore.timer = setInterval(func() as any, 100) as any

let setStyle = computed(() => {
  return {
    [styleAttribute.value[0].key]: styleAttribute.value[0].value + 'px',
    [styleAttribute.value[1].key]: styleAttribute.value[1].value + 'px',
    [styleAttribute.value[2].key]: styleAttribute.value[2].value,
    [styleAttribute.value[3].key]: styleAttribute.value[3].value,
    [styleAttribute.value[4].key]: styleAttribute.value[4].value + 'px',
  }
})
function changeStoreId() {
  currStore.$patch({
    currStoreId: storeId,
    type: 'timeComp'
  })
}
</script>

<style scoped>
.divBox {
  position: relative;
}

.dateInp {
  background-color: rgb(113, 141, 85, 0);
  outline: none;
  border: none;
}
</style>