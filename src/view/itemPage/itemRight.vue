<template>
    <div class="wrapper">
        <headTab class="top" :checkIndex="checkIndex" @checkTabChange="checkTabChange"></headTab>
        <!-- 选中了组件再出现配置栏 -->
        <div v-if="mycurrComp">
            <textRight v-if="textRightShow" :thiscurrComp="thiscurrComp" :checkIndex="checkIndex" :storeId="route.query.storeId" @lostComp="lostComp">
            </textRight>
            <imgRight v-if="imgRightShow" :thiscurrComp="thiscurrComp" :checkIndex="checkIndex" :storeId="route.query.storeId" @lostComp="lostComp">
            </imgRight>
            <videoRight v-if="videoRightShow" :thiscurrComp="thiscurrComp" :checkIndex="checkIndex" :storeId="route.query.storeId" @lostComp="lostComp">
            </videoRight>
            <divRight v-if="divRightShow" :thiscurrComp="thiscurrComp" :checkIndex="checkIndex" :storeId="route.query.storeId" @lostComp="lostComp">
            </divRight>
            <categoryLineRight v-if="categoryLineRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex"
                @lostComp="lostComp"></categoryLineRight>
            <categoryBarRight v-if="categoryBarRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex"
                @lostComp="lostComp"></categoryBarRight>
            <pieRight v-if="pieRightShow" :thiscurrComp="thiscurrComp" :checkIndex="checkIndex" :storeId="route.query.storeId" @lostComp="lostComp">
            </pieRight>
            <scatterRight v-if="scatterRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </scatterRight>
            <mapRight v-if="mapRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </mapRight>
            <numberRight v-if="numberRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </numberRight>
            <kLineRight v-if="kLineRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </kLineRight>
            <radarRight v-if="radarRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </radarRight>
            <funnelRight v-if="funnelRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </funnelRight>
            <gaugeRight v-if="gaugeRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </gaugeRight>
            <btnRight v-if="btnRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </btnRight>
            <progressRight v-if="progressRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </progressRight>
            <timeRight v-if="timeRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </timeRight>
            <BDmapRight v-if="BDmapRightShow" :thiscurrComp="thiscurrComp" :storeId="route.query.storeId" :checkIndex="checkIndex" @lostComp="lostComp">
            </BDmapRight>
        </div>
        <!-- 没选中组件的情况 -->
        <div v-if="showDefault" style="padding:15px">当前没有正在编辑的组件</div>
    </div>
</template>

<script setup lang="ts">
import headTab from './comp/headTab.vue';
import textRight from './comp/textRight.vue';
import imgRight from './comp/imgRight.vue';
import categoryLineRight from './comp/categoryLineRight.vue';
import categoryBarRight from './comp/categoryBarRight.vue';
import pieRight from './comp/pieRight.vue';
import divRight from './comp/divRight.vue';
import scatterRight from './comp/scatterRight.vue';
import mapRight from './comp/mapRight.vue';
import videoRight from './comp/videoRight.vue';
import numberRight from './comp/numberRight.vue';
import kLineRight from './comp/kLineRight.vue';
import radarRight from './comp/radarRight.vue';
import funnelRight from './comp/radarRight.vue';
import gaugeRight from './comp/gaugeRight.vue';
import btnRight from './comp/btnRight.vue';
import progressRight from './comp/progressRight.vue';
import timeRight from './comp/timeRight.vue';
import BDmapRight from './comp/BDmapRight.vue';

import { ref, watch } from 'vue';
import { useRoute} from 'vue-router'
const route=useRoute();

const props = defineProps([
    'mycurrComp',
])
let thiscurrComp = ref<null>(null)
let checkIndex = ref<number>(0)
function checkTabChange(index) {
    checkIndex.value = index
}

