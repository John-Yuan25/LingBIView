<template>
    <div class="container">
        <div class="aboutBox" v-if="aboutBoxShow">
            <h3>软件Github地址</h3>
            <a href="https://github.com/John-Yuan25/LingBIView.git"
                target="_blank">https://github.com/John-Yuan25/LingBIView.git</a>
            <div @click="aboutBoxOff">关闭</div>
        </div>
        <header>
            <div class="userBox" @mouseover="showOption" @mouseleave="offOption">
                <label><i class="iconfont icon-yonghu"></i></label>
                <span class="username">{{ username }}</span>
            </div>
            <div class="userOptionBox" v-show="optionShow" @mouseover="showOption" @mouseleave="offOption">
                <div class="userOption">
                    <div class="arrow"></div>
                    <div class="about" @click="showAbout">关于软件</div>
                    <div class="logOut" @click="logOut">退出登录</div>
                </div>
            </div>
            <div class="logo">
                <img :src="logoImg" alt="">
                <h3>LingBIView</h3>
            </div>
        </header>
        <aside>
            <nav>
                <router-link to="/myItems" active-class="active">
                     我的项目 
                </router-link>
            </nav>
        </aside>
        <div class="inner">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue';
import { userItemsStore } from '@/stores';
import logoImg from '../../assets/logo.png'

const router = useRouter()

let username = sessionStorage.getItem('userName');
const textStore = userItemsStore(username)();
textStore.userName=username as string


let optionShow = ref<boolean>(false);
let aboutBoxShow = ref<boolean>(false);
const showOption = function (e) {
    optionShow.value = true;
}
const offOption = function (e) {
    optionShow.value = false;
}
//退出登录
const logOut = function (e) {
    router.push({
        path: '/'
    })
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
}
const showAbout = function (e) {
    aboutBoxShow.value = true;
}
const aboutBoxOff = function (e) {
    aboutBoxShow.value = false;
}
</script>

<style scoped lang="less">
.container {
    width: 100%;
    height: 100%;
    background-color: #101014;
    position: relative;

    .aboutBox {
        width: 400px;
        height: 120px;
        border: 1px solid #fff;
        background-color: #1c1d20;
        position: absolute;
        text-align: center;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
        border-radius: 5px;

        h3 {
            text-align: center;
            color: #fff;
            margin-bottom: 10px;
        }
        a {
            margin-left: 10px;
            color: #fff;
            text-decoration:none;
            
        }

        div {
            position: absolute;
            width: 40%;
            height: 30px;
            border: 1px solid #fff;
            color: #fff;
            line-height: 30px;
            text-align: center;
            bottom: 5px;
            margin-left: 30%;
            cursor: pointer;
            border-radius: 5px;
        }

        div:hover {
            border: 1px solid #69dcb5;
            color: #69dcb5;
        }

    }
}

header {
    width: 100%;
    height: 60px;
    background-color: #18181c;
    border-bottom: 1px solid #69dcb5;
    position: relative;

    .userBox {
        max-width: 120px;
        height: 36px;
        padding-left: 8px;
        padding-right: 10px;
        border: 1px solid #4c4c4f;
        top: 10px;
        right: 100px;
        position: absolute;
        line-height: 36px;
        font-size: 16px;
        color: #e2dede;
        border-radius: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .userBox:hover {
        border: 1px solid #5fbf9f;
        color: #5fbf9f;
        cursor: default;
    }

    .username {
        margin-left: 5px;
    }

    .userOptionBox {
        position: absolute;
        width: 100px;
        height: 62px;
        margin-top: 48px;
        margin-left: 40px;
        right: 90px;
        z-index: 10;
        border-radius: 5px;
        padding-top: 10px;

        .userOption {
            background-color: #413f3f;
            color: #fff;
            border-radius: 5px;
            width: 100px;
            height: 66px;
            position: relative;
            text-align: center;
            cursor: pointer;

            .arrow {
                width: 0px;
                height: 0px;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid transparent;
                border-bottom: 10px solid #413f3f;
                position: absolute;
                margin-top: -15px;
                margin-left: 12px;
            }

            .about {
                width: 90px;
                height: 25px;
                margin-left: 5px;
                margin-top: 5px;
                position: absolute;
                border-radius: 5px;
                font-size: 15px;
                line-height: 25px;
                border: 1px solid #5fbf9f;
            }

            .about:hover {
                border: 1px solid #fff;
                background-color: #5fbf9f;
            }

            .logOut {
                width: 90px;
                height: 25px;
                margin-left: 5px;
                margin-top: 35px;
                position: absolute;
                border-radius: 5px;
                font-size: 15px;
                line-height: 25px;
                border: 1px solid #5fbf9f;
            }

            .logOut:hover {
                border: 1px solid #fff;
                background-color: #5fbf9f;
            }
        }
    }

    .logo {
        position: absolute;
        height: 60px;
        width: 200px;
        left: 40px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        overflow: hidden;
        cursor: default;

        img {
            width: 50px;
            height: 50px;
            float: left;
            margin-top: 5px;
            padding-left: 30px;
        }
    }
}

aside {
    background-color: #18181c;
    height: 100%;
    width: 200px;
    top: 61px;
    position: absolute;
    border-right: 1px solid #69dcb5;

    nav {
        width: 180px;
        height: 80%;
        margin-top: 30px;
        margin-left: 10px;

        a {
            display: block;
            height: 40px;
            width: 180px;
            border: 1px solid #4c4c4f;
            margin-top: 20px;
            line-height: 40px;
            text-align: center;
            border-radius: 5px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            text-decoration:none;
        }

        a:hover {
            border: 1px solid #69dcb5;
            color: #69dcb5;
        }

    }

    .active {
        border: 1px solid #69dcb5;
        color: #69dcb5;
        background-color: #203431;
    }
}

.inner {
    width: calc(100% - 240px);
    height: calc(100% - 100px);
    position: absolute;
    top: 80px;
    left: 220px;
}
</style>