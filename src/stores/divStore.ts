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
                },
            ],
            tag:divComp,
            
        }),
        getters: {
    
        },
        actions: {
          
        },
        // persist: true,
        // persist: {
        //     key: id,
        //     storage: window.sessionStorage,////保存的位置,默认是localstorage
        //   },
      })
}


  export default useDivStore