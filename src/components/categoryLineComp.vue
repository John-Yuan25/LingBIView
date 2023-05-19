<template>
    <!-- <div>
        <div :id="storeId" :style="(setStyle as any)" @click="changeStoreId">
        </div>
    </div> -->
</template>

<script setup lang="ts">
import { onMounted, toRefs, watch,ref } from 'vue'
import * as echarts from 'echarts';
import { useCategoryLineStore, useCurrStore } from '@/stores';
import * as mqtt from "mqtt/dist/mqtt.min";

const props = defineProps([
    'id',
    'currStoreId'
])
 
let storeId = props.id
const currStore = useCurrStore(props.currStoreId)()
const categoryLineStore = useCategoryLineStore(storeId)()
let { attribute } :any = toRefs(categoryLineStore)

//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
parentNode.style.zIndex=attribute.value[2].value; 


//配置折线图,在mounted阶段初始化
let myChart
type EChartsOption = echarts.EChartsOption;

let { option } :any = toRefs(categoryLineStore)
onMounted(() => {
    let chartDom = document.getElementById(storeId)!;
    chartDom.addEventListener('click', function () {
        currStore.$patch({
            currStoreId: storeId,
            type: 'categoryLineComp'
        })
    })
    myChart = echarts.init(chartDom);
    option.value && myChart.setOption(option.value);
})
//监听图表的长宽，为图表设定大小
watch(() => attribute.value, (newValue, oldValue) => {
    myChart.resize({
        width: attribute.value[0].value,
        height: attribute.value[1].value,
    })
    //更新图表数据
    option.value = categoryLineStore.option as EChartsOption
    option.value && myChart.setOption(option.value);
}
)

//监听图表的数据变化
watch(() => option.value, (newValue, oldValue) => {
    //更新图表数据
    option.value = categoryLineStore.option as EChartsOption
    option.value && myChart.setOption(option.value);
}
)

</script>

<style scoped>
</style>