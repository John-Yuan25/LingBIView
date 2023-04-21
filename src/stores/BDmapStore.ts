import { defineStore } from "pinia";
import BDmapComp from "../components/BDmapComp.vue";

export const useBDmapStore = function (this: any, id: any) {
  return defineStore(id, {
    state: () => ({
      attribute: [
        {
          name: "宽度",
          type: "number",
          key: "width",
          value: 400,
        },
        {
          name: "高度",
          type: "number",
          key: "height",
          value: 400,
        },
        {
          name: "层级",
          type: "number",
          key: "zIndex",
          value: 1,
        }
      ],
      tag: BDmapComp,
      code: '//code here',
      pointE:110.301,
      pointN:21.152,
      markerPointE:110.301,
      markerPointN:21.152,

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

export default useBDmapStore;
