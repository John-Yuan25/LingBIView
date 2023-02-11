import textComp from './textComp.vue'
import imgComp from './imgComp.vue'
import categoryLineComp from './categoryLineComp.vue'
import categoryBarComp from './categoryBarComp.vue'
import pieComp from './pieComp.vue'
import divComp from './divComp.vue'

//定义组件对象
let obj={
    textComp,
    imgComp,
    categoryLineComp,
    categoryBarComp,
    pieComp,
    divComp
}
//组件注册方法
function install(App){
    Object.keys(obj).forEach(key=>{
        App.component(key,obj[key])
    })
}

let API={
    version:'1.0',
    install
}

export default API