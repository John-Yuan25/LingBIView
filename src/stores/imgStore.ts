import { defineStore } from "pinia";
import imgComp from "../components/imgComp.vue";

export const useImgStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      attribute: [
        {
          name: "宽度",
          type: "number",
          key: "width",
          value: 100,
        },
        {
          name: "高度",
          type: "number",
          key: "height",
          value: 100,
        },
        {
          name: "层级",
          type: "number",
          key: "zIndex",
          value: 1,
        },
        {
          name:"样式",
          type:'select',
          key:'object-fit',
          value:'contain',
          selections:['fill','contain','cover','none','scale-down'],
        },
      ],
      tag: imgComp,
      imgUrl: "https://v2.cn.vuejs.org/images/logo.svg",
    }),
    getters: {},
    actions: {
      setSelect(data){
            this.attribute[3].value=data;
      }
    },
    // persist: true,
    persist: {
      key: id,
      // storage: window.sessionStorage,////保存的位置,默认是localstorage
    },
  });
};

export default useImgStore;
