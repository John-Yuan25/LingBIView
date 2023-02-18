<template>
    <div :style="{ backgroundImage: `url(${bg})` }" class="box">
        <div class="formBox">
            <form action="javascript:" class="form" method="post">
                <div class="logo">
                    <div class="img" :style="{ backgroundImage: `url(${logoImg})` }"></div>
                </div>
                <div class="userBox">
                    <div>
                        <label><i class="iconfont icon-yonghu"></i></label>
                        <input type="text" id="user" v-model="userName">
                    </div>
                </div>
                <div class="passwordBox">
                    <div>
                        <label><i class="iconfont icon-suoding"></i></label>
                        <input type="password" id="psw" v-model="password">
                    </div>
                </div>
                <div class="butBox">
                    <button @click="login">登录</button>
                </div>
                <div class="butBox">
                    <button @click="toRegister">注册</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import bg from '../assets/bg.jpg'
import logoImg from '../assets/logo.png'
import { checkUser } from '../server'

const router = useRouter()
let userName = ref<string>('admin')
let password = ref<string>('123456')

async function login() {
    // 发送登录请求验证，返回的result为token
    const promise = new Promise(async (resolve, reject) => {
        try {
            let result: string = await checkUser(userName.value, password.value) as string
            resolve(result)
        } catch (error) {
            reject(error)
        }
    }).then(value => {
        sessionStorage.setItem("token", value as string)
        sessionStorage.setItem("userName", userName.value)
        router.push({
            path: '/myItems'
        })
    }, err => {
        alert('用户名或密码错误！'+err)
    })


    // 无后台登录验证（临时）
    // if (userName.value === "admin" && password.value === '123456') {
    //     sessionStorage.setItem("token", 'temporary')
    //     sessionStorage.setItem("userName", userName.value)
    //     router.push({
    //         path: '/myItems'
    //     })
    // } else {
    //     alert('请使用默认账号密码登录')
    // }
}
function toRegister(){
    router.push({
            path: '/register'
        })
}

//登录页禁止路由返回
history.pushState(null,'',document.URL);
window.addEventListener("popstate",function(){
    history.pushState(null,'',document.URL);
})
</script>

<style scoped lang="less">
.box {
    height: 100%;
    display: flex;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
}

.formBox {
    width: 30%;
    height: 50%;
    background-color: rgba(32, 33, 35, 0.7);
    position: absolute;
    margin: auto;
    top: -10%;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;

    input {
        background: none;
        outline: none;
        border: 0px;
        color: #fff;
    }

    input:focus {
        border: none;
    }

    .form {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .logo {
        flex: 3;

        .img {
            height: 70%;
            background-repeat: no-repeat;
            background-size: contain;
            margin-left: 35%;
            margin-top: 5%;
        }
    }

    .userBox,
    .passwordBox {
        flex: 1;
        padding: 0px 5% 0px 5%;
        color: #fff;

        div {
            width: 100%;
            height: 90%;
            background-color: rgba(53, 59, 66, 0.8);
            border-radius: 5px;
            overflow: hidden;
            position: relative;
        }

        div:hover {
            border: 1px solid #69dcb5;
        }

        label {
            position: relative;
            margin-left: 5%;
            top: 30%;

        }

        input {
            position: absolute;
            font-size: 20px;
            margin-left: 1%;
            top: 30%;
        }

        i {
            font-size: 20px;
        }
    }



    .butBox {
        flex: 1;
        position: relative;

        button {
            background-color: #51d6a9;
            height: 70%;
            width: 70%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 5px;
            border: 0px;
        }

        button:hover {
            background-color: #69dcb5;
            cursor: pointer;
        }
    }

}
</style>