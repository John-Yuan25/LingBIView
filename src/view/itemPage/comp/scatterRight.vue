<template>
    <div class="wrapper">
        <!-- 样式 -->
        <div v-if="props.checkIndex === 0">
            <div class="styleItem" v-for="(item, index) in thiscurrComp.attribute" :key="index">
                <span class="label">{{ item.name }}:</span>
                <input class="inputStyle" v-if="item.type === 'number'" type="number" v-model="item.value"
                    @change="updateComp">
            </div>
        </div>
        <!-- 数据 -->
        <div v-if="props.checkIndex === 1">
            <div class="ajaxBox">
                <div class="styleItem">
                    <span class="label">数据源</span>
                    <select-option :selectOption="selectDataSource" :currSelect="currDataSource"
                        @selectData="getDataSource"></select-option>
                </div>
            </div>

            <div class="sandOptionBox" v-if="sandShow">
                <div class="styleItem">
                    <span class="label">请求地址:</span>
                    <input class="inputStyle" type="text" v-model="ajaxUrl">
                </div>
                <div class="styleItem">
                    <span class="label">请求方法：</span>
                    <select-option :selectOption="selectMethods" :currSelect="ajaxMethod" @selectData="getMethods">
                    </select-option>
                </div>
                <div class="styleItem">
                    <span class="label">请求间隔:</span>
                    <input class="inputStyle" type="number" v-model="timeout">/s
                </div>

                <div class="sandBox">
                    <button class="sandBtn" id="sandAjaxBtn" @click="sandAjax">发送请求</button>
                </div>
                <div class="sandBox">
                    <button class="sandBtn" id="stopAjaxBtn" @click="stopAjax">停止轮询</button>
                </div>
            </div>

            <div class="dataShow">{{ optionStr }}</div>
            <div class="btn">
                <span id="updateDataSpan">
                    <input type="file" class="updateDataBtn" @change="importData">
                    <i class="iconfont icon-daoru"></i>导入(json)
                </span>
                <span @click="downloadData"><i class="iconfont icon-xiazai"></i> 下载</span>
            </div>
        </div>
        <button class="delectBtn" @click="delectCom"><i class="iconfont icon-shanchu"></i>删除组件</button>
    </div>
</template>

<script setup lang="ts">
import { useScatterStore, useCurrStore } from '@/stores'
import { exportFileJSON, importFileJSON, unMountedComponent } from '../../../utils/index'
import { ButtonHTMLAttributes, ref, watch, toRefs } from 'vue';
import selectOption from './selectOption.vue';
import { getJson } from '../../../server'

const props = defineProps([
    'thiscurrComp',
    'checkIndex',
    'storeId'
])
const emit = defineEmits([
    'lostComp',
])
const currStore = useCurrStore(props.storeId)()
let scatterStore = useScatterStore(currStore.currStoreId)()
let optionStr = ref(scatterStore.option.series[0].data)
//zindex属性在父组件上
const parentNode = document.getElementById(currStore.currStoreId) as HTMLElement;

//监听图表的数据变化,更新optionStr
watch(() => scatterStore.option.series[0].data, (newValue, oldValue) => {
    optionStr.value = newValue
}
)

//更新组件数据方法
function updateComp(e) {
    scatterStore = useScatterStore(currStore.currStoreId)()
    scatterStore.$patch({
        attribute: [
            {
                name: "宽度",
                type: 'number',
                key: 'width',
                value: props.thiscurrComp.attribute[0].value,
                placeholder: '请输入宽度'
            }, {
                name: '高度',
                type: 'number',
                key: 'height',
                value: props.thiscurrComp.attribute[1].value,
                placeholder: '请输入高度'
            }, {
                name: '层级',
                type: 'number',
                key: 'z-index',
                value: props.thiscurrComp.attribute[2].value,
            }
        ]
    })
    parentNode.style.zIndex = props.thiscurrComp.attribute[2].value
}

//传入json数据
function importData(e) {
    scatterStore = useScatterStore(currStore.currStoreId)()
    importFileJSON(e).then((res) => {
        //调用actions的方法
        scatterStore.importOption(res)
    }).catch((e) => {
        alert(e)
    })
}

//下载当前图表的json数据
function downloadData() {
    scatterStore = useScatterStore(currStore.currStoreId)()
    let dataStr = JSON.stringify(scatterStore.option.series[0].data)
    //调用导出json数据方法
    exportFileJSON(dataStr, `${currStore.currStoreId}.json`)
}

//设置静态数据与动态请求
let { sandShow } = toRefs(scatterStore)
let { ajaxMethod } = toRefs(scatterStore)
let selectDataSource = ['静态数据', '动态请求']
let selectMethods = ['get', 'post']
let { ajaxUrl } = toRefs(scatterStore)
let { currDataSource } = toRefs(scatterStore)
let { timeout } = toRefs(scatterStore)
const getDataSource = (data) => {
    if (data === '静态数据') {
        sandShow.value = false
        currDataSource.value = '静态数据'
    }
    else if (data === '动态请求') {
        sandShow.value = true
        currDataSource.value = '动态请求'
    }
}
const getMethods = (data) => {
    ajaxMethod.value = data
}
//发送请求
let { timer } = toRefs(scatterStore)

