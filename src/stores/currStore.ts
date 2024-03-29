import { defineStore } from "pinia";

export const useCurrStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      currStoreId: "",
      type: "",
      currCompShow: false,
      Allcomponents: <any>[],
      editorShow:false,
      editorCode:'',
    }),
    getters: {},
    actions: {
      deleteCompent(id: string) {
        for (let i = 0; i < this.Allcomponents.length; i++) {
          if (id == this.Allcomponents[i].$id) {
            // this.Allcomponents.splice(i,1)
            //问题出现在Allcomponents，只要改变了Allcomponents就会出错,原因推断为数组的显示问题，删除了一个之后，数组序列会少一个空，后序的往前补，vfor循环显示会出问题
            //解决方法,将元素填充如下,打上删除标记，真正的删除操作在itemCenter.vue
            this.Allcomponents[i] = {
              info: {
                id: i,
                deleted: true,
              },
            };
          }
        }
      },
    },
    //   persist: true,
    persist: {
      key: id,
      // storage: window.sessionStorage, //保存的位置,默认是localstorage
    },
  });
};

export default useCurrStore;
