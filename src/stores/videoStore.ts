import { defineStore } from "pinia";
import videoComp from "../components/videoComp.vue";

export const useVideoStore = function (this: any, id: any) {
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
          name: "样式",
          type: 'select',
          key: 'object-fit',
          value: 'contain',
          selections: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        },
      ],
      tag: videoComp,
      videoUrl: "https://vue.mtruning.club/static/mp4/earth-1d58aa0e.mp4",
    }),
    getters: {},
    actions: {
      setSelect(data) {
        this.attribute[3].value = data;
      }
    },
    // persist: true,
    persist: {
      key: id,
      // storage: window.sessionStorage,////保存的位置,默认是localstorage
    },
  });
};

export default useVideoStore;
