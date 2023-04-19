import { defineStore } from "pinia";
import timeComp from "../components/timeComp.vue";

export const useTimeStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      attribute: [
        {
          name: "宽度",
          type: "number",
          key: "width",
          value: 170,
        },
        {
          name: "高度",
          type: "number",
          key: "height",
          value: 25,
        },
        {
          name: "层级",
          type: "number",
          key: "zIndex",
          value: 1,
        }, {
          name: '字体颜色',
          type: 'color',
          key: 'color',
          value: '#fff',
        }, {
          name: '字体大小',
          type: 'number',
          key: 'fontSize',
          value: 16,
        },
      ],
      tag: timeComp,
      code: '//code here',
      timer:''
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

export default useTimeStore;
