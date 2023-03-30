<template>
    <div class="wrapper">
        <div class="backBtn">
            <span @click="backToHome"><i class="iconfont icon-zhuye"></i></span>
        </div>
        <div class="title"><span> 工作区- {{ itemName }}</span></div>
        <div class="btn">
            <span @click="preview"><i class="iconfont icon-yulan"></i> 预览</span>
            <!-- <span @click="publish"><i class="iconfont icon-fabu"></i> 发布</span> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()
const route = useRoute();
let itemName = ref<string>(route.query.itemName as string)

//返回首页
const backToHome = function () {
    router.back();
}
//跳转至预览页
const preview = function () {
    const url = router.resolve({
        name: 'preview',
        query: {
            currStoreId: route.query.storeId
        }
    });
    // 打开新窗口
    window.open(url.href, '_blank');
}

const publish = function () {
    alert('发布功能正在研发中')
}
</script>

<style scoped lang="less">
.wrapper {
    background-color: #18181c;
    color: #d5d5d6;
    height: 60px;
    width: 100%;
    position: relative;

    .backBtn {
        height: 60px;
        width: 100px;
        text-align: center;
        line-height: 60px;
        position: absolute;
        left: 30px;

        .iconfont {
            font-size: 24px;
        }

        span {
            padding: 5px;
            margin-left: 30px;
            border-radius: 5px;
        }

        span:hover {
            color: #5fbf9f;
            cursor: pointer;
        }
    }

    .title {
        height: 60px;
        width: 400px;
        font-size: 14px;
        text-align: center;
        line-height: 60px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        span{
            width: 80%;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
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