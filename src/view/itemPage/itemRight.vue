<template>
    <div class="wrapper">
        <headTab class="top" :checkIndex="checkIndex" @checkTabChange="checkTabChange"></headTab>
        <!-- 选中了组件再出现配置栏 -->
        <div v-if="mycurrComp">
            <textRight v-if="textRightShow" :thiscurrComp="thiscurrComp" :checkIndex="checkIndex" :storeId="route.query.storeId" @lostComp="lostComp">
            </textRight>
            <imgRight v-if="imgRightShow" :thiscurrComp="thiscurrComp" :checkIndex="checkIndex" :storeId="route.query.storeId" @lostComp="lostComp">
            </imgRight>
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