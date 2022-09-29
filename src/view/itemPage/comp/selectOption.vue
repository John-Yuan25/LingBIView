<template>
    <div>
        <span class="checkBox">
            <div class="selectBox">
                <span @click="ulShowChange">{{ currSelect }}<i class="iconfont icon-xiangxia"></i></span>
                <ul v-if="ulShow">
                    <li v-for="(item, index) in selectOption" @click="check(item)">{{ item }}</li>
                </ul>
            </div>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps([
    'selectOption',
    'currSelect'
])
const emit = defineEmits([
    'selectData',
])
let selectOption = props.selectOption
let currSelect = ref(props.currSelect)
watch(() => props.currSelect, (newValue, oldValue) => {
    currSelect.value = newValue
}
)
let ulShow = ref<boolean>(false)
let currentSelect = ref<string>('')
currentSelect.value = selectOption[0]
function ulShowChange() {
    if (ulShow.value) {
        ulShow.value = false
    } else {
        ulShow.value = true
    }
}
function check(item) {
    ulShow.value = false
    currentSelect.value = item
    emit('selectData', item)
}

</script>

<style scoped lang="less">
.checkBox {
    position: absolute;

    span {
        display: inline-block;
        width: 100%;
        height: 20px;
        border: 2px solid #5fbf9f;
        border-radius: 3px;
        padding-left: 5px;
        cursor: pointer;

        i {
            float: right;
            padding-right: 5px;
        }
    }

    ul {
        width: 100%;
        padding: 0;
        list-style: none;
        border: 2px solid #0aad77;
        border-radius: 3px;
        margin-top: 1px;

        li {
            cursor: pointer;
            padding-left: 5px;
            background-color: rgb(247, 248, 247);
        }

        li:hover {
            color: rgb(48, 207, 173);
            background-color: rgb(223, 226, 223);
        }
    }

    .selectBox {
        width: 120px;
    }
}
</style>