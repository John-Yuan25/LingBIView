<template>
  <div class="d-switch" :class="{ 'is-checked': checked }">
      <input
          class="d-switch__input"
          ref="input"
          type="checkbox"
          :checked="checked"
          @change="handleInput"
          :true-value="trueValue"
          :false-value="falseValue"
      />
      <span class="d-switch_action"></span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
const props = defineProps({
    modelValue: {  //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
        type: [Number, String, Boolean],
    },
    trueValue: { //switch 打开时的值 可以自定义组件打开的时的值 
        type: [Number, String, Boolean],
        default: true,
    },
    falseValue: { //    switch 关闭时的值  可以自定义组件关闭的时的值 
        type: [Number, String, Boolean],
        default: true,
    },
    activeColor: { //switch 打开时的背景色
        type: [String],
        default: '#409EFF',
    }
})
const emits = defineEmits(['update:modelValue', 'change'])

//获取input元素
const input = ref(null) as any
//判断当前组件是否是打开状态
const checked = computed(() => {
    //因为可以自定义打开和关闭的值 所以这里必须判断 v-model绑定的值 === 组件自定义打开的值
    return props.modelValue === props.trueValue
})
//input事件 获取当前input事件
const handleInput = () => {
    nextTick(() => {
        const val = input.value.checked
        emits("update:modelValue", val); // 开关点击后的状态传给v-model  
        emits("change", val); //给组件增加change 事件
    })
};
</script>

<style lang='less' scoped>
.d-switch {
    position: relative;
    height: 100%;
    transition:0.2s;
    width: 100%;
    background: rgb(117, 117, 117);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    .d-switch__input {
        position: relative;
        z-index: 1;
        margin: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .d-switch_action {
        position: absolute;
        transition: 0.2s;
        left: 2px;
        top: 5%;
        z-index: 0;
        height: 90%;
        line-height: 90%;
        width: 30%;
        background: #fff;
        border-radius: 50%;
    }
    &.is-checked {
        background: v-bind(activeColor);
        .d-switch_action {
            left: 100%;
            background: #fff;
            margin-left: -30%;
        }
    }
}
</style>