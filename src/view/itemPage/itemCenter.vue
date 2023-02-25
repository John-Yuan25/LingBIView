<template>
    <div id="canvasBox" class="wrapper" @dragover="dragOver" @drop="drop" @click="checkComp">
        <!-- 设置组件的挂载点 -->
        <div :id="item.info.id" :currStoreId="route.query.storeId" v-for="(item, index) in components" :key="index"></div>
        <div id="borderBox" @mousedown="mouseDownStart" class="borderStyle" v-show="currCompShow"
            :style="(setStyleOfBorder as any)" @contextmenu.prevent="rightClick">
            <div id="borderDot1" @mousedown="changeSizeStart"></div>
            <div id="borderDot2" @mousedown="changeSizeStart"></div>
            <div id="borderDot3" @mousedown="changeSizeStart"></div>
            <div id="borderDot4" @mousedown="changeSizeStart"></div>
            <div id="borderDot5" @mousedown="changeSizeStart"></div>
            <div id="borderDot6" @mousedown="changeSizeStart"></div>
            <div id="borderDot7" @mousedown="changeSizeStart"></div>
            <div id="borderDot8" @mousedown="changeSizeStart"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getId, mountedComponent, unMountedComponent } from '../../utils/index'
import getComponent from '../../stores/index';
import { ref, reactive, computed, toRefs } from 'vue';
import { useCurrStore, useCategoryBarStore, useCategoryLineStore, usePieStore } from '@/stores';
import { useRoute } from 'vue-router';
const route = useRoute();

let zIndex: number = 1;
const emit = defineEmits(['currComp'])
const currStore = useCurrStore(route.query.storeId)()
let components: Array<any> = reactive([])

//如果currStore里面有没清空的组件，先渲染出来
//检查是否有删除标记，有则删除组件
for (let i = 0; i < currStore.Allcomponents.length; i++) {
    if (currStore.Allcomponents[i].info.deleted) {
        currStore.Allcomponents.splice(i, 1)
    }
}
components = currStore.Allcomponents
components.forEach(item => {
    mountedComponent(item)
})


//拖拽到画布的回调
function dragOver(e) {
    e.preventDefault()
}

//鼠标松开的回调
function drop(e) {
    e.preventDefault();
    //画布的宽高
    let canvas = document.getElementById("canvasBox") as any;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    //获取和设置组件信息
    let info = JSON.parse(e.dataTransfer.getData("info"));
    info.id = getId();
    info.currStoreId = route.query.storeId;
    let component = getComponent(info);
    let compWidth = 0;
    let compHeight = 0;
    component.attribute.forEach(item => {
        if (item.key === 'width') {
            compWidth = item.value
        }
        if (item.key === 'height') {
            compHeight = item.value
        }
    })
    let left = e.offsetX - compWidth / 2;
    let top = e.offsetY - compHeight / 2;
    if (left < 0) { left = 0; }
    if (top < 0) { top = 0; }
    left = left / canvasWidth * 100
    top = top / canvasHeight * 100
    component.position = { left, top, zIndex }
    //将处理好的组建添加到组建数组
    components.push(component)
    //挂载组件
    mountedComponent(component)
    currStore.Allcomponents = components
}

let currComp = ref<any>(null)
let { currCompShow } = toRefs(currStore)
//点击选中组件
function checkComp(e) {
    // 循环找到我们点击的组件，这里使用的正则匹配
    let reg = /v\w{8}-\w{4}/;
    let node = e.target;
    let count = 0;
    // 还有node ,且node的id不是组件的id，就继续寻找
    while (node && !reg.test(node.id)) {
        count++;
        if (count > 100) { return; }
        node = node.parentNode;
    }
    // 获得匹配到的组件的id
    if (node && node.id) {
        currComp = components.find((item) => {
            if (item.info.id === node.id) {
                //触发计算属性改变选中框位置
                currCompShow.value = false
                return item;
            }
        });
        currCompShow.value = true
    } else {
        currComp = null;
        currCompShow.value = false
    }
    emit('currComp', currComp)
}