const sandAjax = async () => {
    scatterStore = useScatterStore(currStore.currStoreId)()
    let sandAjaxBtn = document.querySelector('#sandAjaxBtn') as ButtonHTMLAttributes
    //点击一次之后禁用发送按钮
    sandAjaxBtn.disabled = true
    //开启停止轮询按钮
    sandAjaxBtn.innerHTML = '<i class="iconfont icon-round-loading"></i>'
    if (ajaxUrl.value == '') {
        alert('请输入请求地址')
        sandAjaxBtn.disabled = false
        sandAjaxBtn.innerHTML = '发送请求'
    }
    if (timeout.value == undefined) {
        alert('请输入请求间隔时间')
        sandAjaxBtn.disabled = false
        sandAjaxBtn.innerHTML = '发送请求'
    } else {
        let jsonData: any
        const promise = new Promise(async (resolve, reject) => {
            resolve(getJson(ajaxUrl.value, ajaxMethod.value))
        }).then(value => {
            jsonData = value
            sandAjaxBtn.disabled = false
            sandAjaxBtn.innerHTML = '发送请求'
            if (timer.value !== null) {
                clearInterval(timer.value)
                timer.value = null
            }
            timer.value = setInterval(async () => {
                jsonData = await getJson(ajaxUrl.value, ajaxMethod.value)
                scatterStore.importOption(jsonData)
                console.log(ajaxMethod.value);
            }, timeout.value as number * 1000)
        }, err => {
            if (timer.value !== null) {
                clearInterval(timer.value)
                timer.value = null
            }
            alert(err)
            sandAjaxBtn.disabled = false
            sandAjaxBtn.innerHTML = '发送请求'
        })
    }
}
//停止轮询
const stopAjax = () => {
    //清除定时器
    if (timer.value !== null) {
        //设置加载状态，提升交互体验
        let stopAjaxBtn = document.querySelector('#stopAjaxBtn') as ButtonHTMLAttributes
        stopAjaxBtn.innerHTML = '<i class="iconfont icon-round-loading"></i>'
        setTimeout(() => {
            clearInterval(timer.value)
            timer.value = null
            stopAjaxBtn.innerHTML = '停止轮询'
        }, 1000)

    }
}

//删除组件
const delectCom = () => {
    if (confirm("确定要删除这个组件吗？")) {
        //清除定时器
        if (timer.value !== null) {
            clearInterval(timer.value)
            timer.value = null
        }
        emit('lostComp', true)
        currStore.currCompShow = false
        //卸载组件
        unMountedComponent(props.thiscurrComp,props.storeId)
        //删除本地存储的当前组件数据
        localStorage.removeItem(currStore.currStoreId)
    }

}

</script>

<style scoped lang="less">
.wrapper {
    width: 300px;

    .styleItem {
        margin: 10px;
        display: flex;

        .label {
            display: inline-block;
            width: 80px;
        }

        .inputStyle {
            flex: 1;
        }
    }

    .dataBox {
        min-height: 300px;
        margin: 15px;
        width: 90%;
    }

    .dataShow {
        border: 1px solid #5fbf9f;
        border-radius: 5px;
        color: #bb7b68;
        background-color: #18181c;
        padding: 10px;
        margin: 10px;
        margin-top: 20px;
    }

    .btn {
        height: 60px;
        width: 300px;
        font-size: 14px;
        line-height: 60px;

        span {
            padding: 5px;
            margin-left: 30px;
            border: 2px solid #4c4c4f;
            border-radius: 5px;
        }

        span:hover {
            border: 2px solid #5fbf9f;
            color: #5fbf9f;
            cursor: pointer;
        }

        #updateDataSpan {
            position: relative;

            .updateDataBtn {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }
        }
    }

    .ajaxBox {
        margin: 10px;
    }

    .sandOptionBox {
        border: 2px solid #5fbf9f;
        height: 100%;
        margin: 10px;
        padding-top: 1px;

        .sandBox {
            margin: 10px;

            .sandBtn {
                width: 100%;
                padding: 5px;
                border: 2px solid #4c4c4f;
                background-color: #ffffff;
                border-radius: 5px;
            }

            .sandBtn:hover {
                border: 2px solid #5fbf9f;
                color: #5fbf9f;
                cursor: pointer;
            }
        }
    }

    .delectBtn {
        background-color: rgb(233, 17, 17);
        color: #ffffff;
        width: 80px;
        height: 30px;
        position: absolute;
        border: 0px;
        bottom: 10px;
        right: 10px;
    }

}
</style>