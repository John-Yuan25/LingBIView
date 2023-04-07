import textComp from './textComp.vue'
import imgComp from './imgComp.vue'
import categoryLineComp from './categoryLineComp.vue'
import categoryBarComp from './categoryBarComp.vue'
import pieComp from './pieComp.vue'
import divComp from './divComp.vue'
import scatterComp from './scatterComp.vue'
import mapComp from './mapComp.vue'
import videoComp from './videoComp.vue'
import numberComp from './numberComp.vue'
import kLineComp from './kLineComp.vue'
import radarComp from './radarComp.vue'
import funnelComp from './funnelComp.vue'
import gaugeComp from './gaugeComp.vue'
import btnComp from './btnComp.vue'
import progressComp from './progressComp.vue'

//定义组件对象
let obj={
    textComp,
    imgComp,
    categoryLineComp,
    categoryBarComp,
    pieComp,
    divComp,
    scatterComp,
    mapComp,
    videoComp,
    numberComp,
    kLineComp,
    radarComp,
    funnelComp,
    gaugeComp,
    btnComp,
    progressComp
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