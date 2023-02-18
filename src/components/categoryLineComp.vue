<template>
    <!-- <div>
        <div :id="storeId" :style="(setStyle as any)" @click="changeStoreId">
        </div>
    </div> -->
</template>

<script setup lang="ts">
// import { computed } from '@vue/reactivity';
import { onMounted, toRefs, watch } from 'vue'
import * as echarts from 'echarts';
import { useCategoryLineStore, useCurrStore } from '@/stores';

const props = defineProps([
    'id',
    'currStoreId'
])
 
let storeId = props.id

const currStore = useCurrStore(props.currStoreId)()
const categoryLineStore = useCategoryLineStore(storeId)()
// let attribute: any = toRef(categoryLineStore, 'attribute')
let { attribute } :any = toRefs(categoryLineStore)

//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
parentNode.style.zIndex=attribute.value[2].value; 


// let setStyle = computed(() => {
//     return {
//         [attribute.value[0].key]: attribute.value[0].value + 'px',
//         [attribute.value[1].key]: attribute.value[1].value + 'px',
//     }
// })
// function changeStoreId() {
//     currStore.$patch({
//         currStoreId: storeId,
//         type: 'categoryLineComp'
//     })
// }

//配置折线图,在mounted阶段初始化
let myChart
type EChartsOption = echarts.EChartsOption;
let option: EChartsOption;
option = categoryLineStore.option as EChartsOption
onMounted(() => {
    let chartDom = document.getElementById(storeId)!;
    chartDom.addEventListener('click', function () {
        currStore.$patch({
            currStoreId: storeId,
            type: 'categoryLineComp'
        })
    })
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
})
//监听图表的长宽，为图表设定大小
watch(() => attribute.value, (newValue, oldValue) => {
    myChart.resize({
        width: attribute.value[0].value,
        height: attribute.value[1].value,
    })
    //更新图表数据
    option = categoryLineStore.option as EChartsOption
    option && myChart.setOption(option);
}
)

//监听图表的数据变化
watch(() => option.dataset, (newValue, oldValue) => {
    //更新图表数据
    option = categoryLineStore.option as EChartsOption
    option && myChart.setOption(option);
}
)
</script>

<style scoped>
</style>