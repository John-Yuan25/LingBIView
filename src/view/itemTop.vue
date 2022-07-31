<template>
    <div class="wrapper">
        <div class="title">工作区</div>
        <div class="btn">
            <span @click="preview"><i class="iconfont icon-yulan"></i> 预览</span>
            <span @click="publish"><i class="iconfont icon-fabu"></i> 发布</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function preview(){
    router.push({
        path: '/preview'
    })
    // let routeUrl=router.resolve({
    //     path: '/preview'
    // })
    // window.open(routeUrl.href)
}
function publish(){
    alert('发布功能正在研发中')
}
</script>

<style scoped lang="less">
.wrapper {
    background-color: #18181c;
    color: #d5d5d6;
    height: 60px;
    width: 100%;
    display:flex;
    position: relative;
    .title {
        height: 60px;
        width: 60px;
        font-size: 14px;
        text-align: center;
        line-height: 60px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .btn {
        height: 60px;
        width: 300px;
        font-size: 14px;
        line-height: 60px;
        position: absolute;
        right: 10%;
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
    }
}
</style>