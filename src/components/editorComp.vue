<template>
    <div class="editorContainer">
        <div class="editorBox">
            <div id="monacoEditor"></div>
        </div>
        <div class="attention">点击元素名为thisItem,语法同js</div>
        <div class="cancelBtn" @click="cancel">取消</div>
        <div class="saveBtn" @click="save">保存</div>
    </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useRoute } from 'vue-router'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';//编辑器js语法高亮
import {
    useCurrStore,
    useCategoryBarStore,
    useCategoryLineStore,
    usePieStore,
    useVideoStore,
    useDivStore,
    useImgStore,
    useMapStore,
    useScatterStore,
    useTextStore,
} from '@/stores';

const route = useRoute()

const currStore = useCurrStore(route.query.storeId)()
let thisStore;
if (currStore.type === 'divComp') {
    thisStore = useDivStore(currStore.currStoreId)()
} else if (currStore.type === 'imgComp') {
    thisStore = useImgStore(currStore.currStoreId)()
} else if (currStore.type === 'textComp') {
    thisStore = useTextStore(currStore.currStoreId)()
}
//创建编辑器实例
let monacoInstance;
setTimeout(() => {
    let editorDom = document.querySelector('#monacoEditor') as HTMLElement;
    monacoInstance = monaco.editor.create(editorDom, {
        value: currStore.editorCode,
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
        foldingStrategy: 'indentation', // 代码可分小段折叠
    })
}, 0);

const cancel = function () {
    currStore.editorShow = false;
    //使用完成销毁编辑器实例
    monacoInstance.dispose();
}
const save = function () {
    currStore.editorCode = monacoInstance.getValue()
    thisStore.code = currStore.editorCode;
    currStore.editorShow = false;
    //使用完成销毁编辑器实例
    monacoInstance.dispose();
}

</script>

<style lang="less" scoped>
.editorContainer {
    width: 100%;
    height: 100%;
    margin-top: 1vh;
    position: relative;

    .editorBox {
        position: relative;
        width: 48vw;
        height: 72vh;
        margin-left: 1vw;
    }

    #monacoEditor {
        width: 100%;
        height: 100%;
    }

    .attention {
        position: absolute;
        margin-top: 10px;
        border-radius: 5px;
        text-align: center;
        padding: 5px 10px 5px;
        color: #d5d5d6;
        right: 10px;
        color: #5fbf9f;
    }

    .cancelBtn {
        position: absolute;
        text-align: center;
        padding: 5px 10px 5px;
        border: 2px solid #4c4c4f;
        color: #d5d5d6;
        margin-left: 30px;
        margin-top: 10px;
        border-radius: 5px;
    }

    .cancelBtn:hover {
        border: 2px solid #ff0000;
        color: #ff0000;
        cursor: pointer;
    }

    .saveBtn {
        position: absolute;
        text-align: center;
        padding: 5px 10px 5px;
        border: 2px solid #4c4c4f;
        color: #d5d5d6;
        border-radius: 5px;
        margin-left: 100px;
        margin-top: 10px;
    }

    .saveBtn:hover {
        border: 2px solid #5fbf9f;
        color: #5fbf9f;
        cursor: pointer;
    }
}
</style>