let showDefault = ref<boolean>(true)
let textRightShow = ref<boolean>(false)
let imgRightShow = ref<boolean>(false)
let categoryLineRightShow = ref<boolean>(false)
let categoryBarRightShow = ref<boolean>(false)
let pieRightShow = ref<boolean>(false)
let divRightShow = ref<boolean>(false)
let scatterRightShow = ref<boolean>(false)
let mapRightShow = ref<boolean>(false)
let videoRightShow = ref<boolean>(false)
let numberRightShow = ref<boolean>(false)
let kLineRightShow = ref<boolean>(false)
let radarRightShow = ref<boolean>(false)
let funnelRightShow = ref<boolean>(false)
let gaugeRightShow = ref<boolean>(false)
let btnRightShow = ref<boolean>(false)
let progressRightShow = ref<boolean>(false)
let timeRightShow = ref<boolean>(false)
let BDmapRightShow = ref<boolean>(false)

watch(
    () => props.mycurrComp,
    (newValue, oldValue) => {
        //传值给子组件
        thiscurrComp.value = props.mycurrComp
        //先设置默认样式
        textRightShow.value = false
        imgRightShow.value = false
        categoryLineRightShow.value = false
        categoryBarRightShow.value = false
        pieRightShow.value = false
        divRightShow.value = false
        scatterRightShow.value = false
        mapRightShow.value = false
        videoRightShow.value = false
        numberRightShow.value = false
        kLineRightShow.value = false
        radarRightShow.value = false
        funnelRightShow.value = false
        gaugeRightShow.value = false
        btnRightShow.value = false
        progressRightShow.value = false
        timeRightShow.value = false
        BDmapRightShow.value = false
        showDefault.value = true
        //选中哪个子组件异步显示哪个
        if (newValue) {
            setTimeout(() => {
                if (props.mycurrComp.info.type === 'textComp') {
                    showDefault.value = false
                    textRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'imgComp') {
                    showDefault.value = false
                    imgRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'categoryLineComp') {
                    showDefault.value = false
                    categoryLineRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'categoryBarComp') {
                    showDefault.value = false
                    categoryBarRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'pieComp') {
                    showDefault.value = false
                    pieRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'divComp') {
                    showDefault.value = false
                    divRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'scatterComp') {
                    showDefault.value = false
                    scatterRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'mapComp') {
                    showDefault.value = false
                    mapRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'videoComp') {
                    showDefault.value = false
                    videoRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'numberComp') {
                    showDefault.value = false
                    numberRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'kLineComp') {
                    showDefault.value = false
                    kLineRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'radarComp') {
                    showDefault.value = false
                    radarRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'funnelComp') {
                    showDefault.value = false
                    funnelRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'gaugeComp') {
                    showDefault.value = false
                    gaugeRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'btnComp') {
                    showDefault.value = false
                    btnRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'progressComp') {
                    showDefault.value = false
                    progressRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'timeComp') {
                    showDefault.value = false
                    timeRightShow.value = true
                }
                if (props.mycurrComp.info.type === 'BDmapComp') {
                    showDefault.value = false
                    BDmapRightShow.value = true
                }
            }, 0)
        }
    }, { immediate: true })


const lostComp = (data: boolean) => {
    if (data) {
        textRightShow.value = false
        imgRightShow.value = false
        categoryLineRightShow.value = false
        categoryBarRightShow.value = false
        pieRightShow.value = false
        divRightShow.value = false
        scatterRightShow.value = false
        mapRightShow.value = false
        videoRightShow.value = false
        numberRightShow.value = false
        kLineRightShow.value = false
        radarRightShow.value = false
        funnelRightShow.value = false
        gaugeRightShow.value = false
        btnRightShow.value = false
        progressRightShow.value = false
        timeRightShow.value = false
        BDmapRightShow.value = false
        showDefault.value = true
    }
}
</script>

<style scoped lang="less">
.wrapper {
    width: 100%;
    height: 100%;
    .top{
        height: 51px;
        width: 100%;
    }
}
</style>