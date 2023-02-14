import { defineStore } from 'pinia'
import textComp from '../components/textComp.vue'


export const useTextStore =function(this:any,id:any){
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
                    value:30,
                },{
                    name:'字体大小',
                    type:'number',
                    key:'fontSize',
                    value:15,
                },{
                    name:'字体颜色',
                    type:'color',
                    key:'color',
                    value:'#00FFFF',
                },{
                    name:"层级",
                    type:'number',
                    key:'z-index',
                    value:1,
                },
            ],
            tag:textComp,
            data:'默认文本',
        }),
        getters: {
    
        },
        actions: {
          
        },
        // persist: true,
        persist: {
            key: id,
            // storage: window.sessionStorage,////保存的位置,默认是localstorage
          },
      })
}


  export default useTextStore