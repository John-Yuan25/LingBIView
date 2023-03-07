import { defineStore } from 'pinia'
import divComp from '../components/divComp.vue'


export const useDivStore =function(this:any,id:any){
    return defineStore(id,{
        state: () => ({
            attribute:[
                {
                    name:"宽度",
                    type:'number',
                    key:'width',
                    value:80,
                },{
                    name:'高度',
                    type:'number',
                    key:'height',
                    value:80,
                },{
                    name:"层级",
                    type:'number',
                    key:'z-index',
                    value:1,
                },
                {
                    name:'背景颜色',
                    type:'color',
                    key:'background-color',
                    value:'#fff',
                },{
                    name:"边框宽度",
                    type:'number',
                    key:'borderWidth',
                    value:0,
                },{
                    name:"边框颜色",
                    type:'color',
                    key:'borderColor',
                    value:'#00FFFF',
                },{
                    name:"边框样式",
                    type:'select',
                    key:'borderStyle',
                    value:'实线',
                    selections:['实线','虚线','双线','点状'],
                },{
                    name:"圆角",
                    type:'number',
                    key:'borderRadius',
                    value:0,
                },
            ],
            tag:divComp,
            
        }),
        getters: {
    
        },
        actions: {
            setSelect(data){
                if(data=='实线'){
                    this.attribute[6].value='实线'
                }else if(data=='虚线'){
                    this.attribute[6].value='虚线'
                }else if(data=='双线'){
                    this.attribute[6].value='双线'
                }else if(data=='点状'){
                    this.attribute[6].value='点状'
                }
            }
        },
        // persist: true,
        persist: {
            key: id,
            // storage: window.sessionStorage,////保存的位置,默认是localstorage
          },
      })
}


  export default useDivStore