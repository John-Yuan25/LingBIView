<template>
    <div id="canvasBox" class="wrapper" @dragover="dragOver" @drop="drop" @click="checkComp">
        <!-- 设置组件的挂载点 -->
        <div :id="item.info.id" v-for="(item, index) in components" :key="index"></div>
        <div id="borderBox" @mousedown="mouseDownStart" class="borderStyle" v-if="currCompShow"
            :style="(setStyleOfBorder as any)" @contextmenu.prevent="rightClick"></div>
    </div>
</template>

<script setup lang="ts">
import { getId, mountedComponent,unMountedComponent } from '../../utils/index'
import getComponent from '../../stores/index';
import { ref, reactive, computed, toRefs } from 'vue';
import { useCurrStore } from '@/stores';

let zIndex: number = 0;
const emit = defineEmits(['currComp'])
const currStore = useCurrStore()
let components: Array<any> = reactive([])

//如果currStore里面有没清空的组件，先渲染出来。（用于从预览页面返回重新调节）
components=currStore.Allcomponents
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
    let component = getComponent(info);
    zIndex++;
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

    //bug:添加进components数组后，component的id都变成一样的了
    //解决思路：尝试将getComponent方法在这里实现，不用跳到../stores/index
    components.push(component)
  
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
    let compZIndex = ref<number>(0)
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
            compZIndex.value = currComp.position.zIndex + 1
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
        zIndex: `${compZIndex.value}`,
    }

})

let startPosition = {
    x: 0,
    y: 0
}
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
function mouseMove(e) {

    //画布的宽高
    let canvas = document.getElementById("canvasBox") as any;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    // 计算偏移量
    let offsetX = e.clientX - startPosition.x;
    let offsetY = e.clientY - startPosition.y;

    // 设置组件的当前位置
    let comp = document.getElementById(currComp.info.id) as any
    Object.assign(comp.style, {
        left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
        top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
    })

    // 设置选中框位置
    let borderComp = document.getElementById('borderBox') as any
    Object.assign(borderComp.style, {
        left: boundaryLimit('x', currComp.position.left / 100 * canvasWidth + offsetX, currComp) + '%',
        top: boundaryLimit('y', currComp.position.top / 100 * canvasHeight + offsetY, currComp) + '%',
    })

}

//鼠标松开事件
function mouseUp(e) {
    //画布的宽高
    let canvas = document.getElementById("canvasBox") as any;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    // 移出事件
    document.removeEventListener('mousemove', mouseMove, true)
    document.removeEventListener('mouseup', mouseUp, true)
    // 更新组件的数据
    currComp.position.left = boundaryLimit('x', currComp.position.left / 100 * canvasWidth + (e.clientX - startPosition.x), currComp)
    currComp.position.top = boundaryLimit('y', currComp.position.top / 100 * canvasHeight + (e.clientY - startPosition.y), currComp)
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
    flex: 1;
    background-color: rgb(61, 59, 59);
    position: relative;
    width: 92%;
    height: 88vh;
    top: 2%;

    .borderStyle {
        border: 1px solid #5fbf9f;
        position: absolute;
    }
}
</style>