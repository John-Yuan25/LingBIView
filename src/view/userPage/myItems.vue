<template>
    <div class="container">
        <div class="itemBox" v-for="(item, index) in itemArr" :key="index">
            <div class="upInner">
                <div class="left">
                    <img :src="item.itemImg" alt="" @click="changeImg()">
                </div>
                <div class="right">
                    <div class="edit" @click="toEdit(item)">编辑</div>
                    <div class="delete" @click="deleteItem(item, index)">删除</div>
                    <div class="preview" @click="previewItem(item)">预览</div>
                </div>
            </div>
            <div class="downInner">
                <span v-show="item.nameShow" class="itemName">{{ item.itemName }}</span>
                <input :id=item.itemName type="text" class="inpName" v-show="item.inpShow" @blur="updateItemName(index)"
                    v-model="item.itemName">
                <span @click="rename(index)"><i class="iconfont icon-xiugai"></i></span>
            </div>
            <!-- 遮罩层 -->
            <div class="cover" v-show="showCover"></div>
            <!-- 换封面弹框 -->
            <div class="imgSelectBox" v-show="imgSelectShow">
                <div class="imgUp">请输入图片地址</div>
                <div class="imgDown">
                    <input type="text" class="imgInput" v-model="imgUrl">
                </div>
                <div class="imgBtn">
                    <div class="saveBtn" @click="saveImg(index)">保存</div>
                    <div class="cancelBtn" @click="cancelImg">取消</div>
                </div>
            </div>
        </div>
        <div class="itemBox">
            <div class="new" @click="addNewItem">新建</div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { userItemsStore, useCurrStore } from '@/stores';
import { getId } from '../../utils/index'
import { useRouter } from 'vue-router'
import itemImg from '../../assets/ItemImg.png'

const router = useRouter()
let username = sessionStorage.getItem('userName');
const userItems = userItemsStore(username)();
let itemArr: Array<any> = reactive([])
itemArr = userItems.items;
let imgSelectShow = ref<Boolean>(false)
let showCover = ref<Boolean>(false)
let imgUrl=ref<String>('')
//换封面图
const changeImg = function () {
    imgSelectShow.value = true;
    showCover.value = true;
}
//取消封面更换
const cancelImg = function () {
    imgSelectShow.value = false;
    showCover.value = false;
}
//保存封面
const saveImg = function (index) {
    if(imgUrl.value!==''){
        userItems.items[index].itemImg = imgUrl.value;
    }
    imgSelectShow.value = false;
    showCover.value = false;
}
//前往编辑页
const toEdit = function (item) {
    router.push({
        name: 'item',
        query: {
            storeId: item.storeId,
            itemName: item.itemName
        }
    })
}

//删除项目
const deleteItem = function (item, index) {
    const currStore = useCurrStore(item.storeId)()
    for (let i = 0; i < currStore.Allcomponents.length; i++) {
        if (localStorage.getItem(currStore.Allcomponents[i].info.id))
            localStorage.removeItem(currStore.Allcomponents[i].info.id)
    }
    localStorage.removeItem(item.storeId);
    itemArr.splice(index, 1);
}
//预览项目
const previewItem = function (item) {
    const url = router.resolve({
        name: 'preview',
        query: {
            currStoreId: item.storeId
        }
    });
    // 打开新窗口
    window.open(url.href, '_blank');
}
//项目重命名
const rename = function (index) {
    userItems.items[index].nameShow = false;
    userItems.items[index].inpShow = true;
    new Promise((resolve, reject) => {
        resolve(1)
    }).then(() => {
        let inp = document.getElementById(userItems.items[index].itemName) as HTMLElement;
        inp.focus()
    })

}
const updateItemName = function (index) {
    userItems.items[index].inpShow = false;
    userItems.items[index].nameShow = true;
}
//新建项目
const addNewItem = function () {
    let newItem = {
        itemName: '项目名',
        storeId: getId() + userItems.userName,
        nameShow: true,
        inpShow: false,
        itemImg: itemImg
    }
    userItems.items.push(newItem);
}

</script>

<style scoped lang="less">
.container {
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto !important;

    .cover {
        width: 120vw;
        height: 120vh;
        position: fixed;
        top: -10vh;
        left: -10vw;
        z-index: 98;
        background-color: #101014;
        opacity: 0.5;
    }

    .imgSelectBox {
        position: fixed;
        width: 400px;
        height: 160px;
        border: 1px solid #fff;
        border-radius: 5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #101014;
        z-index: 99;

        .imgUp {
            width: 400px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
        }

        .imgDown {
            width: 350px;
            height: 40px;
            margin-left: 25px;

            .imgInput {
                width: 348px;
                height: 40px;
                border: 1px solid #fff;
                background-color: #4c4c4f;
                color: #fff;
                font-size: 14px;
                padding-left: 5px;
            }

            input:focus {
                border: 1px solid #5fbf9f;
                outline: none;
            }
        }

        .imgBtn {
            height: 40px;
            width: 300px;
            margin-top: 20px;
            margin-left: 50px;
            display: flex;
            justify-content: space-between;
        }

        .saveBtn {
            border-radius: 5px;
            border: 2px solid #4c4c4f;
            color: #d5d5d6;
            height: 30px;
            width: 80px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
        }

        .cancelBtn {
            border-radius: 5px;
            border: 2px solid #4c4c4f;
            color: #d5d5d6;
            text-align: center;
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            width: 80px;
        }

        .saveBtn:hover,
        .cancelBtn:hover {
            border: 2px solid #5fbf9f;
            color: #5fbf9f;
            cursor: pointer;
        }
    }
}

.itemBox {
    width: calc(calc(100% / 4) - 20px);
    margin: 8px;
    height: 200px;
    border-radius: 5px;
    border: 2px solid #313133;
    background-color: #18181c;

    .upInner {
        width: 96%;
        margin: 5px;
        height: 80%;

        .left {
            width: 70%;
            height: 100%;
            border-radius: 5px;
            display: inline-block;

            img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                cursor: pointer;
            }
        }

        .right {
            width: 30%;
            height: 100%;
            display: inline-block;
            position: relative;
            text-align: center;
            font-size: 14px;

            .edit {
                width: 80%;
                height: 30px;
                position: absolute;
                line-height: 30px;
                top: 10px;
                margin-left: 10px;
                border-radius: 5px;
                border: 2px solid #4c4c4f;
                color: #d5d5d6;
            }

            .delete {
                width: 80%;
                height: 30px;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                margin-left: 10px;
                line-height: 30px;
                border: 2px solid #4c4c4f;
                border-radius: 5px;
                color: rgb(199, 18, 18);

            }

            .preview {
                width: 80%;
                height: 30px;
                position: absolute;
                bottom: 10px;
                margin-left: 10px;
                line-height: 30px;
                border: 2px solid #4c4c4f;
                border-radius: 5px;
                color: #d5d5d6;
            }

            .edit:hover,
            .delete:hover,
            .preview:hover {
                border: 2px solid #5fbf9f;
                color: #5fbf9f;
                cursor: pointer;
            }

        }
    }

    .downInner {
        width: 100%;
        height: 15%;
        border-top: 1px solid #313133;
        margin-top: 5px;
        text-align: center;

        .itemName {
            width: 80%;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        i {
            cursor: pointer;
        }

        input {
            max-width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            outline: none;
            color: #fff;
            background-color: #18181c;
            text-align: center;
        }
    }
}

.new {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    border: 2px solid #5fbf9f;
    color: #5fbf9f;
}

.new:hover {
    color: #fff;
    background-color: #5fbf9f;
    border: 2px solid #fff;
    cursor: pointer;
}
</style>