const setStyleOfBorder = computed(() => {
    let compWidth = ref<number>(0)
    let compHeight = ref<number>(0)
    let compLeft = ref<number>(0)
    let compTop = ref<number>(0)
    if (currCompShow.value) {
        try {
            currComp.attribute.forEach(item => {
                if (item.key === 'width') {
                    compWidth.value = item.value
                }
                if (item.key === 'height') {
                    compHeight.value = item.value
                }
                compLeft.value = currComp.position.left;
                compTop.value = currComp.position.top;
            })
        } catch (error) {
            console.log(error);
        }
    }
    return {
        width: `${compWidth.value}px`,
        height: `${compHeight.value}px`,
        left: `${compLeft.value}%`,
        top: `${compTop.value}%`,
    }

})
//目标缩放事件
let changeSizeState = 0;
const changeSizeStart = function (e) {
    //点击的是哪个点
    changeSizeState = Number(e.target.id.slice(-1));
}
let startPosition = {
    x: 0,
    y: 0
}
let changeSizeWidth = 0;
let changeSizeHeight = 0;
//鼠标按下回调
function mouseDownStart(e) {
    // 记录鼠标按下瞬间的位置
    startPosition.x = e.clientX;
    startPosition.y = e.clientY;
    // 注册鼠标移动和鼠标松开的事件
    document.addEventListener('mousemove', mouseMove, true)
    document.addEventListener('mouseup', mouseUp, true)
}

