import { defineStore } from "pinia";
import btnComp from "../components/btnComp.vue";

export const useBtnStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      attribute: [
        {
          name: "宽度",
          type: "number",
          key: "width",
          value: 40,
        },
        {
          name: "高度",
          type: "number",
          key: "height",
          value: 10,
        },
        {
          name: "层级",
          type: "number",
          key: "zIndex",
          value: 1,
        },
      ],
      isOn:false,
      switchBackgroundColor:'#409EFF',
      tag: btnComp,
      code:'//code here'
    }),
    getters: {},
    actions: {

    },
    // persist: true,
    persist: {
      key: id,
      // storage: window.sessionStorage,////保存的位置,默认是localstorage
    },
  });
};

export default useBtnStore;
