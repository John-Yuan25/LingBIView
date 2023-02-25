<template>
    <div class="container">
        <div class="itemBox" v-for="(item, index) in itemArr" :key="index">
            <div class="upInner">
                <div class="left">
                    <img :src="itemImg" alt="">
                </div>
                <div class="right">
                    <div class="edit" @click="toEdit(item)">编辑</div>
                    <div class="delete" @click="deleteItem(item,index)">删除</div>
                    <div class="preview" @click="previewItem(item)">预览</div>
                </div>
            </div>
            <div class="downInner">
                <span v-show="item.nameShow" class="itemName">{{ item.itemName }}</span>
                <input :id=item.itemName type="text" class="inpName" v-show="item.inpShow" @blur="updateItemName(index)"
                    v-model="item.itemName">
                <span @click="rename(index)"><i class="iconfont icon-xiugai"></i></span>
            </div>
        </div>
        <div class="itemBox">
            <div class="new" @click="addNewItem">新建</div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { userItemsStore,useCurrStore } from '@/stores';
import { getId } from '../../utils/index'
import { useRouter } from 'vue-router'
import itemImg from '../../assets/ItemImg.png'

const router = useRouter()
let username = sessionStorage.getItem('userName');
const textStore = userItemsStore(username)();
let itemArr: Array<any> = reactive([])
itemArr = textStore.items;


//前往编辑页
const toEdit = function (item) {
    router.push({
        name: 'item',
        query:{
			storeId:item.storeId,
            itemName:item.itemName
		}
    })
}

//删除项目
const deleteItem = function (item,index) {
    const currStore = useCurrStore(item.storeId)()
    for(let i=0;i<currStore.Allcomponents.length;i++){  
        if(localStorage.getItem(currStore.Allcomponents[i].info.id))
        localStorage.removeItem(currStore.Allcomponents[i].info.id)
    }
    localStorage.removeItem(item.storeId);
    itemArr.splice(index,1);
}
//预览项目
const previewItem = function (item) {
    const url = router.resolve({
        name: 'preview',
        query: {
            currStoreId:item.storeId
        }
    });
    // 打开新窗口
    window.open(url.href,'_blank');
}
//项目重命名
const rename = function (index) {
    textStore.items[index].nameShow = false;
    textStore.items[index].inpShow = true;
    new Promise((resolve, reject) => {
        resolve(1)
    }).then(() => {
        let inp = document.getElementById(textStore.items[index].itemName) as HTMLElement;
        inp.focus()
    })

}
const updateItemName = function (index) {
    textStore.items[index].inpShow = false;
    textStore.items[index].nameShow = true;
}
//新建项目
const addNewItem = function () {
    let newItem = {
        itemName: '项目名',
        storeId: getId() + textStore.userName,
        nameShow: true,
        inpShow: false,
    }
    textStore.items.push(newItem);
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