//鼠标移动事件
async function mouseMove(e) {
    //画布的宽高
    let canvas = document.getElementById("canvasBox") as any;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    // 计算偏移量
    let offsetX = e.clientX - startPosition.x;
    let offsetY = e.clientY - startPosition.y;
    let comp = document.getElementById(currComp.info.id) as any
    let borderComp = document.getElementById('borderBox') as any
    // 判定是否点击的是缩放点
    switch (changeSizeState) {
        case 1: {
            if (offsetX <= parseInt(comp.style.width) - 10 && offsetY <= parseInt(comp.style.height) - 10) {
                changeSizeHeight = -offsetY + parseInt(comp.style.height);
                changeSizeWidth = -offsetX + parseInt(comp.style.width);
                currComp.attribute[0].value = zoomLimit('-x', changeSizeWidth, comp, currComp);
                currComp.attribute[1].value = zoomLimit('+y', changeSizeHeight, comp, currComp);
                await Object.assign(comp.style, {
                    top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
                    left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
                })
                await Object.assign(borderComp.style, {
                    height: zoomLimit('+y', -offsetY + parseInt(comp.style.height), comp, currComp) + 'px',
                    width: zoomLimit('-x', -offsetX + parseInt(comp.style.width), comp, currComp) + 'px',
                    top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
                    left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
                })
            }
            break;
        }
        case 2: {
            if (offsetY <= parseInt(comp.style.height) - 10) {
                //设置组件的当前高
                changeSizeHeight = -offsetY + parseInt(comp.style.height);
                currComp.attribute[1].value = zoomLimit('+y', changeSizeHeight, comp, currComp);
                // 设置组件的当前位置
                await Object.assign(comp.style, {
                    top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
                })

                // 设置选中框高和位置
                await Object.assign(borderComp.style, {
                    height: zoomLimit('+y', -offsetY + parseInt(comp.style.height), comp, currComp) + 'px',
                    top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
                })
            }
            break;
        }
        case 3: {
            if (offsetY <= parseInt(comp.style.height) - 10) {
                //设置组件的当前宽
                changeSizeWidth = offsetX + parseInt(comp.style.width);
                currComp.attribute[0].value = zoomLimit('+x', changeSizeWidth, comp, currComp);
                //设置组件的当前高
                changeSizeHeight = -offsetY + parseInt(comp.style.height);
                currComp.attribute[1].value = zoomLimit('+y', changeSizeHeight, comp, currComp);
                // 设置组件的当前位置
                await Object.assign(comp.style, {
                    top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
                })

                // 设置选中框高和位置
                await Object.assign(borderComp.style, {
                    height: zoomLimit('+y', -offsetY + parseInt(comp.style.height), comp, currComp) + 'px',
                    top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
                    width: zoomLimit('+x', offsetX + parseInt(comp.style.width), comp, currComp) + 'px',
                })
            }
            break;
        }
        case 4: {
            if (offsetX <= parseInt(comp.style.width) - 10) {
                //设置组件的当前宽
                changeSizeWidth = -offsetX + parseInt(comp.style.width);
                currComp.attribute[0].value = zoomLimit('-x', changeSizeWidth, comp, currComp);
                // 设置组件的当前位置
                await Object.assign(comp.style, {
                    left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
                })
                // 设置选中框宽和位置
                await Object.assign(borderComp.style, {
                    width: zoomLimit('-x', -offsetX + parseInt(comp.style.width), comp, currComp) + 'px',
                    left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
                })
            }
            break;
        }
        case 5: {
            //设置组件的当前宽
            changeSizeWidth = offsetX + parseInt(comp.style.width);
            currComp.attribute[0].value = zoomLimit('+x', changeSizeWidth, comp, currComp);
            // 设置选中框宽
            await Object.assign(borderComp.style, {
                width: zoomLimit('+x', offsetX + parseInt(comp.style.width), comp, currComp) + 'px',
            })
            break;
        }
        case 6: {
            if (offsetX <= parseInt(comp.style.width) - 10) {
                //设置组件的当前宽
                changeSizeWidth = -offsetX + parseInt(comp.style.width);
                currComp.attribute[0].value = zoomLimit('-x', changeSizeWidth, comp, currComp);
                //设置组件的当前高
                changeSizeHeight = offsetY + parseInt(comp.style.height);
                currComp.attribute[1].value = zoomLimit('-y', changeSizeHeight, comp, currComp);
                // 设置组件的当前位置
                await Object.assign(comp.style, {
                    left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
                })
                // 设置选中框宽和位置
                await Object.assign(borderComp.style, {
                    width: zoomLimit('-x', -offsetX + parseInt(comp.style.width), comp, currComp) + 'px',
                    height: zoomLimit('-y', offsetY + parseInt(comp.style.height), comp, currComp) + 'px',
                    left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
                })
            }
            break;
        }
        case 7: {
            //设置组件的当前高
            changeSizeHeight = offsetY + parseInt(comp.style.height);
            currComp.attribute[1].value = zoomLimit('-y', changeSizeHeight, comp, currComp);
            // 设置选中框高
            await Object.assign(borderComp.style, {
                height: zoomLimit('-y', offsetY + parseInt(comp.style.height), comp, currComp) + 'px',
            })
            break;
        }
        case 8: {
            //设置组件的当前宽高
            changeSizeWidth = offsetX + parseInt(comp.style.width);
            currComp.attribute[0].value = zoomLimit('+x', changeSizeWidth, comp, currComp);
            changeSizeHeight = offsetY + parseInt(comp.style.height);
            currComp.attribute[1].value = zoomLimit('-y', changeSizeHeight, comp, currComp);
            // 设置选中框宽高
            await Object.assign(borderComp.style, {
                width: zoomLimit('+x', offsetX + parseInt(comp.style.width), comp, currComp) + 'px',
                height: zoomLimit('-y', offsetY + parseInt(comp.style.height), comp, currComp) + 'px',
            })
            break;
        }
        default: {
            // 设置组件的当前位置
            Object.assign(comp.style, {
                left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
                top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
            })

            // 设置选中框位置
            Object.assign(borderComp.style, {
                left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
                top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
            })
        }
    }

}

