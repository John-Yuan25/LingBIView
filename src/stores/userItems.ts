import { defineStore } from 'pinia'
import itemimg from '../assets/ItemImg.png'

export const userItemsStore =function(this:any,id:any){
    return defineStore(id,{
        state: () => ({
            userName:'',
            items:<any>[],
            currStoreId:'',
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


  export default userItemsStore;