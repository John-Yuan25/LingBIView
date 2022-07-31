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
import { usePieStore, useCurrStore } from '@/stores';

const props = defineProps([
    'id'
])
let storeId = props.id
const currStore = useCurrStore()
const pieStore = usePieStore(storeId)()
// let styleAttribute: any = toRef(pieStore, 'attribute')
let { attribute } = toRefs(pieStore)


// let setStyle = computed(() => {
//     return {
//         [styleAttribute.value[0].key]: styleAttribute.value[0].value + 'px',
//         [styleAttribute.value[1].key]: styleAttribute.value[1].value + 'px',
//     }
// })
// function changeStoreId() {
//     console.log('321321');
//     currStore.$patch({
//         currStoreId: storeId,
//         type: 'pieComp'
//     })
// }

//配置折线图,在mounted阶段初始化
let myChart
type EChartsOption = echarts.EChartsOption;
let option: EChartsOption;
option = pieStore.option as EChartsOption
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
watch(
    () => attribute.value,
    (newValue, oldValue) => {
        myChart.resize({
            width: attribute.value[0].value,
            height: attribute.value[1].value
        })
        //更新图表数据
        option = pieStore.option as EChartsOption
        option && myChart.setOption(option);
    }
)

//监听图表的数据变化
watch(() => pieStore.option.dataset, (newValue, oldValue) => {
    //更新图表数据
    option = pieStore.option as EChartsOption
    option && myChart.setOption(option);
}
)
</script>

<style scoped>
</style>