//鼠标松开事件
async function mouseUp(e) {
    //画布的宽高
    let canvas = document.getElementById("canvasBox") as any;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    let comp = document.getElementById(currComp.info.id) as any;
    let borderComp = document.getElementById('borderBox') as any
    //为了让图标组件缩放生效，需要更新state的数据触发监听函数去changeSize
    let thisStore;
    if (currStore.type === 'categoryLineComp') {
        thisStore = useCategoryLineStore(currStore.currStoreId)()
        thisStore.$patch({
            attribute: [
                {
                    name: "宽度",
                    type: 'number',
                    key: 'width',
                    value: parseFloat(borderComp.style.width),
                    placeholder: '请输入宽度'
                }, {
                    name: '高度',
                    type: 'number',
                    key: 'height',
                    value: parseFloat(borderComp.style.height),
                    placeholder: '请输入高度'
                }, {
                    name: '层级',
                    type: 'number',
                    key: 'z-index',
                    value: comp.style.zIndex,
                }
            ]
        })
    }
    if (currStore.type === 'categoryBarComp') {
        thisStore = useCategoryBarStore(currStore.currStoreId)()
        thisStore.$patch({
            attribute: [
                {
                    name: "宽度",
                    type: 'number',
                    key: 'width',
                    value: parseFloat(borderComp.style.width),
                    placeholder: '请输入宽度'
                }, {
                    name: '高度',
                    type: 'number',
                    key: 'height',
                    value: parseFloat(borderComp.style.height),
                    placeholder: '请输入高度'
                }, {
                    name: '层级',
                    type: 'number',
                    key: 'z-index',
                    value: comp.style.zIndex,
                }
            ]
        })
    }
    if (currStore.type === 'pieComp') {
        thisStore = usePieStore(currStore.currStoreId)()
        thisStore.$patch({
            attribute: [
                {
                    name: "宽度",
                    type: 'number',
                    key: 'width',
                    value: parseFloat(borderComp.style.width),
                    placeholder: '请输入宽度'
                }, {
                    name: '高度',
                    type: 'number',
                    key: 'height',
                    value: parseFloat(borderComp.style.height),
                    placeholder: '请输入高度'
                }, {
                    name: '层级',
                    type: 'number',
                    key: 'z-index',
                    value: comp.style.zIndex,
                }
            ]
        })
    }
    //判定是否点击的是缩放点
    switch (changeSizeState) {
        case 1: {
            await Object.assign(comp.style, {
                width: changeSizeWidth + 'px',
                height: changeSizeHeight + 'px'
            })
            currComp.position.top = parseFloat(comp.style.top);
            currComp.position.left = parseFloat(comp.style.left);

            break;
        }
        case 2: {
            Object.assign(comp.style, {
                height: changeSizeHeight + 'px'
            })
            currComp.position.top = parseFloat(comp.style.top);
            break;
        }
        case 3: {
            Object.assign(comp.style, {
                height: changeSizeHeight + 'px',
                width: changeSizeWidth + 'px'
            })
            currComp.position.top = parseFloat(comp.style.top);
            break;
        }
        case 4: {
            Object.assign(comp.style, {
                width: changeSizeWidth + 'px'
            })
            currComp.position.left = parseFloat(comp.style.left);
            break;
        }
        case 5: {
            Object.assign(comp.style, {
                width: changeSizeWidth + 'px'
            })
            break;
        }
        case 6: {
            Object.assign(comp.style, {
                width: changeSizeWidth + 'px',
                height: changeSizeHeight + 'px'
            })
            currComp.position.left = parseFloat(comp.style.left);
            break;
        }
        case 7: {
            Object.assign(comp.style, {
                height: changeSizeHeight + 'px'
            })
            break;
        }
        case 8: {
            Object.assign(comp.style, {
                width: changeSizeWidth + 'px',
                height: changeSizeHeight + 'px'
            })
            break;
        }
        default: {
            // 更新组件的数据
            currComp.position.left = boundaryLimit('x', currComp.position.left / 100 * canvasWidth + (e.clientX - startPosition.x), currComp)
            currComp.position.top = boundaryLimit('y', currComp.position.top / 100 * canvasHeight + (e.clientY - startPosition.y), currComp)
        }
    }
    changeSizeState = 0;


    // 移除事件
    document.removeEventListener('mousemove', mouseMove, true)
    document.removeEventListener('mouseup', mouseUp, true)
}

// 限制移动的边界
function boundaryLimit(type, num, comp) {
    //type ：移动的轴，x或者y， num：当前的偏移量， comp：当前组件
    // 计算出边界值

    //画布的宽高
    let canvas = document.getElementById("canvasBox") as any;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;

    //组件的宽高
    let compWidth = 0;
    let compHeight = 0;
    comp.attribute.forEach((item) => {
        if (item.key === "width") {
            compWidth = item.value;
        }
        if (item.key === "height") {
            compHeight = item.value;
        }
    });

    //边界值
    let maxX = canvasWidth - compWidth;
    let maxY = canvasHeight - compHeight;
    let lastNum = 0;
    if (type === "x") {
        if (num < 0) {
            lastNum = 0;
        } else if (num > maxX) {
            lastNum = maxX / canvasWidth;
        } else {
            lastNum = num / canvasWidth;
        }
    } else if (type === "y") {
        if (num < 0) {
            lastNum = 0;
        } else if (num > maxY) {
            lastNum = maxY / canvasHeight;
        } else {
            lastNum = num / canvasHeight;
        }
    }
    return lastNum * 100
}

