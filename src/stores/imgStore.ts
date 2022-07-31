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
      ],
      tag: imgComp,
      imgUrl:
        "https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/baike/s=290/sign=fa9cb3ef374e251fe6f7e3f19784c9c2/e7cd7b899e510fb3b48c6642de33c895d0430c49.jpg",
    }),
    getters: {},
    actions: {},
  });
};

export default useImgStore;
