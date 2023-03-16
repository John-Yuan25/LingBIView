<template>
    <!-- <div>
        <div :id="storeId" :style="(setStyle as any)" @click="changeStoreId">
        </div>
    </div> -->
</template>

<script setup lang="ts">
import { onMounted, toRefs, watch } from 'vue'
import * as echarts from 'echarts';
import { useFunnelStore, useCurrStore } from '@/stores';

const props = defineProps([
    'id',
    'currStoreId'
])
let storeId = props.id
const currStore = useCurrStore(props.currStoreId)()
const funnelStore = useFunnelStore(storeId)()
// let styleAttribute: any = toRef(pieStore, 'attribute')
let { attribute } :any= toRefs(funnelStore)

//zindex属性在父节点
const parentNode=document.getElementById(storeId) as HTMLElement;
parentNode.style.zIndex=attribute.value[2].value; 


//配置折线图,在mounted阶段初始化
let myChart
type EChartsOption = echarts.EChartsOption;
let option: EChartsOption;
option = funnelStore.option as EChartsOption
onMounted(() => {
    let chartDom = document.getElementById(storeId)!;
    chartDom.addEventListener('click', function () {
        currStore.$patch({
            currStoreId: storeId,
            type: 'scatterComp'
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
        option = funnelStore.option as EChartsOption
        option && myChart.setOption(option);
    }
)

//监听图表的数据变化
watch(() => funnelStore.option.series[0].data, (newValue, oldValue) => {
    //更新图表数据
    option = funnelStore.option as EChartsOption
    option && myChart.setOption(option);
}
)
</script>

<style scoped>
</style>