//限制缩放的边界值
function zoomLimit(type, num, comp, currComp) {
    //type ：移动的轴，x或者y，+x表示右，-x表示左， num：当前的偏移量， comp：当前组件
    // 计算出边界值
    //画布的宽高
    let canvas = document.getElementById("canvasBox") as any;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    //组件的宽高
    let compWidth = parseInt(comp.style.width);
    let compHeight = parseInt(comp.style.height);

    let compLeft = currComp.position.left / 100 * canvasWidth;
    let compTop = currComp.position.top / 100 * canvasHeight;

    //边界值，最小为1，最大为画布的宽高,
    let maxX = 0;
    let maxY = 0;
    let lastNum = 0;
    if (type === "+x") {
        maxX = canvasWidth - compLeft;
        if (num < 10) {
            lastNum = 10;
        } else if (num > maxX) {
            lastNum = maxX;
        } else {
            lastNum = num;
        }
    } else if (type === "-x") {
        maxX = compWidth + compLeft;
        if (num < 10) {
            lastNum = 10;
        } else if (num > maxX) {
            lastNum = maxX;
        } else {
            lastNum = num;
        }
    } else if (type === "+y") {
        maxY = compHeight + compTop;
        if (num < 10) {
            lastNum = 10;
        } else if (num > maxY) {
            lastNum = maxY;
        } else {
            lastNum = num;
        }
    } else if (type === "-y") {
        maxY = canvasHeight - compTop;
        if (num < 10) {
            lastNum = 10;
        } else if (num > maxY) {
            lastNum = maxY;
        } else {
            lastNum = num;
        }
    }
    return lastNum
}

//鼠标右击事件
function rightClick() {
    // if (confirm("确定要删除这个组件吗？")) {
    //     // const appNode = document.getElementById(currComp.info.id) as HTMLElement
    //     // appNode.remove()
    //     unMountedComponent(currComp)
    // }
    // currComp = null;
    // currCompShow.value = false;
}



</script>

<style scoped lang="less">
.wrapper {
    background-color: rgb(61, 59, 59);
    position: relative;
    width: 66vw;
    height: 66vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -moz-user-select: none;
    /*火狐*/
    /*选中文字时避免出现蓝色背景*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    /*选中文字时避免出现蓝色背景*/
    -ms-user-select: none;
    /*IE10*/
    /*选中文字时避免出现蓝色背景*/
    user-select: none;
    /*选中文字时避免出现蓝色背景*/

    .borderStyle {
        border: 1px solid #5fbf9f;
        position: absolute;
        z-index: 99999999;

        #borderDot1 {
            width: 4px;
            height: 4px;
            position: absolute;
            top: -4px;
            left: -4px;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: rgb(61, 59, 59);
        }

        #borderDot2 {
            width: 4px;
            height: 4px;
            position: absolute;
            top: -4px;
            left: 48%;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: rgb(61, 59, 59);
        }

        #borderDot3 {
            width: 4px;
            height: 4px;
            position: absolute;
            top: -4px;
            right: -4px;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: rgb(61, 59, 59);
        }

        #borderDot4 {
            width: 4px;
            height: 4px;
            position: absolute;
            top: 48%;
            left: -4px;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: rgb(61, 59, 59);
        }

        #borderDot5 {
            width: 4px;
            height: 4px;
            position: absolute;
            top: 48%;
            right: -4px;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: rgb(61, 59, 59);
        }

        #borderDot6 {
            width: 4px;
            height: 4px;
            position: absolute;
            bottom: -4px;
            left: -4px;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: rgb(61, 59, 59);
        }

        #borderDot7 {
            width: 4px;
            height: 4px;
            position: absolute;
            bottom: -4px;
            left: 48%;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: rgb(61, 59, 59);
        }

        #borderDot8 {
            width: 4px;
            height: 4px;
            position: absolute;
            bottom: -4px;
            right: -4px;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: rgb(61, 59, 59);
        }
    }
}
</style>